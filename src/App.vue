<template>
  <v-app id="app">
    <navbar v-if="showNav" />
    <v-main v-if="images.length" :class="$route.path.includes('/auth') ? 'white' : 'grey lighten-3'" class="main-screen">
      <!-- <v-container fluid class="pa-0"> -->
        <router-view></router-view>
        <chat v-if="showChatBox" />
      <!-- </v-container> -->
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/static components/Navbar.vue'
import Chat from '@/components/static components/Chat.vue'
import users from './web services/users'
import posts from './web services/posts'

import { mapState } from 'vuex'

export default {
  name: 'App',
  components: { Navbar, Chat },

  data: () => ({
    //
  }),
  computed: {
    ...mapState(['images']),
    showChatBox () {
      return this.$route.name !== 'chat' && !this.$route.path.includes('/auth')
    },
    showNav () {
      return !this.$route.path.includes('/auth')
    }
  },
  created () {
    users.profile(1).then((response) => {
      this.$store.dispatch('setUser', response.data)
    }).catch(err => console.log(err))
    users.images(1).then((response) => {
      this.$store.dispatch('setImages', response.data.slice(0, 100))
    }).catch(err => console.log(err))
    users.users().then((response) => {
      this.$store.dispatch('setUsers', response.data)
    }).catch(err => console.log(err))
    posts.posts().then((response) => {
      this.$store.dispatch('setPosts', response.data.sort(() => Math.random() - 0.5))
    }).catch(err => console.log(err))
  }
}
</script>

<style>
.sticky-header {
  position: sticky;
  top: 0;
  right: 0;
  background-color: white;
  z-index: 1;
}
.home {
  padding: 12px 12px 0 12px;
}
</style>
