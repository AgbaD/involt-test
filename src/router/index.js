import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import DefaultLayout from '../views/components/DefaultLayout.vue'
import OauthComp from '../views/components/OauthComp.vue'
import { useStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        { path: '/dashboard', name: 'dashboard', component: DashboardView },
        { path: '/invoice', name: 'invoice', component: DashboardView },
      ]
    },
    {
      path: '/oauth/callback',
      name: 'redirect',
      component: OauthComp,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }
  ],
})

router.beforeEach((to, from, next) => {
  const store = useStore()
  if (to.meta.requiresAuth && !store.user.token) {
    next({ name: 'login' })
  } else if (store.user.token && (to.name === 'login' || to.name === 'register')) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
