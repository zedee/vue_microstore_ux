/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file.
 */

export default [
  // Home
  {
    path: '/home',
    name: 'home.index',
    component: () => import('@/views/Home/Index.vue'),

    meta: {
      guest: true,
    },
  },

  // Products List
  {
    path: '/products',
    name: 'products.index',
    component: () => import('@/views/Products/Index.vue'),

    meta: {
      guest: true,
    },
  },

  // Favorites List
  {
    path: '/favorites',
    name: 'favorites.index',
    component: () => import('@/views/Favorites/Index.vue'),

    meta: {
      guest: true,
    },
  },

  // Account
  /*{
    path: '/account',
    name: 'account.index',
    component: () => import('@/views/Account/Index.vue'),

    // If the user needs to be authenticated to view this page.
    meta: {
      auth: true,
    },
  },

  // Login
  {
    path: '/login',
    name: 'login.index',
    component: () => import('@/views/Login/Index.vue'),

    // If the user needs to be a guest to view this page.
    meta: {
      guest: true,
    },
  },

  // Register
  {
    path: '/register',
    name: 'register.index',
    component: () => import('@/views/Register/Index.vue'),

    // If the user needs to be a guest to view this page.
    meta: {
      guest: true,
    },
  },*/

  {
    path: '/',
    redirect: '/products',
  },

  {
    path: '/*',
    redirect: '/products',
  },
];
