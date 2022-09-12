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
          <v-card class="mb-5 pa-3">
            <v-card-title class="d-flex body-1 py-0 justify-space-between">
                  <div class="exam-title-segment"><v-icon color="primary" class="mb-2">mdi-book</v-icon>{{displayExam.subj}}</div>
                  <div class="exam-title-segment"><v-icon color="primary" class="mb-2">mdi-account</v-icon>{{displayExam.teacher}}</div>
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
                  <div class="exam-title-segment"><v-icon color="primary" class="">mdi-book-open-variant</v-icon>{{displayExam.lesson}}</div>
                  <div class="exam-title-segment"><v-icon color="primary" class="">mdi-arrow-up-bold-hexagon-outline</v-icon>{{displayExam.level}}</div>
                  <div class="exam-title-segment"><v-icon color="primary" class="">mdi-counter</v-icon>{{$tc('question', displayExam.questions.length)}}</div>
              </v-card-title>
            <v-card-text v-for="(item, i) in displayExam.questions" :key="i + 'q'">
              <h4 class="mt-5 secondary--text">{{item.title}}</h4>
              <p class="body-1">{{item.question}}</p>
              <v-row>
                <v-col v-for="answer in item.answers" :key="answer" cols="12" sm="6">
                  <v-btn block outlined color="primary" depressed>{{answer}}</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
                <div>
                    <v-btn small text>{{randomNumber()}}<v-icon small class="mx-1" color="primary">mdi-eye-outline</v-icon></v-btn>
                    <v-btn small text>{{randomNumber()}}<v-icon small class="mx-1" color="primary">mdi-heart-outline</v-icon></v-btn>
                    <v-btn small text>{{randomNumber()}}<v-icon small class="mx-1" color="primary">mdi-thumb-up-outline</v-icon></v-btn>
                    <v-btn small text>{{comments.length}}<v-icon small class="mx-1" color="primary">mdi-comment-outline</v-icon></v-btn>
                    <v-menu bottom>
                      <template v-slot:activator="{ on, attrs }">
                      <v-btn :disabled="!bought" v-bind="attrs" v-on="on" small text>{{randomNumber()}}<v-icon small class="mx-1" color="primary">mdi-share-variant</v-icon></v-btn>
                      </template>

                      <v-list>
                        <v-list-item>
                          <v-list-item-icon><v-icon small color="primary">mdi-account-group</v-icon></v-list-item-icon>
                          <v-list-item-content>
                            <v-dialog
                            v-model="groupsDialog"
                            width="700"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn text v-bind="attrs" v-on="on">{{$t('groups')}}</v-btn>
                              </template>
                              <groups-list type="share" />
                            </v-dialog>
                          </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                          <v-list-item-icon><v-icon small color="primary">mdi-account-multiple</v-icon></v-list-item-icon>
                          <v-list-item-content>
                            <v-dialog
                            v-model="friendsDialog"
                            width="700"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn text v-bind="attrs" v-on="on">{{$t('friends')}}</v-btn>
                              </template>
                              <friends-list type="share" />
                            </v-dialog>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                    <v-dialog
                    v-model="friendsDialogGift"
                    width="700"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn :disabled="!bought" small text v-bind="attrs" v-on="on">{{randomNumber()}}<v-icon small class="mx-1" color="primary">mdi-gift-outline</v-icon></v-btn>
                      </template>
                      <friends-list type="send" />
                    </v-dialog>
                    <!-- <v-btn small text v-if="bought">{{randomNumber()}}<v-icon small class="mx-1" color="primary">mdi-gift-outline</v-icon></v-btn> -->
                </div>
                <v-spacer></v-spacer>
                <v-btn v-if="bought" color="primary" small elevation="0" @click="$router.push({path: '/profile/exams/exams', query: {show: true}})">{{$t('takeExam')}}</v-btn>
                <v-dialog
                v-model="orderDialog"
                width="700"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-if="!bought" color="primary" small elevation="0" v-bind="attrs" v-on="on">{{$t('orderExam')}}</v-btn>
                    </template>

                    <v-card class="pt-5">
                        <h2 class="extra-font text-center mb-3">{{$t('orderExamTitle')}}</h2>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-btn
                            color="primary"
                            outlined
                            @click="orderDialog = false"
                            >
                                {{$t('reject')}}
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn
                            color="primary"
                            elevation="0"
                            @click="orderDialog = false; confirmDialog = true; bought = true"
                            >
                                {{$t('accept')}}
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog
                v-model="confirmDialog"
                width="500"
                >
                    <v-card class="pa-5">
                      <!-- <h2 class="extra-font primary--text text-center">{{$t('orderExamSuccess')}}</h2> -->
                      <v-img v-if="$i18n.locale === 'en'" class="mx-auto" max-width="500" src="../../assets/img/msg.jpeg"></v-img>
                      <v-img v-else class="mx-auto" max-width="500" src="../../assets/img/msg(ar).jpeg"></v-img>
                    </v-card>
                </v-dialog>
            </v-card-actions>
            <v-divider></v-divider>
            <v-card-text v-if="comments.length">
                <div v-for="(item, i) in comments" :key="item.id">
                    <v-card outlined class="pa-3">
                        <div>
                            <v-avatar size="30">
                                <img
                                :src="item.personal ? user.avatar : users[i].avatar"
                                >
                            </v-avatar>
                            <span class="mx-2">{{item.personal ? user.name : users[i].name}}</span>
                        </div>
                        <v-card-text>{{item.body}}</v-card-text>
                    </v-card>
                    <v-btn
                    text
                    @click="likeComment(item)"
                    >
                        {{item.likes}}
                        <v-icon class="mx-1" :color="item.liked ? 'error' : 'primary'">{{item.liked ? 'mdi-heart' : 'mdi-heart-outline'}}</v-icon>
                    </v-btn>
                </div>

                <div class="sticky-btn">
                    <v-text-field
                    rounded
                    dense
                    append-icon="mdi-send"
                    @click:append="addComment"
                    v-model="comment.body"
                    :placeholder="$t('comment')"
                    outlined
                    hide-details
                    class="my-2"
                    style="width: 100%"
                    @keyup.enter.prevent="addComment"
                    ></v-text-field>
                </div>
            </v-card-text>
          </v-card>
        </v-sheet>
      </v-col>

      <v-col cols="12" md="3" xl="2">
        <v-sheet class="scrollable-sheet" color="grey lighten-3" height="81vh">
          <!-- new exams -->
          <v-sheet rounded="lg" style="overflow: auto;" height="25vh" class="mb-5 pa-2 pt-0">
            <new-notes />
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
import NewTeachers from '@/components/static components/NewTeachers'
import TopTeachers from '@/components/static components/TopTeachers'
import { mapState } from 'vuex'
import posts from '../../web services/posts'
import friendsList from '../../components/static components/friendsList'
import groupsList from '../../components/static components/groupsList'

