<template>
    <div>
        <h3 class="primary--text text-capitalize font-weight-bold">{{$t($route.params.action)}}</h3>

        <div v-if="$route.params.action === 'createClass' || $route.params.action === 'bookingTeacher' || $route.params.action === 'bookingClass'">
            <v-row>
                <v-col cols="12" sm="6">
                    <v-select
                    prepend-inner-icon="mdi-book"
                    :label="$t('subject')"
                    solo
                    color="primary"
                    :items="displaySubjects"
                    item-text="subj"
                    item-value="subj"
                    v-model="subject"
                    hide-details
                    :append-icon="$route.params.action === 'bookingTeacher' || $route.params.action === 'bookingClass'? 'mdi-dot' : 'mdi-chevron-down'"
                    :readonly="$route.params.action === 'bookingTeacher' || $route.params.action === 'bookingClass'"
                    >
                    </v-select>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-text-field :readonly="$route.params.action === 'bookingTeacher' || $route.params.action === 'bookingClass'" hide-details color="primary" prepend-inner-icon="mdi-book-open-blank-variant" solo v-model="lesson" :label="$t('lesson') + '/' + $t('chapter') + '/' + $t('unit')"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
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
                        :readonly="$route.params.action === 'bookingTeacher' || $route.params.action === 'bookingClass'"
                        ></v-date-picker>
                    </v-menu>
                    <v-text-field readonly v-if="$route.params.action === 'bookingTeacher' || $route.params.action === 'bookingClass'" hide-details :prefix="$t('students') + ':'" class="mt-1" solo :label="$t('students')" type="number" min="1" v-model="studentsNum"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
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
                        :readonly="$route.params.action === 'bookingTeacher' || $route.params.action === 'bookingClass'"
                        ></v-time-picker>
                    </v-menu>

                    <v-menu
                    v-model="startTimeMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    ref="startTimeMenu"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            v-model="startTime"
                            class="my-1"
                            solo
                            color="primary"
                            :label="$t('endTime')"
                            prepend-inner-icon="mdi-clock"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            hide-details
                            ></v-text-field>
                        </template>
                        <v-time-picker
                        v-if="startTimeMenu"
                        v-model="startTime"
                        @click:minute="$refs.startTimeMenu.save(startTime)"
                        scrollable
                        ampm-in-title
                        format="ampm"
                        :readonly="$route.params.action === 'bookingTeacher' || $route.params.action === 'bookingClass'"
                        ></v-time-picker>
                    </v-menu>
                </v-col>

                <v-col cols="12" sm="6" v-if="$route.params.action === 'bookingClass'">
                    <v-text-field :readonly="$route.params.action === 'bookingClass'" prepend-inner-icon="mdi-account" hide-details color="primary" solo v-model="teacher" :label="$t('teacher')"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" v-if="$route.params.action === 'bookingClass'">
                    <v-text-field readonly @click:append="copy" @focus="link = 'https://ifzaani.com/class/123ew'" append-icon="mdi-content-copy" prepend-inner-icon="mdi-link" hide-details color="primary" solo v-model="link" :label="$t('createClassLink')"></v-text-field>
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

                <v-col v-if="$route.params.action === 'bookingTeacher'" cols="12" sm="4">
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

                <v-col v-else-if="$route.params.action === 'createClass'" cols="12" sm="4">
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
                                        <v-btn small elevation="0" @click="invitationDialog = false" color="primary">{{$t('submit')}}</v-btn>
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
                    <v-btn :disabled="!(subject && lesson && startTime && endTime && date)" color="primary" class="px-15 mt-5 d-block mx-auto" large elevation="0" v-bind="attrs" v-on="on">{{$t('submit')}}</v-btn>
                </template>

                <v-card class="pt-5 text-center">
                    <!-- <v-icon color="success" size="150" class="mx-auto">mdi-checkbox-marked-circle-outline</v-icon>
                    <h2 class="extra-font text-center mt-5">{{$t('classPublished')}}</h2> -->
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
                    <h2 class="extra-font text-center mt-5">{{$t('classPublished')}}</h2> -->
                    <v-img v-if="$i18n.locale === 'en'" class="mx-auto" max-width="500" src="../../assets/img/msg.jpeg"></v-img>
                    <v-img v-else class="mx-auto" max-width="500" src="../../assets/img/msg(ar).jpeg"></v-img>
                </v-card>
            </v-dialog>
        </div>

        <div v-else>
            <v-select
            prepend-inner-icon="mdi-book"
            :label="$t('subject')"
            solo
            color="primary"
            :items="displaySubjects"
            item-text="subj"
            item-value="subj"
            v-model="subject"
            hide-details
            >
                <template v-slot:prepend-item>
                    <v-list-item
                    @click="subject = 'all'"
                    >
                        <v-list-item-content>
                            <v-list-item-title>
                            {{$t('selectAll')}}
                            </v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider>
                </template>
            </v-select>
            <v-card v-show="!showNote" class="my-5">
              <v-row>
                  <v-col cols="12" sm="6" v-for="(item) in materials" :key="item.id">
                      <v-menu bottom v-if="$route.params.action === 'myClasses'">
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
                      <v-btn small text @click="showNote = true">{{item.subj}}, {{item.lesson}}, </v-btn>
                      <v-btn class="px-0" small text @click="$router.push('/teacher')">{{item.teacher}}</v-btn>
                      <v-btn disabled class="px-0" small text @click="showNote = true">{{new Date() | dateDisplay}}</v-btn>
                  </v-col>
              </v-row>
            </v-card>
            <div v-if="showNote" class="mt-5">
                <v-btn @click="showNote = false" text color="primary"><v-icon>mdi-keyboard-return</v-icon>{{$t('return')}}</v-btn>
                <div v-if="$route.params.action === 'bookingConfirmation'">
                    <v-row class="mb-10">
                        <v-col cols="12" sm="6" md="4" v-for="(item) in materials" :key="item.id">
                            <v-card class="my-3 pa-2">
                                <div class="text-h6 primary--text mb-2">{{item.subj}}, {{item.lesson}}, {{item.teacher}}</div>
                                <v-rating
                                background-color="warning lighten-1"
                                color="warning"
                                dense
                                empty-icon="mdi-star-outline"
                                full-icon="mdi-star"
                                half-icon="mdi-star-half-full"
                                half-increments
                                hover
                                :length="5"
                                readonly
                                size="12"
                                :value="4.5"
                                ></v-rating>
                                <div class="mb-2"><h5>{{ new Date() | dateDisplay }} - {{new Date() | dateDisplay}}</h5></div>
                                <div>{{$t('status')}}: {{$t('confirmed')}}</div>
                                <div>{{$t('classesNo')}}: 4</div>
                                <v-divider class="my-3"></v-divider>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn @click="materials.splice(i, 1)" small tile elevation="0" class="px-10" color="primary">{{$t('submit')}}</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </div>
                <div v-else>
                  <note></note>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Note from '../../components/notes/ClassView'
import { mapState } from 'vuex'
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
      studentsNum: '15',
      link: '',
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
    if (this.$route.params.action === 'bookingTeacher' || this.$route.params.action === 'bookingClass') {
      this.subject = 'Math'
      this.lesson = 'Algebra'
      this.startTime = '11:50'
      this.endTime = '10:00'
    }
    if (this.$route.params.action === 'bookingClass') this.teacher = 'Max Milner'
  }
}
</script>
