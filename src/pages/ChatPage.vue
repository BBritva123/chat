<template>
  <pre>
    <div>We</div>
    {{ user }}
  </pre>
  <div>Users</div>
  <UserList name="users"
            :users="users"
            v-model:selectedUserId="selectedUserId"
            @delete-user="deleteUser"
  />
  <form @submit.prevent="addUser">
    <input type="text" placeholder="Name" v-model="newUser.name">
    <input type="text" placeholder="new user id" v-model="newUser.id">
    <button>Add</button>
  </form>

  <!--  v-model:selectedUserId="$router.push({name:'UserChatPage', params:{'userId':$event}})"-->
  <router-view/>
</template>

<script setup>
import {reactive, watch, provide, toRaw, onMounted, computed, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useBroadcastChannel} from '@vueuse/core'

import UserList from "@/components/UserList.vue"

const newUser = ref({name: '', id: ''})
const deleteUser = (userId) => {
  delete users[userId]
}
const route = useRoute()
const router = useRouter()
const {
  post,
  data: incoming,
} = useBroadcastChannel({name: 'chat-channel'})

const callUser = () => {
  post({
    type: 'call',
    senderId: user.id,
    receiverId: 'all',
  })
}
const selectedUserId = computed({
  get() {
    return route.name === 'UserChatPage' ? route.params.userId : null
  },
  set(value) {
    router.push({name: 'UserChatPage', params: {'userId': value}})
  }
})
provide('post', post)
provide('incoming', incoming)

const user = reactive({
  id: crypto.randomUUID(),
  name: 'Roman',
})
provide('user', user)
watch(incoming, () => {
  if (incoming.value.type === 'call') {
    post({
      type: 'answer',
      sender: toRaw(user),
      receiverId: incoming.value.senderId,
    })
  }
})
const users = reactive({1: {id: 1, name: 'www'}})
watch(incoming, () => {
  if (incoming.value.type === 'answer' && incoming.value.receiverId === user.id) {
    users[incoming.value.sender.id] = incoming.value.sender
  }
})
const addUser = () => {
  users[newUser.value.id] = {
    name: newUser.value.name,
    id: newUser.value.id
  }
}
onMounted(() => {
  callUser()
})

</script>

<style scoped>
input {
  border: 1px solid #9797ee;
  padding: 3px;
  margin-right: 5px;
}

button {
  outline: 1px solid #9797ee;
  padding: 5px;

}
</style>
