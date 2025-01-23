import express from 'express'
import Applicant from '../models/Applicant.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library';


export const SignUp = async (req, res) => {

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

export const SignIn = async (req, res) => {
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


    
    