<template>
  <div class="flex -space-x-1 overflow-hidden">
    <a
      :href="data.url"
      target="_blank"
      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 my-3 border border-blue-500 hover:border-transparent rounded"
    >
      Connect To Xero With Frontend client
    </a>
    <button
      @click="getUrl"
      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 my-3 border border-blue-500 hover:border-transparent rounded"
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
    window.location.href = data.data.url;
  })
}
</script>
