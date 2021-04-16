export default [{
  path: '/run',
  name: 'home',
  component: () => import(/* webpackChunkName: "landing-home" */ '@/pages/landing/HomePage.vue'),
  meta: {
    layout: 'landing',
    public: true
  }
}, {
  path: '/pricing',
  name: 'pricing',
  component: () => import(/* webpackChunkName: "landing-pricing" */ '@/pages/landing/PricingPage.vue'),
  meta: {
    layout: 'landing',
    public: true
  }
}]
