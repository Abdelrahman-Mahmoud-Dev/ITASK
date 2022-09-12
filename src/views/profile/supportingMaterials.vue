<template>
    <div>
        <h3 class="primary--text font-weight-bold">{{$route.params.action === 'video' ? $t('video') : $t('article')}}</h3>

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
        <v-card class="pa-5" v-show="!showNote">
          <v-row>
            <v-col cols="12" sm="6" md="4" v-for="item in materials" :key="item.id">
                <v-btn text @click="showNote = true">{{item.subj}}, {{item.lesson}},</v-btn>
                <v-btn class="px-0" text @click="$router.push('/teacher')">{{item.teacher}}</v-btn>
            </v-col>
          </v-row>
        </v-card>
        <div v-if="showNote">
            <v-btn @click="showNote = false" text color="primary"><v-icon>mdi-keyboard-return</v-icon>{{$t('return')}}</v-btn>
            <note/>
        </div>
    </div>
</template>

<script>
import Note from '../../components/notes/Note'

export default {
  components: {
    Note
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
      showNote: false
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
