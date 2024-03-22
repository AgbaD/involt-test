import { defineStore } from 'pinia'
// import axiosClient from './util/axios';
import axios from 'axios';

const apiInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    timeout: 5000,
});

const xero_client_id = `${import.meta.env.VITE_XERO_CLIENT_ID}`
const xero_client_secret = `${import.meta.env.VITE_XERO_CLIENT_SECRET}`
const xero_redirect_uri = `${import.meta.env.VITE_XERO_REDIRECT_URL}`

const xeroAuthInstance = axios.create({
    baseURL: `${import.meta.env.VITE_XERO_BASE_AUTH_URL}`,
    timeout: 5000,
});

const xeroInstance = axios.create({
    baseURL: `${import.meta.env.VITE_XERO_BASE_API_URL}`,
    timeout: 5000,
});

export const useStore = defineStore('store', {
    state: () => ({
        user: {
            data: {},
            token: localStorage.getItem("token"),
        },
        dashboard: {
            loading: false,
            xeroAccessToken: '',
            connected: false,
            data: {}
        },
        invoices: {
            loading: false,
            data: []
        },
        currentInvoice: {
            data: {},
            loading: false,
        },
    }),
    getters: {},
    actions: {
        async register(user) {
            try {
                const { data } = await apiInstance.post('/auth/register', user);
                this.user.data = data.data.profile;
                return data;
            } catch (error) {
                console.log(error);
            }
        },
        async login(user) {
            try {
                const { data } = await apiInstance.post('auth/login', user);
                const token = data.data.token
                this.user.data = data.data.profile;
                this.user.token = token;
                localStorage.setItem('token', token)
                return data;
            } catch (error) {
                console.log(error);
            }
        },
        logout() {
            this.user.token = null
            this.user.data = {}
            localStorage.removeItem('token')
        },
        // backend client
        async getXeroAccessUrlBe() {
            try {
                const { data } = await apiInstance.get('auth/xero/url')
                return data
            } catch (err) {
                console.log(err)
            }
        },
        async getXeroAccessTokenBe(code) {
            try {
                const { data } = await apiInstance.get(`invoice/${code}`, {
                    headers: {
                        Authorization: `Bearer ${this.user.token}`
                    }
                });
                return data;
            } catch (error) {
                console.log(error);
            }
        },
        // frontend client
        async getXeroAccessTokenFE(code) {
            try {
                const encoded = btoa(xero_client_id + ':' + xero_client_secret);
                const params = new URLSearchParams();
                params.append('grant_type', 'authorization_code');
                params.append('redirect_uri', xero_redirect_uri);
                params.append('code', code);
                const { data } = await xeroAuthInstance.post('connect/token', params, {
                    headers: {
                        Authorization: `Basic ${encoded}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                this.dashboard.xeroAccessToken = data.access_token
                this.dashboard.connected = true
                return data
            } catch (error) {
                console.log(error);
            }
        },
        async getXeroInvoicesFE() {
            try {
                const access_token = this.dashboard.xeroAccessToken
                const { data } = await xeroInstance.get('api.xro/2.0/Invoices', {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        Accept: 'application/json',
                    }
                })
                console.log(data)
                return data
            } catch (error) {
                console.log(error);
            }
        },
    },
})