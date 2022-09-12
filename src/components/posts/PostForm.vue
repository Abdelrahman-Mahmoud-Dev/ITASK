<template>
    <v-row no-gutters align="start" class="px-5 py-2">
        <v-col cols="1">
            <v-avatar size="30">
                <img
                :src="user.avatar"
                >
            </v-avatar>
        </v-col>
        <v-col cols="11">
            <v-text-field :placeholder="$t('postPlaceholder')" class="post-form" dense hide-details outlined rounded color="primary"></v-text-field>
            <div class="mt-2">
                <v-icon class="mx-1" color="primary">mdi-image-outline</v-icon>
                <v-icon class="mx-1" color="primary">mdi-file-gif-box</v-icon>
                <v-icon class="mx-1" color="primary">mdi-emoticon-happy-outline</v-icon>
            </div>
        </v-col>
    </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['images', 'user'])
  }
}
</script>

<style>
    .post-form.v-text-field fieldset, .searchBox.v-text-field .v-input__control {
        border-color: #F9BA16 !important;
    }
</style>
