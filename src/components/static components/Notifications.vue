<template>
    <div>
        <v-menu
        v-model="menu"
        :close-on-content-click="false"
        offset-y
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                color="primary"
                dark
                icon
                v-bind="attrs"
                v-on="on"
                >
                    <v-badge
                    color="red"
                    :content="unreadCount"
                    overlap
                    left
                    v-if="unreadCount > 0"
                    >
                        <v-icon>mdi-bell</v-icon>
                    </v-badge>
                    <v-icon v-else>mdi-bell</v-icon>
                </v-btn>
            </template>

            <v-card height="90vh" max-width="400">
                <v-list>
                    <v-list-item class="my-1" :class="item.read ? '' : 'unread-notification'" @click="item.read = true; $router.push(item.link); menu = false" v-for="(item, i) in notifications" :key="item.id">
                        <v-list-item-avatar>
                            <img
                            :src="item.user.avatar"
                            >
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>{{item.user.name}}<br><small>{{item.time}}</small></v-list-item-title>
                            <v-list-item-subtitle>{{item.content}}</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-btn icon @click="notifications.splice(i, 1)">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-menu>
    </div>
</template>

<script>
export default {
  data: () => ({
    menu: false,
    notifications: [
      {
        id: 1,
        content: 'Lorem ipsum dolor sit amet.',
        read: false,
        user: { name: 'Jphn Doe', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        link: '/note/1',
        time: 'Just now'
      },
      {
        id: 2,
        content: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى',
        read: true,
        user: { name: 'أحمد خالد', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        link: '/chat/1',
        time: '15 minutes ago'
      },
      {
        id: 3,
        content: 'Lorem ipsum dolor sit amet.',
        read: false,
        user: { name: 'Jane Doe', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        link: '/exam/1',
        time: '1 hour ago'
      },
      {
        id: 4,
        content: 'Lorem ipsum dolor sit amet.',
        read: false,
        user: { name: 'Alan Waker', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        link: '/note/1',
        time: '2 hours ago'
      },
      {
        id: 5,
        content: 'Lorem ipsum dolor sit amet.',
        read: false,
        user: { name: 'Mera', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' },
        link: '/note/2',
        time: '3 hours ago'
      },
      {
        id: 6,
        content: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى',
        read: true,
        user: { name: 'سما عاطف', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        link: '/exam/1',
        time: '1 day ago'
      },
      {
        id: 7,
        content: 'Lorem ipsum dolor sit amet.',
        read: false,
        user: { name: 'Jphn Doe', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        link: '/note/1',
        time: '1 day ago'
      },
      {
        id: 8,
        content: 'Lorem ipsum dolor sit amet.',
        read: false,
        user: { name: 'Jphn Doe', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' },
        link: '/note/1',
        time: '1 day ago'
      },
      {
        id: 9,
        content: 'Lorem ipsum dolor sit amet.',
        read: false,
        user: { name: 'Jphn Doe', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        link: '/note/1',
        time: '1 day ago'
      },
      {
        id: 10,
        content: 'Lorem ipsum dolor sit amet.',
        read: false,
        user: { name: 'Jphn Doe', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        link: '/note/1',
        time: '1 day ago'
      },
      {
        id: 11,
        content: 'Lorem ipsum dolor sit amet.',
        read: false,
        user: { name: 'Jphn Doe', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        link: '/note/1',
        time: '1 day ago'
      },
      {
        id: 12,
        content: 'Lorem ipsum dolor sit amet.',
        read: false,
        user: { name: 'Jphn Doe', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        link: '/note/1',
        time: '1 day ago'
      },
      {
        id: 13,
        content: 'Lorem ipsum dolor sit amet.',
        read: false,
        user: { name: 'Jphn Doe', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        link: '/note/1',
        time: '1 day ago'
      },
      {
        id: 14,
        content: 'Lorem ipsum dolor sit amet.',
        read: false,
        user: { name: 'Jphn Doe', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' },
        link: '/note/1',
        time: '1 day ago'
      },
      {
        id: 15,
        content: 'Lorem ipsum dolor sit amet.',
        read: false,
        user: { name: 'Jphn Doe', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        link: '/note/1',
        time: '1 day ago'
      }
    ]
  }),
  computed: {
    unreadCount () {
      return this.notifications.filter(item => !item.read).length
    }
  }
}
</script>

<style>
.unread-notification {
    background-color: #fbff233b;
}
</style>
