<template>
  <v-app-bar
    app
    color="#f8f8ff"
    elevate-on-scroll
    v-if="$route.name !== 'View Blog Post'"
  >
    <v-app-bar-nav-icon
      color="primary"
      @click="CoreService.DrawerMode = !CoreService.DrawerMode"
    />
    <h2 class="text-center mt-1 no-select width-100 primary--text">
      {{ $route.name }}
    </h2>
  </v-app-bar>
</template>

<script lang="ts" src="./app-bar.component.ts" />
