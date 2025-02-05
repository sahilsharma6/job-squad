import express from 'express'
import Applicant from '../models/Applicant.js'
import Address from '../models/Address.js'
import Education from '../models/Education.js'
import Experience from '../models/Experience.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library';
import path from 'path';
import fs from 'fs';

export const signUp = async (req, res) => {

    try{
       const {firstName, lastName,phoneNo, email, password} = req.body;
        if(!firstName || !email || !password || !phoneNo){
            return res.status(400).json({message: 'All fields are required'})
        }
        const userExist = await Applicant.findOne({ email });
        if(userExist){
            return res.status(400).json({message: 'User already exists with this email'});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new Applicant({ firstName, lastName, phoneNo, email, password: hashedPassword, role: 'applicant' });
        await user.save();

        res.status(200).json({message: 'User registered'});
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: 'Internal server error'})
    }
}

export const signIn = async (req, res) => {
        try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: 'All fields are required'});
        }
        const user = await Applicant.findOne({ email });
        if(!user){
            return res.status(400).json({message: 'User not found'});
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: 'Invalid credentials'});
        }
        const token = jwt.sign({userId: user._id ,role: user.role}, process.env.JWT, { expiresIn: '1h' });
       
        res.cookie('token', token, {
            httpOnly: process.env.NODE_ENV === 'production',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 36000000, 
            sameSite: 'Lax', 
          });


         const encodeddata = Buffer.from(JSON.stringify({id: user._id, role: user.role})).toString('base64');
         
            res.cookie('user', encodeddata, {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 36000000,
                sameSite: 'Lax',
            });

          user.password = undefined;
          res.status(200).json({  success: true ,message: "Login successful.",  token, user});
        }

        catch(err){
            console.log(err)
            res.status(500).json({message: 'Internal server error'})
        }
    }


    export const request = async (req, res) => {

        try{
              
        res.header("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
        res.header("Access-Control-Allow-Credentials", 'true');
        res.header("Referrer-Policy","no-referrer-when-downgrade");
        const redirectURL = `${process.env.BASE_URL}/api/v1/user/googlelogin`;
      
        const oAuth2Client = new OAuth2Client(
          process.env.CLIENT_ID,
          process.env.CLIENT_SECRET,
            redirectURL
          );
      
          // Generate the url that will be used for the consent dialog.
          const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/userinfo.profile  openid  email',
            prompt: 'consent'
          });
      
          res.json({url:authorizeUrl})
        }
        catch(err){
            console.log(err)
            res.status(500).json({message: 'Internal server error'})
        }
      
      }

