import express from 'express'
import Company from '../models/Company.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signUp = async (req, res) => {

    try{
        const {companyName, companyLogo ,companyDescription ,companyWebsite ,contactPersonName,contactPersonProfile,  contactPersonEmail,password,contactPersonPhone} = req.body;
           if(!companyName || !companyDescription || !contactPersonName || !  contactPersonEmail || !password){
               return res.status(400).json({message: 'All fields are required'})
           }
           
         const companyExist = await Company.findOne({contactPersonEmail});
            if(companyExist){
                return res.status(400).json({message: 'Company already exists with this email'})
            }


            const hashedPassword = await bcrypt.hash(password, 12);

           const company =  new Company({
               companyName,
               companyLogo,
               companyDescription,
               companyWebsite,
               contactPersonName,
               contactPersonProfile,
               contactPersonEmail,
               password: hashedPassword,
               contactPersonPhone,
               isValide: false,
                role: 'company'
           });

          await company.save();
        
        res.status(200).json({message: 'Company registered wait for approval'});
    
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: 'Internal server error'})
    }
};


export const signIn = async (req, res) => {

    try{
        const {contactPersonEmail, password} = req.body;
        if(!contactPersonEmail || !password){
            return res.status(400).json({message: 'All fields are required'})
        }
       
        const company = await Company.findOne({contactPersonEmail});
        if(!company){
            return res.status(400).json({message: 'Company not found'})
        }
        const isPasswordCorrect = await bcrypt.compare(password, company.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: 'Invalid credentials'})
        }

        if(!company.isValide){
            return res.status(400).json({message: 'Company not approved yet'})
        }

        const token = jwt.sign({id: company._id, role: company.role}, process.env.JWT, {expiresIn: '24h'});

        res.cookie('token', token, {
            httpOnly: process.env.NODE_ENV === 'production',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 36000000, 
            sameSite: 'Lax', 
          });
          company.password = undefined;
          res.status(200).json({  success: true ,message: "Login successful.",  token, company});
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: 'Internal server error'})
    }
};


export const signOut = async (req, res) => {
    try{
        res.clearCookie('token');
        res.status(200).json({message: 'Signout successfully'})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: 'Internal server error'})
    }
};

