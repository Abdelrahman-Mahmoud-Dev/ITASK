<template>
  <div>
    <v-card v-if="!shareDialog" class="pa-5">
      <v-card-title>
        <span class="text-h5 primary--text">{{$t('shareWithGrade')}}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
        <v-avatar class="mt-5" size="30">
            <img
            :src="user.avatar"
            >
        </v-avatar>
        <p class="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis nam sit fuga illum non quibusdam temporibus! Reprehenderit, officia fuga? Adipisci non laborum pariatur ab praesentium.</p>
        <v-select
        prepend-inner-icon="mdi-google-classroom"
        :label="$t('grade')"
        solo
        color="primary"
        :items="grades"
        >
        </v-select>

        <v-btn block color="primary" elevation="0" @click="shareDialog = true">{{$t('share')}}</v-btn>
        </v-card-text>
    </v-card>
    <v-card v-click-outside="closeDialog" v-else class="pa-5">
      <!-- <h2 class="extra-font primary--text text-center">{{$t('shareNote')}}</h2> -->
      <v-img v-if="$i18n.locale === 'en'" class="mx-auto" max-width="500" src="../../assets/img/msg.jpeg"></v-img>
      <v-img v-else class="mx-auto" max-width="500" src="../../assets/img/msg(ar).jpeg"></v-img>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      shareDialog: false
    }
  },
  methods: {
    closeDialog () {
      this.shareDialog = false
      this.selectedgroups = []
    }
  },
  computed: {
    ...mapState(['user']),
    grades () {
      return [this.$t('grade') + ' 10', this.$t('grade') + ' 11', this.$t('grade') + ' 13', this.$t('grade') + ' 4', this.$t('grade') + ' 15']
    }
  }
}
</script>
