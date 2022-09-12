<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" md="3">
                <v-card class="pa-3">
                    <v-text-field dense class="mt-5" hide-details color="primary" prepend-inner-icon="mdi-magnify" :placeholder="$t('search')" outlined></v-text-field>
                    <v-list>
                        <v-list-item exact to="/groups">
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
            <v-col cols="12" md="9">
                <h2>{{$t('yourGroups')}}</h2>
                <v-slide-group
                v-model="model"
                class="pa-4"
                active-class="success"
                show-arrows
                >
                <v-slide-item
                v-for="item in groups"
                :key="item.id"
                >
                    <v-card
                    class="ma-4"
                    @click="$router.push('/groups/' + item.id)"
                    >
                        <div>
                            <v-img height="200" width="250" :src="item.cover"></v-img>
                            <v-list two-line>
                                <v-list-item>
                                    <v-list-item-content>
                                    <v-list-item-title>{{item.name}}</v-list-item-title>
                                    <v-list-item-subtitle>{{item.members.length + ' ' + $t('members')}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </div>
                    </v-card>
                </v-slide-item>
                </v-slide-group>

                <h2>{{$t('suggestsForYou')}}</h2>

                <v-row class="mx-5 pt-5">
                    <v-col cols="12" sm="6" md="4" lg="3" v-for="(item, i) in suggests" :key="item.id">
                        <v-card
                        class="ma-4"
                        @click="$router.push('/groups/' + item.id)"
                        >
                            <div>
                                <v-img height="200" width="250" :src="item.cover" class="d-flex text-end">
                                    <v-btn icon color="error" @click="suggests.splice(i, 1)"><v-icon>mdi-close-circle</v-icon></v-btn>
                                </v-img>
                                <v-list two-line>
                                    <v-list-item @click="$router.push('/groups/' + item.id)">
                                        <v-list-item-content>
                                        <v-list-item-title>{{item.name}}</v-list-item-title>
                                        <v-list-item-subtitle>{{item.members.length + ' ' + $t('members')}}</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
  data () {
    return {
      model: 0,
      suggests: []
    }
  },
  computed: {
    groups () {
      return this.$store.state.groups
    }
  },
  created () {
    this.suggests = [...this.groups]
  }
}
</script>
