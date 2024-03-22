<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">Dashboard</h3>
    <div v-if="connected">
      <div v-if="invoiceFetched">
        <InfoComp />
      </div>
      <div v-else>
        <InvoicesFetchComp />
      </div>
    </div>
    <div v-else>
      <ConnectComp />
    </div>
  </div>
</template>

<script setup>
import { useStore } from '@/stores'
import InfoComp from './components/InfoComp.vue'
import ConnectComp from './components/ConnectComp.vue'
import InvoicesFetchComp from './components/InvoicesFetchComp.vue'


const store = useStore()
const connected = store.dashboard.connected

const invoices = store.invoices.data
let invoiceFetched = false
if (invoices.length > 1) {
  invoiceFetched = true
}
</script>
