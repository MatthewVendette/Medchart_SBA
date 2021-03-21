# MedChart SBA

This website was created as a skills-based assessment for MedChart, authored by Matthew Vendette. It's a mock website that allows users to log in and submit their blood work, and view their previous blood work reports. It comes provided with a back-end API to make calls to using Postman

## Installation

Use [npm](https://www.npmjs.com/) to install required packages in the ./client-app directory
```
npm install
```

You must also have [.NET](https://dotnet.microsoft.com/) to run the program.

## Usage

Once required packages are running, run the API in the ./API folder using
```
dotnet watch run
```

With the API running, you can start the client app in the ./client-app folder with
```
npm start
```

Included is a json collection of API calls that you can use to test the API features if you import it in to Postman.

## Accounts

Currently this mock website doesn't have any registration features. To log in, you can use one of the four testing accounts:
 * bob@test.com, pass: Password123
 * frank@test.com, pass: Password123
 * alice@test.com, pass: Password123
 * kim@test.com, pass: Password123

 ## API
 The API currently has these endpoints:
  * GET {{url}}/api/bloodworks : Gets all the bloodworks in the database
  * GET {{url}}/api/bloodworks/<id> : Gets the bloodwork with the specified ID. At this time requires no authentication headers, if I had more time this would be an important change.
  * POST {{url}}/api/bloodworks : Creates a new bloodworks. For ease of testing, doesn't require a UserID, but it will not show up on the client side without one. All other properties are required.
  * PUT {{url}}/api/bloodworks/<id> : Updates a bloodwork with <id> to the values in the new body. For ease of testing, doesn't require a UserID, but it will not show up on the client side without one. All other properties are required.
  * DELETE {{url}}/api/bloodworks/<id> : Deletes a bloodwork with specified ID. At this time requires no authentication headers, if I had more time this would be an important change.
  * POST {{url}}/api/account/login : With an email and password in the body, returns a user's firstname, username, and their token if the email and password validate otherwise 401 unauthorized.
  * POST {{url}}/api/account/register : with a firstname, username, password, and email in the body, registers a new user in the database that can then be used on the clientside. Returns 400 if any of the properties are missing or if the email or username are not unique within the database.
  * GET {{url}}/api/account/ : With a token in the header, returns the firstname and username of the associated user.

 ## Missing features
 There are three user stories I would wish to complete if I had more time:
  * User registration
  * Search functionality
  * ~~Graph functionality for all of a user's reports~~ Squeezed that in with an hour left
  * Any testing at all
