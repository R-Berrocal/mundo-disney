import User from "../models/user"

export const emailExist = async(email:string)=>{
    const emailExist= await User.findOne({where:{email}})
    if(emailExist){
        throw new Error(`the email: ${email} is already in db`)
    }
}