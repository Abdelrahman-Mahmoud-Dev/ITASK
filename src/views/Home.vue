<template>
  <div class="home">
    <v-row>
      <!--  -->
      <v-col cols="12" md="3" xl="2">
        <!-- menu -->
        <v-sheet rounded="lg" max-height="53vh" style="overflow: auto;" class="mb-3">
          <div>
            <side-menu></side-menu>
          </div>
        </v-sheet>

        <!-- friends requests -->
         <v-sheet rounded="lg" height="32vh" style="overflow: auto;" class="pa-2 pt-0">
          <div>
            <friend-requests />
          </div>
        </v-sheet>
      </v-col>

      <v-col cols="12" md="6" xl="8">
        <v-sheet class="grey lighten-3 scrollable-sheet" height="87vh" rounded="lg">
          <!-- story container -->
          <v-sheet rounded="xl" height="90px">
            <stories-list />
          </v-sheet>

          <!-- post form container -->
          <v-sheet v-show="!showPostForm" @click="showPostForm = true" rounded="lg" class="mt-3">
            <post-form />
          </v-sheet>

          <v-sheet style="position: relative;" v-show="showPostForm" rounded="lg" class="my-5 pa-5">
            <post-form-card @closeForm="closeForm" />
          </v-sheet>

          <!-- posts -->
          <v-sheet v-show="!showPostForm && posts.length" color="grey lighten-3" class="mt-3 scrollable-sheet" height="65vh">
            <div v-for="(item, i) in posts" :key="item.id">
              <div class="mb-5" v-if=" i === 3">
                <top-rated />
              </div>
              <post v-else :post="item" />
            </div>
          </v-sheet>
        </v-sheet>
      </v-col>

      <v-col cols="12" md="3" xl="2">
        <v-sheet class="scrollable-sheet" color="grey lighten-3" height="85vh">
          <!-- new notes -->
          <v-sheet rounded="lg" style="overflow: auto;" height="25vh" class="mb-5 pa-2 pt-0">
            <new-notes />
          </v-sheet>

          <!-- new exams -->
          <v-sheet rounded="lg" style="overflow: auto;" height="25vh" class="mb-5 pa-2 pt-0">
            <NewExams />
          </v-sheet>

          <!-- new teachers -->
          <v-sheet rounded="lg" class="mb-5 pa-2 pt-0">
            <new-teachers />
          </v-sheet>

          <!-- top ten teachers -->
          <v-sheet rounded="lg" class="pa-2 pt-0">
            <top-teachers />
          </v-sheet>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import SideMenu from '@/components/static components/SideMenu'
import FriendRequests from '@/components/static components/FriendRequests'
import NewNotes from '@/components/static components/NewNotes'
import topRated from '@/views/notes/topRated'
import NewExams from '@/components/static components/NewExams'
import NewTeachers from '@/components/static components/NewTeachers'
import TopTeachers from '@/components/static components/TopTeachers'
import StoriesList from '@/components/stories/StoriesList'
import PostForm from '@/components/posts/PostForm'
import PostFormCard from '@/components/posts/PostFormCard'
import post from '@/components/posts/post'
import { mapState } from 'vuex'

export default {
  components: {
    SideMenu,
    FriendRequests,
    NewNotes,
    NewExams,
    NewTeachers,
    TopTeachers,
    StoriesList,
    PostForm,
    PostFormCard,
    post,
    topRated
  },
  name: 'Home',
  data: () => ({
    showPostForm: false
  }),
  computed: {
    ...mapState(['posts'])
  },
  methods: {
    closeForm () {
      this.showPostForm = false
    }
  }
}
</script>
