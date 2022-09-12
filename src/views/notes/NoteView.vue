<template>
  <div class="home">
    <v-row>
      <!--  -->
      <v-col cols="12" md="3" xl="2">
        <!-- menu -->
        <v-sheet rounded="lg" max-height="53vh" style="overflow: auto;" class="mb-3">
          <div>
            <side-menu></side-menu>
          </div>
        </v-sheet>

        <!-- friends requests -->
         <v-sheet rounded="lg" height="32vh" style="overflow: auto;" class="pa-2 pt-0">
          <div>
            <friend-requests />
          </div>
        </v-sheet>
      </v-col>

      <v-col cols="12" md="6" xl="8">
        <v-sheet class="grey lighten-3 scrollable-sheet" height="87vh" rounded="lg">
            <note />
        </v-sheet>
      </v-col>

      <v-col cols="12" md="3" xl="2">
        <v-sheet class="scrollable-sheet" color="grey lighten-3" height="81vh">
          <!-- new exams -->
          <v-sheet rounded="lg" style="overflow: auto;" height="25vh" class="mb-5 pa-2 pt-0">
            <NewExams />
          </v-sheet>

          <!-- new teachers -->
          <v-sheet rounded="lg" class="mb-5 pa-2 pt-0">
            <new-teachers />
          </v-sheet>

          <!-- top ten teachers -->
          <v-sheet rounded="lg" class="pa-2 pt-0">
            <top-teachers />
          </v-sheet>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import SideMenu from '@/components/static components/SideMenu'
import FriendRequests from '@/components/static components/FriendRequests'
import NewExams from '@/components/static components/NewExams'
import NewTeachers from '@/components/static components/NewTeachers'
import TopTeachers from '@/components/static components/TopTeachers'
import { mapState } from 'vuex'
import posts from '../../web services/posts'
import Note from '../../components/notes/Note'

export default {
  components: {
    SideMenu,
    FriendRequests,
    NewExams,
    NewTeachers,
    TopTeachers,
    Note
  },
  name: 'Home',
  data: () => ({
    notes: {
      en: {
        id: 1,
        subj: 'Math',
        lesson: 'Algebra',
        teacher: 'John Doe',
        image: 'math.svg',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas'
      },
      ar: {
        id: 1,
        subj: 'رياضيات',
        lesson: 'الجبر',
        teacher: 'محمد علي',
        image: 'math.svg',
        body: 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص، هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،'
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
    confirmDialog: false
  }),
  computed: {
    ...mapState(['images', 'users', 'user']),
    displayNote () {
      if (this.$i18n.locale === 'en') return this.notes.en
      else return this.notes.ar
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
