<template>
    <div>
      <!-- post form container -->
      <v-sheet v-show="!showPostForm" @click="showPostForm = true" rounded="lg" class="mb-5">
        <post-form />
      </v-sheet>

      <v-sheet style="position: relative;" v-show="showPostForm" rounded="lg" class="mb-5 pa-5">
        <post-form-card @closeForm="showPostForm = false" />
      </v-sheet>

      <!-- posts -->
      <post v-for="item in userPosts" :key="item.id" :post="item" />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import post from '@/components/posts/post'
import PostForm from '@/components/posts/PostForm'
import PostFormCard from '@/components/posts/PostFormCard'

export default {
  components: {
    post,
    PostForm,
    PostFormCard
  },
  data () {
    return {
      showPostForm: false
    }
  },
  computed: {
    ...mapState(['posts', 'user']),
    userPosts () {
      return this.posts.filter(item => item.userId === this.user.id)
    }
  }
}
</script>
