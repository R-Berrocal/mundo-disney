import jwt from 'jsonwebtoken';

export const generateToken = (userId:number)=>{
    return new Promise((resolve,reject)=>{
        const payload = {userId};
        jwt.sign(payload,process.env.SECRETORPRIVATEKEY!,{
            expiresIn:"4h"
        },(err,token)=>{
            if(err){
                console.log(err);
                reject(`could not generate token`);
            }else{
                resolve(token);
            }
        })
    })

}
