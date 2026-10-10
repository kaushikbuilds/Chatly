
import express from "express";
import User from "../models/user.model.js";
import { verifyWebhook } from "@clerk/express/webhooks";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const signingSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

    if (!signingSecret) {
      console.error("Clerk webhook secret missing");
      return res.status(500).json({
        message: "Webhook secret is missing",
      });
    }

    if (!Buffer.isBuffer(req.body)) {
      return res.status(400).json({
        message: "Raw webhook body is required",
      });
    }

    const headers = new Headers();

    for (const name of [
      "svix-id",
      "svix-timestamp",
      "svix-signature",
    ]) {
      const value = req.headers[name];

      if (value) {
        headers.set(name, value);
      }
    }

    headers.set("content-type", "application/json");

    const request = new Request(
      "http://localhost/api/webhooks/clerk",
      {
        method: "POST",
        headers,
        body: req.body.toString("utf8"),
      }
    );

    const event = await verifyWebhook(request, {
      signingSecret,
    });

    console.log("Clerk event:", event.type);

    if (
      event.type === "user.created" ||
      event.type === "user.updated"
    ) {
      const clerkUser = event.data;

      const email =
        clerkUser.email_addresses?.find(
          (item) =>
            item.id === clerkUser.primary_email_address_id
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

        return res.status(400).json({
          message: "Email or name is missing",
        });
      }

      const user = await User.findOneAndUpdate(
        { clerkId: clerkUser.id },
        {
          $set: {
            clerkId: clerkUser.id,
            email: email.toLowerCase(),
            fullName,
            profilePicture: clerkUser.image_url || "",
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
      await User.findOneAndDelete({
        clerkId: event.data.id,
      });

      console.log("User deleted from MongoDB:", event.data.id);
    }

    return res.status(200).json({
      success: true,
      received: true,
    });
  } catch (error) {
    console.error("Clerk webhook error:", error);

    return res.status(400).json({
      message: "Webhook failed",
      error: error.message,
    });
  }
});
export default router;
