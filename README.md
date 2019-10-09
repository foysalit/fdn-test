### Foundation technical test

This is a two part test - one practical and one theoretical.

We suggest spending no more than two hours on this in total. Please do not spend an excessive amount of time on a "full" technical solution.

## Part one

At Foundation one of our core needs is data storage and schema management. Implement a simple demonstration of this requirement inside the given scaffold, meeting the following requirements:

- I can model a simple data structure
- I can create and edit instances of that data structure

One example of a common data structure that we need to model is a "User".

Once you're happy with your solution, please note areas where you feel you would like to improve both your solution and the provided scaffold, based on functional needs, code quality, and maintenance concerns. This can be documented in a file named QUALITY.md.

## Part two

Describe, at a high level, how you would implement each of the three pillars of Foundation:

- Schema modelling and data storage
- Custom page creation
- Simple user-editable workflows

We're looking for your insights into possible requirements, architectural and technical concerns, and any other areas you think are important to highlight.

This can be provided in a file named OVERVIEW.md.

## Getting started

You're going to need to use yarn to work with the provided scaffold, since we are using yarn's "workspaces" functionality.

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

The backend API will also run, and the API will automatically reload if any changes are made.

### `yarn lint`

Run eslint manually, and see the output. We're using the airbnb style guide.

### Adding packages

To add an npm package to one of the apps in "/packages" you will need to use yarn's workspace package management.

For example, to add the package `uuid` to the `fdn-test-api` app, you can run:

`yarn workspace fdn-test-api add uuid`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
