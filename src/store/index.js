import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    users: [],
    images: [],
    avatars: [
      'https://cdn.vuetifyjs.com/images/lists/3.jpg',
      'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      'https://cdn.vuetifyjs.com/images/lists/4.jpg',
      'https://cdn.vuetifyjs.com/images/lists/5.jpg'
    ],
    requests: [],
    newTeachers: [],
    topTeachers: [],
    posts: [],
    userStories: [],
    userExtras: {
      cover: null,
      resume: null
    },
    groups: [
      {
        name: 'Math Club',
        privacy: 'public',
        description: 'Math Club is a group for students who are interested in math.',
        cover: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        members: [],
        admins: [],
        id: 1,
        type: 'subject',
        media: []
      },
      {
        name: '5th Grade',
        privacy: 'private',
        description: '5th Grade is a group for students who are interested in 5th grade.',
        cover: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        members: [],
        admins: [],
        id: 2,
        type: 'grade',
        media: []
      },
      {
        name: 'Mr Ali Al-Safadi',
        privacy: 'public',
        description: 'Mr Ali Al-Safadi is a group for students who are interested in mr Ali.',
        cover: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        members: [],
        admins: [],
        id: 3,
        type: 'teacher',
        media: []
      },
      {
        name: 'Math Club',
        privacy: 'public',
        description: 'Math Club is a group for students who are interested in math.',
        cover: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        members: [],
        admins: [],
        id: 4,
        type: 'subject',
        media: []
      },
      {
        name: 'Math Club',
        privacy: 'public',
        description: 'Math Club is a group for students who are interested in math.',
        cover: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        members: [],
        admins: [],
        id: 5,
        type: 'subject',
        media: []
      },
      {
        name: 'Math Club',
        privacy: 'public',
        description: 'Math Club is a group for students who are interested in math.',
        cover: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        members: [],
        admins: [],
        id: 6,
        type: 'subject',
        media: []
      }
    ]
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setUsers (state, users) {
      state.users = users
    },
    setRequests (state, requests) {
      state.requests = requests
    },
    setNewTeachers (state, teachers) {
      state.newTeachers = teachers
    },
    setTopTeachers (state, teachers) {
      state.topTeachers = teachers
    },
    setImages (state, images) {
      state.images = images
    },
    setPosts (state, posts) {
      state.posts = posts
    },
    addPost (state, post) {
      console.log('here', post)
      state.posts.shift(post)
    },
    setUserStories (state, story) {
      state.userStories.push(story)
    },
    setRole (state, role) {
      state.user.role = role
    },
    updateUser (state, payload) {
      state.user.name = payload.name
      state.user.email = payload.email
      if (payload.avatar) state.user.avatar = payload.avatar
      state.user.username = payload.username
    },
    updateUserExtras (state, payload) {
      state.userExtras.cover = payload.cover
      state.userExtras.reusume = payload.resume
    },
    addGroup (state, group) {
      state.groups.push(group)
    },
    initGroups (state) {
      state.groups.forEach(group => {
        if (state.images.length) group.cover = state.images[Math.floor(Math.random() * state.images.length)].url
        if (state.images.length) group.media = state.images.slice(0, 5)
      })
    },
    addGroupMember (state) {
      state.groups.forEach(group => {
        group.members = state.users.slice(0, Math.floor(Math.random() * state.users.length))
        group.admins.push(state.users[1])
      })
    }
  },
  actions: {
    setUser ({ commit, state }, user) {
      user.avatar = state.avatars[Math.floor(Math.random() * state.avatars.length)]
      user.role = 'student'
      commit('setUser', user)
    },
    setUsers ({ commit, state }, users) {
      const subjects = ['Math', 'Chemistery', 'Physics', 'Geography', 'English']
      const grades = ['3rd Secondary', '1st Prepatory', '2nd Secondary', '3rd Preparatory', '1st Secondary']
      users.forEach((element, i) => {
        element.avatar = state.avatars[Math.floor(Math.random() * state.avatars.length)]
        element.subj = subjects[Math.floor(Math.random() * subjects.length)]
        element.grade = grades[Math.floor(Math.random() * grades.length)]
        element.rate = Math.floor(Math.random() * 5)
      })
      commit('setRequests', users.slice(0, 4))
      commit('setNewTeachers', users.slice(0, 7))
      commit('setTopTeachers', users.slice(0, 10))
      commit('setUsers', users)
      commit('addGroupMember')
    },
    setImages ({ commit }, images) {
      commit('setImages', images)
      commit('initGroups')
    },
    setPosts ({ commit }, posts) {
      posts.forEach(post => {
        if (!post.images) post.images = []
        post.likes = Math.floor(Math.random() * 100)
        post.shares = Math.floor(Math.random() * 100)
      })
      commit('setPosts', posts)
    },
    addPost ({ state }, post) {
      state.posts.unshift(post)
    },
    setUserStories ({ commit }, story) {
      commit('setUserStories', story)
    },
    setRole ({ commit }, role) {
      commit('setRole', role)
    },
    updateUser ({ commit, state }, payload) {
      commit('updateUser', payload)
    },
    updateUserExtras ({ commit, state }, payload) {
      commit('updateUserExtras', payload)
    },
    addGroup ({ state }, group) {
      state.groups.push(group)
    }
  },
  modules: {
  }
})
