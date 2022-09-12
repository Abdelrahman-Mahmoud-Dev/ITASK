<template>
  <v-card class="chatbox rounded-t-xl" id="chatbox"
  :width="$vuetify.breakpoint.lgAndUp ? 350 : 250"
  :height="openChat ? 500 : 40"
  >
    <v-card-title
    @click="openChat = !openChat"
    class="primary pt-2 white--text"
    style="cursor: pointer;"
    >
      <v-icon left color="white">mdi-chat-processing-outline</v-icon> {{$t('chat')}} (4)
    </v-card-title>

    <v-card-text class="px-0" tag="div" style="height: 450px; overflow: auto;">
      <v-list three-line>
        <v-list-item
        style="border-bottom: 1px solid #e0e0e0;"
        v-for="(item) in chats"
        :key="item.id"
        @click="$router.push({name: 'chat', params: {id: item.id}})"
        >
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="secondary--text d-flex justify-space-between flex-wrap">
              <div>{{item.name}}</div>
              <div class="caption">{{item.time}}</div>
            </v-list-item-title>
            <v-list-item-subtitle>{{item.message}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      openChat: false,
      chats: [
        {
          id: 1,
          name: 'John Doe',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          message: 'Hello, how are you?',
          time: '4:20 PM'
        },
        {
          id: 2,
          name: 'Jane Doe',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          message: 'Hello, how are you?',
          time: '4:20 PM'
        },
        {
          id: 3,
          name: 'Ali Hassan',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          message: 'Hello, how are you?',
          time: '4:20 PM'
        },
        {
          id: 4,
          name: 'Mark Watson',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          message: 'Hello, how are you?',
          time: '4:20 PM'
        },
        {
          id: 5,
          name: ' Hana Mo',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          message: 'Hello, how are you?',
          time: '4:20 PM'
        },
        {
          id: 6,
          name: 'Ahmed Khatab',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          message: 'Hello, how are you?',
          time: '4:20 PM'
        },
        {
          id: 7,
          name: 'Sarah Moore',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          message: 'Hello, how are you?',
          time: '4:20 PM'
        },
        {
          id: 8,
          name: 'Huria Hassan',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          message: 'Hello, how are you?',
          time: '4:20 PM'
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<style>
  .chatbox {
    position: fixed !important;
    bottom: 0;
    right: 20px;
    z-index: 2;
  }
</style>
