# feathr-whoami-2021

To complete this work assignment I decided to use Node and Express along side MongoDB. Below I will provide instructions for installing the necessary dependencies.

This project requires Node and MongoDB be installed on your machines.

To start mongo you will need to run this command

`brew services start mongodb-community@5.0`

Then once the files have been downloaded in the whoami directory to install all dependencies use

`npm install`

Alternatively you could install the depenedencies like so

`npm i bcrypt ejs express express-session mongoose`

After the dependencies have been installed simply run in your terminal

`node index.js`

Once the app and mongo are being served
In your browser enter this url

`localhost:3000`

From there you will be able to navigate the rest of the app.

to navigate directly to signup page use this url

`localhost:3000/signup`

if you already have a user you can navigate straight to the login page with this url

`localhost:3000/login`
