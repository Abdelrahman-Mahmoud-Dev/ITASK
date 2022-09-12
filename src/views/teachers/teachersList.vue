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
        <v-sheet class="white scrollable-sheet" height="87vh" rounded="lg">
            <v-row v-if="requests.length" class="pa-5">
                <v-col cols="12" sm="6" md="4" v-for="item in requests" :key="item.id">
                    <div class="text-center">
                        <v-img class="rounded-circle mx-auto" width="100" :src="item.avatar"></v-img>
                        <v-card-title class="text-center">
                            <h2 class="body-1 mx-auto secondary--text">{{ item.name }}</h2>
                        </v-card-title>
                        <v-rating
                        background-color="warning lighten-1"
                        color="warning"
                        dense
                        empty-icon="mdi-star-outline"
                        full-icon="mdi-star"
                        half-icon="mdi-star-half-full"
                        half-increments
                        hover
                        length="5"
                        readonly
                        size="10"
                        value="4.5"
                        ></v-rating>
                        <v-list-item-subtitle>
                            {{$i18n.locale === 'ar' ? allSubjects[Math.floor(Math.random() * allSubjects.length)].ar : allSubjects[Math.floor(Math.random() * allSubjects.length)].en}}
                        </v-list-item-subtitle>
                    </div>
                </v-col>
            </v-row>
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
          <v-sheet v-if="$route.params.type !== 'new'" rounded="lg" class="mb-5 pa-2 pt-0">
            <new-teachers />
          </v-sheet>

          <!-- top ten teachers -->
          <v-sheet v-else rounded="lg" class="pa-2 pt-0">
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
import FriendRequests from '@/components/static components/FriendRequests'
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
    TopTeachers,
    FriendRequests
  },
  name: 'Home',
  data: () => ({
    requests: [],
    allSubjects: [
      { id: 1, ar: 'لغة عربية', en: 'Arabic' },
      { id: 2, ar: 'لغة إنجليزية', en: 'English' },
      { id: 3, ar: 'رياضيات', en: 'Math' },
      { id: 4, ar: 'أحياء', en: 'Biology' },
      { id: 5, ar: 'كيمياء', en: 'Chemistery' },
      { id: 6, ar: 'لغة فرنسية', en: 'French' }
    ]
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
