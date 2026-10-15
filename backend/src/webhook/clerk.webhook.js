import express from "express";
import User from "../models/user.model.js";
import { verifyWebhook } from "@clerk/express/webhooks";

const router = express.Router();

router.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const signingSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

      if (!signingSecret) {
        console.error("Clerk webhook secret missing");
        return res.status(500).json({ message: "Webhook secret is missing" });
      }

      // Seedha Express ka req do, manual Request/Headers nahi
      const event = await verifyWebhook(req, { signingSecret });

      console.log("Clerk event:", event.type);

      if (event.type === "user.created" || event.type === "user.updated") {
        const clerkUser = event.data;

        const email =
          clerkUser.email_addresses?.find(
            (item) => item.id === clerkUser.primary_email_address_id
          )?.email_address ||
          clerkUser.email_addresses?.[0]?.email_address;

        const fullName =
          [clerkUser.first_name, clerkUser.last_name]
            .filter(Boolean)
            .join(" ") ||
          clerkUser.username ||
          email?.split("@")[0];

        if (!email || !fullName) {
          console.error("Missing email or name:", clerkUser.id);
          return res.status(200).json({ skipped: true });
        }

        const user = await User.findOneAndUpdate(
          { clerkId: clerkUser.id },
          {
            $set: {
              clerkId: clerkUser.id,
              email: email.toLowerCase(),
              fullName,
              profilePicture: clerkUser.image_url || "", // schema ke naam se match karo
            },
          },
          {
            new: true,
            upsert: true,
            runValidators: true,
            setDefaultsOnInsert: true,
          }
        );

        console.log("User saved in MongoDB:", user.clerkId);
      }

      if (event.type === "user.deleted") {
        if (event.data.id) {
          await User.findOneAndDelete({ clerkId: event.data.id });
          console.log("User deleted from MongoDB:", event.data.id);
        }
      }

      return res.status(200).json({ success: true, received: true });
    } catch (error) {
      console.error("Clerk webhook error:", error);
      return res.status(400).json({
        message: "Webhook failed",
        error: error.message, // debugging ke baad hata dena
      });
    }
  }
);

export default router;