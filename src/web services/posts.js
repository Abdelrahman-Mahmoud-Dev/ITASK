import Vue from 'vue'
import { url } from '../links'

const timeout = 20000

export default {
  // get posts
  posts (id) {
    return Vue.axios.get(url + 'posts'
    
    )
  },
  // get post by id
  post (id) {
    return Vue.axios.get(url + 'posts/' + id
    
    )
  },
  // get post comments
  postComments (id) {
    return Vue.axios.get(url + 'posts/' + id + '/comments'
    
    )
  }
}
