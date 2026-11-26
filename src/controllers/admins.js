import adminService from "../services/admins.js";

class AdminController{
    async createAdmin(req, res){
        let resData = await adminService.createAdmin(req)
        return res.status(resData.status).json(resData)
    }

    async getAllAdmins(req,res){
        let resData = await adminService.getAllAdmins()

        return res.status(resData.status).json(resData)
    }

    async getOneAdmin (req,res) {
        let resData = await adminService.getOneAdmin(req)

        return res.status(resData.status).json(resData)
    }

    async updateAdmin(req,res){
        let resData = await adminService.updateAdmin(req)

        return res.status(resData.status).json(resData)
    }

    async deleteAdmin(req,res){
        let resData = await adminService.deleteAdmin(req)

        return res.status(resData.status).json(resData)
    }
}

const adminController = new AdminController()

export default adminController