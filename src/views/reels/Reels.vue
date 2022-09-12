<template>
    <div class="pa-2">
        <masonry
        :cols="3"
        :gutter="20"
        >
            <!-- <div class="mb-2" v-for="(item, index) in imgsArr" :key="index">
                <v-hover v-slot="{ hover }">
                        <div>
                            <v-img class="rounded-lg" :src="require('../../assets/img/'+item.src)">
                                <v-btn icon><v-icon>mdi-play</v-icon></v-btn>
                            </v-img>

                            <v-fade-transition>
                                <div
                                v-if="hover"
                                class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal text-h2 white--text"
                                style="height: 100%;"
                                >
                                    $14.99
                                </div>
                            </v-fade-transition>
                        </div>
                </v-hover>
            </div> -->
            <v-hover v-for="(item, index) in imgsArr" :key="index">
                <template v-slot:default="{ hover }">
                    <v-card class="mb-2" @click="openDialog(item)">
                        <v-img class="text-right" :src="require('../../assets/img/'+item.src)">
                           <v-icon v-if="item.target === 'video'" class="ma-2" x-large color="white" icon>mdi-play</v-icon>
                           <v-icon v-else class="ma-2" x-large color="white" icon>mdi-image</v-icon>
                        </v-img>

                        <v-fade-transition>
                        <v-overlay
                        v-if="hover"
                        absolute
                        color="#036358"
                        >
                            <div>
                                {{Math.round(Math.random() * 100)}} <v-icon>mdi-heart</v-icon>
                                {{Math.round(Math.random() * 100)}} <v-icon>mdi-comment</v-icon>
                            </div>
                        </v-overlay>
                        </v-fade-transition>
                    </v-card>
                </template>
            </v-hover>
        </masonry>
        <v-dialog v-model="dialog" scrollable>
            <v-card max-height="700" v-if="reel.src && users.length">
                <v-row no-gutters>
                    <v-col cols="6">
                        <v-img max-height="700" v-if="reel" :src="require('../../assets/img/'+reel.src)"></v-img>
                    </v-col>
                    <v-col cols="6" class="pa-2">
                        <div class="d-flex flex-wrap justify-space-between" v-if="users.length">
                            <div>
                                <v-avatar class="mx-2" size="40">
                                    <img :src="users[randomIndex].avatar" />
                                </v-avatar>
                                <span>{{users[randomIndex].name}}</span>
                            </div>
                            <v-btn text color="blue">{{$t('follow')}}</v-btn>
                        </div>
                        <div class="mx-auto px-2 pt-2">
                            <p>{{reel.info}}</p>
                        </div>
                        <v-btn @click="postLiked = !postLiked;" text small :color="postLiked ? 'red' : 'primary'">{{Math.round(Math.random() * 100)}}<v-icon small>{{postLiked ? 'mdi-heart' : 'mdi-heart-outline'}}</v-icon></v-btn>
                        <v-btn text small color="primary">{{Math.round(Math.random() * 100)}}<v-icon small>mdi-comment</v-icon></v-btn>
                        <v-btn @click="shareDialog = !shareDialog" text small color="primary">{{Math.round(Math.random() * 100)}}<v-icon small>mdi-share-variant</v-icon></v-btn>
                        <v-dialog
                        v-model="shareDialog"
                        width="700"
                        >
                          <!-- <template v-slot:activator="{ on, attrs }">
                            <v-btn small color="primary" text v-bind="attrs" v-on="on">{{Math.round(Math.random() * 100)}}<v-icon small>mdi-share-variant</v-icon></v-btn>
                          </template> -->
                          <!-- <v-card height="500" width="500" color="indigo"> -->
                            <friends-list type="share" />
                          <!-- </v-card> -->
                        </v-dialog>
                        <v-divider></v-divider>
                        <v-card-text class="pa-0">
                            <div style="height: 370px; overflow-y: auto;" v-if="comments.length" class="mt-2">
                                <div v-for="(item, i) in comments" :key="item.id">
                                <v-card flat class="pa-1">
                                    <div>
                                        <v-avatar size="30">
                                            <img
                                            :src="item.personal ? user.avatar : users[i].avatar"
                                            >
                                        </v-avatar>
                                        <span class="mx-2">{{item.personal ? user.name : users[i].name}}</span>
                                    </div>
                                    <v-card-text class="pa-0">{{item.body}}</v-card-text>
                                </v-card>
                                <v-btn
                                text
                                @click="likeComment(item)"
                                >
                                    {{item.likes}}
                                    <v-icon small class="mx-1" :color="item.liked ? 'error' : 'primary'">{{item.liked ? 'mdi-heart' : 'mdi-heart-outline'}}</v-icon>
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
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import images from '../../imgLoader'
import posts from '../../web services/posts'
import friendsList from '../../components/static components/friendsList'

export default {
  components: {
    friendsList
  },
  data () {
    return {
      imgsArr: [],
      dialog: false,
      reel: {},
      overlay: false,
      comments: [],
      comment: {
        body: '',
        personal: true,
        likes: 0,
        liked: false
      },
      liked: false,
      postLiked: false,
      shareDialog: false
    }
  },
  computed: {
    ...mapState(['users', 'user']),
    randomIndex () {
      return Math.floor(Math.random() * this.users.length)
    }
  },
  methods: {
    openDialog (item) {
      this.dialog = true
      this.reel = item
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
  created () {
    this.imgsArr = images
    this.getComments()
  }
}
</script>
