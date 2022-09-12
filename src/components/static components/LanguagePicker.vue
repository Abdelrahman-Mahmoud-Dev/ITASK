<template>
    <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
        <v-btn
            outlined
            color="primary"
            v-bind="attrs"
            v-on="on"
            small
            class="py-1 px-2"
        >
            {{$i18n.locale === 'en' ? 'EN' : 'ع'}}
        </v-btn>
        </template>
        <v-list>
        <v-list-item @click="changeLang('en')">
            <v-list-item-title>English</v-list-item-title>
        </v-list-item>
        <v-list-item @click="changeLang('ar')">
            <v-list-item-title>عربي</v-list-item-title>
        </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
export default {
  methods: {
    changeLang (lang) {
      this.$i18n.locale = lang
      this.$vuetify.rtl = lang === 'ar'
      this.moveChatBox(lang === 'ar' ? 'left' : 'right')
      const els = document.getElementsByClassName('extra-font')
      if (els.length) {
        for (let i = 0; i < els.length; i++) {
          els[i].style.fontFamily = lang === 'ar' ? 'arabic' : 'english'
        }
      }
    },
    moveChatBox (dir) {
      const chatBox = document.getElementById('chatbox')
      const moreBtn = document.getElementById('more-btn')
      if (chatBox) {
        chatBox.style.right = 'none'
        chatBox.style.left = 'none'
      }
      if (moreBtn) {
        moreBtn.style.right = 'none'
        moreBtn.style.left = 'none'
      }

      if (dir === 'right') {
        if (chatBox) chatBox.style.right = '20px'
        if (moreBtn) moreBtn.style.right = '-1px'
      } else {
        if (chatBox) chatBox.style.right = '76%'
        if (moreBtn) moreBtn.style.right = '95%'
      }
    }
  },
  created () {
    this.changeLang(this.$i18n.locale)
  }
}
</script>
