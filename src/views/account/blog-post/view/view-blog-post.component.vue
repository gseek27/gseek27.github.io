<template>
  <v-dialog
    fullscreen
    persistent
    transition="dialog-bottom-transition"
    :value="true"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="$router.back()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{
          !BlogPost.Title || BlogPost.Title.length > 20
            ? 'View Blog Post'
            : BlogPost.Title
        }}</v-toolbar-title>
        <v-spacer />
        <base-btn text color="white" :to="{ name: 'Add Blog Post' }">
          <v-icon class="mr-3">mdi-plus-circle-outline</v-icon>
          Add New Post
        </base-btn>
      </v-toolbar>
      <v-container fluid>
        <v-row justify="center" class="mt-5" v-if="!!BlogPost.Title">
          <v-col cols="12" md="6">
            <v-card class="round-15 big-shadow pa-5 fill-height">
              <h1 class="font-weight-light" v-if="BlogPost.Title.length > 20">
                {{ BlogPost.Title }}
              </h1>
              <v-card-text class="headline font-weight-bold">
                "{{ BlogPost.PostBody }}"
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="3">
            <v-card class="round-15 big-shadow pa-5">
              <span class="grey--text text--lighten-1 headline">
                Author info:
              </span>

              <v-card-actions>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-img class="elevation-6" src="/assets/images/user.png" />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>
                      {{ BlogPost.User.DisplayName }}
                    </v-list-item-title>
                  </v-list-item-content>

                  <div class="ml-auto subheading">{{ FromNow }}</div>
                </v-list-item>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <h1
          class="text-center"
          v-if="!BlogPost.Title && !LoaderSrv.FullScreenLoader"
        >
          Post not found.
        </h1>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" src="./view-blog-post.component.ts" />
