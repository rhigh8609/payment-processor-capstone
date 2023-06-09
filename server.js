require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
//the following key is a test key. would need to be replaced before production
const stripe = require('stripe')(process.env.SECRET_KEY_STRIPE);
const nodemailer = require('nodemailer');
const path = require('path')

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
const PORT = process.env.PORT || 3000;

// Configure email transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
            user: 'ryanh@fizzbuzzwebstudios.com',
            pass: process.env.SECRET_KEY_NODEMAILER,
    }
});

app.post('/process_payment', async (req, res) => {
    const { token, name, email, amount } = req.body;

    try {
        // Charge the card 
        const charge = await stripe.charges.create({
            amount: Math.round(amount * 100),
            currency: 'usd',
            source: token,
            description: `Donation to Scottish Rite Scholarship Foundation of Washington - ${name}`
        });

        // Send receipt to donor
        const donorMailOptions = {
            from: 'ryanh@fizzbuzzwebstudios.com',
            to: email,
            subject: 'Donation Receipt - Scottish Rite Scholarship Foundation of Washington',
            text: `Dear ${name},\n\nThank you for your generous donation of $${amount} to the Scottish Rite Scholarship Foundation of Washington. Your support is greatly appreciated.\n\nSincerely,\n\nScottish Rite Scholarship Foundation of Washington`
        };
        await transporter.sendMail(donorMailOptions, (error,info) => {
            if(error){
                console.log('receipt message failed')
                return console.log(error)
            } 
            res.status(200).send({message:"Mail sent", message_id: info.messageId});
        });

        // Notify the Foundation
        const foundationMailOptions = {
            from: 'ryanh@fizzbuzzwebstudios.com',
            to: 'devryanhigh@gmail.com',
            subject: 'New Donation Received',
            text: `A new donation of $${amount} has been received from ${name} (${email}).`
        };
        await transporter.sendMail(foundationMailOptions, (error, info) => {
            if(error){
                console.log('foundation message failed')
                return console.log(error)
            } 
            res.status(200).send({message:"Mail sent", message_id: info.messageId});
        });
        
        res.status(200).send('Payment successful');
    } catch (error) {
        console.error(error);
        res.status(500).send('Payment failed');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});