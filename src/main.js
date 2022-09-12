import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import './assets/styles/style.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { TwemojiPicker } from '@kevinfaguiar/vue-twemoji-picker'
import EmojiAllData from '@kevinfaguiar/vue-twemoji-picker/emoji-data/en/emoji-all-groups.json'
import EmojiGroups from '@kevinfaguiar/vue-twemoji-picker/emoji-data/emoji-groups.json'
import Gallery from 'vue-cover-gallery'
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import VueMasonry from 'vue-masonry-css'
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'

Vue.use(VueMasonry)
Vue.use(Croppa)

Vue.component('emoji', TwemojiPicker)
Vue.prototype.$emojiAllData = EmojiAllData
Vue.prototype.$emojiGroups = EmojiGroups

Vue.component('gallery', Gallery)
Vue.component('vue-phone-number-input', VuePhoneNumberInput)

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

Vue.filter('dateDisplay', (date) => {
  if (i18n.locale === 'en') return date.toLocaleTimeString('en-US-u-nu-latn', { month: 'short', day: 'numeric', time: 'numeric' })
  else return date.toLocaleTimeString('ar-EG-u-nu-latn', { month: 'short', day: 'numeric', time: 'numeric' })
})

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
