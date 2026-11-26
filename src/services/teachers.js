import pool from "../config/db.js";
import argon from "argon2"

class TeachersServices {
    async createTeacher(req, res) {
        const { fullname, phone, password } = req.body

        const existTeacher = await pool.query('select * from teachers where phone=$1', [phone])

        if (existTeacher.rows.length) {
            return {
                status: 409,
                message: "Teacher already created!"
            }
        }

        const hashPassword = await argon.hash(password)
        await pool.query('insert into teachers(fullname, phone, password) values($1,$2,$3)', [fullname, phone, hashPassword])

        return {
            status: 200,
            message: "Teacher created successfully!"
        }
    }

    async getAllTeachers() {
        let allTeachers = await pool.query('select id, fullname, phone, photo, status, experience, job, description, site, instagram, telegram, linkedin, facebook, github, created_at from teachers')

        return {
            status: 200,
            data: allTeachers.rows
        }
    }

    async getOneTeacher(req, res) {
        const { teacherId } = req.params

        const existTeacher = await pool.query('select * from teachers where id=$1', [teacherId])

        if (!existTeacher.rows.length) {
            return {
                status: 404,
                message: "Teacher not founded!"
            }
        }

        let teacher = await pool.query('select id, fullname, phone, photo, status, experience, job, description, site, instagram, telegram, linkedin, facebook, github, created_at from teachers where id=$1', [teacherId])


        return {
            status: 200,
            data: teacher.rows
        }
    }

    async updateTeacher(req,res){
        const { teacherId } = req.params
        const { fullname, phone, password, job, experience, description } = req.body
        const photo = req.file?.filename
        const existTeacher = await pool.query('select * from teachers where id=$1', [teacherId])

        if (!existTeacher.rows.length) {
            return {
                status: 404,
                message: "Teacher not founded!"
            }
        }

        if(fullname){
            await pool.query('update teachers set fullname=$1 where id=$2', [fullname, teacherId])
        }
        if(phone){
            await pool.query('update teachers set phone=$1 where id=$2', [phone, teacherId])
        }
        if(password){
            const hashPassword = await argon.hash(password)
            await pool.query('update teachers set password=$1 where id=$2', [hashPassword, teacherId])
        }
        if(job){
            await pool.query('update teachers set job=$1 where id=$2', [job, teacherId])
        }
        if(experience){
            await pool.query('update teachers set experience=$1 where id=$2', [experience, teacherId])
        }
        if(description){
            await pool.query('update teachers set description=$1 where id=$2', [description, teacherId])
        }
        if(photo){
            await pool.query('update teachers set photo=$1 where id=$2', [photo, teacherId])
        }

        return {
            status: 200,
            message: "Teacher updated successfully!"
        }
    }

    async deleteTeacher(req,res){
        const { teacherId } = req.params

        const existTeacher = await pool.query('select * from teachers where id=$1', [teacherId])

        if (!existTeacher.rows.length) {
            return {
                status: 404,
                message: "Teacher not founded!"
            }
        }

        await pool.query('delete from teachers where id=$1', [teacherId])

        return {
            status: 200,
            message: "Teacher deleted successfully!"
        }
    }
}

const teacherService = new TeachersServices

export default teacherService