<template>
    <div>
        <v-card v-if="!showShareMessage" class="">
            <v-card-title>
                <span class="text-h5 primary--text">{{$t('shareWithFriends')}}</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
            <v-avatar class="mt-5" size="30">
                <img
                :src="user.avatar"
                >
            </v-avatar>
            <p class="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis nam sit fuga illum non quibusdam temporibus! Reprehenderit, officia fuga? Adipisci non laborum pariatur ab praesentium.</p>
            <v-row no-gutters>
                <v-col cols="12" sm="8">
                    <v-text-field prepend-inner-icon="mdi-magnify" rounded outlined dense hide-details class="mt-5 mx-5" v-model="searchTerm"></v-text-field>
                    <v-checkbox
                    :label="$t('allFriends')"
                    @click="selectedFriends.length === users.length ? selectedFriends = [] : selectedFriends = users"
                    ></v-checkbox>
                    <v-divider></v-divider>
                    <v-list>
                        <v-list-item v-for="friend in friends" :key="friend.id">
                            <v-list-item-avatar>
                                <img width="20" class="rounded-circle mx-1" :src="friend.avatar" alt="">
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-checkbox
                                v-model="selectedFriends"
                                :value="friend"
                                ></v-checkbox>
                                {{friend.name}}
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-col>
                <v-col class="grey lighten-2 pa-2" cols="12" sm="4">
                    <h4>{{$t('selectedFriends')}}</h4>
                    <v-list class="grey lighten-2">
                        <v-list-item v-for="friend in selectedFriends" :key="friend.id">
                            <v-list-item-avatar>
                                <img width="20" class="rounded-circle mx-1" :src="friend.avatar" alt="">
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>{{friend.name}}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                    <div v-if="selectedFriends.length">
                        <v-btn @click="selectedFriends = []" text color="primary">{{$t('clear')}}</v-btn>
                        <v-btn small elevation="0" @click="showShareMessage = true" color="primary">{{type ? $t(`${type}`) : $t('select')}}</v-btn>
                    </div>
                </v-col>
            </v-row>
            </v-card-text>
        </v-card>
        <v-card v-click-outside="closeDialog" v-if="showShareMessage" class="pa-5">
            <!-- <h2 class="extra-font primary--text text-center">{{type === 'share' ? $t('shareNote') : $t('giftNote')}}</h2> -->
            <v-img v-if="$i18n.locale === 'en'" class="mx-auto" max-width="500" src="../../assets/img/msg.jpeg"></v-img>
            <v-img v-else class="mx-auto" max-width="500" src="../../assets/img/msg(ar).jpeg"></v-img>
        </v-card>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['type'],
  data () {
    return {
      selectedFriends: [],
      searchTerm: '',
      friends: [],
      showShareMessage: false
    }
  },
  watch: {
    searchTerm (val) {
      this.friends = this.users.filter(item => item.name.toLowerCase().includes(val.toLowerCase()))
    }
  },
  computed: {
    ...mapState(['users', 'user'])
  },
  methods: {
    closeDialog () {
      this.showShareMessage = false
      this.selectedFriends = []
    }
  },
  created () {
    this.friends = this.users
  }
}
</script>
