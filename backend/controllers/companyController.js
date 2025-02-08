import express from 'express'
import Company from '../models/Company.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import fs from 'fs';
import path from 'path';

export const signUp = async (req, res) => {

    try{
        const {companyName,companyDescription ,companyWebsite ,contactPersonName,contactPersonProfile,  contactPersonEmail,password,contactPersonPhone} = req.body;
           if(!companyName || !companyDescription || !contactPersonName || !  contactPersonEmail || !password){
               return res.status(400).json({message: 'All fields are required'})
           }

            const images = req.files.map(file => file.path);
         const companyExist = await Company.findOne({contactPersonEmail});
            if(companyExist){
                return res.status(400).json({message: 'Company already exists with this email'})
            }


            const hashedPassword = await bcrypt.hash(password, 12);


           const company =  new Company({
               companyName,
               companyLogo: images[0],
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

        const token = jwt.sign({userId: company._id, role: company.role }, process.env.JWT, {expiresIn: '24h'});
       
        res.cookie('token', token, {
            httpOnly: process.env.NODE_ENV === 'production',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 36000000, 
            sameSite: 'Lax', 
          });
          company.password = undefined;

     const companyData = {
        id: company._id,
        role: company.role,
        isValide: company.isValide
    }
    
    const encodedData = Buffer.from(JSON.stringify(companyData)).toString('base64');
    res.cookie('company', encodedData, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 36000000,
      sameSite: 'Lax',
    });

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
        res.clearCookie('company');
        res.status(200).json({message: 'Signout successfully'})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: 'Internal server error'})
    }
};



export const getCompany = async (req, res) => {
    try{
        const company = await Company.findById(req.user.userId);
        if(!company){
            return res.status(400).json({message: 'Company not found'})
        }
        res.status(200).json({company})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: 'Internal server error'})
    }
};

export const updateCompany = async (req, res) => {
     try{
        const id = req.params.id;
        const {companyName,companyDescription ,companyWebsite ,contactPersonName,contactPersonProfile,  contactPersonEmail,contactPersonPhone} = req.body;
        
        const images = req.files.map(file => file.path);
        const company = await Company.findById(id);
        if(!company){
            return res.status(400).json({message: 'Company not found'})
        }

        company.companyName = companyName;
        company.companyDescription = companyDescription;
        company.companyWebsite = companyWebsite;
        company.contactPersonName = contactPersonName;
        company.contactPersonProfile = contactPersonProfile;
        company.contactPersonEmail = contactPersonEmail;
        company.contactPersonPhone = contactPersonPhone;
        if(images.length !== 0){
            company.companyLogo = images[0];
        }
        await company.save();
        res.status(200).json({company})

     }
        catch(err){
            console.log(err)
            res.status(500).json({message: 'Internal server error'})
        }
};


export const deleteCompany = async (req, res) => {
    try{
        const id = req.params.id;
        const company = await Company.findById(id);
        if(!company){
            return res.status(400).json({message: 'Company not found'})
        }
        await company.delete();
        res.status(200).json({message: 'Company deleted successfully'})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: 'Internal server error'})
    }
};


export const getCompanyById = async (req, res) => {
    try{
        const id = req.params.id;
        const company = await Company.findById(id);
        if(!company){
            return res.status(400).json({message: 'Company not found'})
        }
        res.status(200).json({company})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: 'Internal server error'})
    }
};


export const getValidCompanies = async (req, res) => {
    try{
        const companies = await Company.find({isValide: true});
        res.status(200).json({companies})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: 'Internal server error'})
    }
};




// for admin
export const getAllCompanies = async (req, res) => {
    try{
        const companies = await Company.find();
        res.status(200).json({companies})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: 'Internal server error'})
    }
};


export const approveCompany = async (req, res) => {
    try{
        const id = req.params.id;
        const company = await Company.findById(id);
        if(!company){
            return res.status(400).json({message: 'Company not found'})
        }
        company.isValide = true;
        await company.save();
        res.status(200).json({message: 'Company approved successfully'})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: 'Internal server error'})
    }
}




