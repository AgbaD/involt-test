import { defineStore } from 'pinia'
// import axiosClient from './util/axios';
import axios from 'axios';

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
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
            const { data } = await instance.post('/auth/register', user);
            this.user.data = data.data.profile;
            return data;
        },
        async login(user) {
            const { data } = await instance.post('auth/login', user);
            const token = data.data.token
            this.user.data = data.data.profile;
            this.user.token = token;
            localStorage.setItem( 'token', token)
            return data;
        },
        async getInvoices(code) {
            const { data } = await instance.get(`invoice/all/${code.code}`, {
                headers: {
                    Authorization: `Bearer ${this.user.token}`
                }
            })
            return data
        },
        logout() {
            this.user.token = null
            this.user.data = {}
            localStorage.removeItem( 'token')
        },
    },
})