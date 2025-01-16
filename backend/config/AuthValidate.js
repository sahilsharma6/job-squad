import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export const hashedPassword =async (password)=> await bcrypt.hash(password, 12);
export const isMatch =async(password,hashPassword)=> await bcrypt.compare(password, hashPassword);

export const JwtEncryption =  (id,role)=>{
    sign({ userId: id,role }, process.env.JWT, { expiresIn: '24h' });
}