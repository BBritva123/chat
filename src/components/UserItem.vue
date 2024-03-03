<template>
  <li>
    <label>
      <span>{{ user.name }}</span>
      <input type="radio" name="name" :value="user.id" v-model="selectedUser">
  {{user.id}}
    </label>
    {{user}}
    <button @click="$emit('delete-user', user.id)">Delete user</button>
  </li>
</template>

<script setup>
import {ref} from 'vue'

const test = ref('')
const selectedUser = defineModel('selectedUserId')
defineProps([
  'user',
  'name',
])
defineEmits(['delete-user'])
</script>

<style scoped>

</style>
