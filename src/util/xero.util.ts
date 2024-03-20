// import { XeroClient } from 'xero-node';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { XeroClient } from 'xero-node';
import axios from 'axios';

@Injectable()
export class XeroService {
  constructor(private config: ConfigService) {}

  clientId = this.config.get('XERO_CLIENT_ID');
  clientSecret = this.config.get('XERO_CLIENT_SECRET');
  redirectUri = 'http://localhost/8080/oauth/callback';

  xero = new XeroClient({
    clientId: this.clientId,
    clientSecret: this.clientSecret,
    grantType: 'client_credentials',
  });

  async getTokenSet() {
    const tokenSet = await this.xero.getClientCredentialsToken();
    return tokenSet;
  }

  async getAccessTokenCC() {
    try {
      const scope = 'accounting.transactions';
      const encoded = btoa(this.clientId + ':' + this.clientSecret);
      const instance = axios.create({
        baseURL: 'https://identity.xero.com/',
        timeout: 5000,
        headers: {
          Authorization: `Basic ${encoded}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { data, status } = await instance.post('connect/token', {
        grant_type: 'client_credentials',
        scope: { scope },
      });
      if (status === 200) return data?.access_token;
      return null;
    } catch (error) {
      return null;
    }
  }

  async getAccessTokenAC(code: string) {
    try {
      const encoded = btoa(this.clientId + ':' + this.clientSecret);
      const instance = axios.create({
        baseURL: 'https://identity.xero.com/',
        timeout: 5000,
        headers: {
          Authorization: `Basic ${encoded}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { data, status } = await instance.post('connect/token', {
        grant_type: 'authorization_code',
        redirect_uri: this.redirectUri,
        code: code,
      });
      if (status === 200) return data?.access_token;
      return null;
    } catch (error) {
      console.log(error.response);
      return null;
    }
  }

  async getInvoices() {
    try {
      const accessToken = await this.getAccessTokenCC();
      const instance = axios.create({
        baseURL: 'https://api.xero.com/',
        timeout: 5000,
        headers: {
          Authorization: ` Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      });
      const { data, status } = await instance.get('api.xro/2.0/Invoices');
      if (status === 200) return data;
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
