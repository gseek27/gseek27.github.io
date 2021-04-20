<template>
  <v-card
    class="big-shadow round-15 pa-5 pb-0 cursor-pointer blog-card fill-height d-flex flex-column"
    dark
    v-ripple
    @click="
      $router.push({
        name: 'View Blog Post',
        params: { postId: post.Id }
      })
    "
  >
    <h3 class="title text-center">{{ post.Title }}</h3>
    <v-card-text
      class="headline font-weight-bold"
      style="word-break: break-all"
    >
      {{
        post.PostBody.length > 115
          ? `${post.PostBody.slice(0, 115)}...`
          : post.PostBody
      }}
    </v-card-text>
    <v-spacer />
    <v-card-actions v-if="!$scopedSlots.footer">
      <v-list-item>
        <v-list-item-avatar>
          <v-img class="elevation-6" src="/assets/images/user.png" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ post.User.DisplayName }}</v-list-item-title>
        </v-list-item-content>

        <div class="ml-auto subheading">{{ FromNow }}</div>
      </v-list-item>
    </v-card-actions>

    <div class="pb-5 mt-auto" v-else>
      <slot name="footer" :post="post" />
    </div>
  </v-card>
</template>

<script lang="ts" src="./blog-post-card.component.ts" />
