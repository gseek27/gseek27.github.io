import { CoreService, Session } from '@/sdk';
import ViewBlogPostComponent from '@/views/account/blog-post/view/view-blog-post.component';
import { AccountRoutes } from '@/views/account/routes/account.routes';
import { AuthenticationRoutes } from '@/views/authentication/routes/authentication.routes';
import HomeComponent from '@/views/home/home.component';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: HomeComponent
  },
  {
    path: '/view-blog-post/:postId',
    name: 'View Blog Post',
    component: ViewBlogPostComponent
  },
  ...AuthenticationRoutes,
  ...AccountRoutes
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // Hide snackbar
  new CoreService().Alert.Mode = false;

  // Get current user from cookie.
  const isUserLoggedIn =
    new Session().SessionValue && !!new Session().SessionValue?.Id;
  const isNonAuthRoute = ['Login', 'Signup'].includes(to.name ?? '');
  const isStaticRoute = ['Home', 'View Blog Post'].includes(to.name ?? '');

  // Perform Authentication
  if (isStaticRoute) {
    next();
  } else if (!isUserLoggedIn && isNonAuthRoute) {
    next();
  } else if (isUserLoggedIn && isNonAuthRoute) {
    next({ name: 'Products' });
  } else if (!isUserLoggedIn && !isNonAuthRoute) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
