<template>
    <div class="mb-10">
        <h3 class="primary--text mb-5 font-weight-bold">{{$t($route.params.action)}}</h3>

        <div  v-if="$route.params.action === 'noteRequest'">
            <v-row >
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
                    :label="$t('writeMessage')"
                    hide-details
                    ></v-textarea>
                </v-col>
            </v-row>
            <v-dialog
            v-model="submitDialog"
            width="500"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn :disabled="!(subject && lesson && teacher && question)" color="primary" class="px-15 mt-5 d-block mx-auto" large elevation="0" v-bind="attrs" v-on="on">{{$t('submit')}}</v-btn>
                </template>

                <v-card class="pt-5 text-center">
                    <v-icon color="success" size="150" class="mx-auto">mdi-checkbox-marked-circle-outline</v-icon>
                    <h2 class="extra-font text-center mt-5">{{$t('questionPublished')}}</h2>
                </v-card>
            </v-dialog>
        </div>

        <div v-else>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-select
                    prepend-inner-icon="mdi-book"
                    :label="$t('subject')"
                    solo
                    color="primary"
                    :items="displaySubjects"
                    item-text="subj"
                    item-value="subj"
                    v-model="subject"
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
                </v-col>
            </v-row>

            <v-card class="my-5 pa-5" v-show="!showNote">
              <v-row>
                  <v-col cols="12" sm="6" md="4" v-for="item in materials" :key="item.id">
                      <v-menu bottom v-if="$route.params.action === 'myNotes'">
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
                        <v-list-item>
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
                      <v-btn small text elevation="0" @click="$route.params.action == 'notes' ? orderDialog = true : showNote = true">{{item.subj}}, {{item.lesson}},</v-btn>
                      <v-btn small text elevation="0" @click="$router.push('/teacher')" class="px-0">{{item.teacher}}</v-btn>
                  </v-col>
              </v-row>
            </v-card>
            <div v-if="showNote">
                <v-btn @click="showNote = false" text color="primary"><v-icon>mdi-keyboard-return</v-icon>{{$t('return')}}</v-btn>
                <note/>
            </div>
        </div>
        <v-dialog
        v-model="orderDialog"
        width="500"
        >

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
    </div>
</template>

<script>
import Note from '../../components/notes/Note'
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
      },
      subject: '',
      materials: [],
      showNote: false,
      lesson: '',
      question: '',
      teacher: '',
      submitDialog: false,
      orderDialog: false,
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
