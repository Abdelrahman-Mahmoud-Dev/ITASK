import Vue from 'vue'
import { url } from '../links'

const timeout = 20000

export default {
  // get users
  users (id) {
    return Vue.axios.get(url + 'users'
    )
  },
  // get user by id
  profile (id) {
    return Vue.axios.get(url + 'users/' + id
    )
  },
  // get user images
  images (id) {
    return Vue.axios.get(url + 'album/' + id + '/photos'
    )
  },
  // get user posts
  posts (id) {
    return Vue.axios.get(url + 'users/' + id + '/posts'
    )
  }
}
