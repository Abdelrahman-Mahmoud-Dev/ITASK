<template>
    <div>
        <h3 class="primary--text text-capitalize font-weight-bold">{{$t($route.params.action)}}</h3>

        <div v-if="$route.params.action === 'askQuestion'">
            <v-row>
                <v-col cols="12" sm="4">
                    <v-select
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
                </v-col>

                <v-col cols="12" sm="4">
                    <v-text-field hide-details color="primary" prepend-inner-icon="mdi-book-open-blank-variant" solo v-model="lesson" :label="$t('lesson') + '/' + $t('chapter') + '/' + $t('unit')"></v-text-field>
                </v-col>

                <v-col cols="12" sm="4">
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
                <v-col cols="12">
                    <v-textarea
                    color="primary"
                    solo
                    v-model="question"
                    :label="$t('writeQuestion')"
                    hide-details
                    ></v-textarea>
                </v-col>
                <v-col v-show="!displayImage" cols="12" sm="4">
                    <v-file-input
                    solo
                    accept="image/png, image/jpeg, image/bmp"
                    :label="$t('addImage')"
                    prepend-inner-icon="mdi-camera"
                    v-model="image"
                    ></v-file-input>
                </v-col>
            </v-row>
            <v-img v-if="displayImage" max-height="300" class="mt-5" :src="displayImage">
                <v-btn class="ma-2 d-block" color="red" absolute right icon @click="image = null;"><v-icon color="red">mdi-close-circle</v-icon></v-btn>
            </v-img>

            <v-dialog
            v-model="submitDialog"
            width="500"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn :disabled="!(subject && lesson && teacher && question)" color="primary" class="px-15 d-block mx-auto" large elevation="0" v-bind="attrs" v-on="on">{{$t('submit')}}</v-btn>
                </template>

                <v-card class="pt-5 text-center">
                    <!-- <v-icon color="success" size="150" class="mx-auto">mdi-checkbox-marked-circle-outline</v-icon>
                    <h2 class="extra-font text-center mt-5">{{$t('questionPublished')}}</h2> -->
                  <v-img v-if="$i18n.locale === 'en'" class="mx-auto" max-width="500" src="../../assets/img/msg.jpeg"></v-img>
                  <v-img v-else class="mx-auto" max-width="500" src="../../assets/img/msg(ar).jpeg"></v-img>
                </v-card>
            </v-dialog>
        </div>

        <div v-else-if="$route.params.action !== 'askQuestion'">
            <v-select
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
                            Select All
                            </v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider>
                </template>
            </v-select>
            <v-card class="pa-5 my-5" v-show="!showNote">
              <v-row>
                  <v-col cols="12" sm="6" md="4" v-for="(item) in materials" :key="item.id">
                    <v-menu bottom v-if="$route.params.action !== 'answers'">
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
                      <v-btn text @click="showNote = true">{{item.subj}}, {{item.lesson}},</v-btn>
                      <v-btn class="px-0" text @click="$router.push('/teacher')">{{item.teacher}}</v-btn>
                  </v-col>
              </v-row>
            </v-card>
            <div v-if="showNote" class="mt-5">
                <v-btn @click="showNote = false" text color="primary"><v-icon>mdi-keyboard-return</v-icon>{{$t('return')}}</v-btn>
                <note/>
            </div>
        </div>
    </div>
</template>

<script>
import Note from '../../components/notes/AnswerView'
import friendsList from '../../components/static components/friendsList'
import groupsList from '../../components/static components/groupsList'

export default {
  components: {
    Note,
    friendsList,
    groupsList
  },
  data () {
    return {
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
            teacher: 'Jane Doe',
            image: 'physics.svg'
          },
          {
            id: 3,
            subj: 'Chemistery',
            lesson: 'Neutron',
            teacher: 'Aly Anniston',
            image: 'chem.svg'
          },
          {
            id: 4,
            subj: 'Biology',
            lesson: 'Cell',
            teacher: 'Jaimy Doe',
            image: 'bio.svg'
          },
          {
            id: 5,
            subj: 'Arabic',
            lesson: 'Grammar',
            teacher: 'John Jacks',
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
      },
      subject: '',
      materials: [],
      teacher: '',
      lesson: '',
      showNote: false,
      question: '',
      image: null,
      submitDialog: false,
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
    }
  },
  computed: {
    displayImage () {
      return this.image ? URL.createObjectURL(this.image) : null
    },
    displaySubjects () {
      if (this.$i18n.locale === 'en') return this.notes.en
      else return this.notes.ar
    }
  },
  created () {
    this.materials = this.displaySubjects
  }
}
</script>