export default {
  components: {
    SideMenu,
    FriendRequests,
    NewNotes,
    NewTeachers,
    TopTeachers,
    friendsList,
    groupsList
  },
  name: 'Home',
  data: () => ({
    exams: {
      en: {
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
      ar: {
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
      }
    },
    allExams: {
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
    },
    orderDialog: false,
    confirmDialog: false,
    comments: [],
    comment: {
      body: '',
      personal: true,
      likes: 0,
      liked: false
    },
    bought: false,
    friendsDialog: false,
    groupsDialog: false,
    friendsDialogGift: false
  }),
  computed: {
    ...mapState(['images', 'users', 'user']),
    displayExam () {
      if (this.$i18n.locale === 'en') return this.exams.en
      else return this.exams.ar
    }
  },
  methods: {
    randomNumber () {
      return Math.floor(Math.random() * 200)
    },
    likeComment (comment) {
      if (comment.liked) {
        this.comments.find(item => item.id === comment.id).likes--
        this.comments.find(item => item.id === comment.id).liked = false
      } else {
        this.comments.find(item => item.id === comment.id).likes++
        this.comments.find(item => item.id === comment.id).liked = true
      }
    },
    getComments () {
      if (!this.comments.length) {
        posts.postComments(1).then(res => {
          res.data.forEach(item => {
            item.personal = false
            item.likes = Math.floor(Math.random() * 100)
            item.liked = false
          })
          this.comments = res.data
        })
      }
      this.showCommentsBox = !this.showCommentsBox
    },
    addComment () {
      if (this.comment.body) {
        this.comment.id = this.comments[0].id - 1
        this.comments.unshift(this.comment)
        this.comment = {
          body: '',
          personal: true,
          likes: 0,
          liked: false
        }
      }
    }
  },
  updated () {
    const lang = this.$i18n.locale
    // this.$vuetify.rtl = lang === 'ar'
    // this.moveChatBox(lang === 'ar' ? 'left' : 'right')
    const els = document.getElementsByClassName('extra-font')
    if (els.length) {
      for (let i = 0; i < els.length; i++) {
        els[i].style.fontFamily = lang === 'ar' ? 'arabic' : 'english'
      }
    }
  },
  created () {
    if (this.$route.params.id) {
      this.exams.ar = this.allExams.ar.find(item => item.id === parseInt(this.$route.params.id))
      this.exams.en = this.allExams.en.find(item => item.id === parseInt(this.$route.params.id))
    }
    this.getComments()
  }
}
</script>
