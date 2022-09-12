<template>
    <div>
        <h3 class="primary--text text-capitalize font-weight-bold">{{$t($route.params.action)}}</h3>

        <div v-if="$route.params.action === 'examRequest'">
            <v-row>
                <v-col cols="12" sm="6">
                    <v-select
                    v-if="!showNote"
                    prepend-inner-icon="mdi-book"
                    :label="$t('subject')"
                    solo
                    color="primary"
                    :items="displaySubjects"
                    item-text="subj"
                    item-value="subj"
                    v-model="subject"
                    hide-details
                    >
                        <template v-slot:prepend-item>
                            <v-list-item
                            @click="subject = 'all'"
                            >
                                <v-list-item-content>
                                    <v-list-item-title>
                                    {{$t('selectAll')}}
                                    </v-list-item-title>
                            </v-list-item-content>
                            </v-list-item>
                            <v-divider class="mt-2"></v-divider>
                        </template>
                    </v-select>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-text-field hide-details color="primary" prepend-inner-icon="mdi-book-open-blank-variant" solo v-model="lesson" :label="$t('lesson') + '/' + $t('chapter') + '/' + $t('unit')"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-text-field hide-details :prefix="$t('questions') + ':'" class="mt-1" solo :label="$t('questions')" type="number" min="1" v-model="questionsNumber"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-select v-model="level" prepend-inner-icon="mdi-ab-testing" solo :label="$t('difficulty')" hide-details :items="displayExams" item-text="level" item-value="level"></v-select>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-menu
                    offset-y
                    bottom
                    :close-on-content-click="false"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        color="primary"
                        prepend-inner-icon="mdi-account"
                        solo
                        readonly
                        v-model="teacher"
                        :label="$t('teacher')"
                        v-bind="attrs"
                        v-on="on"
                        append-icon="mdi-menu-down"
                        hide-details
                        ></v-text-field>
                    </template>

                    <v-list>
                        <v-list-item @click="teacher = 'public'">
                            <v-list-item-icon>
                                <v-icon color="primary" class="">mdi-earth</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                    <v-list-item-title>{{$t('public')}}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-select
                            prepend-inner-icon="mdi-heart"
                            dense
                            :label="$t('favTeachers')"
                            outlined
                            color="primary"
                            :items="displaySubjects"
                            item-text="teacher"
                            item-value="teacher"
                            v-model="teacher"
                            >
                                <!-- <template v-slot:prepend-item>
                                    <v-list-item
                                    @click="subject = 'all'"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>
                                            Select All
                                            </v-list-item-title>
                                    </v-list-item-content>
                                    </v-list-item>
                                    <v-divider class="mt-2"></v-divider>
                                </template> -->
                            </v-select>
                        </v-list-item>
                    </v-list>
                    </v-menu>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-menu
                    v-model="dateMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            v-model="date"
                            solo
                            color="primary"
                            :label="$t('startDate')"
                            prepend-inner-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            hide-details
                            ></v-text-field>
                        </template>
                        <v-date-picker
                        v-model="date"
                        :min="new Date().toISOString().split('T')[0]"
                        @input="dateMenu = false"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
            </v-row>

            <v-dialog
            v-model="submitDialog"
            width="500"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn :disabled="!(subject && lesson && questionsNumber && level && teacher && date)" color="primary" class="px-15 mt-5 d-block mx-auto" large elevation="0" v-bind="attrs" v-on="on">{{$t('submit')}}</v-btn>
                </template>

                <v-card class="pt-5 text-center">
                    <v-icon color="success" size="150" class="mx-auto">mdi-checkbox-marked-circle-outline</v-icon>
                    <h2 class="extra-font text-center mt-5">{{$t('examRequestedNote')}}</h2>
                </v-card>
            </v-dialog>
        </div>

        <div v-else>
            <v-row no-gutters>
                <v-col cols="12" sm="6" md="12">
                    <v-select
                    v-if="!showNote"
                    prepend-inner-icon="mdi-book"
                    :label="$t('subject')"
                    solo
                    color="primary"
                    :items="displaySubjects"
                    item-text="subj"
                    item-value="subj"
                    v-model="subject"
                    hide-details
                    >
                        <template v-slot:prepend-item>
                            <v-list-item
                            @click="subject = 'all'"
                            >
                                <v-list-item-content>
                                    <v-list-item-title>
                                    {{$t('selectAll')}}
                                    </v-list-item-title>
                            </v-list-item-content>
                            </v-list-item>
                            <v-divider class="mt-2"></v-divider>
                        </template>
                    </v-select>
                </v-col>
            </v-row>
            <v-card class="my-5 pa-5" v-show="!showNote">
              <v-row>
                  <v-col cols="12" sm="6" v-for="(item) in displaySubjects" :key="item.id">
                    <v-menu bottom v-if="$route.params.action === 'myExams'">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-dots-horizontal</v-icon>
                        </v-btn>
                      </template>

                      <v-list>
                        <v-list-item>
                          <v-list-item-icon><v-icon small color="primary">mdi-share-variant</v-icon></v-list-item-icon>
                          <v-list-item-content>
                            <v-dialog
                            v-model="friendsDialog"
                            width="700"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn text v-bind="attrs" v-on="on">{{$t('shareWithFriends')}}</v-btn>
                              </template>
                              <friends-list type="share" />
                            </v-dialog>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-icon><v-icon small color="primary">mdi-share-variant</v-icon></v-list-item-icon>
                          <v-list-item-content>
                            <v-dialog
                            v-model="groupsDialog"
                            width="700"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn text v-bind="attrs" v-on="on">{{$t('shareInGroups')}}</v-btn>
                              </template>
                              <groups-list type="share" />
                            </v-dialog>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item v-if="$route.params.action !== 'gift'">
                          <v-list-item-icon><v-icon small color="primary">mdi-gift</v-icon></v-list-item-icon>
                          <v-list-item-content>
                            <v-dialog
                            v-model="friendsDialogGift"
                            width="700"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn text v-bind="attrs" v-on="on">{{$t('gift')}}</v-btn>
                              </template>
                              <friends-list type="send" />
                            </v-dialog>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                    <v-btn @click="orderDialog = false; showNote = true; currentExam = `${item.subj}, ${item.lesson}, ${item.teacher}`;" small text elevation="0">{{item.subj}}, {{item.lesson}},</v-btn>
                    <v-btn class="px-0" @click="$router.push('/teacher')" small text elevation="0">{{item.teacher}}</v-btn>
                  </v-col>
              </v-row>
            </v-card>
            <div v-if="showNote" class="mt-5">
                <v-btn @click="showNote = false" text color="primary"><v-icon>mdi-keyboard-return</v-icon>{{$t('return')}}</v-btn>
                <div class="my-5">
                    <p class="secondary--text"><v-icon color="secondary">mdi-book-edit-outline</v-icon> {{' ' + currentExam}}</p>
                    <exam @end="endExam"></exam>
                </div>
            </div>
        </div>
        <!-- <div>
            <v-row no-gutters>
                <v-col cols="12" sm="6" md="4">
                    <v-select
                    v-if="!showNote"
                    prepend-inner-icon="mdi-book"
                    :label="$t('subject')"
                    solo
                    color="primary"
                    :items="displaySubjects"
                    item-text="subj"
                    item-value="subj"
                    v-model="subject"
                    hide-details
                    >
                        <template v-slot:prepend-item>
                            <v-list-item
                            @click="subject = 'all'"
                            >
                                <v-list-item-content>
                                    <v-list-item-title>
                                    {{$t('selectAll')}}
                                    </v-list-item-title>
                            </v-list-item-content>
                            </v-list-item>
                            <v-divider class="mt-2"></v-divider>
                        </template>
                    </v-select>
                </v-col>
            </v-row>
            <v-row v-show="!showNote" class="my-5">
                <v-col cols="12" sm="6" v-for="(item) in materials" :key="item.id">
                    <v-dialog
                    v-model="orderDialog"
                    width="500"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn small text elevation="0" v-bind="attrs" v-on="on">{{item.subj}}, {{item.lesson}}, {{item.teacher}}</v-btn>
                        </template>

                        <v-card class="pt-5">
                            <h2 class="extra-font text-center mb-3">{{$t('orderNoteTitle')}}</h2>

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
                                @click="orderDialog = false; showNote = true;"
                                >
                                  {{$t('accept')}}
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-col>
            </v-row>
            <div v-if="showNote" class="mt-5">
                <v-btn @click="showNote = false" text color="primary"><v-icon>mdi-keyboard-return</v-icon>{{$t('return')}}</v-btn>
                <div>
                    <exam @end="showNote = false"></exam>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Exam from '../../components/exams/Exam'
