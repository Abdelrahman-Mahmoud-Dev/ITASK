<template>
    <div>
        <h3 class="primary--text text-capitalize font-weight-bold">{{$t($route.params.action)}}</h3>

        <div v-if="$route.params.action === 'requestRoom'">
            <v-row>
                <v-col cols="12" sm="4">
                    <v-select
                    prepend-inner-icon="mdi-human-male-board"
                    :label="$t('roomName')"
                    solo
                    color="primary"
                    :items="[{text: $t('generalReview'), value: 'general'}, {text: $t('examReview'), value: 'exam'}]"
                    item-text="text"
                    item-value="value"
                    v-model="roomName"
                    hide-details
                    >
                    </v-select>
                </v-col>

                <v-col cols="12" sm="4">
                    <v-menu
                    v-model="dateMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            v-model="date"
                            solo
                            color="primary"
                            :label="$t('startDate')"
                            prepend-inner-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            hide-details
                            ></v-text-field>
                        </template>
                        <v-date-picker
                        v-model="date"
                        :min="new Date().toISOString().split('T')[0]"
                        @input="dateMenu = false"
                        ></v-date-picker>
                    </v-menu>
                </v-col>

                <v-col cols="12" sm="4">
                    <v-menu
                    v-model="endTimeMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    ref="endTimeMenu"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            v-model="endTime"
                            solo
                            color="primary"
                            :label="$t('startTime')"
                            prepend-inner-icon="mdi-clock"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            hide-details
                            ></v-text-field>
                        </template>
                        <v-time-picker
                        v-if="endTimeMenu"
                        v-model="endTime"
                        @click:minute="$refs.endTimeMenu.save(endTime)"
                        scrollable
                        ampm-in-title
                        format="ampm"
                        ></v-time-picker>
                    </v-menu>
                </v-col>

                <v-col cols="12">
                    <v-textarea
                    color="primary"
                    solo
                    v-model="question"
                    :label="$t('message')"
                    hide-details
                    ></v-textarea>
                </v-col>

                <v-col cols="12" sm="4">
                    <v-select
                    solo
                    :label="$t('inviteFriends')"
                    color="primary"
                    :items="[{value: 'public', text: $t('public')}, {value: 'friends', text: $t('friends')}]"
                    v-model="invitation"
                    item-text="text"
                    item-value="value"
                    @change="invitation === 'friends' ? invitationDialog = true : showFriends = false"
                    :hint="$t('selectedFriends') + ': ' + selectedFriends.length"
                    persistent-hint
                    ></v-select>

                    <v-dialog max-width="900" v-model="invitationDialog">
                        <v-card class="">
                            <v-card-title>
                                <span class="text-h5 primary--text">{{$t('inviteFriends')}}</span>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text>
                            <v-row no-gutters>
                                <v-col cols="12" sm="8">
                                    <v-text-field prepend-inner-icon="mdi-magnify" rounded outlined dense hide-details class="mt-5 mx-5" v-model="searchTerm"></v-text-field>
                                    <v-checkbox
                                    :label="$t('allFriends')"
                                    @click="selectedFriends.length === users.length ? selectedFriends = [] : selectedFriends = users"
                                    ></v-checkbox>
                                    <v-divider></v-divider>
                                    <v-list>
                                        <v-list-item v-for="friend in friends" :key="friend.id">
                                            <v-list-item-avatar>
                                                <img width="20" class="rounded-circle mx-1" :src="friend.avatar" alt="">
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-checkbox
                                                v-model="selectedFriends"
                                                :value="friend"
                                                ></v-checkbox>
                                                {{friend.name}}
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </v-col>
                                <v-col class="grey lighten-2 pa-2" cols="12" sm="4">
                                    <h4>{{$t('selectedFriends')}}</h4>
                                    <v-list class="grey lighten-2">
                                        <v-list-item v-for="friend in selectedFriends" :key="friend.id">
                                            <v-list-item-avatar>
                                                <img width="20" class="rounded-circle mx-1" :src="friend.avatar" alt="">
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title>{{friend.name}}</v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                    <div v-if="selectedFriends.length">
                                        <v-btn @click="selectedFriends = []" text color="primary">empty</v-btn>
                                        <v-btn small elevation="0" @click="invitationDialog = false" color="primary">{{$t('invite')}}</v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                </v-col>
            </v-row>

            <v-dialog
            v-model="submitDialog"
            width="500"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" class="px-15 mt-5 d-block mx-auto" large elevation="0" v-bind="attrs" v-on="on">{{$t('submit')}}</v-btn>
                </template>

                <v-card class="pt-5 text-center">
                    <!-- <v-icon color="success" size="150" class="mx-auto">mdi-checkbox-marked-circle-outline</v-icon>
                    <h2 class="extra-font text-center mt-5">{{$t('roomPublished')}}</h2> -->
                    <v-img v-if="$i18n.locale === 'en'" class="mx-auto" max-width="500" src="../../assets/img/msg.jpeg"></v-img>
                    <v-img v-else class="mx-auto" max-width="500" src="../../assets/img/msg(ar).jpeg"></v-img>
                </v-card>
            </v-dialog>
        </div>

        <div v-else-if="$route.params.action === 'invitations'">
            <v-row v-show="!showNote" class="mt-5">
                <v-col cols="12" v-for="(item, i) in materials" :key="item.id">
                    <v-card class="pa-3">
                        <div class="text-h6 primary--text mb-2">{{item.subj}}, {{item.lesson}}, <router-link to="/teacher">{{item.teacher}}</router-link></div>
                        <div class="mb-2"><h5>{{ new Date() | dateDisplay }} - {{new Date() | dateDisplay}}</h5></div>
                        <div>{{item.body}}</div>
                        <v-divider class="my-3"></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="materials.splice(i, 1)" tile elevation="0" class="px-15" color="primary">{{$t('accept')}}</v-btn>
                            <v-btn @click="materials.splice(i, 1)" tile elevation="0" class="px-15" color="grey lighten-2">{{$t('reject')}}</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            <div v-if="showNote" class="mt-5">
                <v-btn @click="showNote = false" text color="primary"><v-icon>mdi-keyboard-return</v-icon>{{$t('return')}}</v-btn>
                <note/>
            </div>
        </div>

        <div v-else-if="$route.params.action === 'participants'">
          <v-card>
            <v-row class="mt-5">
                <v-col cols="12" class="py-0" sm="6" v-for="friend in friends" :key="friend.id">
                  <v-list class="">
                    <v-list-item  :key="friend.id">
                      <v-list-item-avatar>
                        <img width="20" class="rounded-circle mx-1" :src="friend.avatar" alt="">
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>{{friend.name}}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>
            </v-row>
          </v-card>
          <v-card class="my-5 pa-5">
            <v-card-title class="px-0">{{$t('message')}}</v-card-title>
            <p>{{displaySubjects[0].body}}</p>
          </v-card>
          <v-dialog
            v-model="submitDialog"
            width="500"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" class="px-15 mt-5 d-block mx-auto" large elevation="0" v-bind="attrs" v-on="on">{{$t('submit')}}</v-btn>
                </template>

                <v-card class="pt-5 text-center">
                    <!-- <v-icon color="success" size="150" class="mx-auto">mdi-checkbox-marked-circle-outline</v-icon>
                    <h2 class="extra-font text-center mt-5">{{$t('roomPublished')}}</h2> -->
                    <v-img v-if="$i18n.locale === 'en'" class="mx-auto" max-width="500" src="../../assets/img/msg.jpeg"></v-img>
                    <v-img v-else class="mx-auto" max-width="500" src="../../assets/img/msg(ar).jpeg"></v-img>
                </v-card>
            </v-dialog>
        </div>

        <div v-else class="my-10">
            <v-card class="pa-5 mb-5">
                <h4 class="mb-3">{{$t($route.params.action)}}, {{$t('examReview')}}</h4>
                <h5 class="mb-3">{{new Date() | dateDisplay}}</h5>
                <h5 class="mb-3">11:30 AM - 2:00 PM</h5>
                <v-text-field readonly @click:append="copy" @focus="link = 'https://ifzaani.com/class/123ew'" outlined append-icon="mdi-content-copy" prepend-inner-icon="mdi-link" hide-details color="primary" v-model="link" :label="$t('createClassLink')"></v-text-field>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-dialog
                    v-model="submitDialog"
                    width="500"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" class="px-15 mt-5 d-block mx-auto" large elevation="0" v-bind="attrs" v-on="on">{{$t('submit')}}</v-btn>
                        </template>

                        <v-card class="pt-5 text-center">
                            <!-- <v-icon color="success" size="150" class="mx-auto">mdi-checkbox-marked-circle-outline</v-icon>
                            <h2 class="extra-font text-center mt-5">{{$t('roomPublished')}}</h2> -->
                            <v-img v-if="$i18n.locale === 'en'" class="mx-auto" max-width="500" src="../../assets/img/msg.jpeg"></v-img>
                            <v-img v-else class="mx-auto" max-width="500" src="../../assets/img/msg(ar).jpeg"></v-img>
                        </v-card>
                    </v-dialog>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>

