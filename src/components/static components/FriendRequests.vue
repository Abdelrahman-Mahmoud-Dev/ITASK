<template>
    <div>
        <div class="sticky-header py-1 d-flex flex-wrap align-center justify-space-between">
          <div class="body-2 mb-1 font-weight-bold secondary--text">{{$t("friendRequests")}}</div>
          <v-btn @click="$router.push('/friends-requests')" color="blue mb-1" text x-small>{{$t("seeAll")}}</v-btn>
        </div>
        <div v-if="requests.length">
          <v-list three-line>
              <v-list-item
              @click="$router.push('/profile')"
              v-for="(item, index) in requests"
              :key="item.id"
              >
                <v-list-item-avatar>
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title class="secondary--text d-flex justify-space-between flex-wrap">
                    <div>{{item.name}}</div>
                    <div class="caption">{{Math.floor(Math.random() * 6) + ' ' + $t('days')}}</div>
                  </v-list-item-title>
                  <v-list-item-subtitle>{{Math.floor(Math.random() * 15) + ' ' + $t('mutualFriend')}}</v-list-item-subtitle>

                  <div>
                    <v-btn @click="requests.splice(index, 1);" x-small elevation="0" class="ma-1 px-3" color="primary">{{$t('accept')}}</v-btn>
                    <v-btn @click="requests.splice(index, 1);" x-small elevation="0" class="px-3" outlined color="primary">{{$t('reject')}}</v-btn>
                  </div>
                </v-list-item-content>
              </v-list-item>
          </v-list>
        </div>
        <p v-else class="text-center mt-5">{{$t('emptyRequests')}}</p>
    </div>
</template>

<script>
export default {
  data () {
    return {
      requests: []
    }
  },
  created () {
    setTimeout(() => {
      this.requests = this.$store.state.requests
    }, 1000)
  }
}
</script>