import friendsList from '../../components/static components/friendsList'
import groupsList from '../../components/static components/groupsList'

export default {
  components: {
    Exam,
    friendsList,
    groupsList
  },
  data () {
    return {
      exams: {
        en: [
          {
            id: 3,
            subj: 'Chemistery',
            lesson: 'Neutron',
            level: 'Difficult',
            image: 'chem.svg',
            teacher: 'Aly Smith'
          },
          {
            id: 4,
            subj: 'Biology',
            lesson: 'Cell',
            level: 'Easy',
            image: 'bio.svg',
            teacher: 'Ali Hamza'
          },
          {
            id: 5,
            subj: 'Arabic',
            lesson: 'Grammar',
            level: 'Easy',
            image: 'ar.svg',
            teacher: 'Sara Zaki'
          },
          {
            id: 1,
            subj: 'Math',
            lesson: 'Algebra',
            level: 'Easy',
            image: 'math.svg',
            teacher: 'Hossam el-sayed'
          },
          {
            id: 2,
            subj: 'Physics',
            lesson: 'Atom',
            level: 'Medium',
            image: 'physics.svg',
            teacher: 'Yara el-sayed'
          }
        ],
        ar: [
          {
            id: 3,
            subj: 'كيمياء',
            lesson: 'النيوترون',
            level: 'متوسط',
            image: 'chem.svg',
            teacher: 'آلي سميث'
          },
          {
            id: 4,
            subj: 'أحياء',
            lesson: 'الخلايا',
            level: 'صعب',
            image: 'bio.svg',
            teacher: 'علي حمزة'
          },
          {
            id: 5,
            subj: 'العربية',
            lesson: 'النحو',
            level: 'سهل',
            image: 'ar.svg',
            teacher: 'سارا زاكي'
          },
          {
            id: 1,
            subj: 'رياضيات',
            lesson: 'الجبر',
            level: 'سهل',
            image: 'math.svg',
            teacher: 'حسام السيد'
          },
          {
            id: 2,
            subj: 'فيزياء',
            lesson: 'الذرة',
            level: 'صعب',
            image: 'physics.svg',
            teacher: 'يارا السيد'
          }
        ]
      },
      currentExam: '',
      subject: '',
      materials: [],
      teacher: '',
      lesson: '',
      showNote: false,
      submitDialog: false,
      orderDialog: '',
      dateMenu: false,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      level: '',
      questionsNumber: 1,
      friendsDialog: false,
      groupsDialog: false,
      friendsDialogGift: false
    }
  },
  watch: {
    subject (val) {
      if (val) {
        if (val === 'all') {
          this.materials = this.displaySubjects
        } else {
          this.materials = this.displaySubjects.filter(item => item.subj === val)
        }
        this.showNote = false
      }
    },
    invitation (val) {
      if (val === 'friends') this.invitationDialog = true
      else this.invitationDialog = false
    },
    searchTerm (val) {
      this.friends = this.users.filter(item => item.name.toLowerCase().includes(val.toLowerCase()))
    }
  },
  computed: {
    ...mapState(['users']),
    // friends () {
    //   if (this.searchTerm) {
    //     return this.users.filter(item => item.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
    //   } else {
    //     return this.users
    //   }
    // },
    displayImage () {
      return this.image ? URL.createObjectURL(this.image) : null
    },
    displaySubjects () {
      if (this.$i18n.locale === 'en') return this.exams.en
      else return this.exams.ar
    },
    displayExams () {
      if (this.$i18n.locale === 'en') return this.exams.en
      else return this.exams.ar
    },
    start () {
      const today = new Date()
      return new Date(today.setDate(today.getDay() - 1))
    },
    randomTime () {
      return new Date(this.start.getTime() + Math.random() * (new Date().getTime() - this.start.getTime()))
    }
  },
  methods: {
    endExam () {
      this.showNote = false
    }
  },
  created () {
    this.materials = this.displaySubjects
    this.friends = this.users
    if (this.$route.query.show) {
      this.showNote = true
      this.currentExam = `${this.displaySubjects[0].subj}, ${this.displaySubjects[0].lesson}, ${this.displaySubjects[0].teacher}`
    }
  }
}
</script>