<script>
import Note from '../../components/notes/Note'
import { mapState } from 'vuex'

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
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas',
            image: 'math.svg'
          },
          {
            id: 2,
            subj: 'Physics',
            lesson: 'Atom',
            teacher: 'Jane Doe',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas',
            image: 'physics.svg'
          },
          {
            id: 3,
            subj: 'Chemistery',
            lesson: 'Neutron',
            teacher: 'Aly Anniston',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas',
            image: 'chem.svg'
          },
          {
            id: 4,
            subj: 'Biology',
            lesson: 'Cell',
            teacher: 'Jaimy Doe',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas',
            image: 'bio.svg'
          },
          {
            id: 5,
            subj: 'Arabic',
            lesson: 'Grammar',
            teacher: 'John Jacks',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas',
            image: 'ar.svg'
          }
        ],
        ar: [
          {
            id: 1,
            subj: 'رياضيات',
            lesson: 'الجبر',
            teacher: 'محمد علي',
            image: 'math.svg',
            body: 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص، هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،'
          },
          {
            id: 2,
            subj: 'فيزياء',
            lesson: 'الذرة',
            teacher: 'إيناس أحمد',
            image: 'physics.svg',
            body: 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص، هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،'
          },
          {
            id: 3,
            subj: 'كيمياء',
            lesson: 'النيوترون',
            teacher: 'ماكس ملنر',
            image: 'chem.svg',
            body: 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص، هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،'
          },
          {
            id: 4,
            subj: 'أحياء',
            lesson: 'الخلية',
            teacher: 'محمد علي',
            image: 'bio.svg',
            body: 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص، هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،'
          },
          {
            id: 5,
            subj: 'لغة عربية',
            lesson: 'نحو',
            teacher: 'إيناس أحمد',
            image: 'ar.svg',
            body: 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص، هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص،'
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
      dateMenu: false,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      startTimeMenu: false,
      startTime: '',
      endTimeMenu: false,
      endTime: '',
      invitation: '',
      invitationDialog: false,
      selectedFriends: [],
      searchTerm: '',
      studentsNum: '1',
      link: '',
      roomName: ''
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
    },
    invitation (val) {
      if (val === 'friends') this.invitationDialog = true
      else this.invitationDialog = false
    },
    searchTerm (val) {
      this.friends = this.users.filter(item => item.name.toLowerCase().includes(val.toLowerCase()))
    }
  },
  computed: {
    ...mapState(['users']),
    // friends () {
    //   if (this.searchTerm) {
    //     return this.users.filter(item => item.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
    //   } else {
    //     return this.users
    //   }
    // },
    displayImage () {
      return this.image ? URL.createObjectURL(this.image) : null
    },
    displaySubjects () {
      if (this.$i18n.locale === 'en') return this.notes.en
      else return this.notes.ar
    },
    start () {
      const today = new Date()
      return new Date(today.setDate(today.getDay() - 1))
    },
    randomTime () {
      return new Date(this.start.getTime() + Math.random() * (new Date().getTime() - this.start.getTime()))
    }
  },
  methods: {
    copy () {
      document.execCommand(this.link)
      alert('Copied to clipboard')
    }
  },
  created () {
    this.materials = this.displaySubjects
    this.friends = this.users
  }
}
</script>
