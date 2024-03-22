<template>
    <div class="flex -space-x-1 overflow-hidden">
    <button
      @click="getInvoices"
      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 my-3 border border-blue-500 hover:border-transparent rounded"
    >
        Get Invoices FE
    </button>
    </div>
  </template>
  
<script setup>

import { useRouter } from 'vue-router'
import { useStore } from '@/stores'

const store = useStore()
const router = useRouter()

function getInvoices(e) {
    e.preventDefault()
    store.getXeroInvoicesFE().then(() => {
        router.push({
        name: 'dashboard'
        })
    })
}
</script>
  