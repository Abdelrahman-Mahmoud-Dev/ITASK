<template>
    <div>
        <div class="d-flex py-1 flex-wrap align-center justify-space-between mb-1">
          <div class="caption mb-1 font-weight-bold secondary--text">{{$t("topTeachers")}}</div>
          <v-btn  @click="$router.push('/teachers/top')" color="blue mb-1" text x-small>{{$t("seeAll")}}</v-btn>
        </div>
        <div style="overflow: auto;" class="d-flex align-start" v-if="topTeachers.length">
            <div
            @click="$router.push('/teacher')"
            class="text-center mx-3"
            v-for="(item) in topTeachers"
            :key="item.id"
            >
                <v-avatar size="70">
                    <v-img :src="item.avatar"></v-img>
                </v-avatar>

                <div class="body-2 font-weight-bold secondary--text text-no-wrap">{{item.name}}</div>

                <div class="caption">{{item.rate || 2}} <v-icon x-small color="warning">mdi-star</v-icon></div>

                <div class="caption">{{item.subj}}</div>
            </div>
        </div>
        <p v-else class="text-center mt-5">{{$t('emptyRequests')}}</p>
    </div>
</template>

<script>
export default {
  data () {
    return {
      topTeachers: []
    }
  },
  created () {
    setTimeout(() => {
      this.topTeachers = this.$store.state.topTeachers
    }, 1000)
  }
}
</script>
