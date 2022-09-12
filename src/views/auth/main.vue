<template>
    <div class="full-height bg-white">
        <v-container class="full-height">
            <language-picker />
            <v-row class="fill-height" align="center">
                <v-col cols="12" md="5" class="px-10">
                    <v-img class="" v-if="$i18n.locale === 'en'" src="../../assets/en-logo.png"></v-img>
                    <v-img class="" v-else src="../../assets/ar-logo.png"></v-img>
                    <h4 class="extra-font text-center mt-3 font-weight-bold">{{$t('aboutIfzaani')}}</h4>
                </v-col>
                <v-col cols="12" md="7">
                    <router-view :key="$route.path"></router-view>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import LanguagePicker from '@/components/static components/LanguagePicker'

export default {
  components: {
    LanguagePicker
  }
}
</script>

<style>
    .full-height {
        height: 97vh;
    }
    .bg-white {
        background-color: #fff;
    }
    .auth-form-cont {
        width: 60%;
    }
    @media screen and (max-width: 600px) {
        .full-height {
            height: auto;
        }
        .auth-form-cont {
            width: 100%;
        }
    }
</style>
