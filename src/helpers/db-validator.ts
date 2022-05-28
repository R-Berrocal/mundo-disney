import { Character,Genre,User } from "../models"

export const emailExist = async(email:string)=>{
    const emailExist= await User.findOne({where:{email}})
    if(emailExist){
        throw new Error(`the email: ${email} is already in db`)
    }
}
export const genreExist = async(name:string)=>{
    const genreExist= await Genre.findOne({where:{name}})
    if(genreExist){
        throw new Error(`the genre: ${name} is already in db`)
    }
}

