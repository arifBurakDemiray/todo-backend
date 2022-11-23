
import bcrypt from 'bcrypt'

export async function encryptPassword(password) {

    return bcrypt
        .hash(password,10)
        .then(hashedPassword => {
            return hashedPassword
        })
 };
 

 export async function comparePassword(plainPass, hashword) {

    return bcrypt
        .compare(plainPass,hashword)
        .then(matched =>{
            return matched
        })
 };