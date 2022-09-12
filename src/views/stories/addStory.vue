<template>
    <div>
        <v-container fluid>
            <v-row justify="center">
                <v-col cols="12" sm="6" md="3">
                    <v-list style="height: 85vh; overflow: auto;" three-line>
                        <v-list-item @click="$router.push('/addStory')">
                            <v-list-item-avatar>
                                <img :src="user.avatar" alt="">
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title class="text-h5 secondary--text">{{user.name}}</v-list-item-title>
                            </v-list-item-content>

                            <v-list-item-action @click="$router.push('/stories/user')"><v-icon>mdi-close</v-icon></v-list-item-action>
                        </v-list-item>

                        <v-divider></v-divider>
                        <div v-if="typeChosen">
                            <v-text-field v-model="story.text" rounded class="ma-3" filled hide-details prepend-inner-icon="mdi-text" :placeholder="$t('saySomething')"></v-text-field>
                            <v-menu offset-y :close-on-click="true" :close-on-content-click="false">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                    v-model="story.textColor"
                                    filled
                                    readonly
                                    rounded
                                    class="ma-3"
                                    hide-details
                                    :label="$t('textColor')"
                                    v-bind="attrs"
                                    v-on="on"
                                    prepend-inner-icon="mdi-palette"
                                    >
                                    </v-text-field>
                                </template>
                                <v-color-picker
                                v-model="story.textColor"
                                class="mx-auto"
                                dot-size="17"
                                mode="hexa"
                                show-swatches
                                hide-mode-switch
                                hide-inputs
                                swatches-max-height="100"
                                ></v-color-picker>
                            </v-menu>

                            <v-menu offset-y v-if="story.type === 'text'" :close-on-click="true" :close-on-content-click="false">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                    v-model="story.bgColor"
                                    filled
                                    readonly
                                    rounded
                                    class="ma-3"
                                    hide-details
                                    :label="$t('bgColor')"
                                    v-bind="attrs"
                                    v-on="on"
                                    prepend-inner-icon="mdi-palette"
                                    >
                                    </v-text-field>
                                </template>
                                <v-color-picker
                                v-model="story.bgColor"
                                class="mx-auto"
                                dot-size="17"
                                mode="hexa"
                                show-swatches
                                hide-mode-switch
                                hide-inputs
                                swatches-max-height="100"
                                ></v-color-picker>
                            </v-menu>

                            <div class="text-center mt-5">
                                <v-btn outlined color="primary" @click="initStory" class="mx-1">{{$t('discard')}}</v-btn>
                                <v-btn color="primary" @click="shareStory">{{$t('shareToStory')}}</v-btn>
                            </div>
                        </div>
                    </v-list>
                </v-col>
                <v-col cols="12" sm="6" md="9" class="px-15 text-center">
                    <div v-if="typeChosen">
                        <v-sheet class="pa-5">
                            <v-btn text color="primary" @click="typeChosen = false"><v-icon>mdi-keyboard-return</v-icon>{{$t('return')}}</v-btn>
                            <br>
                            <div v-if="story.type === 'image'">
                                <div v-if="!imageReady">
                                    <croppa
                                    v-model="croppa"
                                    :height="650"
                                    :quality="2"
                                    :width="400"
                                    >
                                    </croppa>
                                    <div class="btns">
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon v-bind="attrs" v-on="on" color="primary" large @click="croppa.rotate()"><v-icon>mdi-rotate-right</v-icon></v-btn>
                                            </template>
                                            <span>{{$t('rotateRight')}}</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon color="primary" v-bind="attrs" v-on="on" large @click="croppa.rotate(-1)"><v-icon>mdi-rotate-left</v-icon></v-btn>
                                            </template>
                                            <span>{{$t('rotateLeft')}}</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon color="primary" v-bind="attrs" v-on="on" large @click="croppa.flipX()"><v-icon>mdi-flip-horizontal</v-icon></v-btn>
                                            </template>
                                            <span>{{$t('flipHorizontal')}}</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon color="primary" v-bind="attrs" v-on="on" large @click="croppa.flipY()"><v-icon>mdi-flip-vertical</v-icon></v-btn>
                                            </template>
                                            <span>{{$t('flipVertical')}}</span>
                                        </v-tooltip>
                                        <v-btn tile elevation="0" color="primary" @click="story.image = croppa.generateDataUrl(); imageReady = true">{{$t('saveImageChanges')}}</v-btn>
                                    </div>
                                </div>
                                <div v-else>
                                    <v-img :src="story.image" height="650" width="400" class="mx-auto">
                                        <div class="fill-height d-flex align-center justify-center">
                                            <div class="text-h3" :style="{color: story.textColor}">{{story.text}}</div>
                                        </div>
                                    </v-img>
                                </div>
                            </div>
                            <div v-else>
                                <v-card height="650" width="40%" class="mx-15 mx-auto rounded-xl" rounded elevation="0" :color="story.bgColor || 'primary'">
                                    <div class="fill-height d-flex flex-column justify-center align-center">
                                        <div class="text-h3" :style="{color: story.textColor}">{{story.text}}</div>
                                    </div>
                                </v-card>
                            </div>
                        </v-sheet>
                    </div>
                    <div v-else>
                        <v-sheet class="pa-5 d-flex justify-space-around">
                            <v-img width="20%" class="mx-15 rounded-xl" height="650"
                            gradient="to top, #4e54c8, #8f94fb"
                            src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg">
                                <div class="fill-height d-flex flex-column justify-center align-center">
                                    <v-icon size="40" color="white">mdi-image-multiple</v-icon>
                                    <br>
                                    <v-btn x-large text color="white" @click="typeChosen = true, story.type = 'image'">{{$t('creatImageStory')}}</v-btn>
                                </div>
                            </v-img>
                            <v-card height="650" width="40%" class="mx-15 rounded-xl" rounded elevation="0" color="primary">
                                <div class="fill-height d-flex flex-column justify-center align-center">
                                    <v-icon size="40" color="white">mdi-format-textbox</v-icon>
                                    <br>
                                    <v-btn text color="white" x-large @click="typeChosen = true, story.type = 'text'">{{$t('creatTextStory')}}</v-btn>
                                </div>
                            </v-card>
                        </v-sheet>
                    </div>
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
      croppa: {},
      story: {
        type: '',
        text: '',
        image: '',
        views: Math.round(Math.random() * 5),
        textColor: '#ffffff',
        bgColor: '#F9BA16'
      },
      typeChosen: false,
      imageReady: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    shareStory () {
      this.$store.dispatch('setUserStories', this.story)
      this.initStory()
    },
    initStory () {
      this.story = {
        type: '',
        text: '',
        image: '',
        views: Math.round(Math.random() * 5),
        textColor: '#ffffff',
        bgColor: '#F9BA16'
      }
      this.imageReady = false
      this.typeChosen = false
    }
  }
}
</script>
