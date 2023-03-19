# Restaurants Nearby

This project allows users to get to know the restaurants that surround them.\
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Steps To Run Project Locally

### Install Project Dependencies

In the project directory, run `npm install`.\
This will install all the packages used by the project and their dependencies.

### Get a Google Maps API key

In order to get a Google Maps API key

- Navigate to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project
- Create an API key that can access the following APIs
  - Distance Matrix API
  - Maps JavaScript API
  - Places API

### Create an Environment Variable

In the root directory of the project, create a `.env` file.\
In the `.env` file, assign the <strong>API key</strong> generated to a variable `REACT_APP_API_KEY`.

```json
REACT_APP_API_KEY="XXXXXXXXXXXXX"
```

### Spin-Up Development Server

Run `npm start`.

This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

You will now be able to view the <strong>restaurants nearby</strong>.
