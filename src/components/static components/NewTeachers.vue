<template>
    <div>
        <div class="d-flex py-1 mb-1 flex-wrap align-center justify-space-between">
          <div class="caption mb-1 font-weight-bold secondary--text">{{$t("newTeachers")}}</div>
          <v-btn @click="$router.push('/teachers/new')" color="blue mb-1" text x-small>{{$t("seeAll")}}</v-btn>
        </div>
        <div style="overflow: auto;" class="d-flex align-start" v-if="newTeachers.length">
            <div
            class="text-center mx-3"
            v-for="(item) in newTeachers"
            :key="item.id"
            @click="$router.push('/teacher')"
            >
                <v-avatar size="70" class="rounded-lg">
                    <v-img :src="item.avatar"></v-img>
                </v-avatar>

                <div class="body-2 font-weight-bold secondary--text text-no-wrap">{{item.name}}</div>

                <div class="caption">{{item.subj}}</div>

                <div class="caption">{{item.grade}}</div>
            </div>
        </div>
        <p v-else class="text-center mt-5">{{$t('emptyRequests')}}</p>
    </div>
</template>

<script>
export default {
  data () {
    return {
      newTeachers: []
    }
  },
  created () {
    setTimeout(() => {
      this.newTeachers = this.$store.state.newTeachers
    }, 1000)
  }
}
</script>
