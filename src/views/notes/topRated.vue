<template>
    <v-card>
        <div class="sticky-header d-flex py-1 flex-wrap align-center justify-space-between">
          <div class="body-2 font-weight-bold secondary--text">{{$t("topNotes")}}</div>
          <v-btn @click="$router.push('/new-notes')" color="blue" text x-small>{{$t("seeAll")}}</v-btn>
        </div>
        <div v-if="notes">
            <v-slide-group
            class="pa-4"
            active-class="success"
            show-arrows
            >
            <v-slide-item
            v-for="item in displayNotes"
            :key="item.id"
            >
                <div
                class="mx-2"
                @click="$router.push('/note/' + item.id)"
                >
                    <v-img class="rounded-xl" width="150" height="150" :src="require(`@/assets/icons/${item.image}`)"></v-img>
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
                    size="20"
                    :value="4.5"
                    ></v-rating>
                    <div class="my-2">
                        {{Math.round(Math.random() * 200)}} <v-icon class="mx-2" color="primary">mdi-eye</v-icon>
                        {{Math.round(Math.random() * 200)}} <v-icon color="primary">mdi-download</v-icon>
                    </div>
                    <div></div>
                    <div>{{item.subj}} <br> {{item.lesson}} <br> {{item.teacher}}</div>
                </div>
            </v-slide-item>
            </v-slide-group>
          <!-- <v-list three-line class="pt-0">
              <v-list-item
               @click="$router.push('/note/1')"
              v-for="(item) in displayNotes"
              :key="item.id"
              >
                <v-list-item-avatar size="80" class="rounded-lg">
                  <v-img :src="require(`@/assets/icons/${item.image}`)"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title class="secondary--text">
                    <div>{{item.subj}}</div>
                  </v-list-item-title>
                  <v-list-item-subtitle>{{item.lesson}}</v-list-item-subtitle>
                  <v-list-item-subtitle>{{item.teacher}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
          </v-list> -->
        </div>
    </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      model: 0,
      notes: {
        en: [
          {
            id: 1,
            subj: 'Math',
            lesson: 'Algebra',
            teacher: 'John Doe',
            image: 'math.svg'
          },
          {
            id: 2,
            subj: 'Physics',
            lesson: 'Atom',
            teacher: 'John Doe',
            image: 'physics.svg'
          },
          {
            id: 3,
            subj: 'Chemistery',
            lesson: 'Neutron',
            teacher: 'John Doe',
            image: 'chem.svg'
          },
          {
            id: 4,
            subj: 'Biology',
            lesson: 'Cell',
            teacher: 'John Doe',
            image: 'bio.svg'
          },
          {
            id: 5,
            subj: 'Arabic',
            lesson: 'Grammar',
            teacher: 'John Doe',
            image: 'ar.svg'
          }
        ],
        ar: [
          {
            id: 1,
            subj: 'رياضيات',
            lesson: 'الجبر',
            teacher: 'محمد علي',
            image: 'math.svg'
          },
          {
            id: 2,
            subj: 'فيزياء',
            lesson: 'الذرة',
            teacher: 'إيناس أحمد',
            image: 'physics.svg'
          },
          {
            id: 3,
            subj: 'كيمياء',
            lesson: 'النيوترون',
            teacher: 'ماكس ملنر',
            image: 'chem.svg'
          },
          {
            id: 4,
            subj: 'أحياء',
            lesson: 'الخلية',
            teacher: 'محمد علي',
            image: 'bio.svg'
          },
          {
            id: 5,
            subj: 'لغة عربية',
            lesson: 'نحو',
            teacher: 'إيناس أحمد',
            image: 'ar.svg'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState(['images']),
    displayNotes () {
      if (this.$i18n.locale === 'en') return this.notes.en
      else return this.notes.ar
    }
  }
}
</script>
