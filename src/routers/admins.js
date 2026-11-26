import express from "express"
import adminController from "../controllers/admins.js"
import middleware from "../middleware/validations.js"
const router = express.Router()

router
    .post("/api/v1/admins", middleware.createAdmin, adminController.createAdmin)
    .get("/api/v1/all/admins", adminController.getAllAdmins)
    .get("/api/v1/one/admin/:adminId", adminController.getOneAdmin)
    .put("/api/v1/admins/:adminId",middleware.updateAdmin,adminController.updateAdmin)
    .delete("/api/v1/admins/:adminId", adminController.deleteAdmin)

export default router