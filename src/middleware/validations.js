import Joi from "joi";

export default {
    createAdmin : (req,res,next) => {
        let validAdmin = Joi.object({
            fullname : Joi.string().min(3).required(),
            phone : Joi.string().pattern(/^\+998(33|50|55|77|88|90|91|93|94|95|97|98|99)\d{7}$/).required(),
            password : Joi.string().min(8).max(20).required()
        })

        const { error } = validAdmin.validate(req.body)

        if(error){
            return res.status(400).json({
                status:400,
                message:error.message
            })
        }

        return next()
    },

    updateAdmin : (req, res, next) => {
        let updateAdmin = Joi.object({
            fullname:  Joi.string().min(3),
            phone : Joi.string().pattern(/^\+998(33|50|55|77|88|90|91|93|94|95|97|98|99)\d{7}$/),
            password : Joi.string().min(8).max(20)
        })

        const { error } = updateAdmin.validate(req.body)

        if(error){
            return res.status(400).json({
                status:400,
                message:error.message
            })
        }

        return next()
    }
}