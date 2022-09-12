<template>
    <v-card class="pa-5 mb-15">
        <v-form
        ref="completeRegForm"
        v-model="valid"
        class="pt-2"
        >
            <div class="d-sm-flex justify-space-between">
              <label class="form-label">{{$t('name')}}</label>
              <v-text-field
              dense
              outlined
              rounded
              v-model="name"
              :rules="nameRules"
              :label="$t('name')"
              required
              ></v-text-field>
            </div>

            <div class="d-sm-flex justify-space-between">
              <label class="form-label">{{$t('userName')}}</label>
              <v-text-field
              dense
              outlined
              rounded
              v-model="userName"
              :label="$t('userName')"
              required
              ></v-text-field>
            </div>

            <div class="d-sm-flex justify-space-between">
              <label class="form-label">{{$t('email')}}</label>
              <v-text-field
              outlined
              rounded
              dense
              v-model="email"
              :rules="emailRules"
              :label="$t('email')"
              required
              ></v-text-field>
            </div>

            <div class="d-sm-flex justify-space-between">
              <label class="form-label">{{$t('password')}}</label>
              <v-text-field
              outlined
              rounded
              dense
              v-model="password"
              :label="$t('password')"
              required
              type="password"
              ></v-text-field>
            </div>

            <div class="d-sm-flex justify-space-between mb-7">
              <label class="form-label">{{$t('mobile')}}</label>
              <vue-phone-number-input style="direction: ltr !important;" v-model="mobile" />
            </div>

            <div class="d-sm-flex justify-space-between">
              <label class="form-label">{{$t('gender')}}</label>
              <v-select
              rounded
              dense
              outlined
              color="primary"
              v-model="gender"
              :items="[{id: 1, text: $t('male')}, {id: 2, text: $t('female')}]"
              item-text="text"
              item-value="id"
              ></v-select>
            </div>

            <div class="d-sm-flex justify-space-between">
              <label class="form-label">{{$t('birthDate')}}</label>
              <v-menu
              ref="dobMenu"
              v-model="dobMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="birthDate"
                    :label="$t('birthDate')"
                    readonly
                    outlined
                    dense
                    rounded
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="birthDate"
                  :active-picker.sync="activePicker"
                  :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                  min="1950-01-01"
                  @change="save"
                ></v-date-picker>
              </v-menu>
            </div>

            <div class="d-sm-flex justify-space-between">
              <label class="form-label">{{$t('country')}}</label>
              <v-select
              outlined
              dense
              rounded
              v-model="country"
              :items="countries"
              :item-text="$i18n.locale === 'ar' ? 'ar' : 'en'"
              item-value="id"
              :label="$t('country')"
              required
              >
              </v-select>
            </div>

            <div class="d-sm-flex justify-space-between">
              <label class="form-label">{{$t('state')}}</label>
              <v-select
              :disabled="!country"
              outlined
              dense
              rounded
              v-model="state"
              :items="states"
              :item-text="$i18n.locale === 'ar' ? 'ar' : 'en'"
              item-value="id"
              :label="$t('state')"
              required
              persistent-hint
              :hint="$t('selectStateNote')"
              >
              </v-select>
            </div>

            <!-- <div class="d-sm-flex justify-space-between">
              <label class="form-label">{{$t('region')}}</label>
              <v-text-field
              dense
              outlined
              rounded
              v-model="region"
              :label="$t('region')"
              required
              ></v-text-field>
            </div> -->

            <v-divider class="my-2"></v-divider>

            <div>
              <label class="form-label">{{$t('curriculum')}}</label>
              <v-row>
                <v-col v-for="item in allCurriculums" :key="item.id" cols="12" sm="4">
                  <v-checkbox color="primary" v-model="curriculum" :label="$i18n.locale === 'ar' ? item.ar : item.en" :value="item.id" hide-details></v-checkbox>
                </v-col>
              </v-row>
            </div>

            <v-divider class="my-2"></v-divider>

            <div class="my-3">
              <label class="form-label">{{$t('grade')}}</label>
              <v-row>
                <v-col v-for="item in allGrades" :key="item.id" cols="12" sm="4">
                  <v-checkbox color="primary" v-model="grades" :label="$i18n.locale === 'ar' ? item.ar : item.en + '(th)'" :value="item.id" hide-details></v-checkbox>
                </v-col>
              </v-row>
            </div>

            <v-divider v-if="curriculum.includes(3) && [2,3,5,4].some(i => grades.includes(i))" class="my-2"></v-divider>

            <div v-if="curriculum.includes(3) && [2,3,5,4].some(i => grades.includes(i))">
              <label class="form-label">{{$t('level')}}</label>
              <v-row>
                <v-col v-for="item in allLevels" :key="item.id" cols="12" sm="4">
                  <v-checkbox color="primary" v-model="levels" :label="$i18n.locale === 'ar' ? item.ar : item.en" :value="item.id" hide-details></v-checkbox>
                </v-col>
              </v-row>
            </div>

            <v-divider class="my-2"></v-divider>

            <div>
              <label class="form-label">{{$t('subject')}}</label>
              <v-row>
                <v-col v-for="item in allSybjects" :key="item.id" cols="12" sm="4">
                  <v-checkbox color="primary" v-model="subjects" :label="$i18n.locale === 'ar' ? item.ar : item.en" :value="item.id" hide-details></v-checkbox>
                </v-col>
              </v-row>
            </div>

            <v-divider class="my-2"></v-divider>

            <div class="my-3">
              <v-btn @click="openImgUploader('image')" text large color="primary"><v-icon>mdi-account-circle</v-icon> {{$t('profileImage')}}</v-btn>
              <v-btn @click="openImgUploader('cover')" text large color="primary"><v-icon>mdi-image</v-icon> {{$t('coverImage')}}</v-btn>
              <v-btn v-if="user.role === 'teacher'" @click="openImgUploader('pdf')" text large color="primary"><v-icon>mdi-file-pdf-box</v-icon> {{$t('resume')}}</v-btn>
            </div>

            <div>
              <v-img v-if="image" :src="image" class="d-inline-block rounded-lg mx-1" height="50" width="50" gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)">
                <v-btn @click="images.splice(i, 1)" x-small absolute right top icon color="error"><v-icon>mdi-close-circle</v-icon></v-btn>
              </v-img>
              <v-img v-if="coverImage" :src="coverImage" class="d-inline-block rounded-lg mx-1" height="50" width="50" gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)">
                <v-btn @click="images.splice(i, 1)" x-small absolute right top icon color="error"><v-icon>mdi-close-circle</v-icon></v-btn>
              </v-img>
              <br>
              <iframe
              v-if="pdf"
              :src="pdf"
              frameBorder="0"
              scrolling="auto"
              style="height: 75vh;"
              width="100%"
              ></iframe>
            </div>

            <input
            ref="uploader"
            class="d-none"
            type="file"
            accept="image/*"
            @change="onFileChanged"
            >

            <input
            ref="uploaderCover"
            class="d-none"
            type="file"
            accept="image/*"
            @change="onCoverFileChanged"
            >

            <input
            ref="uploaderCV"
            class="d-none"
            type="file"
            accept="application/pdf"
            @change="onCVFileChanged"
            >

            <v-btn
            :disabled="!valid"
            color="primary"
            block
            @click="saveData"
            elevation="0"
            >
            {{$t('save')}}
            </v-btn>
        </v-form>
    </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    name: '',
    userName: '',
    email: 'email@ifzaani.com',
    password: 'password',
    mobile: '',
    gender: 1,
    dobMenu: false,
    activePicker: null,
    countries: [
      {
        id: 1,
        en: 'Egypt',
        ar: 'مصر',
        states: [
          { id: '1', ar: 'القاهرة', en: 'Cairo' },
          { id: '2', ar: 'الجيزة', en: 'Giza' },
          { id: '3', ar: 'الأسكندرية', en: 'Alexandria' },
          { id: '4', ar: 'الدقهلية', en: 'Dakahlia' },
          { id: '5', ar: 'البحر الأحمر', en: 'Red Sea' },
          { id: '6', ar: 'البحيرة', en: 'Beheira' },
          { id: '7', ar: 'الفيوم', en: 'Fayoum' },
          { id: '8', ar: 'الغربية', en: 'Gharbiya' },
          { id: '9', ar: 'الإسماعلية', en: 'Ismailia' },
          { id: '10', ar: 'المنوفية', en: 'Menofia' },
          { id: '11', ar: 'المنيا', en: 'Minya' },
          { id: '12', ar: 'القليوبية', en: 'Qaliubiya' },
          { id: '13', ar: 'الوادي الجديد', en: 'New Valley' },
          { id: '14', ar: 'السويس', en: 'Suez' },
          { id: '15', ar: 'اسوان', en: 'Aswan' },
          { id: '16', ar: 'اسيوط', en: 'Assiut' },
          { id: '17', ar: 'بني سويف', en: 'Beni Suef' },
          { id: '18', ar: 'بورسعيد', en: 'Port Said' },
          { id: '19', ar: 'دمياط', en: 'Damietta' },
          { id: '20', ar: 'الشرقية', en: 'Sharkia' },
          { id: '21', ar: 'جنوب سيناء', en: 'South Sinai' },
          { id: '22', ar: 'كفر الشيخ', en: 'Kafr Al sheikh' },
          { id: '23', ar: 'مطروح', en: 'Matrouh' },
          { id: '24', ar: 'الأقصر', en: 'Luxor' },
          { id: '25', ar: 'قنا', en: 'Qena' },
          { id: '26', ar: 'شمال سيناء', en: 'North Sinai' },
          { id: '27', ar: 'سوهاج', en: 'Sohag' }
        ]
      },
      {
        id: 2,
        en: 'United Arab Emirates',
        ar: 'الإمارات العربية المتحدة',
        states: [
          { id: 1, ar: 'ابوظبي', en: 'Abu Dhabi' },
          { id: 2, ar: 'دبي', en: 'Dubai' },
          { id: 3, ar: 'الشارقه', en: 'Sharjah' },
          { id: 4, ar: 'ام القيوين', en: 'Umm Al Quwain' },
          { id: 5, ar: 'راس الخيمة', en: 'Ras Al-Khaimah' },
          { id: 6, ar: 'الفجيرة', en: 'Fujairah' },
          { id: 7, ar: 'عجمان', en: 'Ajman' }
        ]
      },
      {
        id: 3,
        en: 'Saudi Arabia',
        ar: 'السعودية',
        states: [
          { id: 1, ar: 'الرياض', en: 'Ryadh' },
          { id: 2, ar: 'مكة المكرمة', en: 'Mecca' },
          { id: 3, ar: 'المدينة المنورة', en: 'Al Madinah' },
          { id: 4, ar: 'القصيم', en: 'Al Qassim' },
          { id: 5, ar: 'الشرقية ', en: 'Al Sharqia' },
          { id: 6, ar: 'تبوك', en: 'Tabuk' },
          { id: 7, ar: 'حائل', en: 'Haael' },
          { id: 8, ar: 'نجران', en: 'Najran' },
          { id: 9, ar: 'الباحة', en: 'Al Baha' },
          { id: 10, ar: 'الجوف', en: 'Al Gouf' },
          { id: 11, ar: 'جازان', en: 'Jazzan' },
          { id: 12, ar: 'الحدود الشمالية', en: 'North Borders' }
        ]
      }
    ],
    country: 1,
    region: 1,
    state: 1,
    birthDate: '1996-05-15',
    curriculum: [1, 3, 4],
    allCurriculums: [
      { id: 1, ar: 'المصري', en: 'Egyptian' },
      { id: 2, ar: 'الكويتي', en: 'Kewait' },
      { id: 3, ar: 'الإماراتي', en: 'UAE' },
      { id: 4, ar: 'السعودي', en: 'Saudi' },
      { id: 5, ar: 'الهندي', en: 'Indian' },
      { id: 6, ar: 'الصيني', en: 'Chinese' },
      { id: 7, ar: 'الفرنسي', en: 'French' },
      { id: 8, ar: 'الإنجليزي', en: 'English' }
    ],
    subjects: [1, 5, 3],
    allSybjects: [
      { id: 1, ar: 'لغة عربية', en: 'Arabic' },
      { id: 2, ar: 'لغة إنجليزية', en: 'English' },
      { id: 3, ar: 'رياضيات', en: 'Math' },
      { id: 4, ar: 'أحياء', en: 'Biology' },
      { id: 5, ar: 'كيمياء', en: 'Chemistery' },
      { id: 6, ar: 'لغة فرنسية', en: 'French' }
    ],
    grades: [6, 7, 2],
    allGrades: [
      { id: 6, ar: 'الخامس', en: 'Five' },
      { id: 7, ar: 'السادس', en: 'Sex' },
      { id: 8, ar: 'السابع', en: 'Seven' },
      { id: 1, ar: 'الثامن', en: 'Eight' },
      { id: 2, ar: 'التاسع', en: 'Nine' },
      { id: 3, ar: 'العاشر', en: 'Ten' },
      { id: 4, ar: 'الحادي عشر', en: 'Eleven' },
      { id: 5, ar: 'الاثنا عشر', en: 'Twelve' }
    ],
    levels: [1, 3],
    allLevels: [
      { id: 1, ar: 'العام', en: 'General' },
      { id: 2, ar: 'التخصصي', en: 'Specialist' },
      { id: 3, ar: 'المتقدم', en: 'Advanced' },
      { id: 4, ar: 'النخبة', en: 'Elite' }
    ],
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 20) || 'Name must be less than 20 characters'
    ],
    emailRules: [
      v => !!v || 'Email is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    valid: false,
    image: '',
    coverImage: '',
    pdf: ''
  }),
  computed: {
    ...mapState(['user']),
    states () {
      if (!this.country) return []
      else return this.countries.find(c => c.id === this.country).states
    }
  },
  watch: {
    dobMenu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    }
  },
  methods: {
    save (date) {
      this.$refs.dobMenu.save(date)
    },
    openImgUploader (type) {
      if (type === 'image') this.$refs.uploader.click()
      else if (type === 'cover') this.$refs.uploaderCover.click()
      else this.$refs.uploaderCV.click()
    },
    onFileChanged (e) {
      const image = Array.from(e.target.files)[0]
      this.image = URL.createObjectURL(image)
    },
    onCoverFileChanged (e) {
      const image = Array.from(e.target.files)[0]
      this.coverImage = URL.createObjectURL(image)
    },
    onCVFileChanged (e) {
      const file = Array.from(e.target.files)[0]
      this.pdf = URL.createObjectURL(file)
    },
    saveData () {
      this.$refs.completeRegForm.validate()
      if (this.valid) {
        localStorage.setItem('authenticated', true)
        this.$store.commit('updateUser', { name: this.name, userName: this.userName, email: this.email, avatar: this.image })
        this.$store.commit('updateUserExtras', { cover: this.coverImage, resume: this.pdf })
        this.$router.push(this.user.role === 'student' ? '/profile' : '/teacher')
      }
    }
  },
  created () {
    const user = this.$store.state.user
    console.log(user)
    this.name = user.name
    this.email = user.email
    this.userName = user.username
    this.mobile = user.phone
  }
}
</script>

<style>
.form-label {
  width: 150px;
  color: #2D2874;
  font-weight: bold;
}
.country-selector.has-hint .country-selector__input[data-v-46e105de], .country-selector.has-value .country-selector__input[data-v-46e105de] {
  border-top-left-radius: 20px !important;
  border-bottom-left-radius: 20px !important;
  border-color: #9E9E9E !important;
}
.input-tel__input {
  border-top-right-radius: 20px !important;
  border-bottom-right-radius: 20px !important;
  border-color: #9E9E9E !important;
}
</style>
