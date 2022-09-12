<template>
    <div>
        <h4 class="secondary--text text-center">{{$t('loginToAccount')}}</h4>
        <div class="d-block d-sm-flex mt-5">
            <div class="auth-form-cont">
                <v-form
                class="ma-5"
                ref="loginForm"
                v-model="valid"
                >
                    <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    :label="$t('email')"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="password"
                    :label="$t('password')"
                    required
                    type="password"
                    ></v-text-field>

                    <v-btn
                    :disabled="!valid"
                    color="primary"
                    @click="login"
                    block
                    elevation="0"
                    >
                    {{$t('login')}}
                    </v-btn>
                </v-form>

                <v-dialog
                v-model="dialog"
                max-width="500"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                    small
                    text
                    class="d-block mx-auto"
                    >
                        {{$t('forgotPassword')}}
                    </v-btn>
                </template>

                <v-card>
                    <v-card-title class="extra-font mb-2">{{$t('resetPassword')}}</v-card-title>
                    <v-card-subtitle>{{$t('resetPasswordNote')}}</v-card-subtitle>
                    <v-card-text>
                        <v-text-field
                        v-model="passwordEmail"
                        :rules="emailRules"
                        :label="$t('email')"
                        required
                        ></v-text-field>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                    color="primary"
                    text
                    @click="dialog = false"
                    >
                        {{$t('send')}}
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>

                <v-btn
                color="primary"
                text
                small
                class="d-block mx-auto"
                @click="$router.push('/auth/register')"
                >
                    {{$t('registerAccount')}}
                </v-btn>
            </div>

            <v-divider vertical></v-divider>

            <div class="social-login mx-3">
                <v-btn color="white" block class="d-block pa-2 mb-5" v-for="(item, i) in socials" :key="i">
                    <div>
                        <v-icon :color="item.color">{{item.icon}}</v-icon>
                        <span class="mx-5 primary--text">{{$t(item.alias)}}</span>
                    </div>
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    email: '',
    passwordEmail: '',
    password: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    socials: [
      {
        icon: 'mdi-facebook',
        color: '#3b5998',
        alias: 'loginWithFacebook'
      },
      {
        icon: 'mdi-twitter',
        color: '#00acee',
        alias: 'loginWithTwitter'
      },
      {
        icon: 'mdi-google',
        color: '#dd4b39',
        alias: 'loginWithGoogle'
      },
      {
        icon: 'mdi-linkedin',
        color: '#3b5998',
        alias: 'loginWithLinkedin'
      }
    ],
    dialog: false
  }),
  methods: {
    login () {
      this.$refs.loginForm.validate()
      if (this.valid) {
        if (this.email.includes('teacher')) this.$store.dispatch('setRole', 'teacher')
        else this.$store.dispatch('setRole', 'student')
        localStorage.setItem('authenticated', true)
        this.$router.push('/')
      }
    }
  }
}
</script>
