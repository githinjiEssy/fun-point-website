import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { title: 'Home', childSafe: true },
    },
    {
      path: '/play',
      name: 'play',
      component: () => import('../views/play/PlayHubView.vue'),
      meta: { title: 'Play Zone', childSafe: true },
    },
    {
      path: '/play/:activityId',
      name: 'activity-detail',
      component: () => import('../views/play/ActivityDetailView.vue'),
      meta: { title: 'Activity', childSafe: true },
    },
    {
      path: '/play/:activityId/run',
      name: 'activity-run',
      component: () => import('../views/play/ActivityRunView.vue'),
      meta: { title: 'Playing', childSafe: true, immersive: true },
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/shop/ShopView.vue'),
      meta: { title: 'Shop', childSafe: true },
    },
    {
      path: '/shop/:category',
      name: 'shop-category',
      component: () => import('../views/shop/CategoryView.vue'),
      meta: { title: 'Shop', childSafe: true },
    },
    {
      path: '/shop/product/:productId',
      name: 'product-detail',
      component: () => import('../views/shop/ProductDetailView.vue'),
      meta: { title: 'Product', childSafe: true },
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/shop/CartView.vue'),
      meta: { title: 'Your Cart', requiresParent: true },
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/shop/CheckoutView.vue'),
      meta: { title: 'Checkout', requiresParent: true },
    },
    {
      path: '/experiences',
      name: 'experiences',
      component: () => import('../views/experiences/ExperiencesView.vue'),
      meta: { title: 'Experiences', childSafe: true },
    },
    {
      path: '/experiences/:experienceId',
      name: 'experience-detail',
      component: () => import('../views/experiences/ExperienceDetailView.vue'),
      meta: { title: 'Experience', childSafe: true },
    },
    {
      path: '/experiences/:experienceId/book',
      name: 'experience-book',
      component: () => import('../views/experiences/BookingView.vue'),
      meta: { title: 'Book', requiresParent: true },
    },
    {
      path: '/progress',
      name: 'progress',
      component: () => import('../views/ProgressView.vue'),
      meta: { title: 'My Progress', childSafe: true },
    },
    {
      path: '/parent',
      component: () => import('../layouts/ParentLayout.vue'),
      meta: { requiresParent: true },
      children: [
        {
          path: '',
          name: 'parent-dashboard',
          component: () => import('../views/parent/ParentDashboardView.vue'),
          meta: { title: 'Parent Area' },
        },
        {
          path: 'purchases',
          name: 'parent-purchases',
          component: () => import('../views/parent/ParentPurchasesView.vue'),
          meta: { title: 'Purchases' },
        },
        {
          path: 'bookings',
          name: 'parent-bookings',
          component: () => import('../views/parent/ParentBookingsView.vue'),
          meta: { title: 'Bookings' },
        },
        {
          path: 'settings',
          name: 'parent-settings',
          component: () => import('../views/parent/ParentSettingsView.vue'),
          meta: { title: 'Settings' },
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/support/AboutView.vue'),
      meta: { title: 'About' },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/support/ContactView.vue'),
      meta: { title: 'Contact' },
    },
    {
      path: '/policies',
      name: 'policies',
      component: () => import('../views/support/PoliciesView.vue'),
      meta: { title: 'Policies' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      meta: { title: 'Not found' },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

// Update browser tab title after navigation
router.afterEach((to) => {
  document.title = to.meta.title
    ? `${to.meta.title} · Kijiji Adventures`
    : 'Kijiji Adventures'
})

export default router
