<template>
    <v-container fluid >
        <v-row class="py-3">
            <v-col cols="12" md="3" class="py-0">
                <v-card elevation="0">
                  <v-card-title>
                    <v-text-field class="rounded-lg" outlined :placeholder="$t('search')" append-icon="mdi-magnify" dense hide-details></v-text-field>
                  </v-card-title>
                  <v-card-text style="height: 76vh; overflow-y: auto;">
                    <v-list>
                        <v-list-item v-for="(item) in users" :key="item.id" @click="startChat(item)">
                            <v-list-item-avatar>
                                <img width="50" height="50" :src="item.avatar">
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title class="text-capitalize" v-html="item.name"></v-list-item-title>
                                <v-list-item-subtitle v-html="friends[0].desc"></v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="6" class="py-0">
              <v-card elevation="0">
                <v-card-title class="grey d-flex align-center justify-space-between lighten-4 py-1 secondary--text text-capitalize body-1">
                  <div class="d-flex align-center">
                    <img :src="currentFriend.avatar" width="40" height="40" class="rounded-circle">
                    <span class="mx-5 font-weight-medium">
                      {{currentFriend.name}}
                      <v-icon x-small color="success">mdi-checkbox-blank-circle</v-icon>
                    </span>
                  </div>
                  <div>
                    <v-btn class="mx-5" icon color="primary">
                      <v-icon>mdi-phone</v-icon>
                    </v-btn>
                    <v-btn icon color="primary">
                      <v-icon>mdi-video</v-icon>
                    </v-btn>
                  </div>
                </v-card-title>
                <v-card-text class="pa-3" id="messages-list" style="height: 67vh; overflow-y: auto;">
                  <div v-if="currentMessages.length">
                    <div v-for="(message) in currentMessages" :key="message.id"
                    :class="message.type === 'sent' ? 'justify-end' : ''"
                    class="d-flex message-cont"
                    >
                      <v-card elevation="0" min-width="50%" max-width="80%" class="body-1 my-1 pa-3 black--text rounded-xl" :color="message.type === 'sent' ? 'grey lighten-3' : 'primary lighten-1'">
                        <div class="d-flex justify-space-between font-weight-light">
                          <div>
                              <img
                              :src="message.type === 'sent' ? user.avatar : currentFriend.avatar"
                              :alt="currentFriend.name"
                              class="rounded-circle"
                              width="30"
                              height="30"
                              >
                          </div>
                          <div class="caption secondary--text">{{message.time}}</div>
                        </div>
                        <v-card-text>
                          {{message.message}}
                        </v-card-text>
                      </v-card>
                    </div>
                  </div>
                  <div v-else>
                    <p class="text-center body-1 font-weight-medium paragraph--text">{{$t('startConversation')}}</p>
                  </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn icon color="primary"><v-icon>mdi-image-multiple</v-icon></v-btn>
                  <v-btn icon color="primary"><v-icon>mdi-video</v-icon></v-btn>
                  <twemoji-picker
                  :emojiData="emojiDataAll"
                  :emojiGroups="emojiGroups"
                  :skinsSelection="false"
                  :searchEmojisFeat="true"
                  searchEmojiPlaceholder="Search here."
                  searchEmojiNotFound="Emojis not found."
                  isLoadingLabel="Loading..."
                  @emojiUnicodeAdded="addImoji"
                  ></twemoji-picker>
                  <v-btn icon color="primary">
                    <v-icon>mdi-microphone</v-icon>
                  </v-btn>
                  <v-text-field height="50" dense id="message-field" v-model="message" hide-details class="message-field" rounded filled color="grey">
                    <template class="mt-0" v-slot:append>
                      <v-btn @click="sendMessage" elevation="0" text class="rounded-r-xl" color="primary white--text px-5"><v-icon left>mdi-send</v-icon></v-btn>
                    </template>
                  </v-text-field>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="12" md="3" class="py-0">
              <v-card elevation="0" class="pa-5 text-center">
                <v-avatar size="150">
                  <img :src="currentFriend.avatar" class="rounded-circle">
                </v-avatar>
                <h3 class="secondary--text font-weight-regular my-5 text-capitalize">{{currentFriend.name}}</h3>
                <div class="text-start secondary--text mb-3">{{$t('sharedMedia')}}</div>
                <div style="height: 46vh; overflow-y: auto;" class="d-flex flex-wrap justify-center">
                  <img class="ma-1 rounded-lg" width="50" height="50" v-for="item in images" :key="item.url" :src="item.url" alt="">
                </div>
              </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { TwemojiPicker } from '@kevinfaguiar/vue-twemoji-picker'
import EmojiAllData from '@kevinfaguiar/vue-twemoji-picker/emoji-data/en/emoji-all-groups.json'
import EmojiGroups from '@kevinfaguiar/vue-twemoji-picker/emoji-data/emoji-groups.json'
import { mapState } from 'vuex'

