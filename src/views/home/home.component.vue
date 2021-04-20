<template>
  <div>
    <v-row class="header ma-0">
      <v-col cols="12" class="header-content app-bg-gradient pa-0 pb-12">
        <v-container class="px-10">
          <v-toolbar flat color="transparent" dark>
            <v-toolbar-title>
              <router-link to="/" class="white--text font-weight-bold">
                It's Lit
              </router-link>
            </v-toolbar-title>
            <v-spacer />
            <div v-if="Session.SessionValue && Session.SessionValue.Id">
              <base-btn text color="white" small :to="{ name: 'Profile' }">
                Profile
              </base-btn>
            </div>
            <div v-else>
              <base-btn text color="white" small class="mr-1" to="/login">
                Login
              </base-btn>
              <base-btn text color="white" small to="/signup">Signup</base-btn>
            </div>
          </v-toolbar>
          <v-row justify="center" align="center" style="height: 40em">
            <v-col cols="12" md="5" class="text-center text-md-left">
              <h2 class="font-weight-light mb-5">
                The BLOG where you find,
                <br /><strong>ALL TYPE BLOGS</strong>
              </h2>
              <p>
                <strong>It's Lit</strong> is an ultimate Blog for small users,
                large clients, sellers, buyers, consumers, families, kids,
                bloggers, food lovers and everyone :)
              </p>
              <base-btn
                large
                color="white"
                elevation="0"
                class="font-weight-bold view-bakery-products-btn"
                outlined
                @click="scrollToPosts"
              >
                View Blog Posts
                <v-icon class="ml-1">mdi-arrow-right</v-icon>
              </base-btn>
            </v-col>
            <v-col cols="12" md="5">
              <img class="header-image" src="/assets/svgs/header.svg" />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <v-container>
      <v-row class="ma-0">
        <v-col cols="12">
          <div class="d-flex justify-space-between align-center mb-10">
            <div>
              <h1 class="primary--text" id="latest-posts">Latest Posts</h1>
              <p>These are the latest posts by all users</p>
            </div>
            <base-btn x-large :to="{ name: 'Add Blog Post' }">
              <v-icon class="mr-3">mdi-plus-circle-outline</v-icon>
              Add New Post
            </base-btn>
          </div>
          <v-row class="blog-card-container">
            <v-col
              cols="12"
              sm="6"
              lg="4"
              v-for="(post, i) in BlogPostSrv.BlogPosts.value"
              :key="i"
            >
              <blog-post-card-component
                :class="i % 2 === 0 ? 'primary' : 'secondary'"
                :post="post"
              />
            </v-col>
            <v-col
              cols="12"
              v-if="
                !BlogPostSrv.BlogPosts.value.length &&
                !LoaderSrv.FullScreenLoader
              "
            >
              <h1 class="headline text-center">No Posts found</h1>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-footer id="core-footer" padless>
      <v-row class="blue-grey darken-4 white--text ma-0 text-center">
        <v-col cols="12" class="py-5">
          <strong>
            © {{ new Date().getFullYear() }}
            <router-link to="/">&nbsp;It's Lit</router-link>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script lang="ts" src="./home.component.ts" />

<style lang="scss">
.header {
  filter: drop-shadow(-1px 1px 2px rgba(0, 0, 0, 0.5));
  max-width: 100%;
  .header-content {
    max-width: 100%;
    clip-path: polygon(0 0, 100% 0, 100% 87%, 0 100%);
    color: #fff;
    @media screen and (max-width: 960px) {
      clip-path: polygon(0 0, 100% 0, 100% 95%, 0 100%);
    }
    .v-toolbar__content {
      @media screen and (max-width: 960px) {
        padding-left: 0px !important;
        padding-right: 0px !important;
      }
    }
    .view-bakery-products-btn {
      transition: all 0.3s ease-in-out;
      &:hover i {
        margin-left: 20px !important;
      }
    }
    .header-image {
      max-width: 100%;
      pointer-events: none;
      user-select: none;
    }
  }
}
.blog-card-container {
  &:hover .blog-card:not(:hover) {
    filter: blur(15px);
  }
  .blog-card {
    transition: all 0.2s ease-in-out !important;
    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>
