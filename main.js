// My solo project will npm install node-fetch eventually, this is for API requests and responses on the server

const schwabApi = require('schwab-api') //  Not needed yet, imports schwab-api library

const base64 = require('base-64') // used for encoding key and secret in the headers

const axios = require('axios') // for our http requests (api token request here)


// Environment Variables for API key, secret and callback

SCHWA_APP_KEY=noneYaBiz

SCWHA_SECRET=noneYaBiz

CALLBACK_URL = "https://127.0.0.1" // Local host equivalent

// authUrl makes the authentication URL for the schwab api using our variables above

const authUrl = `https://api.schwabapi.com/v1/oauth/authorize?client_id=${SCHWA_APP_KEY}&redirect_uri=${CALLBACK_URL}`

// log the authentication url so we can click on it for auth purposes

console.log("Click for authentication purposes", `${authUrl}`)

// prompt to enter authentication url

const returnedLink = prompt(`Please enter the authentication URL here`)

// extracts our auth code from the returned url, we need to
// use substring and index of to get at the url correctly 
// though, the code below makes sure we are not using
// the "code=" part due to the +5 (ignoring first five characters)
// meanwhile the %40 represents the end of the code (encoding for the @ symbol)

const code = `${returnedLink.substring(returnedLink.indexOf('code=') + 5, returnedLink.indexOf('%40'))}`

// the object below defines headers for API request.
// it has the authorization header with the API key
// and secret encoded using base 64, which we imported above

const headers = {
    "Authorization": `Basic ${base64.encode(`${appKey}:${appSecret}`)}`,
    'Content-Type': 'application/x-www-form-urlencoded'
}

// this object has our data to be sent in the API request
// it includes the grand type, code, and redirect URL

// headers contains the authorization header with encoded
// app key and secret

// meanwhile grant_type specifies type of OAuth grant
// thats used, here it is authorization code
// code here is the auth code extracted from the url
// once the user grants access
// redirect brings us back to the callback url after
// an authorization.

const data = {
  grant_type: 'authorization_code',
  code: code,
  redirect_uri: https://127.0.0.1
}

// axios post sends a post request to the schwab api url below,
// this post request has the headers and data in it

// the response from our axios post gets stored in a 
// variable named response

// we then console log it to see what we are getting
// and then the response object is returned from
// the getToken function so we can use it
// async allows us to use await and make sure 
// promises follow through or are rejected before
// we proceed forward

async function getToken() {
  try {
    const response = await axios.post('https://api.schwabapi.com/v1/oauth/token', new URLSearchParams(data), { headers: headers })
    console.log(response.data)
    return response; // Stores our response in response variable yo
  } 
  catch (error) {
    console.error(error)
  }
}

// call our function and handle the response
getToken().then(response => {
  console.log('response data is:', response.data)
  // verify response data, we can use response.data if it is correct
})

// OAuth not finished yet, but getting closer
