<template>
  <v-row justify="center" no-gutters>
    <v-col cols="12">
      <v-card class="big-shadow round-15 pa-5">
        <h1 class="mb-3">
          You have
          <span class="font-weight-bold primary--text">
            {{ BlogPostSrv.BlogPosts.value.length }}
          </span>
          Blog Post{{ BlogPostSrv.BlogPosts.value.length !== 1 ? 's' : '' }}!
        </h1>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            lg="4"
            v-for="(post, i) in BlogPostSrv.BlogPosts.value"
            :key="i"
          >
            <blog-post-card-component class="app-bg-gradient" :post="post">
              <template #footer="{ post: { Id } }">
                <div class="d-flex align-center">
                  <base-btn
                    small
                    text
                    color="white"
                    @click.stop="deletePost(Id)"
                  >
                    <v-icon class="mr-1">mdi-delete-outline</v-icon>
                    Delete
                  </base-btn>
                  <div class="ml-auto subheading">{{ getFromNow(post) }}</div>
                </div>
              </template>
            </blog-post-card-component>
          </v-col>
          <v-col
            cols="12"
            v-if="
              !BlogPostSrv.BlogPosts.value.length && !LoaderSrv.FullScreenLoader
            "
          >
            <h1 class="headline text-center">No Posts found</h1>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" src="./your-blog-posts.component.ts" />
