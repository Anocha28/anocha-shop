import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import {google} from 'googleapis'


dotenv.config()

const CLIENT_ID = process.env.GM_CLIENT_ID
const CLIENT_SECRET = process.env.GM_CLIENT_SECRET
const REDIRECT_URI = process.env.GM_REDIRECT_URI
const REFRESH_TOKEN = process.env.GM_REFRESH_TOKEN


const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
    )
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

const sendEmail = async (email, link) => {
    try {
        
        const accessToken = await oAuth2Client.getAccessToken()
        
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'awebecommerce@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken

            }
        })

        const mailOptions = {
            from: 'awebecommerce@gmail.com',
            to: email,
            subject: 'AWeb Ecommerce password reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account',
            html: `
            Please click on the following link, or paste this into your browser to complete the process.<br><br>
            This link will expire in 15 minutes.<br><br>
            <a href=${link}>reset your password</a>`
        }
        
        const result = await transport.sendMail(mailOptions)   
        console.log(result.response)
    } catch (error) {
        console.log(error)
        return
    }
}

export {sendEmail}