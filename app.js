const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('your_stripe_secret_key');
const nodemailer = require('nodemailer');
const path = require('path')

const app = express();
app.use(bodyParser.json());

app.post('/process_payment', async (req, res) => {
    const { token, name, email, amount } = req.body;

    try {
        // Charge the card
        /*const charge = await stripe.charges.create({
            amount: Math.round(amount * 100),
            currency: 'usd',
            source: token,
            description: `Donation to Scottish Rite Scholarship Foundation of Washington - ${name}`
        });*/

        // Configure email transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ryantenoriohigh@gmail.com',
                pass: 'Guamy,1080'
            }
        });

        // Send receipt to donor
        const donorMailOptions = {
            from: 'ryantenoriohigh@gmail.com',
            to: email,
            subject: 'Donation Receipt - Scottish Rite Scholarship Foundation of Washington',
            text: `Dear ${name},\n\nThank you for your generous donation of $${amount} to the Scottish Rite Scholarship Foundation of Washington. Your support is greatly appreciated.\n\nSincerely,\n\nScottish Rite Scholarship Foundation of Washington`
        };
        await transporter.sendMail(donorMailOptions);

        // Notify the Foundation
        const foundationMailOptions = {
            from: 'ryantenoriohigh@gmail.com',
            to: 'ryantenoriohigh@gmail.com',
            subject: 'New Donation Received',
            text: `A new donation of $${amount} has been received from ${name} (${email}).`
        };
        await transporter.sendMail(foundationMailOptions);

        res.status(200).send('Payment successful');
    } catch (error) {
        console.error(error);
        res.status(500).send('Payment failed');
    }
});


app.use(express.static("public"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});