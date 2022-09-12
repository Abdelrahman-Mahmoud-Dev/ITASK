<template>
    <div class="mb-15">
      <v-stepper v-if="!showExamDetails && $route.params.action !== 'myExams'" v-model="e1">
        <v-stepper-header>
          <v-stepper-step
          v-for="(item, i) in displayExam.questions"
          :key="i"
          :complete="e1 > i + 1"
          :step="i + 1"
          >
            {{item.title}}
          </v-stepper-step>

          <v-stepper-step
          :step="displayExam.questions.length + 1"
          >
            {{$t('result')}}
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content v-for="(item, j) in displayExam.questions" :key="j" :step="j + 1">
              <v-card
              elevation="0"
              class="mb-12"
              >
                  {{item.question}}
                  <v-row class="mt-5">
                      <v-col v-for="(answer) in item.answers" :key="answer.id" cols="12" sm="6">
                        <v-btn :disabled="showCorrectAnswer" block @click="item.userAnswer = answer" :outlined="item.userAnswer !== answer" color="primary">{{answer.answer}}</v-btn>
                      </v-col>
                  </v-row>
                  <p v-if="showCorrectAnswer" :class="item.userAnswer.id === item.correctAnswer.id ? 'success--text' : 'error--text'">
                    {{item.userAnswer.id === item.correctAnswer.id ? $t('correctAnswerNote') : $t('incorrectAnswerNote') }}
                  </p>
              </v-card>

              <v-btn
              v-if="!showCorrectAnswer && item.userAnswer.id"
              color="primary"
              @click="showCorrectAnswer = true"
              >
              {{$t('checkYourAnswer')}}
              </v-btn>

              <v-btn
              v-if="showCorrectAnswer"
              color="primary"
              @click="e1 = j + 2; showCorrectAnswer = false"
              >
              {{$t('next')}}
              </v-btn>
          </v-stepper-content>

          <v-stepper-content :step="displayExam.questions.length + 1">
              <v-card
              elevation="0"
              class="mb-12"
              >
                  {{$t('totalQuestions')}}: {{displayExam.questions.length}}<br>
                  {{$t('correctAnswers')}}: {{displayExam.questions.filter(item => item.correctAnswer.id === item.userAnswer.id).length}}<br>
                  {{$t('wrongAnswers')}}:  {{displayExam.questions.filter(item => item.correctAnswer.id !== item.userAnswer.id).length}}
                  <v-btn text color="blue" @click="showAnswers = !showAnswers">{{$t('showRightAnswers')}}</v-btn><br>
                  {{$t('timeTaken')}}: 10 {{$t('min')}}<br>

                  <div v-if="showAnswers">
                    <v-divider class="my-5"></v-divider>
                    <div v-for="(question, n) in displayExam.questions" :key="n">
                      <h4 class="primary--text mb-3">{{question.title + ' : ' + question.question}}</h4>
                      <h5 class="mb-3">{{question.correctAnswer.answer}}</h5>
                    </div>
                  </div>
              </v-card>

              <v-btn
              color="primary"
              @click="showExamDetails = true"
              >
              {{$t('showDetails')}}
              </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
      <v-card v-else-if="showExamDetails || ($route.params.action === 'myExams' && $route.name !== 'teacherExams' )" class="pt-5">
        <div class="d-flex justify-space-between px-5 my-2 text-start">
          <h5>{{$t('subject')}}: {{displayExam.subj}}</h5>
          <h5>{{$t('unit') + '/' + $t('lesson') + '/' + $t('chapter')}}: {{displayExam.lesson}}</h5>
        </div>
        <div class="d-flex justify-space-between px-5 my-2 text-start">
          <h5>{{$t('difficulty')}}: {{displayExam.level}}</h5>
          <h5>{{$t('examTime')}}: 90 {{$t('min')}}</h5>
        </div>
        <div class="d-flex justify-space-between px-5 mb-2 text-start">
          <h5>{{$t('totalQuestions')}}: {{displayExam.questions.length}}</h5>
          <h5>{{$t('timeTaken')}}: 50 {{$t('min')}}</h5>
        </div>
        <div class="d-flex justify-space-between px-5 mb-2 text-start">
          <h5>{{$t('correctAnswers')}}:
          {{displayExam.questions.filter(item => item.correctAnswer.id === item.userAnswer.id).length}}
          </h5>
          <h5>{{$t('wrongAnswers')}}: {{displayExam.questions.filter(item => item.correctAnswer.id !== item.userAnswer.id).length}}</h5>
        </div>
        <v-divider class="my-5"></v-divider>
        <v-card-text>
          <div v-for="(question, n) in displayExam.questions" :key="n" class="my-5">
            <h2 class="primary--text my-3">{{question.title}}</h2>
            <h4>{{question.question}} {{question.question}} {{question.question}} {{question.question}} <br> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolor rem doloribus eaque illum! Alias hic nisi sunt laborum minus! </h4>
            <!-- <h4 class="mb-3">{{$t('yourAnswer')}} : {{question.userAnswer.answer}}</h4> -->
            <v-row class="mt-2">
              <v-col cols="12" sm="6" v-for="answer in question.answers" :key="answer.id">
                <v-card outlined style="border-width: 2px !important;" :color="answer.id === question.correctAnswer.id ? 'success' : ''" class="text-center pa-2 body-1 black--text">{{answer.answer}}</v-card>
              </v-col>
            </v-row>
            <h3 class="mb-2 mt-3 primary--text">{{$t('answerDetails')}}</h3>
            <h4>{{question.correctAnswer.answer}} {{question.correctAnswer.answer}} {{question.correctAnswer.answer}} {{question.correctAnswer.answer}} {{question.correctAnswer.answer}} {{question.correctAnswer.answer}}</h4>
          </div>
          <v-divider></v-divider>
          <div>
            <v-btn @click="displayExam.loved = !displayExam.loved" small text>{{randomNumber()}}<v-icon small class="mx-1" :ripple="false"
            :color="displayExam.loved ? 'red' : 'primary'">{{displayExam.loved ? 'mdi-heart' : 'mdi-heart-outline'}}</v-icon></v-btn>
            <v-btn small text>{{comments.length}}<v-icon small class="mx-1" color="primary">mdi-comment-outline</v-icon></v-btn>
            <v-menu bottom>
                  <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" small text>{{randomNumber()}}<v-icon small class="mx-1" color="primary">mdi-share-variant</v-icon></v-btn>
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
                v-if="$route.params.action !== 'gift'"
                v-model="friendsDialogGift"
                width="700"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn small text v-bind="attrs" v-on="on">{{randomNumber()}}<v-icon small class="mx-1" color="primary">mdi-gift-outline</v-icon></v-btn>
                  </template>
                  <friends-list type= "send" />
                </v-dialog>
          </div>
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
        </v-card-text>
      </v-card>
      <v-card v-else-if="$route.name === 'teacherExams' && $route.params.action === 'myExams'" class="pt-5">
        <div class="d-flex justify-space-between px-5 my-2 text-start">
          <h5>{{$t('subject')}}: {{displayExam.subj}}</h5>
          <h5>{{$t('unit') + '/' + $t('lesson') + '/' + $t('chapter')}}: {{displayExam.lesson}}</h5>
        </div>
        <div class="d-flex justify-space-between px-5 my-2 text-start">
          <h5>{{$t('difficulty')}}: {{displayExam.level}}</h5>
          <h5>{{$t('examTime')}}: 90 {{$t('min')}}</h5>
        </div>
        <div class="d-flex justify-space-between px-5 mb-2 text-start">
          <h5>{{$t('totalQuestions')}}: {{displayExam.questions.length}}</h5>
          <h5>{{$t('grade')}}: 10</h5>
        </div>
        <!-- <div class="d-flex justify-space-between px-5 mb-2 text-start">
          <h5>{{$t('correctAnswers')}}:
          {{displayExam.questions.filter(item => item.correctAnswer.id === item.userAnswer.id).length}}
          </h5>
          <h5>{{$t('wrongAnswers')}}: {{displayExam.questions.filter(item => item.correctAnswer.id !== item.userAnswer.id).length}}</h5>
        </div> -->
        <v-divider class="my-5"></v-divider>
        <v-card-text>
          <div v-for="(question, n) in displayExam.questions" :key="n" class="my-5">
            <h2 class="primary--text my-3">{{question.title}}</h2>
            <h4>{{question.question}} {{question.question}} {{question.question}} {{question.question}} <br> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolor rem doloribus eaque illum! Alias hic nisi sunt laborum minus! </h4>
            <v-row class="my-3">
              <v-col cols="12" sm="6" v-for="answer in question.answers" :key="answer.id">
                <v-card outlined style="border-width: 2px !important;" :color="answer.id === question.correctAnswer.id ? 'success' : ''" class="text-center pa-2 body-1 black--text">{{answer.answer}}</v-card>
              </v-col>
            </v-row>
            <h3 class="mb-3">{{$t('correctAnswers')}} : {{question.correctAnswer.answer}}</h3>
          </div>
          <v-divider></v-divider>
          <div>
            <v-btn @click="displayExam.loved = !displayExam.loved" small text>{{randomNumber()}}<v-icon small class="mx-1" :ripple="false"
            :color="displayExam.loved ? 'red' : 'primary'">{{displayExam.loved ? 'mdi-heart' : 'mdi-heart-outline'}}</v-icon></v-btn>
            <v-btn small text>{{comments.length}}<v-icon small class="mx-1" color="primary">mdi-comment-outline</v-icon></v-btn>
            <v-menu bottom>
                  <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" small text>{{randomNumber()}}<v-icon small class="mx-1" color="primary">mdi-share-variant</v-icon></v-btn>
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

                    <v-list-item v-if="$route.path.includes('teacher')">
                        <v-list-item-icon><v-icon small color="primary">mdi-share-variant</v-icon></v-list-item-icon>
                        <v-list-item-content>
                        <v-dialog
                        v-model="gradesDialog"
                        width="700"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-btn text v-bind="attrs" v-on="on">{{$t('shareWithGrade')}}</v-btn>
                            </template>
                            <grades-list />
                        </v-dialog>
                        </v-list-item-content>
                    </v-list-item>

                    <!-- <v-list-item>
                      <v-list-item-icon><v-icon small color="primary">mdi-account-multiple</v-icon></v-list-item-icon>
                      <v-list-item-content>
                        <v-dialog
                        v-model="friendsDialog"
                        min-width="700"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn text v-bind="attrs" v-on="on">{{$t('friends')}}</v-btn>
                          </template>
                          <friends-list type="share" />
                        </v-dialog>
                      </v-list-item-content>
                    </v-list-item> -->
                  </v-list>
            </v-menu>
          </div>
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
        </v-card-text>
      </v-card>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import posts from '../../web services/posts'
