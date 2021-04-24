<template>
  <v-row justify="center" no-gutters>
    <v-col cols="12" md="8">
      <v-card class="big-shadow round-15 pa-5">
        <h1 class="mb-3">
          Hi
          <span class="font-weight-bold primary--text">{{ DisplayName }}!</span>
        </h1>
        <base-form #default="{ invalid }" @submit="updateProfile">
          <v-row dense>
            <v-col cols="12" md="6">
              <base-text-field
                :value.sync="DisplayName"
                label="Display Name"
                autofocus
                rules="required|min:3|max:20"
                counter="20"
              />
            </v-col>
            <v-col cols="12" md="6">
              <base-text-field
                label="Password"
                type="password"
                rules="max:36|min:8"
                :value.sync="Password"
                counter="36"
              />
            </v-col>
            <v-col cols="12">
              <h3>Current Photo</h3>
              <v-avatar color="grey lighten-2" size="70" class="mb-5">
                <v-img :src="PhotoUrl" contain size="100" />
              </v-avatar>
              <base-btn
                @click="AddNewPic = !AddNewPic"
                :color="AddNewPic ? 'error' : 'primary'"
                class="ml-5"
                small
              >
                {{ AddNewPic ? 'Cancel' : 'Add New' }}
              </base-btn>
              <base-file-input
                v-if="AddNewPic"
                :value.sync="File"
                label="Profile Picture"
                rules="required|image:jpg,png,jpeg"
              />
            </v-col>
            <v-col cols="12">
              <base-btn :disabled="invalid" block type="submit">
                Update Profile
              </base-btn>
            </v-col>
          </v-row>
        </base-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" src="./profile.component.ts" />