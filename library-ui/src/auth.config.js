/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from "@azure/msal-browser";

// This shoud come from your env variables, I added it here to have a clear example
// export const API_URL = 'https://libraryserverlessapim.azure-api.net/libraryserverless-api/' 
// const POLICY_NAME = 'B2C_1_SignUpSignIn';
// const AUTHORITY = 'https://libraryserverless.b2clogin.com/libraryserverless.onmicrosoft.com/B2C_1_SignUpSignIn';
// const DOMAIN = 'https://libraryserverless.b2clogin.com';
// const REDIRECT_URL='https://libraryserverlessacc.z13.web.core.windows.net/';
// const CLIENT_ID = '42a04ebb-e86d-4040-8d93-e200dde9724b'

const POLICY_NAME = '';
const AUTHORITY = '';
const DOMAIN = '';
const REDIRECT_URL='';
const CLIENT_ID = '' 
export const API_URL = ''

/**
 * Enter here the user flows and custom policies for your B2C application
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
export const b2cPolicies = {
  names: {
      signUpSignIn: POLICY_NAME
  },
  authorities: {
      signUpSignIn: {
          authority: AUTHORITY
      }
  },
  authorityDomain: DOMAIN
}
// https://libarytenantb2c.b2clogin.com/libarytenantb2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_SignUpSignIn&client_id=4df00e5e-4cb4-4877-b196-c0a75f44ead7&nonce=defaultNonce&redirect_uri=https%3A%2F%2Flibrarystacc.z13.web.core.windows.net%2F&scope=openid&response_type=id_token&prompt=login
/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */
export const msalConfig = {
    auth: {
        clientId: CLIENT_ID, // This is the ONLY mandatory field that you need to supply.
        authority: b2cPolicies.authorities.signUpSignIn.authority, // Choose SUSI as your default authority.
        knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
        redirectUri: REDIRECT_URL, // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
        postLogoutRedirectUri: '/', // Indicates the page to navigate after logout.
        navigateToLoginRequestUrl: true, // If "true", will navigate back to the original request location before processing the auth code response.
    },
    cache: {
        cacheLocation: 'sessionStorage', // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};

export const scopes = [
    CLIENT_ID 
]

export const loginRequest = {
    scopes
}