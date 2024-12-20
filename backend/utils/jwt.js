import jwt from 'jsonwebtoken'

export const generateToken = (payload) => {
    const secretString = process.env.JWT_SECRET_STRING
    return jwt.sign(payload , secretString , {expiresIn : '20D'})
}