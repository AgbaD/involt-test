import { defineStore } from 'pinia'
// import axiosClient from './util/axios';
import axios from 'axios';

const apiInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    timeout: 5000,
});

// const xeroAuthInstance = axios.create({
//     baseURL: `${import.meta.env.VITE_XERO_BASE_URL}`,
//     timeout: 5000,
// });
  
// const clientId = `${import.meta.env.VITE_XERO_CLIENT_ID}`
// const clientSecret = `${import.meta.env.VITE_XERO_CLIENT_SECRET}`
// const redirect_uri = `${import.meta.env.VITE_XERO_REDIRECT_URL}`

export const useStore = defineStore('store', {
    state: () => ({
        user: {
            data: {},
            token: localStorage.getItem("token"),
        },
        dashboard: {
            loading: false,
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
            const { data } = await apiInstance.post('/auth/register', user);
            this.user.data = data.data.profile;
            return data;
        },
        async login(user) {
            const { data } = await apiInstance.post('auth/login', user);
            const token = data.data.token
            this.user.data = data.data.profile;
            this.user.token = token;
            localStorage.setItem( 'token', token)
            return data;
        },
        async getInvoices(code) {
            const { data } = await apiInstance.get(`invoice/all/${code.code}`, {
                headers: {
                    Authorization: `Bearer ${this.user.token}`
                }
            })
            return data
            // try {
            //     const encoded = btoa(clientId + ':' + clientSecret);
            //     const { status, data } = await xeroAuthInstance.post('connect/token', {
            //         grant_type: 'authorization_code',
            //         redirect_uri: JSON.stringify(redirect_uri),
            //         code: code,
            //     }, { headers: {
            //         Authorization: `Basic ${encoded}`,
            //         'Content-Type': 'application/x-www-form-urlencoded',
            //     }})
            //     console.log(data)
            //     console.log(status)
            //     return data  
            // } catch (error) {
            //     console.log(error)
            // }          
        },
        logout() {
            this.user.token = null
            this.user.data = {}
            localStorage.removeItem( 'token')
        },
    },
})