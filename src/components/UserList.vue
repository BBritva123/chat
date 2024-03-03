<template>
  <ul>
    <UserItem name='users' v-for="user in users" :key="user.id" :user="user" v-model:selectedUserId="selectedUserId" @delete-user="$emit('delete-user', $event)"/>
  </ul>
</template>

<script setup>
import UserItem from '@/components/UserItem.vue'

defineProps(['users'])
defineEmits(['delete-user'])
const selectedUserId = defineModel('selectedUserId')
</script>

<style scoped>

</style>
