import pool from "../config/db.js";
import argon from "argon2"

class AdminService{
    async createAdmin(req,res){
        const { fullname, phone, password } = req.body

        const existAdmin = await pool.query('select * from admins where phone=$1', [phone])

        if(existAdmin.rows.length){
            return {
                status:409,
                message:"This admin was created with this phone!"
            }
        }

        const passwordHash = await argon.hash(password)
        await pool.query('insert into admins(fullname, phone, password) values($1,$2,$3)', [fullname,phone,passwordHash])

        return {
            status:201, 
            message: "Admin created successfully!"
        }
    }

    async getAllAdmins(req,res){
        let allAdmins = await pool.query('select id, fullname, phone, photo, status, created_at from admins')

        return{
            status: 200,
            data: allAdmins.rows
        }
    }

    async getOneAdmin(req,res){
        const { adminId } = req.params
        
        const existAdmin = await pool.query('select * from admins where id=$1', [adminId])

        if(!existAdmin.rows.length){
            return {
                status: 404,
                message: "Admin not found!"
            }
        }

        let admin = await pool.query('select id, fullname, phone, photo, status, created_at from admins where id=$1', [adminId])

        return {
            status: 200,
            data: admin.rows
        }
    }

    async updateAdmin(req,res){
        const { adminId } = req.params
        const { fullname, phone, password } = req.body
        const { photo } = req.file

        const existAdmin = await pool.query('select * from admins where id=$1', [adminId])

        if(!existAdmin.rows.length){
            return {
                status: 404,
                message: "Admin not found!"
            }
        }

        if(fullname){
            await pool.query('update admins set fullname=$1 where id=$2', [fullname, adminId])
        }

        if(phone){
            await pool.query('update admins set phone=$1 where id=$2', [phone, adminId])
        }

        if(password){
            const hashPassword = await argon.hash(password)
            await pool.query('update admins set password=$1 where id=$2', [hashPassword, adminId])
        }

        if(photo){
            await pool.query('update admins set photo=$1 where id=$2', [photo, adminId])
        }

        return{
            status : 200,
            message: "Admin updated successfully!" 
        }
    }

    async deleteAdmin(req,res){
        const { adminId } = req.params

        const existAdmin = await pool.query('select * from admins where id=$1', [adminId])

        if(!existAdmin.rows.length){
            return{
                status:404,
                message: "Admin not found!"
            }
        }

        await pool.query('delete from admins where id=$1', [adminId])

        return{
            status: 200,
            message: "Admin deleted successfully!"
        }
    }
}

const adminService = new AdminService()

export default adminService