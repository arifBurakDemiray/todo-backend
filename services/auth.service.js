import {generateAccessToken} from './jwt.service.js'
import {comparePassword} from './pwd.service.js'
import { orm } from '../db/db.js'

export async function authenticate(username,password) {

    const maybeUser = await orm.user.findUnique({
        where: {
            email: username,
        },
        select: {
            password: true,
            id: true,
        },
    })

    if(maybeUser && await comparePassword(password,maybeUser.password)){
        return {access_token: generateAccessToken(username),status: 200}
    }

    return {message:'Username or password is wrong',status: 400}
}