export default {
  components: {
    'twemoji-picker': TwemojiPicker
  },
  data () {
    return {
      chatType: 'my friends',
      friends: [
        { id: 1, name: 'john doe', image: 'friends.png', desc: 'lorem ipsum tar cumr sat' },
        { id: 2, name: 'jane doe', image: 'friends.png', desc: 'lorem ipsum tar cumr sat' },
        { id: 3, name: 'ali adel', image: 'friends.png', desc: 'lorem ipsum tar cumr sat' },
        { id: 4, name: 'noor hany', image: 'friends.png', desc: 'lore ipsum tar cumr sat' },
        { id: 5, name: 'alex ray', image: 'friends.png', desc: 'lorem ipsum tar cumr sat' },
        { id: 6, name: 'jessica more', image: 'friends.png', desc: 'lorem ipsum tar cumr sat' },
        { id: 7, name: 'hossam habib', image: 'friends.png', desc: 'lorem ipsum tar cumr sat' },
        { id: 8, name: 'sara antony', image: 'friends.png', desc: 'lore ipsum tar cumr sat' }
      ],
      chats: [
        {
          id: 1,
          friendId: 1,
          messages: [
            { message: 'hello there', time: 'Aug 12th 23:20', type: 'sent' },
            { message: 'how you doing today ?', time: 'Aug 12th 23:21', type: 'sent' },
            { message: 'hi', time: 'Aug 12th 23:21', type: 'recieved' },
            { message: 'all is well, you ?', time: 'Aug 12th 23:22', type: 'recieved' },
            { message: 'gr8', time: 'Aug 12th 23:23', type: 'sent' },
            { message: 'have you checked the trip yet ?', time: 'Aug 12th 23:24', type: 'sent' },
            { message: 'oh yeah, it is amazing I have told my family about it and the are willing to join, so I think it would be great if they come', time: 'Aug 12th 23:27', type: 'recieved' },
            { message: 'this is great the more they are the funnier it gets!', time: 'Aug 12th 23:21', type: 'sent' }
          ]
        },
        {
          id: 2,
          friendId: 2,
          messages: [
            { message: 'hello there', time: 'Aug 12th 23:20', type: 'sent' },
            { message: 'how you doing today ?', time: 'Aug 12th 23:21', type: 'sent' },
            { message: 'hi', time: 'Aug 12th 23:21', type: 'recieved' },
            { message: 'all is well, you ?', time: 'Aug 12th 23:22', type: 'recieved' },
            { message: 'gr8', time: 'Aug 12th 23:23', type: 'sent' },
            { message: 'have you checked the trip yet ?', time: 'Aug 12th 23:24', type: 'sent' }
          ]
        },
        {
          id: 3,
          friendId: 3,
          messages: [
            { message: 'hello there', time: 'Aug 12th 23:20', type: 'sent' }
          ]
        },
        {
          id: 4,
          friendId: 4,
          messages: []
        },
        {
          id: 5,
          friendId: 5,
          messages: []
        },
        {
          id: 6,
          friendId: 6,
          messages: []
        },
        {
          id: 7,
          friendId: 7,
          messages: []
        },
        {
          id: 8,
          friendId: 8,
          messages: []
        }
      ],
      currentFriend: {},
      currentMessages: [],
      message: ''
    }
  },
  computed: {
    emojiDataAll () {
      return EmojiAllData
    },
    emojiGroups () {
      return EmojiGroups
    },
    ...mapState(['users', 'images', 'user'])
  },
  methods: {
    startChat (user) {
      this.currentFriend = user
      this.currentMessages = this.chats.find(chat => chat.friendId === user.id).messages
      setTimeout(() => {
        document.getElementById('messages-list').scrollTop = document.getElementById('messages-list').scrollHeight
      }, 0.2)
    },
    addImoji (emoji) {
      const position = document.getElementById('message-field').selectionStart
      this.message = [this.message.slice(0, position), emoji, this.message.slice(position)].join('')
    },
    sendMessage () {
      if (this.message) {
        this.currentMessages.push({
          message: this.message,
          time: new Date().toLocaleTimeString(),
          type: 'sent'
        })
        this.message = ''
        setTimeout(() => {
          document.getElementById('messages-list').scrollTop = document.getElementById('messages-list').scrollHeight
        }, 0.2)
      }
    }
  },
  mounted () {
    document.getElementById('messages-list').scrollTop = document.getElementById('messages-list').scrollHeight
    document.getElementById('message-field').addEventListener('keypress', (event) => {
      if (event.keyCode === 13) {
        event.preventDefault()
        this.sendMessage()
      }
    })
  },
  created () {
    this.startChat(this.friends.find(friend => friend.id === this.$route.params.id || 1))
  }
}
</script>

<style>
.message-field.v-text-field {
  cursor: text;
}
.message-field.v-text-field .v-input__append-inner {
  padding: 0;
  margin: 0;
}
.message-field.v-text-field .v-input__slot {
  padding-right: 0;
}
</style>
