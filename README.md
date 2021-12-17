<p align="center">
  <a href="https://tokenterminal.com">
    <img src="https://github.com/token-terminal/tt-analytics/raw/main/frontend/public/logo.png" height="128">
    <h1 align="center">Token Terminal</h1>
  </a>
</p>


# Full Stack Interview Assignment for Token Terminal

This assignment involves a few tasks to assess your familiarity with tools we often use at Token Terminal, namely Next.js with TypeScript (frontend) and express with TypeScript (API). You are going to be building an internal dashboard for Token Terminal. See the "API documentation" section for details on the API you'll use.

Make sure you showcase your skills and adopt good programming practices. Here are some aspects we find particularly important:

* Meaningful commit history.
* Good code style - we value code written for other developers.
* Code that follows the conventions and paradigms.

Fork this repositoty to get started. Once you are ready to return your homework, push all the code to your fork and email the link to your contact.

We don't expect you to spend more than two days on this assignment. In case you do, please let us know. Returning a partial solution is acceptable. If this is the case, please mention which features are missing. 

### Getting started

This repository contains two directories: `backend` and `frontend`.

#### `./backend`

This contains API you'll use throughout this assignment. Run `npm ci` on this directory to install the required dependencies. To run the API, run `npm start`. The API will be listening on localhost at port 3001. Run this in a separate terminal tab and keep it running when working on the site.

#### `./frontend`

This contains the Next.js React application you'll be editing. Run `npm ci` on this directory to install the required dependencies. To start the development server, run `npm dev`.


# Assignment

## Task 1: Metrics overview (`/overview`)

Use the provided endpoint `http://localhost:3001/projects` (see API docs below) to render a list of projects with price and total value locked (TVL) metrics. Please note that TVL may not be available for some projects.

## Task 2: Metrics summary (`/overview`)

Using the same page, `/overview`, build an summary section. 
We want to show which project has: 

<ol type="a">
  <li>the highest price</li>
  <li>the lowest price</li>
  <li>the highest TVL</li>
  <li>the lowest TVL</li>
</ol>

Use the same `http://localhost:3001/projects` endpoint to list all projects and calculate the numbers from there.


## Task 3: Project page (`/projects/:projectId`)

Use `projectId` from the URL to show only the data for the project. Use the API endpoint: `http://localhost:3001/projects/:projectId` (see API docs below).
You can read more about [dynamic routes with Next.js here](https://nextjs.org/docs/routing/introduction)

## Task 4: Project data management (`/projects/:projectId`)

We want to be able to configure warnings on a project-by-project basis to inform our users if something is wrong with its data.

Start from the project page created in the previous task and implement the following features:

<ol type="a">
  <li>Show the current warning for the project. Note that there may be no warnings available.</li>
  <li>Create a warning</li>
  <li>Clear the warning</li>
</ol>

Use the API endpoint: `http://localhost:3001/projects/:projectId/warnings` (see API docs below)

## Bonus Task: 5

Make the site look pretty. Feel free to use any suitable library for this. 

# API Documentation

### `GET /projects`

The API returns project name, id, price, and TVL for each available project. 

The API response is in the following format (note we're just showing two representative projects):

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
    }
  ]
}
```

#### `GET /projects/:projectId`

Returns the data for an individual project, based on the path parameter.

The API response is in the following format:

```json
{
  "name": "Aave",
  "projectId": "aave",
  "price": 179.34,
  "tvl": 13215023761.476486
}
```

#### `GET /projects/:projectId/warnings`

Returns the current warning. Note that it may be empty if none is set.

The API response is in the following format:

```json
{
  "title": "string",
  "text": "string",
}
```

#### `POST /projects/:projectId/warnings`

Sets or updates the warning. 

The body is in the same format as the example above.

Returns status 200 when saved successfully, and 400 if some of the keys are missing from the request body.

#### `DELETE /projects/:projectId/warnings`

Clears the warning. The API always returns 200.
