<template>
    <!-- post form container -->
    <div>
        <v-sheet v-show="!showPostForm" @click="showPostForm = true" rounded="lg" class="mt-3">
            <post-form />
        </v-sheet>

        <v-sheet style="position: relative;" v-show="showPostForm" rounded="lg" class="my-5 pa-5">
            <post-form-card @closeForm="closeForm" />
        </v-sheet>
    </div>
</template>

<script>
import PostForm from '@/components/posts/PostForm'
import PostFormCard from '@/components/posts/PostFormCard'

export default {
  components: {
    PostForm,
    PostFormCard
  }
}
</script>
