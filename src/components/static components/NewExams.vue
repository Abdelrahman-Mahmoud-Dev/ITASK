<template>
    <div>
        <div class="sticky-header py-1 d-flex flex-wrap align-center justify-space-between">
          <div class="body-2 font-weight-bold mb-1 secondary--text">{{$t("newExams")}}</div>
          <v-btn @click="$router.push('/new-exams')" color="blue mb-1" text x-small>{{$t("seeAll")}}</v-btn>
        </div>
        <div v-if="exams">
          <v-list three-line>
              <v-list-item
              @click="$router.push('/exam/1')"
              v-for="(item) in displayExams"
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
                  <v-list-item-subtitle>{{item.level}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
          </v-list>
        </div>
        <p v-else class="text-center mt-5">{{$t('emptyRequests')}}</p>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      exams: {
        en: [
          {
            id: 3,
            subj: 'Chemistery',
            lesson: 'Neutron',
            level: 'Difficult',
            image: 'chem.svg'
          },
          {
            id: 4,
            subj: 'Biology',
            lesson: 'Cell',
            level: 'Easy',
            image: 'bio.svg'
          },
          {
            id: 5,
            subj: 'Arabic',
            lesson: 'Grammar',
            level: 'Easy',
            image: 'ar.svg'
          },
          {
            id: 1,
            subj: 'Math',
            lesson: 'Algebra',
            level: 'Easy',
            image: 'math.svg'
          },
          {
            id: 2,
            subj: 'Physics',
            lesson: 'Atom',
            level: 'Medium',
            image: 'physics.svg'
          }
        ],
        ar: [
          {
            id: 3,
            subj: 'كيمياء',
            lesson: 'النيوترون',
            level: 'متوسط',
            image: 'chem.svg'
          },
          {
            id: 4,
            subj: 'أحياء',
            lesson: 'الخلايا',
            level: 'صعب',
            image: 'bio.svg'
          },
          {
            id: 5,
            subj: 'العربية',
            lesson: 'النحو',
            level: 'سهل',
            image: 'ar.svg'
          },
          {
            id: 1,
            subj: 'رياضيات',
            lesson: 'الجبر',
            level: 'سهل',
            image: 'math.svg'
          },
          {
            id: 2,
            subj: 'فيزياء',
            lesson: 'الذرة',
            level: 'صعب',
            image: 'physics.svg'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState(['images']),
    displayExams () {
      if (this.$i18n.locale === 'en') return this.exams.en
      else return this.exams.ar
    }
  }
}
</script>
