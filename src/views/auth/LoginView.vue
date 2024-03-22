<template>
  <div>
    <section
      class="border-red-500 bg-gray-200 min-h-screen w-screen flex items-center justify-center"
    >
      <div class="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl">
        <div class="px-5">
          <h2 class="text-2xl font-bold text-[#002D74]">Login</h2>
          <form class="mt-6" action="#" @submit="login">
            <div>
              <label class="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email Address"
                autocomplete="email"
                required=""
                v-model="user.email"
                class="w-full px-4 py-3 rounded-lg bg-gray-200 text-gray-600 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div class="mt-4">
              <label class="block text-gray-700">Password</label>
              <input
                name="password"
                type="password"
                required=""
                v-model="user.password"
                placeholder="Enter Password"
                minlength="6"
                class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white text-gray-600 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              class="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
            >
              LogIn
            </button>
          </form>
          <div class="text-sm text-gray-500 flex justify-between items-center mt-3">
            <p>If you don't have an account...</p>
            <a
              class="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400"
              href="/register"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from '@/stores'
import { ref } from 'vue'

const router = useRouter()
const store = useStore()

const user = {
  email: '',
  password: ''
}
let loading = ref(false)

function login(e) {
  e.preventDefault()

  loading.value = true
  store
    .login(user)
    .then(() => {
      loading.value = false
      router.push({
        name: 'dashboard'
      })
    })
    .catch((err) => {
      loading.value = false
      console.log(err)
    })
}
</script>
