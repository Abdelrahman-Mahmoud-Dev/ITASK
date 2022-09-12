<template>
    <v-card :flat="$route.name !== 'noteView'" class="mb-5 pa-3">
        <v-card-title class="d-flex justify-space-between">
            <div>{{displayNote.lesson + ', ' + displayNote.subj + ', ' + displayNote.teacher}}</div>
        </v-card-title>
        <v-card-text>
          <h3>{{$t('noteOrderNote')}} : </h3>
          {{displayNote.body}}
        </v-card-text>

        <v-card-actions v-if="$route.params.action === 'newRequests'">
          <v-btn v-if="!showQuestionForm" @click="showQuestionForm = true" color="primary" elevation="0">{{$t('takeIt')}}</v-btn>
          <v-btn v-if="!showQuestionForm" color="secondary" @click="$emit('close')" outlined elevation="0">{{$t('discard')}}</v-btn>
        </v-card-actions>
        <div v-if="showQuestionForm">
          <v-row>
              <v-col cols="12">
                <v-textarea
                color="primary"
                outlined
                v-model="answer"
                :label="$t('writeAnswer')"
                hide-details
                full-width
                ></v-textarea>
              </v-col>
              <!-- <v-col cols="12" sm="6">
                <v-text-field dense outlined rounded readonly prepend-inner-icon="mdi-microphone"></v-text-field>
              </v-col> -->
              <v-col cols="12" sm="6">
                <v-file-input
                solo
                rounded
                :label="$t('addAttach')"
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
                    <v-btn :disabled="!answer" color="primary" class="px-15 my-3 d-block mx-auto" large elevation="0" v-bind="attrs" v-on="on">{{$t('submit')}}</v-btn>
                </template>

                <v-card class="pt-5 text-center">
                    <!-- <v-icon color="success" size="150" class="mx-auto">mdi-checkbox-marked-circle-outline</v-icon>
                    <h2 class="extra-font text-center mt-5">{{$t('questionPublished')}}</h2> -->
                    <v-img v-if="$i18n.locale === 'en'" class="mx-auto" max-width="500" src="../../assets/img/msg.jpeg"></v-img>
                    <v-img v-else class="mx-auto" max-width="500" src="../../assets/img/msg(ar).jpeg"></v-img>
                </v-card>
            </v-dialog>
        </div>
    </v-card>
</template>

<script>
import { mapState } from 'vuex'
import posts from '../../web services/posts'

export default {
  data: () => ({
    notes: {
      en: {
        id: 1,
        subj: 'Math',
        lesson: 'Algebra',
        teacher: 'John Doe',
        image: 'math.svg',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas',
        liked: false,
        loved: false
      },
      ar: {
        id: 1,
        subj: 'رياضيات',
        lesson: 'الجبر',
        teacher: 'محمد علي',
        image: 'math.svg',
        body: 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص، هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،',
        liked: false,
        loved: false
      }
    },
    allNotes: {
      en: [
        {
          id: 1,
          subj: 'Math',
          lesson: 'Algebra',
          teacher: 'John Doe',
          image: 'math.svg',
          body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas'
        },
        {
          id: 2,
          subj: 'Physics',
          lesson: 'Atom',
          teacher: 'John Doe',
          image: 'physics.svg',
          body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas'
        },
        {
          id: 3,
          subj: 'Chemistery',
          lesson: 'Neutron',
          teacher: 'John Doe',
          image: 'chem.svg',
          body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas'
        },
        {
          id: 4,
          subj: 'Biology',
          lesson: 'Cell',
          teacher: 'John Doe',
          image: 'bio.svg',
          body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas'
        },
        {
          id: 5,
          subj: 'Arabic',
          lesson: 'Grammar',
          teacher: 'John Doe',
          image: 'ar.svg',
          body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas'
        }
      ],
      ar: [
        {
          id: 1,
          subj: 'رياضيات',
          lesson: 'الجبر',
          teacher: 'محمد علي',
          image: 'math.svg',
          body: 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،'

        },
        {
          id: 2,
          subj: 'فيزياء',
          lesson: 'الذرة',
          teacher: 'إيناس أحمد',
          image: 'physics.svg',
          body: 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،'

        },
        {
          id: 3,
          subj: 'كيمياء',
          lesson: 'النيوترون',
          teacher: 'ماكس ملنر',
          image: 'chem.svg',
          body: 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،'

        },
        {
          id: 4,
          subj: 'أحياء',
          lesson: 'الخلية',
          teacher: 'محمد علي',
          image: 'bio.svg',
          body: 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،'

        },
        {
          id: 5,
          subj: 'لغة عربية',
          lesson: 'نحو',
          teacher: 'إيناس أحمد',
          image: 'ar.svg',
          body: 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،'
        }
      ]
    },
    comments: [],
    comment: {
      body: '',
      personal: true,
      likes: 0,
      liked: false
    },
    orderDialog: false,
    confirmDialog: false,
    showQuestionForm: false,
    answer: '',
    image: null,
    bought: false,
    friendsDialog: false,
    groupsDialog: false,
    friendsDialogGift: false,
    submitDialog: false
  }),
  computed: {
    ...mapState(['images', 'users', 'user']),
    displayNote () {
      if (this.$i18n.locale === 'en') return this.notes.en
      else return this.notes.ar
    },
    displayImage () {
      return this.image ? URL.createObjectURL(this.image) : null
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
      this.notes.ar = this.allNotes.ar.find(item => item.id === parseInt(this.$route.params.id))
      this.notes.en = this.allNotes.en.find(item => item.id === parseInt(this.$route.params.id))
    }
    this.getComments()
  }
}
</script>
