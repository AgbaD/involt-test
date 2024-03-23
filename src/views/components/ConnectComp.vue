<template>
  <div class="flex m-2 overflow-hidden">
    <a
      :href="data.url"
      target="_blank"
      class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
    >
      Connect To Xero With Frontend client
    </a>
    <button
      @click="getUrl"
      type="button"
      class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
    >
      Connect To Xero With Backend
    </button>
  </div>
</template>

<script setup>
const data = {
  url: `${import.meta.env.VITE_XERO_LOGIN_URL}`
}

// import { useRouter } from 'vue-router'
import { useStore } from '@/stores'

const store = useStore()
// const router = useRouter()

function getUrl(e) {
  e.preventDefault()
  store.getXeroAccessUrlBe().then((data) => {
    window.location.href = data.data.url
  })
}
</script>
