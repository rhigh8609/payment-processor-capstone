# payment-processor-capstone
Payment processor prototype made for a Capstone at WCC.
See it deployed at https://payment-processor-capstone.herokuapp.com/

Authors
Ryan High; Github: https://github.com/guamy540


Scottish Rite Scholarship Foundation Donation Portal
The Scottish Rite Scholarship Foundation Donation Portal is a simple Express.js application designed to accept donations via Stripe. The application allows users to enter their donation amount and card details and processes the payment securely via the Stripe API. Please note this app is a prototype, and not a production build.

Features
Accepts donations through Stripe.
Automatically sends receipt to the donor.
Sends a notification to the Foundation on successful donation.
Provides a user-friendly interface for donors.

Getting Started
Follow these instructions to get a copy of this project up and running on your local machine for development and testing purposes.

Prerequisites
The following software must be installed on your machine:

Node.js
NPM
Installation
Clone the repository

bash
Copy code
git clone https://github.com/guamy540/scottish-rite-donation-portal.git
Navigate to the project folder

bash
Copy code
cd scottish-rite-donation-portal
Install dependencies

Copy code
npm install
Create a .env file in the root of the project directory and add the following environment variables:

SECRET_KEY_STRIPE: Your Stripe secret key
SECRET_KEY_NODEMAILER: Your NodeMailer secret key
PORT: The port number where the server will run (optional)
makefile
SECRET_KEY_STRIPE=<your_stripe_secret_key>
SECRET_KEY_NODEMAILER=<your_nodemailer_secret_key>
PORT=3000

Start the server
node server.js
The server will start running at http://localhost:3000 or your specified PORT number.

Built With
Express.js - The web framework used
Stripe - For payment processing
NodeMailer - For sending emails
Bootstrap - For front-end design
