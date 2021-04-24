<template>
  <v-row justify="center" no-gutters>
    <v-col cols="12" md="8">
      <v-card class="big-shadow round-15 pa-5">
        <h1 class="mb-3">
          Add something
          <span class="font-weight-bold primary--text">Awesome!</span>
        </h1>
        <base-form #default="{ invalid }" @submit="addBlogPost">
          <v-row dense>
            <v-col cols="12">
              <base-text-field
                label="Title"
                autofocus
                rules="required|min:10|max:50"
                counter="50"
                :value.sync="PostData.Title"
              />
            </v-col>
            <v-col cols="12">
              <base-textarea
                label="Post Body"
                rules="required|max:5000|min:10"
                counter="5000"
                :value.sync="PostData.PostBody"
              />
            </v-col>
            <v-col cols="12">
              <base-btn :disabled="invalid" block type="submit">Add</base-btn>
            </v-col>
          </v-row>
        </base-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" src="./add-blog-post.component.ts" />
