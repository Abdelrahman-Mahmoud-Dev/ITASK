import Vue from 'vue'
import { url } from '../links'

const timeout = 20000

export default {
  // get posts
  posts (id) {
    return Vue.axios.get(url + 'posts',
      {
        timeout: timeout,
        //   headers: { Accept: 'application/json', 'Content-type': 'application/json' },
        data: null
      }
    )
  },
  // get post by id
  post (id) {
    return Vue.axios.get(url + 'posts/' + id,
      {
        timeout: timeout,
        //   headers: { Accept: 'application/json', 'Content-type': 'application/json' },
        data: null
      }
    )
  },
  // get post comments
  postComments (id) {
    return Vue.axios.get(url + 'posts/' + id + '/comments',
      {
        timeout: timeout,
        //   headers: { Accept: 'application/json', 'Content-type': 'application/json' },
        data: null
      }
    )
  }
}
