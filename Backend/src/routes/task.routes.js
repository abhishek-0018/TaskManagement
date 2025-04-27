import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addTask, getTasks,changeStatus, deleteTask } from "../controllers/task.controller.js";

const router=Router()

router.route("/addTask").post(verifyJWT,addTask);
router.route("/getTasks").get(verifyJWT,getTasks);
router.route("/changeStatus").put(changeStatus);
router.route("/deleteTask").delete(deleteTask);

export default router