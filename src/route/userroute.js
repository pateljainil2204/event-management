import express from "express";
import { getAllUsers, searchUser } from "../controller/usercontroller.js";
import authentication from "../middleware/authmiddleware.js";
import roleMiddleware from "../middleware/rolemiddleware.js";

const router = express.Router();

router.get("/", authentication, roleMiddleware(["Admin"]), getAllUsers);
router.post("/search", authentication, roleMiddleware(["Admin"]), searchUser);

export default router;