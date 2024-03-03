<template>
  <MessagesList :messages="messages"/>

  <textarea class="input-text" v-model="outgoing" rows="3"></textarea>
  <button @click="postMessage">
    Send Message
  </button>

</template>

<script setup>
import {reactive, ref, watch, inject} from "vue";

import {useRouteParams} from '@vueuse/router'
import MessagesList from "@/components/MessagesList";

const selectedUserId = useRouteParams('user')

const post = inject('post')
const incoming = inject('incoming')
const user = inject('user')
const outgoing = ref('')
const messages = reactive([])
watch(incoming, () => {
  if (incoming.value.message !== '' && incoming.value.type === 'message') {
    messages.push(incoming.value)
  }
  // incoming.value.message = ''
})
const postMessage = () => {
  const message = {
    type: 'message',
    senderId: user.id,
    receiverId: selectedUserId.value,
    message: outgoing.value,
  }
  messages.push(message)
  post(message)
  // outgoing.value = ''
}
</script>

<style scoped>
.input-text {
  background-color: antiquewhite;
  display: block;
  width: 100%;
}
</style>
