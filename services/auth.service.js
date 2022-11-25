import {generateAccessToken} from './jwt.service.js'
import {comparePassword,encryptPassword} from './pwd.service.js'
import { orm } from '../db/db.js'
import {minuteBetween} from '../util/date.util.js'

export const authService = {
    async authenticate(req) {

        const username = req.body.username
        const password = req.body.password
        const granty_type = req.body.grant_type
        const failResponse = {message:req.__('login_failed'),status: 400}
        if(!granty_type || granty_type !== 'password' ){
            return failResponse
        }
    
        const maybeUser = await orm.user.findFirst({
            where: {
                email: username,
                active: true
            },
            select: {
                password: true,
                id: true,
                last_logged_in: true,
            },
        })
    
        if(!maybeUser){ return failResponse}
        if(minuteBetween(Date.now(),maybeUser.last_logged_in)<=5)  {return {message:req.__('login_recently'),status: 429}}
    
        if(await comparePassword(password,maybeUser.password)){
            await orm.user.update({
                where: {
                    id: maybeUser.id
                },
                data:{
                    last_logged_in: new Date(Date.now())
                }
            })
    
            return {access_token: generateAccessToken(username),status: 200}
        }
    
        return failResponse
    },

    async register(req){

        const username = req.body.email
        const password = await encryptPassword(req.body.password)
        try {
        await orm.user.create({
            data: {
                email: username,
                password: password
            }
        })}
        catch(e) {
            return {message: req.__(e.meta.target), status: 400}
        }

        return {message: req.__('register_new'),status: 201}
    }
}
