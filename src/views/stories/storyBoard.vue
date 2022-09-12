<template>
    <div>
        <v-container fluid>
            <v-row justify="center">
                <v-col style="height: 90vh; overflow: auto;" cols="12" sm="6" md="4">
                    <v-list three-line>
                        <template>
                            <v-list-item v-if="!userStories.length" @click="$router.push('/addStory')">
                                <v-list-item-avatar>
                                  <v-icon size="40" color="primary">mdi-plus-circle</v-icon>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                  <v-list-item-title class="text-h5 secondary--text">{{$t('createSory')}}</v-list-item-title>
                                  <v-list-item-subtitle class="secondary--text">{{$t('storyAddNote')}}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item v-else>
                                <v-list-item-avatar @click="showUserStories = true">
                                  <v-img :src="user.avatar"></v-img>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                  <v-list-item-title class="text-h5 secondary--text">{{user.name}}</v-list-item-title>
                                  <v-list-item-subtitle class="secondary--text">1 {{$t('min')}}</v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action>
                                  <v-btn icon color="primary" @click="$router.push('/addStory')"><v-icon size="50">mdi-plus-circle</v-icon></v-btn>
                                </v-list-item-action>
                            </v-list-item>

                            <v-divider></v-divider>

                            <v-list-item
                            @click="selectUser(item)"
                            v-for="(item) in users"
                            :key="item.id"
                            >
                            <v-list-item-avatar>
                                <v-img :src="item.avatar"></v-img>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title v-html="item.name"></v-list-item-title>
                                <v-list-item-subtitle class="secondary--text" v-html="Math.round(Math.random() * 50) + $t('min')"></v-list-item-subtitle>
                            </v-list-item-content>
                            </v-list-item>
                        </template>
                    </v-list>
                </v-col>
                <v-col v-if="!showUserStories" cols="12" sm="6" md="8" class="px-15">
                    <v-sheet width="50%" class="mx-auto rounded-lg">
                      <v-carousel @change="itemChanged" next-icon="mdi-chevron-right-circle" prev-icon="mdi-chevron-left-circle" interval="5000" hide-delimiters height="80vh" cycle show-arrows-on-hover>
                          <v-carousel-item
                          v-for="(item,i) in items"
                          :key="i"
                          :src="item.src"
                          >
                                  <v-row
                                  class="pa-5"
                                  justify="center"
                                  >
                                      <v-col cols="3">
                                          <v-progress-linear
                                          color="white"
                                          height="5"
                                          rounded
                                          v-model="value"
                                          :active="show"
                                          :indeterminate="query"
                                          :query="true"
                                          ></v-progress-linear>
                                      </v-col>

                                      <v-col cols="3">
                                          <v-progress-linear
                                          color="white"
                                          height="5"
                                          rounded
                                          v-model="value1"
                                          :active="show1"
                                          :indeterminate="query1"
                                          :query="true"
                                          ></v-progress-linear>
                                      </v-col>

                                      <v-col cols="3">
                                          <v-progress-linear
                                          color="white"
                                          height="5"
                                          rounded
                                          v-model="value2"
                                          :active="show2"
                                          :indeterminate="query2"
                                          :query="true"
                                          ></v-progress-linear>
                                      </v-col>

                                      <v-col cols="3">
                                          <v-progress-linear
                                          color="white"
                                          height="5"
                                          rounded
                                          v-model="value3"
                                          :active="show3"
                                          :indeterminate="query3"
                                          :query="true"
                                          ></v-progress-linear>
                                      </v-col>
                                  </v-row>

                                  <v-avatar size="50" class="mx-5">
                                      <img :src="selectedUser.avatar" alt="">
                                  </v-avatar>
                                  <span class="white--text body-1 font-weight-bold">{{selectedUser.name}} 4 {{$t('min')}}</span>
                          </v-carousel-item>
                      </v-carousel>
                      </v-sheet>
                      <div class="d-flex align-center my-5 justify-center">
                          <v-text-field rounded dense style="max-width: 350px;" hide-details append-icon="mdi-send" solo :placeholder="$t('saySomething')"></v-text-field>
                          <v-btn icon x-large><v-icon color="red">mdi-heart-outline</v-icon></v-btn>
                      </div>
                </v-col>

                <v-col v-else cols="12" sm="6" md="8" class="px-15">
                  <v-sheet width="50%" class="mx-auto rounded-lg" v-if="userStories.length">
                    <v-carousel v-model="step" :show-arrows="!activeNav" @change="itemChanged" next-icon="mdi-chevron-right-circle" prev-icon="mdi-chevron-left-circle" interval="5000" hide-delimiters height="80vh" cycle show-arrows-on-hover>
                      <div v-for="(item,i) in userStories" :key="i">
                        <v-carousel-item
                        v-if="item.type == 'image'"
                        :src="item.image"
                        >
                          <div class="fill-height d-flex flex-column justify-space-between">
                              <div class="mt-5">
                                <v-avatar size="50" class="mx-5">
                                  <img :src="user.avatar" alt="">
                                </v-avatar>
                                <span class="white--text body-1 font-weight-bold">{{user.name}} <small> 1 {{$t('min')}}</small></span>
                              </div>
                              <div class="text-h3 text-center" :style="{color: item.textColor}">{{item.text}}</div>
                              <div class="mx-5">
                                <v-btn @click="activeNav = !activeNav" text color="white" x-large>
                                  {{item.views}} {{$t('views')}}
                                </v-btn>
                                <v-bottom-navigation
                                v-show="activeNav"
                                v-model="value"
                                :input-value="activeNav"
                                color="indigo"
                                height="500"
                                absolute
                                class="rounded-t-xl"
                                >
                                  <div style="width: 400px">
                                    <v-btn icon x-large class="my-1" @click="activeNav = false"><v-icon>mdi-close</v-icon></v-btn>
                                    <v-slide-group
                                    v-model="slide"
                                    class="pa-4"
                                    mandatory
                                    >
                                      <v-slide-item
                                        v-for="(slider, k) in userStories"
                                        :key="k"
                                        v-slot="{ active, toggle }"
                                      >
                                        <v-img contain @click="toggle; step = k" v-if="slider.type === 'image'" :src="slider.image" :height="active ? 150 : 140" width="100">
                                          <div class="fill-height d-flex align-center justify-center">
                                            <div class="caption" :style="{color: slider.textColor}">{{slider.text}}</div>
                                          </div>
                                        </v-img>
                                        <v-card v-else @click="toggle; step = k" :height="active ? 150 : 140" width="100" rounded elevation="0" :color="slider.bgColor || 'primary'">
                                          <div class="fill-height d-flex flex-column justify-center align-center">
                                            <div class="caption" :style="{color: slider.textColor}">{{slider.text}}</div>
                                          </div>
                                        </v-card>
                                      </v-slide-item>
                                      <v-slide-item class="mx-1">
                                        <v-card @click="$router.push('/addStory')" :height="active ? 150 : 140" width="100" rounded elevation="0" color="grey lighten-1">
                                          <div class="fill-height d-flex flex-column justify-center align-center">
                                            <v-icon size="50" color="primary">mdi-plus-circle</v-icon>
                                          </div>
                                        </v-card>
                                      </v-slide-item>
                                    </v-slide-group>
                                    <v-list>
                                      <v-list-item
                                        v-for="n in item.views"
                                        :key="n"
                                      >
                                        <v-list-item-avatar>
                                          <v-img :src="users[n+1].avatar"></v-img>
                                        </v-list-item-avatar>

                                        <v-list-item-content>
                                          <v-list-item-title class="text-h5 secondary--text">{{users[n+1].name}}</v-list-item-title>
                                        </v-list-item-content>
                                      </v-list-item>
                                    </v-list>
                                  </div>
                                </v-bottom-navigation>
                               </div>
                            </div>
                          </v-carousel-item>
                          <v-carousel-item
                          v-else
                          >
                            <v-card height="100%" width="100%" class="mx-15 mx-auto rounded-xl" rounded elevation="0" :color="item.bgColor || 'primary'">
                              <div class="fill-height d-flex flex-column  justify-space-between">
                                <div class="mt-5">
                                  <v-avatar size="50" class="mx-5">
                                    <img :src="user.avatar" alt="">
                                  </v-avatar>
                                  <span class="white--text body-1 font-weight-bold">{{user.name}} <small> 1 {{$t('min')}}</small></span>
                                </div>
                                <div class="text-h3 text-center" :style="{color: item.textColor}">{{item.text}}</div>
                                <div class="mb-5 mx-5">
                                  <v-btn @click="activeNav = !activeNav" text color="white" x-large>
                                  {{item.views}} {{$t('views')}}
                                </v-btn>
                                <v-bottom-navigation
                                v-if="activeNav"
                                v-model="value"
                                :input-value="activeNav"
                                color="indigo"
                                height="500"
                                absolute
                                class="rounded-t-xl"
                                >
                                  <div style="width: 400px">
                                    <v-btn icon x-large class="my-1" @click="activeNav = false"><v-icon>mdi-close</v-icon></v-btn>
                                    <v-slide-group
                                    v-model="slide"
                                    class="pa-4"
                                    mandatory
                                    >
                                      <v-slide-item
                                        v-for="(slider, k) in userStories"
                                        :key="k"
                                        v-slot="{ active, toggle }"
                                      >
                                        <v-img contain @click=" step = k; toggle;" v-if="slider.type === 'image'" :src="slider.image" :height="active ? 150 : 140" width="100">
                                          <div class="fill-height d-flex align-center justify-center">
                                            <div class="caption" :style="{color: slider.textColor}">{{slider.text}}</div>
                                          </div>
                                        </v-img>
                                        <v-card v-else @click=" step = k; toggle;" :height="active ? 150 : 140" width="100" rounded elevation="0" :color="slider.bgColor || 'primary'">
                                          <div class="fill-height d-flex flex-column justify-center align-center">
                                            <div class="caption" :style="{color: slider.textColor}">{{slider.text}}</div>
                                          </div>
                                        </v-card>
                                      </v-slide-item>
                                      <v-slide-item class="mx-1">
                                        <v-card @click="$router.push('/addStory')" :height="active ? 150 : 140" width="100" rounded elevation="0" color="grey lighten-1">
                                          <div class="fill-height d-flex flex-column justify-center align-center">
                                            <v-icon size="50" color="primary">mdi-plus-circle</v-icon>
                                          </div>
                                        </v-card>
                                      </v-slide-item>
                                    </v-slide-group>
                                    <v-list>
                                      <v-list-item
                                        v-for="n in item.views"
                                        :key="n"
                                      >
                                        <v-list-item-avatar>
                                          <v-img :src="users[n+1].avatar"></v-img>
                                        </v-list-item-avatar>

                                        <v-list-item-content>
                                          <v-list-item-title class="text-h5 secondary--text">{{users[n+1].name}}</v-list-item-title>
                                        </v-list-item-content>
                                      </v-list-item>
                                    </v-list>
                                  </div>
                                </v-bottom-navigation>
                                </div>
                              </div>
                            </v-card>
                          </v-carousel-item>
                        </div>
                    </v-carousel>
                  </v-sheet>
                  <v-sheet width="50%" height="500" class="mx-auto pa-5 rounded-lg text-center" v-else>
                    <v-btn color="primary" x-large  @click="$router.push('/addStory')">{{$t('createSory')}}</v-btn>
                  </v-sheet>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      showUserStories: false,
      selectedUser: null,
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        }
      ],
      step: 1,
      value: 0,
      query: false,
      show: true,
      value1: 0,
      query1: false,
      show1: true,
      value2: 0,
      query2: false,
      show2: true,
      value3: 0,
      query3: false,
      show3: true,
      interval: 0,
      interval1: 0,
      interval2: 0,
      interval3: 0,
      timeout: 0,
      timeout1: 0,
      timeout2: 0,
      timeout3: 0,
      activeNav: false,
      slide: null
    }
  },
  computed: {
    ...mapState(['users', 'userStories', 'user'])
  },
  methods: {
    selectUser (user) {
      this.selectedUser = user
      this.clearTimers()
      this.queryAndIndeterminate()
      this.showUserStories = false
    },
    itemChanged (index) {
      this.activeNav = false
      switch (index) {
        case 1:
          clearInterval(this.interval)
          this.value = 100
          this.interval1 = setInterval(() => {
            if (this.value1 === 100) {
              clearInterval(this.interval1)
            }
            this.value1 += 20
          }, 1000)
          break
        case 2:
          clearInterval(this.interval1)
          this.value1 = 100
          this.interval2 = setInterval(() => {
            if (this.value2 === 100) {
              clearInterval(this.interval2)
            }
            this.value2 += 20
          }, 1000)
          break
        case 3:
          clearInterval(this.interval2)
          this.value2 = 100
          this.interval3 = setInterval(() => {
            if (this.value3 === 100) {
              clearInterval(this.interval3)
            }
            this.value3 += 20
          }, 1000)
          break
        case 0:
          clearInterval(this.interval3)
          this.value3 = 100
          break

        default:
          break
      }
    },
    queryAndIndeterminate () {
      console.log('queryAndIndeterminate')
      this.resetValues()
      this.interval = setInterval(() => {
        if (this.value === 100) {
          clearInterval(this.interval)
        }
        this.value += 20
      }, 1000)
      //   this.timeout1 = setTimeout(() => {
      //     this.show1 = true
      //     this.value1 = 0
      //     this.query1 = false
      //     this.interval1 = setInterval(() => {
      //       if (this.value1 === 100) {
      //         clearInterval(this.interval1)
      //       }
      //       this.value1 += 20
      //     }, 1000)
      //   }, 5000)
      //   this.timeout2 = setTimeout(() => {
      //     this.show2 = true
      //     this.value2 = 0
      //     this.query2 = false
      //     this.interval2 = setInterval(() => {
      //       if (this.value2 === 100) {
      //         clearInterval(this.interval2)
      //       }
      //       this.value2 += 20
      //     }, 1000)
      //   }, 10000)
      //   this.timeout3 = setTimeout(() => {
      //     this.show3 = true
      //     this.value3 = 0
      //     this.query3 = false
      //     this.interval3 = setInterval(() => {
      //       if (this.value3 === 100) {
      //         clearInterval(this.interval3)
      //       }
      //       this.value3 += 20
      //     }, 1000)
      //   }, 15000)
    },
    resetValues () {
      this.show = true
      this.value = 0
      this.query = false
      this.show1 = true
      this.value1 = 0
      this.query1 = false
      this.show2 = true
      this.value2 = 0
      this.query2 = false
      this.show3 = true
      this.value3 = 0
      this.query3 = false
    },
    clearTimers () {
      clearInterval(this.interval)
      clearInterval(this.interval1)
      clearInterval(this.interval2)
      clearInterval(this.interval3)
      clearTimeout(this.timeout1)
      clearTimeout(this.timeout2)
      clearTimeout(this.timeout3)
    }
  },
  mounted () {
    this.queryAndIndeterminate()
  },

  beforeDestroy () {
    this.this.clearTimers()
  },
  created () {
    this.selectedUser = this.users[0]
    if (this.$route.params.type === 'user') this.showUserStories = true
  }

}
</script>
