<template>
    <v-row class="ma-5">
        <v-col class="sticky-side" cols="12" md="3">
            <v-card class="pa-3">
                <v-text-field dense class="mt-5" hide-details color="primary" prepend-inner-icon="mdi-magnify" :placeholder="$t('search')" outlined></v-text-field>
                <v-list>
                    <v-list-item to="/groups">
                        <v-list-item-icon><v-icon color="primary">mdi-list-box</v-icon></v-list-item-icon>
                        <v-list-item-title>{{$t('yourFeed')}}</v-list-item-title>
                    </v-list-item>

                    <v-list-item to="/groups/discover">
                        <v-list-item-icon><v-icon color="primary">mdi-compass</v-icon></v-list-item-icon>
                        <v-list-item-title>{{$t('discover')}}</v-list-item-title>
                    </v-list-item>
                </v-list>
                <v-card-actions>
                    <v-btn color="primary" elevation="0" block @click="$router.push('/groups/create')"><v-icon>mdi-plus</v-icon>{{$t('createGroup')}}</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col cols="12" md="6">
            <v-sheet v-if="posts.length" color="grey lighten-3" class="scrollable-sheet" height="85vh">
                <post v-for="item in posts" :key="item.id" :post="item" />
            </v-sheet>
        </v-col>
        <v-col cols="12" md="3">
            <v-card class="pa-2" v-if="groups.length">
                <v-card-title class="d-flex justify-space-between">
                    {{$t('suggestsForYou')}}
                    <v-btn small text color="blue" @click="$router.push('/groups/discover')">{{$t('seeMore')}}</v-btn>
                </v-card-title>
                <v-card-subtitle>{{$t('suggestNote')}}</v-card-subtitle>
                <v-carousel
                class="sticky-side"
                continuous
                hide-delimiters
                height=""
                >
                    <v-carousel-item
                    v-for="(slide, i) in groups"
                    :key="i"
                    >
                        <div>
                            <v-img  :src="slide.cover"></v-img>
                            <v-list two-line>
                                <v-list-item>
                                    <v-list-item-content>
                                    <v-list-item-title>{{slide.name}}</v-list-item-title>
                                    <v-list-item-subtitle>{{slide.members.length + ' ' + $t('members')}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            <v-btn color="primary" elevation="0" block>{{$t('joinGroup')}}</v-btn>
                        </div>
                    </v-carousel-item>
                </v-carousel>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { mapState } from 'vuex'
import post from '@/components/posts/post'

export default {
  components: {
    post
  },
  data () {
    return {
      message: 'Hello Vue!'
    }
  },
  computed: {
    ...mapState(['posts', 'user', 'groups'])
  }
}
</script>
