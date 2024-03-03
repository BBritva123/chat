<template>
  <div v-for="(message,index) in messages" :key="index">
    {{ message.message }}
  </div>
</template>

<script setup>
defineProps(['messages'])
</script>

<style lang="scss" scoped>
div {
  width: max-content;
  max-width: 50%;
  padding: 20px;
  color: #000;
  background-color: #fff;
  margin-bottom: 30px;
}
</style>
