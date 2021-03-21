# MedChart SBA

This website was created as a skills-based assessment for MedChart, authored by Matthew Vendette. It's a mock website that allows users to log in and submit their blood work, and view their previous blood work reports. It comes provided with a back-end API to make calls to using Postman

## Installation

Use [npm](https://www.npmjs.com/) to install required packages in the ./client-app directory
```
npm install
```

You must also have [.NET Core](https://dotnet.microsoft.com/) to run the program.

##Usage

Once required packages are running, run the API in the ./API folder using
```
dotnet watch run
```

With the API running, you can start the client app in the ./client-app folder with
```
npm start
```

## Accounts

Currently this mock website doesn't have any registration features. To log in, you can use one of the four testing accounts:
 * bob@test.com, pass: Password123
 * frank@test.com, pass: Password123
 * alice@test.com, pass: Password123
 * kim@test.com, pass: Password123

 ## Missing features
 There are three user stories I would wish to complete out if I had more time:
  * User registration
  * Search functionality
  * Graph functionality for all of a user's reports