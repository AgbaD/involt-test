<template>
  <div>
    <section
      class="border-red-500 bg-gray-200 min-h-screen w-screen flex items-center justify-center"
    >
      <div class="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl">
        <div class="px-5">
          <h2 class="text-2xl font-bold text-[#002D74]">Register</h2>
          <form class="mt-6" action="#" @submit="register">
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
                <label class="block text-gray-700">Fullname</label>
                <input
                    type="text"
                    name="fullname"
                    placeholder="Fullname"
                    required=""
                    v-model="user.fullname"
                    minlength="6"
                    class="w-full px-4 py-3 rounded-lg bg-gray-200 text-gray-600 t-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
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

            <div class="mt-4">
              <label class="block text-gray-700">Confirm Password</label>
              <input
                name="password"
                type="password"
                required=""
                v-model="user.repeatPassword"
                placeholder="Enter Password"
                minlength="6"
                class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white text-gray-600 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              class="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
            >
              Register
            </button>
          </form>
          <div class="text-sm text-gray-500 flex justify-between items-center mt-3">
            <p>Already have an account...</p>
            <a
              class="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400"
              href="/login"
            >
              Login
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
  fullname: '',
  password: '',
  repeatPassword: ''
}
let loading = ref(false)

function register(ev) {
  ev.preventDefault()

  loading.value = true
  store
    .register(user)
    .then(() => {
      loading.value = false
      router.push({
        name: 'login'
      })
    })
    .catch((err) => {
      loading.value = false
      console.log(err)
    })
}
</script>
