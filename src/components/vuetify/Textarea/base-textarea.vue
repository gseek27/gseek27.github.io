<template>
  <validation-provider :rules="rules" v-slot="{ errors }">
    <v-textarea
      :error-messages="errors"
      v-bind="$attrs"
      v-on="$listeners"
      :value="value"
      @input="$emit('update:value', $event)"
      @blur="
        $emit(
          'update:value',
          !!value && $attrs['type'] !== 'password' ? value.trim() : value
        )
      "
      :outlined="outlined"
      dense
      rows="5"
    >
      <template #label v-if="!!$attrs.label">
        <span class="error--text" v-if="rules.includes('required')">*</span>
        {{ $attrs.label }}
      </template>
      <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot" />
    </v-textarea>
  </validation-provider>
</template>

<script lang="ts" src="./base-textarea.ts" />
