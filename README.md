# FullStack interview assignment for Tokenterminal

The exercise should be relatively fast to complete. We don't expect you to spend more than two days on this assignment. In case you do, please signal that in the project notes. Returning a partial solution is fine.

For this assignment, we are using the same tools, as we use at TokenTerminal.
For the Frontend use Next.js with TypeScript.
And for the API, use express with TypeScript.

Otherwise you have the freedom to choose suitable libraries.

Make sure this project demonstrates good programming practices, and demonstrates your skills.

When evaluating the project we focus on the following
* Meaningful commit history
* Code style. We value code written for other developers. Not a tutorial nor a one-off hack.
* Tests (no need for 100% coverage)
* Code that follows the conventions and paradigms (Modern react, use of typescript with out casting everything to `any`)


To return your homework, push the code the code to the GitHub repository provided. Each candidate is set up with a private repository.

When returning the exercise, mention which features you completed and which are missing. Returning partial solution is OK.


# Exercise

In this exercise we are building an internal dashboard for TokenTerminal.
At the end of this file you will find the API documentation for the API we use.


## Getting started

In this repository you have two folders:

### `./backend`

Backend folder contains the API we are using for the exercise.
On the backend folder, run `npm ci` to install the dependencies.
And to run the API, run `npm start`. Now the API is listening on localhost at port 3001. Run this in a new terminal tab and leave it running when working on the site.

### `./frontend`

The frontend folder contains the Next.js React application that we will be editing.
To install the dependencies, run `npm ci`.

To start the development server, run `npm dev`


# Tasks

## Task 1: Metrics overview (`/overview`)

Use the provided endpoint `http://localhost:3001/projects` (see API docs below) to render a list of projects with price and TVL metrics. Please note that TVL may not be available for some projects.


## Task 2: Project page (`/projects/:projectId`)

Use the projectId from the URL to show only the data for the project.

Use the API endpoint: `http://localhost:3001/projects/:projectId` (see API docs below)


## Task 3: Project data management (`/projects/:projectId`)

For each project, we want to be able to configure warnings that can inform our users in case there is something wrong with the data.

Use the project page created in task 2 and add the following features

a) Show the current warning for the project. Note that there may be no warnings available.
b) Create a warning
c) Clear the warning

Use the API endpoint: `http://localhost:3001/projects/:projectId/warnings` (see API docs below)


## Bonus Task: 4

Make the site look pretty.



# API Documentation

### `GET /projects`

The API returns project name, id, price, and tvl for each available project. 
The API response is in the follow format.

```json
{
  "projects": [
    {
      "name": "0x",
      "projectId": "0x",
      "price": 0.811007,
      "tvl": null
    },
    {
      "name": "1inch",
      "projectId": "1inch",
      "price": 2.66,
      "tvl": 69810236.87849136
    },
    ...
  ]
}
```

### `GET /projects/:projectId`
Returns the data for an individual project, based on the path parameter.

The API response is in the follow format.

```json
{
  "name": "Aave",
  "projectId": "aave",
  "price": 179.34,
  "tvl": 13215023761.476486
}
```

### `GET /projects/:projectId/warnings`
Returns the current warning. Note it may be empty if none is set.

The API response is in the follow format.

```
{
  "title": "string",
  "text": "string",
}
```

### `POST /projects/:projectId/warnings`
To set or update the warning. 

The body is in the same format as the example above.

It returns status 200 when saved successfully, and 500 if some of the keys are missing from the request body.


### `DELETE /projects/:projectId/warnings`

To clear the the warning. The api always returns 200.

