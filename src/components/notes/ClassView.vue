<template>
    <v-card :flat="$route.name !== 'noteView'" class="mb-5 pa-3">
        <v-card-title class="d-flex justify-space-between">
            <div>{{displayNote.lesson + ', ' + displayNote.subj + ', ' + displayNote.teacher}}</div>
        </v-card-title>
        <video width="100%" controls autoplay loop>
            <source src="../../assets/vid.mp4">
        </video>

        <v-card-actions>
            <div>
                <v-btn small text>{{randomNumber()}}<v-icon small class="mx-1" color="primary">mdi-eye-outline</v-icon></v-btn>
                <v-btn @click="displayNote.loved = !displayNote.loved" small text>{{randomNumber()}}<v-icon small class="mx-1" :ripple="false"
                :color="displayNote.loved ? 'red' : 'primary'">{{displayNote.loved ? 'mdi-heart' : 'mdi-heart-outline'}}</v-icon></v-btn>
                <v-btn @click="displayNote.liked = !displayNote.liked" small text>{{randomNumber()}}<v-icon small class="mx-1" :ripple="false"
                :color="displayNote.liked ? 'blue' : 'primary'">{{displayNote.loved ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'}}</v-icon></v-btn>
                <v-btn small text>{{comments.length}}<v-icon small class="mx-1" color="primary">mdi-comment-outline</v-icon></v-btn>
                <v-menu bottom>
                  <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" small text>{{randomNumber()}}<v-icon small class="mx-1" color="primary">mdi-share-variant</v-icon></v-btn>
                  </template>

                  <v-list>
                    <v-list-item>
                      <v-list-item-icon><v-icon small color="primary">mdi-account-group</v-icon></v-list-item-icon>
                      <v-list-item-content>
                        <v-dialog
                        v-model="groupsDialog"
                        width="700"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn text v-bind="attrs" v-on="on">{{$t('groups')}}</v-btn>
                          </template>
                          <groups-list type="share" />
                        </v-dialog>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item v-if="$route.path.includes('profile')">
                      <v-list-item-icon><v-icon small color="primary">mdi-account-multiple</v-icon></v-list-item-icon>
                      <v-list-item-content>
                        <v-dialog
                        v-model="friendsDialog"
                        width="700"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn text v-bind="attrs" v-on="on">{{$t('friends')}}</v-btn>
                          </template>
                          <friends-list type="share" />
                        </v-dialog>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item v-else>
                      <v-list-item-icon><v-icon small color="primary">mdi-share-variant</v-icon></v-list-item-icon>
                      <v-list-item-content>
                        <v-dialog
                        v-model="gradesDialog"
                        width="700"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn text v-bind="attrs" v-on="on">{{$t('shareWithGrade')}}</v-btn>
                          </template>
                          <grades-list />
                        </v-dialog>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <v-dialog
                v-if="$route.path.includes('profile') && $route.params.action !== 'gift'"
                v-model="friendsDialogGift"
                width="700"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn small text v-bind="attrs" v-on="on">{{randomNumber()}}<v-icon small class="mx-1" color="primary">mdi-gift-outline</v-icon></v-btn>
                  </template>
                  <friends-list type= "send" />
                </v-dialog>
            </div>
            <v-spacer></v-spacer>
            <v-dialog
            v-if="$route.name === 'noteView'"
            v-model="orderDialog"
            width="500"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-if="!bought" color="primary" small elevation="0" v-bind="attrs" v-on="on">{{$t('orderNote')}}</v-btn>
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
                        @click="orderDialog = false; confirmDialog = true; bought = true"
                        >
                            {{$t('accept')}}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog
            v-model="confirmDialog"
            width="500"
            >
                <v-card class="pa-5">
                  <!-- <h2 class="extra-font primary--text text-center">{{$t('orderNoteSuccess')}}</h2> -->
                  <v-img v-if="$i18n.locale === 'en'" class="mx-auto" max-width="500" src="../../assets/img/msg.jpeg"></v-img>
                  <v-img v-else class="mx-auto" max-width="500" src="../../assets/img/msg(ar).jpeg"></v-img>
                </v-card>
            </v-dialog>
        </v-card-actions>
        <v-divider></v-divider>
        <v-card-text v-if="comments.length && $route.params.action !== 'newRequests'">
            <div v-for="(item, i) in comments" :key="item.id">
                <v-card outlined class="pa-3">
                    <div>
                        <v-avatar size="30">
                            <img
                            :src="item.personal ? user.avatar : users[i].avatar"
                            >
                        </v-avatar>
                        <span class="mx-2">{{item.personal ? user.name : users[i].name}}</span>
                    </div>
                    <v-card-text>{{item.body}}</v-card-text>
                </v-card>
                <v-btn
                text
                @click="likeComment(item)"
                >
                    {{item.likes}}
                    <v-icon class="mx-1" :color="item.liked ? 'error' : 'primary'">{{item.liked ? 'mdi-heart' : 'mdi-heart-outline'}}</v-icon>
                </v-btn>
            </div>

            <div class="sticky-btn">
                <v-text-field
                rounded
                dense
                append-icon="mdi-send"
                @click:append="addComment"
                v-model="comment.body"
                :placeholder="$t('comment')"
                outlined
                hide-details
                class="my-2"
                style="width: 100%"
                @keyup.enter.prevent="addComment"
                ></v-text-field>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
import { mapState } from 'vuex'
import posts from '../../web services/posts'
import friendsList from '../static components/friendsList'
import groupsList from '../static components/groupsList'
import gradesList from '../../components/static components/gradesList'

export default {
  components: {
    friendsList,
    groupsList,
    gradesList
  },
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
    image: '',
    bought: false,
    friendsDialog: false,
    groupsDialog: false,
    friendsDialogGift: false,
    gradesDialog: false
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
