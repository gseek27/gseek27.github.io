<template>
  <div class="pb-16">
    <v-row class="header ma-0">
      <v-col cols="12" class="header-content app-bg-gradient pa-0 pb-12">
        <v-container class="px-10">
          <v-toolbar flat color="transparent" dark>
            <v-toolbar-title>
              <router-link to="/" class="font-weight-bold" text color="#727cf5">
                🔥 It's Lit!
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
        </v-container>
      </v-col>
    </v-row>
    <v-container>
      <v-row class="ma-0">
        <v-col cols="12">
          <div class="d-flex justify-space-around align-center mb-10">
            <div>
              <h1 class="primary--text" id="latest-posts"> Timeline</h1>
            </div>


            <base-btn x-large :to="{ name: 'Add Blog Post' }">
              <v-icon class="mr-3">mdi-plus-circle-outline</v-icon>
              Add New Post
            </base-btn>

             
          </div>
          <div>
          <v-row class="d-flex flex-column-reverse blog-card-container">
            <v-col
              cols="12"
              sm="12"
              lg="12"
              v-for="(post, i) in BlogPostSrv.BlogPosts.value"
              :key="i"
              class="d-flex justify-center"
            >
              <blog-post-card-component
                :class="i % 2 === 0 ? 'primary' : 'primary'"
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
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-footer id="core-footer" padless absolute>
      <v-row class="blue-grey darken-4 white--text ma-0 text-center">
        <v-col cols="12" class="py-5">
          <strong>
            © {{ new Date().getFullYear() }}
            <router-link to="/"> 🔥 It's Lit!</router-link>
          </strong>
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
    .v-toolbar__content {
      @media screen and (max-width: 960px) {
        padding-left: 0px !important;
        padding-right: 0px !important;
      }
    }
  }
}
.blog-card-container {
  .blog-card {
    transition: all 0.2s ease-in-out !important;
    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>
