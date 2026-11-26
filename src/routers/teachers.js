import express from "express"
import teacherController from "../controllers/teachers.js"
import middleware from "../middleware/validations.js"

const router = express.Router()

router
    .post("/api/v1/teachers", middleware.createTeacher,teacherController.createTeacher)
    .get("/api/v1/all/teachers", teacherController.getAllTeachers)
    .get("/api/v1/one/teacher/:teacherId", teacherController.getOneTeacher)
    .put("/api/v1/teachers/:teacherId", middleware.updateTeacher,teacherController.updateTeacher)
    .delete("/api/v1/teachers/:teacherId", teacherController.deleteTeacher)

export default router