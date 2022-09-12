<template>
    <div>
        <div class="hidden-md-and-down">
            <v-text-field
            class="searchBox"
            outlined
            color="primary"
            rounded
            v-model="value"
            :prefix="searchPrefix"
            hide-details
            dense
            :placeholder="$t('writeSomething')"
            >
                <template v-slot:append>

                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-icon class="mx-2" v-on="on" color="primary">mdi-magnify</v-icon>
                        </template>
                        {{$t('search')}}
                    </v-tooltip>

                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-icon @click="advancedSearchDialog = true" v-on="on" color="primary">mdi-cog</v-icon>
                        </template>
                        {{$t('advancedSearch')}}
                    </v-tooltip>
                </template>
            </v-text-field>
            <v-dialog v-model="advancedSearchDialog" max-width="700">
                <v-card>
                    <v-card-title class="primary white--text">{{$t('searchTitle')}}</v-card-title>
                    <v-tabs v-model="tab" fixed-tabs>
                        <v-tabs-slider color="primary"></v-tabs-slider>

                        <v-tab>
                            {{$t('notes')}}
                        </v-tab>
                        <v-tab>
                            {{$t('exams')}}
                        </v-tab>
                    </v-tabs>
                    <v-tabs-items v-model="tab">
                        <v-tab-item>
                            <v-select v-model="subject" outlined class="ma-2" :placeholder="$t('subject')" hide-details dense :items="displayNotes" item-text="subj" item-value="subj"></v-select>
                            <v-text-field v-model="lesson" outlined class="ma-2" :placeholder="$t('lesson')" hide-details dense></v-text-field>
                        </v-tab-item>
                        <v-tab-item>
                            <v-select v-model="subject" outlined class="ma-2" :placeholder="$t('subject')" hide-details dense :items="displayNotes" item-text="subj" item-value="subj"></v-select>
                            <v-text-field v-model="lesson" outlined class="ma-2" :placeholder="$t('lesson')" hide-details dense></v-text-field>
                            <v-select v-model="level" outlined class="ma-2" :placeholder="$t('difficulty')" hide-details dense :items="displayExams" item-text="level" item-value="level"></v-select>
                        </v-tab-item>
                    </v-tabs-items>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :disabled="!type || !lesson" elevation="0" @click="advancedSearchDialog = false; !tab ? $router.push({name: 'notes'}) : $router.push({name: 'exams'})" color="primary">{{$t('search')}}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      items: [],
      value: '',
      type: '',
      subject: '',
      lesson: '',
      level: '',
      advancedSearchDialog: false,
      tab: null,
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
  watch: {
    advancedSearchDialog (val) {
      if (!val) {
        this.type = ''
        this.subject = ''
        this.lesson = ''
        this.level = ''
      } else {
        this.type = 'notes'
      }
    },
    tab (val) {
      if (val) {
        this.type = this.$t('exams')
      } else {
        this.type = this.$t('notes')
      }
    }
  },
  computed: {
    searchPrefix () {
      let prefix = ''
      if (this.type) {
        prefix += this.type + ': '
        if (this.subject) {
          prefix += this.subject
          if (this.lesson) {
            prefix += ', ' + this.lesson
            if (this.level) {
              prefix += ', ' + this.level
            }
          }
        }
      }
      return prefix
    },
    displayExams () {
      if (this.$i18n.locale === 'en') return this.exams.en
      else return this.exams.ar
    },
    displayNotes () {
      if (this.$i18n.locale === 'en') return this.notes.en
      else return this.notes.ar
    }
  }
}
</script>

<style>
    .searchBox.v-text-field fieldset, .searchBox.v-text-field .v-input__control {
        max-width: 400px;
        border-color: #F9BA16 !important;
    }
    /* .searchBox.v-text-field--enclosed.v-input--dense:not(.v-text-field--solo).v-text-field--outlined .v-input__append-inner {
        border-left: 2px solid #F9BA16;
    } */
</style>
