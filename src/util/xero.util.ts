import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { XeroClient } from 'xero-node';
import axios from 'axios';

@Injectable()
export class XeroService {
  constructor(private config: ConfigService) {}

  clientId = this.config.get('XERO_CLIENT_ID');
  clientSecret = this.config.get('XERO_CLIENT_SECRET');
  redirectUri = this.config.get('XERO_REDIRECT_URI');

  // sdk
  xero = new XeroClient({
    clientId: this.clientId,
    clientSecret: this.clientSecret,
    redirectUris: [`${this.redirectUri}`],
    scopes: 'openid profile email accounting.transactions offline_access'.split(
      ' ',
    ),
    httpTimeout: 3000,
  });

  async getAccessUrlSdk() {
    const consentUrl = await this.xero.buildConsentUrl();
    return consentUrl;
  }

  // api
  async getAccessToken(code: string) {
    try {
      const encoded = btoa(this.clientId + ':' + this.clientSecret);
      const params = new URLSearchParams();
      params.append('grant_type', 'authorization_code');
      params.append('redirect_uri', this.redirectUri);
      params.append('code', code);
      const instance = axios.create({
        baseURL: 'https://identity.xero.com/',
        timeout: 5000,
        headers: {
          Authorization: `Basic ${encoded}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { data, status } = await instance.post('connect/token', params);
      console.log(data);
      console.log(status);
      if (status === 200) return data?.access_token;
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
