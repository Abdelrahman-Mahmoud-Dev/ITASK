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
            <v-card class="mb-5 pa-3" v-for="(item) in displayNotes" :key="item.id">
                <v-row>
                    <v-col cols="2">
                        <v-img class="rounded" :src="require(`@/assets/icons/${item.image}`)"></v-img>
                    </v-col>
                    <v-col cols="10">
                        <v-card-title class="d-flex py-0 justify-space-between">
                            <div>{{item.lesson + ', ' + item.subj + ', ' + item.teacher}}</div>
                            <v-rating
                            background-color="warning lighten-1"
                            color="warning"
                            dense
                            empty-icon="mdi-star-outline"
                            full-icon="mdi-star"
                            half-icon="mdi-star-half-full"
                            half-increments
                            hover
                            length="5"
                            readonly
                            size="20"
                            :value="4.5"
                            ></v-rating>
                        </v-card-title>
                        <v-card-text>{{item.body}}</v-card-text>
                    </v-col>
                </v-row>
                <v-card-actions>
                    <v-btn @click="$router.push('/note/' + item.id)" small text color="secondary">{{ $t('seeMore') }}</v-btn>
                    <v-spacer></v-spacer>
                    <div>
                        <v-btn text>{{Math.floor(Math.random() * 200)}}<v-icon class="mx-1" color="primary">mdi-eye-outline</v-icon></v-btn>
                        <v-btn text>{{Math.floor(Math.random() * 200)}}<v-icon class="mx-1" color="primary">mdi-download-outline</v-icon></v-btn>
                        <v-btn text>{{Math.floor(Math.random() * 200)}}<v-icon class="mx-1" color="primary">mdi-heart-outline</v-icon></v-btn>
                        <v-btn text>{{Math.floor(Math.random() * 200)}}<v-icon class="mx-1" color="primary">mdi-thumb-up-outline</v-icon></v-btn>
                    </div>
                </v-card-actions>
            </v-card>
        </v-sheet>
      </v-col>

      <v-col cols="12" md="3" xl="2">
        <v-sheet class="scrollable-sheet" color="grey lighten-3" height="81vh">
           <!-- new notes -->
          <v-sheet v-if="$route.name === 'notes'" rounded="lg" style="overflow: auto;" height="25vh" class="mb-5 pa-2 pt-0">
            <NewNotes />
          </v-sheet>

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
import NewNotes from '@/components/static components/NewNotes'
import { mapState } from 'vuex'

export default {
  components: {
    SideMenu,
    FriendRequests,
    NewExams,
    NewTeachers,
    TopTeachers,
    NewNotes
  },
  name: 'Home',
  data: () => ({
    notes: {
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
    }
  }),
  computed: {
    ...mapState(['images']),
    displayNotes () {
      if (this.$i18n.locale === 'en') return this.notes.en
      else return this.notes.ar
    }
  }
}
</script>
