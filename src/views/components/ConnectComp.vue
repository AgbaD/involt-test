<template>
  <div class="flex -space-x-1 overflow-hidden">
    <a
      :href="data.url"
      target="_blank"
      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 my-3 border border-blue-500 hover:border-transparent rounded"
    >
      Connect To Xero * Get Invoices
    </a>
  </div>
</template>

<script setup>
const data = {
  url: `${import.meta.env.VITE_XERO_URL}`
}
</script>
