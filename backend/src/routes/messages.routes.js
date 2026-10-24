import express from "express";
import {
    getUsersForSidebar,
    getConversationsForSidebar,
    getMessages,
    sendMessages
}
    from "../controllers/messages.controll.js";
import { protectRoute } from "../middleware/auth.middleware.js";

import {upload} from "../middleware/upload.middleware.js";



const router = express.Router();

router.use(protectRoute);

router.get("/user", getUsersForSidebar);
router.get("/conversations", getConversationsForSidebar);
router.get("/:id", getMessages);
router.post("/send/:id", upload.single("media"), sendMessages);



export default router;

