<template>
    <div>
        <post v-for="item in userPosts" :key="item.id" :post="item" />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import post from '@/components/posts/post'

export default {
  components: {
    post
  },
  computed: {
    ...mapState(['posts', 'user']),
    userPosts () {
      return this.posts.filter(item => item.userId === this.user.id)
    }
  }
}
</script>
