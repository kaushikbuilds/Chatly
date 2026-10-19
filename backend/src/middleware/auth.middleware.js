import { getAuth, clerkClient } from "@clerk/express";
import User from "../models/user.model.js";

export async function protectRoute(req, res, next) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let user = await User.findOne({ clerkId: userId });

    
    if (!user) {
      const cu = await clerkClient.users.getUser(userId);

      const email =
        cu.emailAddresses.find((e) => e.id === cu.primaryEmailAddressId)
          ?.emailAddress || cu.emailAddresses[0]?.emailAddress;

      const fullName =
        [cu.firstName, cu.lastName].filter(Boolean).join(" ") ||
        cu.username ||
        email?.split("@")[0];

      user = await User.findOneAndUpdate(
        { clerkId: userId },
        {
          $set: {
            clerkId: userId,
            email: email?.toLowerCase(),
            fullName,
            profilePicture: cu.imageUrl || "", // schema ke naam se match karo
          },
        },
        {
          new: true,
          upsert: true,
          runValidators: true,
          setDefaultsOnInsert: true,
        }
      );

      console.log("User synced from protectRoute:", userId);
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}