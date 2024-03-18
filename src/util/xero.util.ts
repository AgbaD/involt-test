// import { XeroClient } from 'xero-node';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { XeroClient } from 'xero-node';

@Injectable()
export class XeroService {
  constructor(private config: ConfigService) {}

  xero = new XeroClient({
    clientId: this.config.get('XERO_CLIENT_ID'),
    clientSecret: this.config.get('XERO_CLIENT_SECRET'),
    grantType: 'client_credentials',
    // redirectUris: [`http://localhost:${this.config.get('PORT')}/callback`],
    // scopes: 'openid profile email accounting.transactions offline_access'.split(
    //   ' ',
    // ),
    // state: 'returnPage=my-sweet-dashboard',
    // httpTimeout: 3000,
    // clockTolerance: 10,
  });

  async getTokenSet() {
    const tokenSet = await this.xero.getClientCredentialsToken();
    return tokenSet;
  }
}
