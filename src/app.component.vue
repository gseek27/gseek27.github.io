<template>
  <v-app>
    <v-overlay z-index="999" :value="LoaderService.FullScreenLoader">
      <h1>{{ LoaderService.FullScreenLoaderMessage }}</h1>
    </v-overlay>
    <v-progress-linear
      indeterminate
      fixed
      height="5px"
      style="top: 0; z-index: 999"
      :style="
        LoaderService.FullScreenLoaderFullWidth ? '' : 'margin-left: 300px'
      "
      :active="LoaderService.FullScreenLoader"
    />
    <v-slide-x-transition hide-on-leave>
      <router-view />
    </v-slide-x-transition>
    <v-snackbar
      v-model="CoreService.Alert.Mode"
      :color="CoreService.Alert.Color"
      timeout="5000"
    >
      {{ CoreService.Alert.Text }}
      <template #action="{ attrs }" v-if="CoreService.Alert.Close">
        <base-btn
          small
          icon
          :color="CoreService.Alert.Color ? 'white' : 'error'"
          text
          v-bind="attrs"
          @click="CoreService.Alert.Mode = false"
        >
          <v-icon>mdi-close</v-icon>
        </base-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts" src="./app.component.ts" />

<style lang="scss" src="./styles/index.scss" />
