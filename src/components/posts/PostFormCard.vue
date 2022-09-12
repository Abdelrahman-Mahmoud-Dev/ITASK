<template>
    <div>
        <v-btn @click="closePostForm" icon absolute color="primary" top right><v-icon>mdi-close-circle</v-icon></v-btn>

        <div>
            <h2 class="text-h5 text-center secondary--text">{{$t('createPost')}}</h2>
        </div>

        <v-row class="mt-2">
            <v-col cols="2">
                <v-avatar size="50">
                    <img
                    :src="user.avatar"
                    >
                </v-avatar>
            </v-col>
            <v-col cols="3" class="px-0">
                <span class="secondary--text">{{user.name}}</span>
                <v-select
                v-model="privacy"
                return-object
                :items="privacies"
                item-value="icon"
                outlined
                dense
                color="primary"
                :prepend-inner-icon="privacy.icon"
                hide-details
                >
                    <template v-slot:selection="{ item }">
                        <span class="caption">{{ $i18n.locale === 'en' ? item.privacy_en : item.privacy_ar }}</span>
                    </template>
                    <template v-slot:item="{ item }">
                        <div><v-icon small>{{ item.icon }}</v-icon> {{ $i18n.locale === 'en' ? item.privacy_en : item.privacy_ar }}</div>
                    </template>
                </v-select>
            </v-col>
        </v-row>

        <v-textarea
        outlined
        :placeholder="$t('postPlaceholder')"
        color="primary"
        v-model="postBody"
        hide-details
        class="rounded-lg mt-3"
        id="post-field"
        ></v-textarea>
        <div class="mt-2 d-flex align-center">
            <v-icon @click="openImgUploader" class="mx-1" color="primary">mdi-image-outline</v-icon>
            <v-icon @click="openImgUploader" class="mx-1" color="primary">mdi-file-gif-box</v-icon>
            <emoji-picker @setEmoji="setEmoji" />
        </div>

        <input
        ref="uploader"
        class="d-none"
        type="file"
        accept="image/*"
        @change="onFileChanged"
        multiple
        >

        <v-img v-for="(item, i) in postImages" :key="item.href" :src="item.href" class="d-inline-block rounded-lg mx-1" height="50" width="50" gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)">
            <v-btn @click="postImages.splice(i, 1)" x-small absolute right top icon color="error"><v-icon>mdi-close-circle</v-icon></v-btn>
        </v-img>

        <v-btn @click="uploadPost" block outlined class="rounded-lg mt-2" color="primary"><span class="secondary--text">{{$t('post')}}</span></v-btn>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import EmojiPicker from '@/components/static components/EmojiPicker'

export default {
  components: { EmojiPicker },
  data: () => ({
    postBody: '',
    privacy: { icon: 'mdi-earth', privacy: 'Public', privacy_ar: 'الكل' },
    privacies: [
      { icon: 'mdi-earth', privacy_en: 'Public', privacy_ar: 'الكل' },
      { icon: 'mdi-account', privacy_en: 'Only Me', privacy_ar: 'خاص' },
      { icon: 'mdi-account-group', privacy_en: 'Friends', privacy_ar: 'الأصدقاء' }
    ],
    postImages: []
  }),
  computed: {
    ...mapState(['images', 'user', 'posts'])
  },
  methods: {
    setEmoji (emoji) {
      const position = document.getElementById('post-field').selectionStart
      this.postBody = [this.postBody.slice(0, position), emoji, this.postBody.slice(position)].join('')
    },
    openImgUploader () {
      this.$refs.uploader.click()
    },
    onFileChanged (e) {
      const images = Array.from(e.target.files)
      images.forEach(item => this.postImages.push({ href: URL.createObjectURL(item) }))
    },
    uploadPost () {
      const post = {
        title: '',
        id: this.posts.length + 10,
        userId: this.user.id,
        body: this.postBody,
        images: this.postImages,
        likes: Math.floor(Math.random() * 100),
        shares: Math.floor(Math.random() * 100)
      }
      this.$store.dispatch('addPost', post)
      this.closePostForm()
    },
    closePostForm () {
      this.$emit('closeForm')
    }
  }
}
</script>

<style>
    .post-form.v-text-field fieldset, .searchBox.v-text-field .v-input__control {
        border-color: #F9BA16 !important;
    }
</style>
