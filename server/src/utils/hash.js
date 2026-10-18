import bcrypt from "bcryptjs"


export const hash  = async (palinText)=>{
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(palinText, salt)

    return hashed
}

export const compare = async(hashed, palinText)=>{
   return await bcrypt.compare(palinText, hashed)
}





