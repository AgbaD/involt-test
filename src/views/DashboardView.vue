<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">Dashboard</h3>
    <div v-if="connected">
      <InfoComp />
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

const store = useStore()
const connected = store.dashboard.connected
</script>
