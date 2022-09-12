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
      </v-col>

      <v-col cols="12" md="6" xl="8">
        <v-sheet class="grey lighten-3 scrollable-sheet" height="87vh" rounded="lg">
            <div v-if="requests.length" class="d-flex flex-wrap">
                <v-card class="ma-2 text-center" width="30%" v-for="item in requests" :key="item.id">
                    <v-img height="200" :src="item.avatar"></v-img>
                    <v-card-title class="text-center">
                    <h2 class="body-1 mx-auto secondary--text">{{ item.name }}</h2>
                    </v-card-title>
                    <v-list-item-subtitle>{{Math.floor(Math.random() * 15) + ' ' + $t('mutualFriend')}}</v-list-item-subtitle>
                    <v-card-actions class="d-flex flex-wrap justify-center">
                        <v-btn small elevation="0" color="primary" @click="requests.splice(index, 1);">{{ $t('accept') }}</v-btn>
                        <v-btn small outlined color="primary" @click="requests.splice(index, 1);">{{ $t('reject') }}</v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </v-sheet>
      </v-col>

      <v-col cols="12" md="3" xl="2">
        <v-sheet class="scrollable-sheet" color="grey lighten-3" height="81vh">
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
import NewNotes from '@/components/static components/NewNotes'
import NewExams from '@/components/static components/NewExams'
import NewTeachers from '@/components/static components/NewTeachers'
import TopTeachers from '@/components/static components/TopTeachers'
import { mapState } from 'vuex'

export default {
  components: {
    SideMenu,
    NewNotes,
    NewExams,
    NewTeachers,
    TopTeachers
  },
  name: 'Home',
  data: () => ({
    requests: []
  }),
  computed: {
    ...mapState(['users'])
  },
  methods: {
    closeForm () {
      this.showPostForm = false
    }
  },
  created () {
    this.requests = this.users
  }
}
</script>
