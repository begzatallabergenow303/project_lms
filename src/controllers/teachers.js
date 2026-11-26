import teacherService from "../services/teachers.js"
class TeachersController{
    async createTeacher(req,res){
        let resData = await teacherService.createTeacher(req)
        return res.status(resData.status).json(resData)
    }

    async getAllTeachers(req,res){
        let resData = await teacherService.getAllTeachers()
        return res.status(resData.status).json(resData)
    }

    async getOneTeacher(req,res){
        let resData = await teacherService.getOneTeacher(req)

        return res.status(resData.status).json(resData)
    }

    async updateTeacher(req,res){
        let resData = await teacherService.updateTeacher(req)

        return res.status(resData.status).json(resData)
    }

    async deleteTeacher(req,res) {
        let resData = await teacherService.deleteTeacher(req)

        return res.status(resData.status).json(resData)
    }
}

const teacherController = new TeachersController

export default teacherController