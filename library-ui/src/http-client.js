import axios from "axios";
import { msalInstance } from './index';
import { scopes, API_URL } from "./auth.config";

export const httpClient = axios.create({
  baseURL: API_URL
});

async function getToken() {
  const currentAccount = msalInstance.getActiveAccount();
  const accessTokenRequest = {
    scopes,
    account: currentAccount || undefined,
  };

  const accessTokenResponse = await msalInstance.acquireTokenSilent(accessTokenRequest);

  return `Bearer ${accessTokenResponse.accessToken}`;
}

httpClient.interceptors.request.use(async (config) => {
  const bearer = await getToken();
  config.headers.Authorization = bearer;

  return config;
});