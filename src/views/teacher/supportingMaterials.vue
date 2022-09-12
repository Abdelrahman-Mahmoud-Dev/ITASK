<template>
    <div>
        <h3 class="primary--text font-weight-bold">{{$route.params.action === 'video' ? $t('video') : $t('article')}}</h3>

        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-select
            prepend-inner-icon="mdi-google-classroom"
            :label="$t('grade')"
            solo
            color="primary"
            :items="grades"
            v-model="grade"
            >
            </v-select>
          </v-col>
          <v-col cols="12" sm="6" md="4">
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

          <v-col cols="12">
            <v-textarea
            color="primary"
            solo
            v-model="essay"
            hide-details
            :placeholder="$route.params.action === 'video' ? $t('videoMessage') : $t('articleMessage')"
            ></v-textarea>
          </v-col>

          <v-col v-show="!displayImage" cols="12">
              <v-file-input
              solo
              accept="image/png, image/jpeg, image/bmp"
              :label="$t('addAttach')"
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
                <v-btn :disabled="!(subject && lesson && grade && essay)" color="primary" class="px-15 mt-3 d-block mx-auto" large elevation="0" v-bind="attrs" v-on="on">{{$t('submit')}}</v-btn>
            </template>

            <v-card class="pt-5 text-center">
                <!-- <v-icon color="success" size="150" class="mx-auto">mdi-checkbox-marked-circle-outline</v-icon>
                <h2 class="extra-font text-center mt-5">{{$t('questionPublished')}}</h2> -->
              <v-img v-if="$i18n.locale === 'en'" class="mx-auto" max-width="500" src="../../assets/img/msg.jpeg"></v-img>
              <v-img v-else class="mx-auto" max-width="500" src="../../assets/img/msg(ar).jpeg"></v-img>
            </v-card>
        </v-dialog>

        <!-- <v-row v-show="!showNote">
            <v-col cols="12" sm="6" md="4" v-for="item in materials" :key="item.id">
                <v-btn text @click="showNote = true">{{item.subj}}, {{item.lesson}}, {{item.teacher}}</v-btn>
            </v-col>
        </v-row>
        <div v-if="showNote">
            <v-btn @click="showNote = false" text color="primary"><v-icon>mdi-keyboard-return</v-icon>{{$t('return')}}</v-btn>
            <note/>
        </div> -->
    </div>
</template>

<script>
// import Note from '../../components/notes/Note'

export default {
  components: {
    // Note
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
      grade: '',
      lesson: '',
      essay: '',
      image: null
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
    },
    grades () {
      return [this.$t('grade') + ' 10', this.$t('grade') + ' 11', this.$t('grade') + ' 13', this.$t('grade') + ' 4', this.$t('grade') + ' 15']
    },
    displayImage () {
      return this.image ? URL.createObjectURL(this.image) : null
    }
  },
  created () {
    this.materials = this.displaySubjects
  }
}
</script>
