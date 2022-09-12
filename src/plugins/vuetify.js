import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)
//  F9BA16 yellow
//  2D2874 blue
// export default new Vuetify({
// })

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#F9BA16',
        secondary: '#2D2874'
      }
    }
  }
})
