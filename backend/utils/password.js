import bcrypt from 'bcrypt' ;


export const hashPassword = async(password) => {
    
    return await bcrypt.hash(password,10)
}


export const comparePassword = async(password, hashedPassword) => {
    console.log(password, hashedPassword)
    if (!password || !hashedPassword) {
        throw new Error('Both password and hashedPassword are required');
    }
    return await bcrypt.compare(password, hashedPassword)
}