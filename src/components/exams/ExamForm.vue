<template>
    <v-container>
        <v-stepper v-model="e1">
            <v-stepper-header>
                <v-stepper-step
                v-for="i in 3"
                :key="i"
                :complete="e1 > i"
                :step="i"
                editable
                >
                    {{$t('questions') + ' ' + i}}
                </v-stepper-step>

                <v-stepper-step
                :step="4"
                >
                    {{$t('preview')}}
                </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content v-for="j in 3" :key="j" :step="j">
                    <v-card
                    elevation="0"
                    class="mb-12"
                    >
                        <v-text-field :label="$t('questions')" hide-details class="mt-2" outlined v-model="questions[j - 1].question"></v-text-field>
                        <!-- <h3 v-else class="peimary--text font-weight-bold">{{displayExam.questions[j - 1].title + ' : ' + displayExam.questions[j - 1].question}}</h3> -->
                        <v-row class="mt-5">
                            <v-col v-for="k in 4" :key="k" cols="12" sm="6">
                                <v-text-field :prefix="`(${k}) `" outlined :label="$t('answers') + ' ' + k" hide-details v-model="questions[j - 1].answers[k - 1]"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-select :label="$t('correctAnswers')" outlined v-model="questions[j - 1].answer" :items="[1, 2, 3, 4]" class="mt-5"></v-select>
                        <v-text-field outlined :label="$t('correctAnswersDetails')" hide-details v-model="questions[j - 1].answerDetails"></v-text-field>
                    </v-card>

                    <v-btn
                    color="primary"
                    @click="e1 = j + 1;"
                    >
                    {{$t('nextQuestion')}}
                    </v-btn>
                </v-stepper-content>

                <v-stepper-content :step="4">
                    <v-card class="pt-5">
                        <div class="d-flex justify-space-between px-5 my-2 text-start">
                        <h5>{{$t('subject')}}: {{displayExam.subj}}</h5>
                        <h5>{{$t('unit') + '/' + $t('lesson') + '/' + $t('chapter')}}: {{displayExam.lesson}}</h5>
                        </div>
                        <div class="d-flex justify-space-between px-5 my-2 text-start">
                        <h5>{{$t('difficulty')}}: {{displayExam.level}}</h5>
                        <!-- <h5>{{$t('examTime')}}: 90 {{$t('min')}}</h5> -->
                        </div>
                        <div class="d-flex justify-space-between px-5 mb-2 text-start">
                        <h5>{{$t('totalQuestions')}}: {{3}}</h5>
                        <h5>{{$t('grade')}}: 10</h5>
                        </div>

                        <v-divider class="my-5"></v-divider>
                        <v-card-text>
                        <div v-for="(question, n) in questions" :key="n">
                            <h3 class="primary--text mb-3">{{question.question}}</h3>
                            <div class="mb-3 d-flex justify-space-between">
                            <v-row>
                              <v-col cols="12" sm="6"  v-for="(answer, index) in question.answers" :key="answer.id">
                                <v-card
                                :outlined="question.answer != (parseInt(index) + 1)"
                                :color="question.answer == (parseInt(index) + 1) ? 'success lighten-2' : ''"
                                :class="question.answer == (parseInt(index) + 1) ? 'white--text' : ''"
                                class="pa-2 text-center"
                                >
                                {{question.answers[index]}}
                                </v-card>
                              </v-col>
                            </v-row>
                            </div>
                            <h3 class="mb-3">{{$t('correctAnswers')}} : {{question.answerDetails}}</h3>
                        </div>
                        </v-card-text>
                    </v-card>

                    <v-dialog
                    v-model="submitDialog"
                    width="500"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" class="px-15 mt-5 d-block mx-auto" large elevation="0" v-bind="attrs" v-on="on">{{$t('submit')}}</v-btn>
                        </template>

                        <v-card class="pt-5 text-center">
                            <!-- <v-icon color="success" size="150" class="mx-auto">mdi-checkbox-marked-circle-outline</v-icon>
                            <h2 class="extra-font text-center mt-5">{{$t('examRequestedNote')}}</h2> -->
                            <v-img v-if="$i18n.locale === 'en'" class="mx-auto" max-width="500" src="../../assets/img/msg.jpeg"></v-img>
                            <v-img v-else class="mx-auto" max-width="500" src="../../assets/img/msg(ar).jpeg"></v-img>
                        </v-card>
                    </v-dialog>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
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
          },
          {
            title: 'Fifth Question',
            question: 'What is the chemical symbol for the element Neutron?',
            answers: [
              { id: 'a', answer: 'Lorem ipsum dolor' },
              { id: 'b', answer: 'sit amet consectetur adipisicing' },
              { id: 'c', answer: 'ipsum dolor sit amet' },
              { id: 'd', answer: 'Maxime mollitia' }
            ],
            correctAnswer: { id: 'b', answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae' },
            userAnswer: {}
          },
          {
            title: 'Sixth Question',
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
            title: 'Seventh Question',
            question: 'What is the chemical symbol for the element Neutron?',
            answers: [
              { id: 'a', answer: 'Lorem ipsum dolor' },
              { id: 'b', answer: 'sit amet consectetur adipisicing' },
              { id: 'c', answer: 'ipsum dolor sit amet' },
              { id: 'd', answer: 'Maxime mollitia' }
            ],
            correctAnswer: { id: 'a', answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae' },
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
          },
          {
            title: 'السؤال السادس',
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
            title: 'السؤال السابع',
            question: 'ما هو الرمز الكيميائي للنيوتون ؟',
            answers: [
              { id: 'a', answer: 'لوريم ايبسوم أدايبا' },
              { id: 'b', answer: 'لوريم أيوسمود تيمبور' },
              { id: 'c', answer: 'لو أيوسمود تيمبور' },
              { id: 'd', answer: 'كونسيكتيتور أيوسمود تيمبور' }
            ],
            correctAnswer: { id: 'a', answer: 'لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور' },
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
    questions: [
      { question: '', answers: ['', '', '', ''], answer: '', answerDetails: '' },
      { question: '', answers: ['', '', '', ''], answer: '', answerDetails: '' },
      { question: '', answers: ['', '', '', ''], answer: '', answerDetails: '' }
    ],
    submitDialog: false
  }),
  computed: {
    ...mapState(['images', 'users', 'user']),
    displayExam () {
      if (this.$i18n.locale === 'en') return this.exams.en
      else return this.exams.ar
    }
  },
  methods: {
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
  }
}
</script>
