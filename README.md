# DEAL-FINDER

Project Overview

This project automates the process of monitoring and tracking the prices of products on e-commerce websites, specifically targeting Amazon. The system is designed to periodically check the price of a specified product and send an email notification to the user when the price drops below a set threshold.

Tools and Technologies Used

1.Puppeteer: A Node.js library for web scraping and browser automation.
2.Cron: A scheduling tool to run tasks periodically.
3.Nodemailer: A Node.js module for sending emails.


Installation and Setup
1.Clone the Repository:
   git clone <repository_url>
   cd <repository_directory>

2.Install Dependencies:
   npm install puppeteer cron nodemailer          

3.Configure Email Settings:
   A.Open the project file and navigate to the email configuration section.
   B.Replace the email and password fields with your own credentials or use an app-specific password if using Gmail.


System Architecture
1. Configuring the Browser
Initialize a new browser instance using Puppeteer.
Navigate to the specified product URL.

2. Checking the Price
Reload the page and extract the product name and price.
Check if the price has dropped below the specified threshold.
If the price is below the threshold, trigger a notification.

3. Sending Notifications
Send an email notification using Nodemailer if the price drop condition is met.

4. Starting the Tracker
Set up the browser and check the price.
Schedule the checkPrice function to run every 30 seconds using a cron job.


Running the Application
To start the price tracker, run:
   node <script_name>.js
Replace <script_name> with the name of your JavaScript file.

Conclusion
This project showcases the use of web scraping and automation tools to monitor e-commerce product prices and send notifications when prices drop. It can be extended to include more features such as tracking multiple products, storing historical price data, and more sophisticated notification systems.
