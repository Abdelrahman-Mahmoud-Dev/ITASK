import Vue from 'vue'
import { url } from '../links'

const timeout = 20000

export default {
  // get users
  users (id) {
    return Vue.axios.get(url + 'users',
      {
        timeout: timeout,
        //   headers: { Accept: 'application/json', 'Content-type': 'application/json' },
        data: null
      }
    )
  },
  // get user by id
  profile (id) {
    return Vue.axios.get(url + 'users/' + id,
      {
        timeout: timeout,
        //   headers: { Accept: 'application/json', 'Content-type': 'application/json' },
        data: null
      }
    )
  },
  // get user images
  images (id) {
    return Vue.axios.get(url + 'album/' + id + '/photos',
      {
        timeout: timeout,
        //   headers: { Accept: 'application/json', 'Content-type': 'application/json' },
        data: null
      }
    )
  },
  // get user posts
  posts (id) {
    return Vue.axios.get(url + 'users/' + id + '/posts',
      {
        timeout: timeout,
        //   headers: { Accept: 'application/json', 'Content-type': 'application/json' },
        data: null
      }
    )
  }
}
