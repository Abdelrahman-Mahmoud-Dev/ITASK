<template>
    <v-app-bar
      app
      color="white"
      flat
      height="80"
    >

      <v-row no-gutters align="center" justify="space-between">
        <v-img @click="$router.push({name: 'Home'})" class="ma-0 mr-15 pa-0" v-if="$i18n.locale === 'en'" max-width="10%" src="../../assets/en-logo.png"></v-img>
        <v-img @click="$router.push({name: 'Home'})" class="ma-0 mr-15 pa-0" v-else max-width="10%" src="../../assets/ar-logo.png"></v-img>
        <div v-for="(item, i) in linksBeforeSearch" :key="i">
          <router-link class="mx-5 text-decoration-none" v-if="item.route" :to="item.route">
            <v-icon color="primary">{{$route.path === item.route ? item.iconSolid : item.icon}}</v-icon>
          </router-link>
          <v-icon class="mx-5" @click="clickedIcon = item.icon" v-else color="primary">{{clickedIcon === item.icon ? item.iconSolid : item.icon}}</v-icon>
        </div>

        <!-- search -->
        <search-box></search-box>

        <div v-for="(item, j) in linksAfterSearch" :key="item.icon + j">
          <router-link class="mx-5 text-decoration-none" v-if="item.route" :to="item.route">
            <v-icon color="primary">{{$route.path === item.route ? item.iconSolid : item.icon}}</v-icon>
          </router-link>
          <div v-else>
            <v-icon class="mx-5" @click="clickedIcon = item.icon" v-if="j !== 1" color="primary">{{clickedIcon === item.icon ? item.iconSolid : item.icon}}</v-icon>
            <notifications v-else />
          </div>
        </div>

        <!-- <v-avatar
        @click="$router.push(user.role === 'student' ? '/Profile' : '/teacher')"
        class="mx-5"
        color="primary darken-1 shrink"
        size="40"
        >
          <v-icon v-if="!user.avatar" dark>
            mdi-account-circle
          </v-icon>
          <img
          v-else
          :src="user.avatar"
          alt="John"
          >
        </v-avatar> -->

        <language-picker />
      </v-row>
    </v-app-bar>
</template>

<script>
import SearchBox from '@/components/static components/SearchBox'
import { mapState } from 'vuex'
import LanguagePicker from './LanguagePicker'
import Notifications from './Notifications'

export default {
  components: {
    SearchBox,
    LanguagePicker,
    Notifications
  },
  data: () => ({
    linksAfterSearch: [
      { icon: 'mdi-currency-usd', iconSolid: 'mdi-currency-usd' },
      { icon: 'mdi-bell-outline', iconSolid: 'mdi-bell' },
      { icon: 'mdi-chat-processing-outline', iconSolid: 'mdi-chat-processing', route: '/chat/1' }
    ],
    linksBeforeSearch: [
      { icon: 'mdi-home-outline ', iconSolid: 'mdi-home ', route: '/' },
      { icon: 'mdi-account-group-outline', iconSolid: 'mdi-account-group', route: '/groups' },
      { icon: 'mdi-bookmark-minus-outline', iconSolid: 'mdi-bookmark-minus', route: '/profile' },
      { icon: 'mdi-compass-outline', iconSolid: 'mdi-compass', route: '/reels' }
    ],
    clickedIcon: ''
  }),
  computed: {
    ...mapState(['user', 'images'])
  }
}
</script>
