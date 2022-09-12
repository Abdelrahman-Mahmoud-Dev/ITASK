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
            <v-card class="mb-5 pa-3" v-for="(item) in displayExam" :key="item.id">
              <v-card-title class="d-flex body-1 py-0 justify-space-between">
                  <div class="exam-title-segment"><v-icon color="primary" class="mb-2">mdi-book</v-icon>{{item.subj}}</div>
                  <div class="exam-title-segment"><v-icon color="primary" class="mb-2">mdi-account</v-icon>{{item.teacher}}</div>
                  <v-rating
                  class="exam-title-segment"
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
                  :value="4.5"
                  ></v-rating>
              </v-card-title>
              <v-card-title class="d-flex py-0 body-2 justify-space-between">
                  <div class="exam-title-segment"><v-icon color="primary" class="">mdi-book-open-variant</v-icon>{{item.lesson}}</div>
                  <div class="exam-title-segment"><v-icon color="primary" class="">mdi-arrow-up-bold-hexagon-outline</v-icon>{{item.level}}</div>
                  <div class="exam-title-segment"><v-icon color="primary" class="">mdi-counter</v-icon>{{$tc('question', item.questions.length)}}</div>
              </v-card-title>
              <v-card-text>
                <h4 class="mt-5 secondary--text">{{item.questions[0].title}}</h4>
                <p class="body-1">{{item.questions[0].question}}</p>
                <v-row>
                  <v-col v-for="answer in item.questions[0].answers" :key="answer" cols="12" sm="6">
                    <v-btn block outlined color="primary" depressed>{{answer}}</v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                  <v-btn @click="$router.push('/exam/' + item.id)" small text color="secondary">{{ $t('seeMore') }}</v-btn>
                  <v-spacer></v-spacer>
                  <div>
                      <v-btn text>{{Math.floor(Math.random() * 200)}}<v-icon class="mx-1" color="primary">mdi-eye-outline</v-icon></v-btn>
                      <v-btn text>{{Math.floor(Math.random() * 200)}}<v-icon class="mx-1" color="primary">mdi-heart-outline</v-icon></v-btn>
                      <v-btn text>{{Math.floor(Math.random() * 200)}}<v-icon class="mx-1" color="primary">mdi-thumb-up-outline</v-icon></v-btn>
                  </div>
              </v-card-actions>
            </v-card>
        </v-sheet>
      </v-col>

      <v-col cols="12" md="3" xl="2">
        <v-sheet class="scrollable-sheet" color="grey lighten-3" height="81vh">
          <!-- new notes -->
          <v-sheet rounded="lg" style="overflow: auto;" height="25vh" class="mb-5 pa-2 pt-0">
            <new-notes />
          </v-sheet>

          <!-- new exams -->
          <v-sheet v-if="$route.name === 'exams'" rounded="lg" style="overflow: auto;" height="25vh" class="mb-5 pa-2 pt-0">
            <new-exams />
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
import NewExams from '@/components/static components/NewExams'
import NewTeachers from '@/components/static components/NewTeachers'
import TopTeachers from '@/components/static components/TopTeachers'
import { mapState } from 'vuex'

export default {
  components: {
    SideMenu,
    FriendRequests,
    NewNotes,
    NewTeachers,
    TopTeachers,
    NewExams
  },
  name: 'Home',
  data: () => ({
    exams: {
      en: [
        {
          id: 3,
          subj: 'Chemistery',
          lesson: 'Neutron',
          level: 'Difficult',
          teacher: 'Alex More',
          questions: [
            { title: 'First Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'Second Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'Third Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'Fouth Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'Fifth Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'Sixth Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'Seventh Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' }
          ]
        },
        {
          id: 4,
          subj: 'Biology',
          lesson: 'Cell',
          level: 'Easy',
          teacher: 'Alex More',
          questions: [
            { title: 'First Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'Second Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'Third Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'Fouth Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'Fifth Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'Sixth Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'Seventh Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' }
          ]
        },
        {
          id: 5,
          subj: 'Arabic',
          lesson: 'Grammar',
          level: 'Easy',
          teacher: 'Alex More',
          questions: [
            { title: 'First Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'Second Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'Third Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'Fouth Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'Fifth Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'Sixth Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'Seventh Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' }
          ]
        },
        {
          id: 1,
          subj: 'Math',
          lesson: 'Algebra',
          level: 'Easy',
          teacher: 'Alex More',
          questions: [
            { title: 'First Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'Second Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'Third Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'Fouth Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'Fifth Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'Sixth Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'Seventh Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' }
          ]
        },
        {
          id: 2,
          subj: 'Physics',
          lesson: 'Atom',
          level: 'Medium',
          teacher: 'Alex More',
          questions: [
            { title: 'First Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'Second Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'Third Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'Fouth Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'Fifth Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'Sixth Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'Seventh Question', question: 'What is the chemical symbol for the element Neutron?', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' }
          ]
        }
      ],
      ar: [
        {
          id: 3,
          subj: 'كيمياء',
          lesson: 'النيوترون',
          level: 'متوسط',
          teacher: 'محمد علي',
          questions: [
            { title: 'السؤال الأول', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'السؤال الثاني', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'السؤال الثالث', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'السؤال الرابع', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'السؤال الخامس', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'السؤال السادس', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'السؤال السابع', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' }
          ]
        },
        {
          id: 4,
          subj: 'أحياء',
          lesson: 'الخلايا',
          level: 'صعب',
          teacher: 'محمد علي',
          questions: [
            { title: 'السؤال الأول', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'السؤال الثاني', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'السؤال الثالث', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'السؤال الرابع', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'السؤال الخامس', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'السؤال السادس', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'السؤال السابع', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' }
          ]
        },
        {
          id: 5,
          subj: 'العربية',
          lesson: 'النحو',
          level: 'سهل',
          teacher: 'محمد علي',
          questions: [
            { title: 'السؤال الأول', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'السؤال الثاني', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'السؤال الثالث', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'السؤال الرابع', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'السؤال الخامس', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'السؤال السادس', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'السؤال السابع', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' }
          ]
        },
        {
          id: 1,
          subj: 'رياضيات',
          lesson: 'الجبر',
          level: 'سهل',
          teacher: 'محمد علي',
          questions: [
            { title: 'السؤال الأول', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'السؤال الثاني', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'السؤال الثالث', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'السؤال الرابع', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'السؤال الخامس', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'السؤال السادس', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'السؤال السابع', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' }
          ]
        },
        {
          id: 2,
          subj: 'فيزياء',
          lesson: 'الذرة',
          level: 'صعب',
          teacher: 'محمد علي',
          questions: [
            { title: 'السؤال الأول', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'السؤال الثاني', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'السؤال الثالث', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'السؤال الرابع', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'السؤال الخامس', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'السؤال السادس', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' },
            { title: 'السؤال السابع', question: 'ما هو الرمز الكيميائي للنيوتون ؟', answers: ['Le', 'Ch', 'Re', 'Ne'], answer: 'Ne' }
          ]
        }
      ]
    }
  }),
  computed: {
    ...mapState(['images']),
    displayExam () {
      if (this.$i18n.locale === 'en') return this.exams.en
      else return this.exams.ar
    }
  }
}
</script>

<style>
.exam-title-segment {
  width: 30%;
}
</style>
