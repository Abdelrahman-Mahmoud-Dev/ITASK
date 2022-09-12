<template>
    <div>
      <v-list
      nav
      dense
      >
        <v-list-item-group
        v-model="selectedItem"
        color="primary"
        >
            <v-list-item
            v-for="(item, i) in items"
            :to="item.route"
             :key="i"
            >
              <v-list-item-icon>
                <v-icon color="primary" v-text="item.icon"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="secondary--text" v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    selectedItem: 0
  }),
  computed: {
    ...mapState(['user']),
    items () {
      return [
        { text: this.$t('home'), icon: 'mdi-home', route: '/' },
        { text: this.$t('profile'), icon: 'mdi-account', route: this.user.role === 'student' ? '/profile' : '/teacher/posts' },
        { text: this.$t('chatting'), icon: 'mdi-chat-processing-outline', route: '/chat/1' },
        { text: this.$t('groups'), icon: 'mdi-account-group', route: '/groups' },
        { text: this.$t('savedPosts'), icon: 'mdi-bookmark-minus-outline', route: this.user.role === 'student' ? '/profile/posts' : '/teacher/posts' },
        { text: this.$t('questions'), icon: 'mdi-frequently-asked-questions', route: this.user.role === 'student' ? '/profile/questions/myQuestions' : '/teacher/questions/myQuestions' },
        { text: this.$t('exams'), icon: 'mdi-file-question', route: this.user.role === 'student' ? '/profile/exams/myExams' : '/teacher/exams/myExams' },
        { text: this.$t('notes'), icon: 'mdi-notebook-edit', route: this.user.role === 'student' ? '/profile/notes/myNotes' : '/teacher/notes/myNotes' },
        { text: this.$t('vClass'), icon: 'mdi-monitor-account', route: this.user.role === 'student' ? '/profile/vclass/myClasses' : '/teacher/vclass/myClasses' },
        { text: this.$t('roomDiscussions'), icon: 'mdi-human-male-board', route: this.user.role === 'student' ? '/profile/roomDiscussions/invitations' : '/teacher' },
        { text: this.$t('calendar'), icon: 'mdi-calendar-month', route: this.user.role === 'student' ? '/profile/calendar/vClass' : '/teacher/calendar/myEvents' },
        { text: this.$t('preparatoryExams'), icon: 'mdi-book', route: this.user.role === 'student' ? '/profile/preparatoryExams/finalTerm' : '/teacher/preparatoryExams/createExam' },
        { text: this.$t('supportingMaterials'), icon: 'mdi-notebook-plus', route: this.user.role === 'student' ? '/profile/supporting-materials/video' : '/teacher/supporting-materials/video' },
        { text: this.$t('settings'), icon: 'mdi-cog-outline', route: this.user.role === 'student' ? '/profile/settings' : 'teacher/settings' }
      ]
    }
  }
}
</script>
