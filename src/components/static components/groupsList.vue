<template>
    <div>
        <v-card v-if="!shareDialog" class="">
            <v-card-title>
                <span class="text-h5 primary--text">{{$t('shareInGroups')}}</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
            <v-avatar class="mt-5" size="30">
                <img
                :src="user.avatar"
                >
            </v-avatar>
            <p class="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis nam sit fuga illum non quibusdam temporibus! Reprehenderit, officia fuga? Adipisci non laborum pariatur ab praesentium.</p>

            <v-row no-gutters>
                <v-col cols="12" sm="8">
                    <v-text-field prepend-inner-icon="mdi-magnify" rounded outlined dense hide-details class="mt-5 mx-5" v-model="searchTerm"></v-text-field>
                    <v-checkbox
                    :label="$t('allGropups')"
                    @click="selectedgroups.length === groups.length ? selectedgroups = [] : selectedgroups = groups"
                    ></v-checkbox>
                    <v-divider></v-divider>
                    <v-list>
                        <v-list-item v-for="group in displayGroups" :key="group.id">
                            <v-list-item-avatar>
                                <img width="20" class="rounded-circle mx-1" :src="group.cover" alt="">
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-checkbox
                                v-model="selectedgroups"
                                :value="group"
                                ></v-checkbox>
                                {{group.name}}
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-col>
                <v-col class="grey lighten-2 pa-2" cols="12" sm="4">
                    <h4>{{$t('selectedGroups')}}</h4>
                    <v-list class="grey lighten-2">
                        <v-list-item v-for="group in selectedgroups" :key="group.id">
                            <v-list-item-avatar>
                                <img width="20" class="rounded-circle mx-1" :src="group.cover" alt="">
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>{{group.name}}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                    <div v-if="selectedgroups.length">
                        <v-btn @click="selectedgroups = []" text color="primary">{{$t('clear')}}</v-btn>
                        <v-btn small elevation="0" @click="shareDialog = true" color="primary">{{type ? $t(`${type}`) : $t('select')}}</v-btn>
                    </div>
                </v-col>
            </v-row>
            </v-card-text>
        </v-card>
        <v-card v-click-outside="closeDialog" v-else class="pa-5">
            <!-- <h2 class="extra-font primary--text text-center">{{$t('shareNote')}}</h2> -->
            <v-img v-if="$i18n.locale === 'en'" class="mx-auto" max-width="500" src="../../assets/img/msg.jpeg"></v-img>
            <v-img v-else class="mx-auto" max-width="500" src="../../assets/img/msg(ar).jpeg"></v-img>
        </v-card>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['type'],
  data () {
    return {
      selectedgroups: [],
      searchTerm: '',
      displayGroups: [],
      shareDialog: false
    }
  },
  watch: {
    searchTerm (val) {
      this.displayGroups = this.groups.filter(item => item.name.toLowerCase().includes(val.toLowerCase()))
    }
  },
  computed: {
    ...mapState(['groups', 'user'])
  },
  methods: {
    closeDialog () {
      this.shareDialog = false
      this.selectedgroups = []
    }
  },
  created () {
    this.displayGroups = this.groups
  }
}
</script>
