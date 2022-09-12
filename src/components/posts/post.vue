<template>
    <v-card class="mb-5 pa-5">
        <v-row no-gutters justify="space-between" align="center">
            <div @click="$router.push('/teacher')">
                <v-avatar size="30">
                    <img
                    v-if="$route.path.includes('profile')"
                    :src="user.avatar"
                    >
                    <img
                    v-else
                    :src="postUser.avatar"
                    >
                </v-avatar>
                <span class="mx-2">{{postUser.name}}</span> <br />
                <span v-if="$route.name === 'groups' && groups.length" class="mx-10 font-weight-bold">
                  {{groups[Math.round(Math.random() * 5)].name}}
                  <v-icon color="primary" small>{{groups[Math.round(Math.random() * 5)].privacy === 'public' ? 'mdi-earth' : 'mdi-lock'}}</v-icon>
                </span>
            </div>

            <h6>{{ randomTime | dateDisplay }}</h6>

            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon color="primary" dark v-bind="attrs" v-on="on">
                        <v-icon>mdi-dots-horizontal</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item>
                        <v-list-item-title><v-icon>mdi-bookmark-minus-outline</v-icon>{{ $t('savePost') }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title><v-icon>mdi-pencil</v-icon>{{ $t('edit') }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title><v-icon>mdi-close-circle</v-icon>{{ $t('delete') }}</v-list-item-title>
                    </v-list-item>
                </v-list>
                </v-menu>
        </v-row>

        <v-card-text class="black--text">
            <div v-if="post.id % 2 !== 0">
                <v-chip class="ma-1" color="grey lighten-2" label text-color="black"><v-icon small>mdi-book-outline</v-icon>Math</v-chip>
                <v-chip class="ma-1" color="grey lighten-2" label text-color="black"><v-icon small>mdi-book-outline</v-icon>Linear Algebra</v-chip>
                <v-chip class="ma-1" color="grey lighten-2" label text-color="black"><v-icon small>mdi-account-school-outline</v-icon>Mohammed</v-chip>
                <v-chip class="ma-1" color="grey lighten-2" label text-color="black"><v-icon small>mdi-account-school-outline</v-icon>Mayan</v-chip>
            </div>
            {{post.body}}

        </v-card-text>
        <div v-if="post.images.length" style="height 150px;">
            <gallery :images="post.images" ></gallery>
        </div>
        <div class="d-flex">
            <v-btn text @click="likePost">{{post.likes}}<v-icon class="mx-1" :color="liked ? 'error' : 'primary'">{{liked ? 'mdi-heart' : 'mdi-heart-outline'}}</v-icon></v-btn>
            <v-btn text @click="getComments">{{comments.length ? comments.length : ''}}<v-icon class="mx-1" color="primary">mdi-comment-outline</v-icon></v-btn>
            <!-- <v-btn text>{{post.shares}}<v-icon class="mx-1" color="primary">mdi-share-variant</v-icon></v-btn> -->
            <v-menu bottom>
              <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" small text>{{post.shares}}<v-icon small class="mx-1" color="primary">mdi-share-variant</v-icon></v-btn>
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

                <v-list-item>
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
              </v-list>
            </v-menu>
        </div>
        <v-divider v-if="showCommentsBox"></v-divider>
        <v-card-text v-show="showCommentsBox">
            <div v-if="comments.length" class="mt-2">
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
import posts from '@/web services/posts'
import friendsList from '../static components/friendsList'
import groupsList from '../static components/groupsList'
import { mapState } from 'vuex'

export default {
  props: ['post'],
  components: {
    friendsList,
    groupsList
  },
  data: () => ({
    comments: [],
    comment: {
      body: '',
      personal: true,
      likes: 0,
      liked: false
    },
    liked: false,
    showCommentsBox: false,
    groupsDialog: false,
    friendsDialog: false
  }),
  computed: {
    ...mapState(['users', 'user', 'images', 'groups']),
    postUser () {
      return this.$store.state.users.find(item => item.id === this.post.userId)
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
    likePost () {
      if (this.liked) {
        this.post.likes--
        this.liked = false
      } else {
        this.post.likes++
        this.liked = true
      }
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
        posts.postComments(this.post.id).then(res => {
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
  }
}
</script>

<style>
.img-main {
    background: none !important;
}
.img-left {
    height: 200px !important;
    border: 2px solid white !important;
}
.img-right {
    height: 100px !important;
    border: 2px solid white !important;
    text-align: center;
}
.btn.more-btn {
    background: none !important;
    border: none !important;
    font-size: 10px !important;
    font-weight: 300 !important;
    width: 100px !important;
    text-align: center;
    padding: 0 !important;
    top: 50% !important;
    left: 50% !important;
}
.sticky-btn {
    position: sticky;
    bottom: 0;
    width: 100%;
    z-index: 1;
    background-color: white;
    padding: 10px;
}
</style>