import friendsList from '../static components/friendsList'
import groupsList from '../static components/groupsList'
import gradesList from '../../components/static components/gradesList'

export default {
  components: {
    friendsList,
    groupsList,
    gradesList
  },
  data: () => ({
    e1: 1,
    showAnswers: false,
    showCorrectAnswer: false,
    showExamDetails: false,
    exams: {
      en: {
        id: 3,
        subj: 'Chemistery',
        lesson: 'Neutron',
        level: 'Difficult',
        teacher: 'Alex More',
        loved: false,
        questions: [
          {
            title: 'First Question',
            question: 'What is the chemical symbol for the element Neutron?',
            answers: [
              { id: 'a', answer: 'Lorem ipsum dolor' },
              { id: 'b', answer: 'sit amet consectetur adipisicing' },
              { id: 'c', answer: 'ipsum dolor sit amet' },
              { id: 'd', answer: 'Maxime mollitia' }
            ],
            correctAnswer: { id: 'a', answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae' },
            userAnswer: {}
          },
          {
            title: 'Second Question',
            question: 'What is the chemical symbol for the element Neutron?',
            answers: [
              { id: 'a', answer: 'Lorem ipsum dolor' },
              { id: 'b', answer: 'sit amet consectetur adipisicing' },
              { id: 'c', answer: 'ipsum dolor sit amet' },
              { id: 'd', answer: 'Maxime mollitia' }
            ],
            correctAnswer: { id: 'c', answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae' },
            userAnswer: {}
          },
          {
            title: 'Third Question',
            question: 'What is the chemical symbol for the element Neutron?',
            answers: [
              { id: 'a', answer: 'Lorem ipsum dolor' },
              { id: 'b', answer: 'sit amet consectetur adipisicing' },
              { id: 'c', answer: 'ipsum dolor sit amet' },
              { id: 'd', answer: 'Maxime mollitia' }
            ],
            correctAnswer: { id: 'd', answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae' },
            userAnswer: {}
          },
          {
            title: 'Fouth Question',
            question: 'What is the chemical symbol for the element Neutron?',
            answers: [
              { id: 'a', answer: 'Lorem ipsum dolor' },
              { id: 'b', answer: 'sit amet consectetur adipisicing' },
              { id: 'c', answer: 'ipsum dolor sit amet' },
              { id: 'd', answer: 'Maxime mollitia' }
            ],
            correctAnswer: { id: 'b', answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae' },
            userAnswer: {}
          }
        ]
      },
      ar: {
        id: 3,
        subj: 'كيمياء',
        lesson: 'النيوترون',
        level: 'متوسط',
        teacher: 'محمد علي',
        loved: false,
        questions: [
          {
            title: 'السؤال الأول',
            question: 'ما هو الرمز الكيميائي للنيوتون ؟',
            answers: [
              { id: 'a', answer: 'لوريم ايبسوم أدايبا' },
              { id: 'b', answer: 'لوريم أيوسمود تيمبور' },
              { id: 'c', answer: 'لو أيوسمود تيمبور' },
              { id: 'd', answer: 'كونسيكتيتور أيوسمود تيمبور' }
            ],
            correctAnswer: { id: 'a', answer: 'لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور' },
            userAnswer: {}
          },
          {
            title: 'السؤال الثاني',
            question: 'ما هو الرمز الكيميائي للنيوتون ؟',
            answers: [
              { id: 'a', answer: 'لوريم ايبسوم أدايبا' },
              { id: 'b', answer: 'لوريم أيوسمود تيمبور' },
              { id: 'c', answer: 'لو أيوسمود تيمبور' },
              { id: 'd', answer: 'كونسيكتيتور أيوسمود تيمبور' }
            ],
            correctAnswer: { id: 'c', answer: 'لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور' },
            userAnswer: {}
          },
          {
            title: 'السؤال الثالث',
            question: 'ما هو الرمز الكيميائي للنيوتون ؟',
            answers: [
              { id: 'a', answer: 'لوريم ايبسوم أدايبا' },
              { id: 'b', answer: 'لوريم أيوسمود تيمبور' },
              { id: 'c', answer: 'لو أيوسمود تيمبور' },
              { id: 'd', answer: 'كونسيكتيتور أيوسمود تيمبور' }
            ],
            correctAnswer: { id: 'd', answer: 'لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور' },
            userAnswer: {}
          },
          {
            title: 'السؤال الرابع',
            question: 'ما هو الرمز الكيميائي للنيوتون ؟',
            answers: [
              { id: 'a', answer: 'لوريم ايبسوم أدايبا' },
              { id: 'b', answer: 'لوريم أيوسمود تيمبور' },
              { id: 'c', answer: 'لو أيوسمود تيمبور' },
              { id: 'd', answer: 'كونسيكتيتور أيوسمود تيمبور' }
            ],
            correctAnswer: { id: 'b', answer: 'لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور' },
            userAnswer: {}
          },
          {
            title: 'السؤال الخامس',
            question: 'ما هو الرمز الكيميائي للنيوتون ؟',
            answers: [
              { id: 'a', answer: 'لوريم ايبسوم أدايبا' },
              { id: 'b', answer: 'لوريم أيوسمود تيمبور' },
              { id: 'c', answer: 'لو أيوسمود تيمبور' },
              { id: 'd', answer: 'كونسيكتيتور أيوسمود تيمبور' }
            ],
            correctAnswer: { id: 'b', answer: 'لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور' },
            userAnswer: {}
          }
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
    userAnswers: ['', '', '', '', '', '', ''],
    comments: [],
    comment: {
      body: '',
      personal: true,
      likes: 0,
      liked: false
    },
    friendsDialog: false,
    groupsDialog: false,
    friendsDialogGift: false,
    gradesDialog: false
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
    if (this.$route.params.action === 'myExams') {
      this.displayExam.questions.forEach(element => {
        element.userAnswer = element.answers[Math.floor(Math.random() * element.answers.length)]
      })
    }
  }
}
</script>
