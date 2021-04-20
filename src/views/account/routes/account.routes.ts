import { RouteConfig } from 'vue-router';
import AccountComponent from '../account.component';
import AddBlogPostComponent from '../blog-post/add/add-blog-post.component';
import YourBlogPostsComponent from '../blog-post/your/your-blog-posts.component';
import ProfileComponent from '../profile/profile.component';

export const AccountRoutes: Array<RouteConfig> = [
  {
    path: '/account',
    component: AccountComponent,
    redirect: '/account/products',
    children: [
      {
        path: 'add-blog-post',
        name: 'Add Blog Post',
        component: AddBlogPostComponent
      },
      {
        path: 'your-blog-posts',
        name: 'Your Blog Posts',
        component: YourBlogPostsComponent
      },
      {
        path: 'profile',
        name: 'Profile',
        component: ProfileComponent
      }
    ]
  }
];
