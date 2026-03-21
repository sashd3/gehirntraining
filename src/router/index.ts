import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user.store'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/components/layout/AppLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: { showNav: true },
      },
      {
        path: 'progress',
        name: 'progress',
        component: () => import('@/views/ProgressView.vue'),
        meta: { showNav: true },
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/views/SettingsView.vue'),
        meta: { showNav: true },
      },
    ],
  },
  {
    path: '/game/:gameId',
    name: 'game',
    component: () => import('@/views/GameView.vue'),
    props: true,
    meta: { showNav: false },
  },
  {
    path: '/onboarding',
    name: 'onboarding',
    component: () => import('@/views/OnboardingView.vue'),
    meta: { showNav: false },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, _from, next) => {
  const userStore = useUserStore()

  // Ensure profile is loaded
  if (!userStore.isLoaded) {
    await userStore.loadProfile()
  }

  // Redirect to onboarding if not completed
  if (!userStore.isOnboardingCompleted && to.name !== 'onboarding') {
    next({ name: 'onboarding' })
    return
  }

  // Redirect away from onboarding if already completed
  if (userStore.isOnboardingCompleted && to.name === 'onboarding') {
    next({ name: 'home' })
    return
  }

  next()
})

export default router
