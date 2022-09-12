<template>
    <div class="d-flex avatar-cont align-items-center pa-3">
        <!-- <v-img width="50" height="60" class="bordered mx-1"  :src=""></v-img> -->
        <div class="avatar-personal mx-2">
            <v-avatar @click="$router.push('/stories/user')" v-if="user" size="50">
                <img
                class="bordered"
                :src="user.avatar"
                :alt="user.name"
                >
            </v-avatar>
            <p class="d-block text-center text-truncate caption">{{$t('yourStory')}}</p>
            <div class="add-btn rounded-circle text-center"><v-icon @click="$router.push('/addStory')" class="mb-2" small color="white">mdi-plus</v-icon></div>
            <!-- <v-btn fab x-small elevation="0" absolute bottom color="primary"><v-icon>mdi-plus</v-icon></v-btn> -->
        </div>
        <div v-for="item in users" :key="item.id">
            <v-avatar @click="$router.push('/stories/friend')" size="50" class="mx-2" style="cursor: pointer;">
                <img
                class="bordered"
                :src="item.avatar"
                :alt="item.name"
                >
            </v-avatar>
            <p class="d-block text-center text-truncate caption">{{item.name.split(' ')[0]}}</p>
        </div>
        <div id="more-btn" class="more-btn rounded-circle text-center"><v-icon @click="$router.push('/stories/friend')" class="mb-1" color="white">{{$i18n.locale === 'en' ? 'mdi-chevron-right' : 'mdi-chevron-left'}}</v-icon></div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapState(['user', 'users', 'images'])
  }
}
</script>

<style>
.bordered {
    border: 3px solid #F9BA16;
    /* border-radius: 50%; */
}
.avatar-cont {
    position: relative;
    overflow: hidden;
}
.avatar-personal {
    width: 60px;
    height: 60px;
    position: relative;
    cursor: pointer;
}
.add-btn {
    width: 20px;
    height: 20px;
    position: absolute;
    bottom: 10px;
    right: 10px;
    cursor: pointer;
    background-color: #F9BA16;
    border: 1px solid #fff;
}
.more-btn {
    width: 25px;
    height: 25px;
    position: absolute;
    bottom: 52%;
    right: -1px;
    cursor: pointer;
    background-color: #F9BA16;
    border: 1px solid white;
}
</style>