export const googleSignIn = async (req, res) => {
    try{
        const code = req.query.code;
        const redirectURL = `${process.env.BASE_URL}/api/v1/user/googlelogin`;
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectURL
          );
        const r =  await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(r.tokens);
        const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${oAuth2Client.credentials.access_token}`);
        console.log(response);
        const data = await response.json();

        console.log(data);

        const { email, given_name, family_name } = data;
        const userExist = await Applicant.findOne({ email });
        if(userExist){
            const token = jwt.sign({id: userExist._id ,role: userExist.role}, process.env.JWT, { expiresIn: '1h' });
            res.cookie('token', token, {
                httpOnly: process.env.NODE_ENV === 'production',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 36000000, 
                sameSite: 'Lax', 
              });
            userExist.password = undefined;
            return res.status(200).json({  success: true ,message: "Login successful.",  token, user: userExist});
        }

        const user = await Applicant({ email, firstName: given_name, lastName: family_name, role: 'applicant' });
        await user.save();
        const token = jwt.sign({userId: user._id ,role: user.role}, process.env.JWT, { expiresIn: '1h' });


        res.cookie('token', token, {
            httpOnly: process.env.NODE_ENV === 'production',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 36000000, 
            sameSite: 'Lax', 
          });

        const encodeddata = Buffer.from(JSON.stringify({id: user._id, role: user.role})).toString('base64');  
        res.cookie('user', encodeddata, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 36000000,
            sameSite: 'Lax',
        }); 
            res.status(200).redirect(`${process.env.CLIENT_URL}`);

    }
    catch(err){
        console.log(err)
        res.status(500).json({message: 'Internal server error'})
    }
}

 export const signOut = async (req, res) => {
        try{
            res.clearCookie('token');
            res.clearCookie('user');
            res.status(200).json({message: 'Signout successfully'})
        }
        catch(err){
            console.log(err)
            res.status(500).json({message: 'Internal server error'})
        }
    };


    export const setAddress = async (req, res) => {
        try {
            const {type , location, city, state, country, zipCode} = req.body;
            if( !type || !city || !state || !country || !zipCode){
                return res.status(400).json({message: 'All fields are required'});
            }
            const user = req.user;
            const address = new Address({applicantId: user.userId, type, location, city, state, country, zipCode});
            await address.save();
            res.status(200).json({message: 'Address added successfully'});
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: 'Internal server error'});
        }
    }

    export const getAddress = async (req, res) => {
        try{
            const user = req.user;
            const address = await Address.find({applicantId: user.userId});
            res.status(200).json({address});
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: 'Internal server error'});
        }
    }


    export const updateAddress = async (req, res) => {
        try{
            const {type , location, city, state, country, zipCode} = req.body;
            if( !type || !city || !state || !country || !zipCode){
                return res.status(400).json({message: 'All fields are required'});
            }
            const user = req.user;
            const address = await Address.findOneAndUpdate({applicantId: user.userId}, {type, location, city, state, country, zipCode});
            res.status(200).json({message: 'Address updated successfully'});
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: 'Internal server error'});
        }
    }

    export const deleteAddress = async (req, res) => {
        try{
            const user = req.user;
            const address = await Address.findOneAndDelete({applicantId: user.userId});
            res.status(200).json({message: 'Address deleted successfully'});
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: 'Internal server error'});
        }
    }

    export const addExperience = async (req, res) => {
        try {
            const {
                companyName,
                jobTitle,
                startingDate,
                endingDate,
                jobDescription,
                jobRole,
                currentlyWorking
            } = req.body;
    
            // Validate required fields
            if (!companyName || !startingDate  || !jobDescription || !jobRole || !jobTitle ) {
                return res.status(400).json({ message: 'Required fields are missing' });
            }
    
           
            const applicantId = req.user.userId; 
            if (!applicantId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
    
            
            const newExperience = new Experience({
                applicantId,
                companyName,
                jobTitle,
                startingDate,
                endingDate,
                jobDescription,
                jobRole,
                currentlyWorking
            });
    
            await newExperience.save();
    
            res.status(201).json({ message: 'Experience added successfully', experience: newExperience });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    };
    
    export const updateExperience = async (req, res) => {
        try {
            const { id } = req.params; 
           const updates = req.body;
    
            
            const experience = await Experience.findById(id);
            if (!experience) {
                return res.status(404).json({ message: 'Experience not found' });
            }
    
            Object.assign(experience, updates);
            await experience.save();
    
            res.status(200).json({ message: 'Experience updated successfully', experience });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    };
    

    export const deleteExperience = async (req, res) => {
        try {
            const { id } = req.params; 
    
            const experience = await Experience.findById(id);
            if (!experience) {
                return res.status(404).json({ message: 'Experience not found' });
            }

            await experience.remove();
    
            res.status(200).json({ message: 'Experience deleted successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    export const getExperience = async (req, res) => {
        try {
            const applicantId = req.user.userId;
            if (!applicantId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
    
            const experience = await Experience.find({ applicantId });
    
            res.status(200).json({ experience });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    };



    // Add a new education entry
    export const addEducation = async (req, res) => {
        try {
            const {
                desecondaryame,
                instituteName,
                startingDate,
                endingDate,
                percentage,
                cgpa,
            } = req.body;
    
            if (!desecondaryame || !instituteName || !startingDate || !endingDate) {
                return res.status(400).json({ message: 'Required fields are missing' });
            }
    
            const applicantId = req.user._id;
            if (!applicantId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
    
            const newEducation = new Education({
                applicantId,
                desecondaryame,
                instituteName,
                startingDate,
                endingDate,
                percentage,
                cgpa,
            });
    
            await newEducation.save();
            res.status(201).json({ message: 'Education added successfully', education: newEducation });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    };
    
   // get all education entries

    export const getEducation = async (req, res) => {
        try {
            const applicantId = req.user.userId;
            if (!applicantId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
    
            const education = await Education.find({ applicantId });
    
            res.status(200).json({ education });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    


    // Update an education entry
    export const updateEducation = async (req, res) => {
        try {
            const { id } = req.params;
            const updates = req.body;
    
            const education = await Education.findById(id);
            if (!education) {
                return res.status(404).json({ message: 'Education entry not found' });
            }
    
            if (education.applicantId.toString() !== req.user.userId.toString()) {
                return res.status(403).json({ message: 'Unauthorized to update this entry' });
            }
    
            Object.assign(education, updates);
            await education.save();
    
            res.status(200).json({ message: 'Education updated successfully', education });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    };
    
    // Delete an education entry
    export const deleteEducation = async (req, res) => {
        try {
            const { id } = req.params;
    
            const education = await Education.findById(id);
            if (!education) {
                return res.status(404).json({ message: 'Education entry not found' });
            }
    
            if (education.applicantId.toString() !== req.user.userId.toString()) {
                return res.status(403).json({ message: 'Unauthorized to delete this entry' });
            }
    
            await education.remove();
            res.status(200).json({ message: 'Education entry deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    };


   export const uploadResume = async (req, res) => {
    try {
        const resume = req.file;
        if (!resume) {
            return res.status(400).json({ message: 'Please upload a resume' });
        }
        console.log(req.user);
        const applicantId = req.user.userId;
        if (!applicantId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await Applicant.findById(applicantId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const resumeUrl = resume.path;
        user.resume = resumeUrl;
        await user.save();
        res.status(200).json({ message: 'Resume uploaded successfully' });

    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
} 
    


export const getResume = async (req, res) => {
  try {
    const applicantId = req.params.id;

    if (!applicantId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await Applicant.findById(applicantId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resumePath = user.resume;
    if (!resumePath) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (!fs.existsSync(resumePath)) {
      return res.status(404).json({ message: 'Resume file not found on the server' });
    }

    res.download(resumePath, path.basename(resumePath), (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).json({ message: 'Error downloading the file' });
      }
    });

  } catch (err) {
    console.error('Error fetching resume:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

