<template>
    <div>
        <h4 class="secondary--text text-center">{{$t('loginToAccount')}}</h4>
        <div class="d-block d-sm-flex mt-5">
            <div class="auth-form-cont">
                <v-form
                class="ma-5"
                ref="regForm"
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

                    <v-text-field
                    v-model="confirmPaasword"
                    :label="$t('confirmPassword')"
                    required
                    :rules="[v => !!v || 'Confirmation Password is required', v => v === password || 'passwords Do Not Match']"
                    type="password"
                    ></v-text-field>

                    <v-select
                    dense
                    outlined
                    color="primary"
                    v-model="role"
                    :items="[{id: 1, text: $t('student')}, {id: 2, text: $t('teacher')}]"
                    item-text="text"
                    item-value="id"
                    ></v-select>

                    <v-btn
                    :disabled="!valid"
                    color="primary"
                    @click="register"
                    block
                    elevation="0"
                    >
                    {{$t('register')}}
                    </v-btn>
                </v-form>

                <v-btn
                color="primary"
                text
                class="d-block mx-auto"
                @click="$router.push('/auth/login')"
                >
                    {{$t('loginToAccount')}}
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
    confirmPaasword: '',
    role: 1,
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    socials: [
      {
        icon: 'mdi-facebook',
        color: '#3b5998',
        alias: 'registerWithFacebook'
      },
      {
        icon: 'mdi-twitter',
        color: '#00acee',
        alias: 'registerWithTwitter'
      },
      {
        icon: 'mdi-google',
        color: '#dd4b39',
        alias: 'registerWithGoogle'
      },
      {
        icon: 'mdi-linkedin',
        color: '#3b5998',
        alias: 'registerWithLinkedin'
      }
    ],
    dialog: false
  }),
  methods: {
    register () {
      this.$refs.regForm.validate()
      if (this.valid) {
        if (this.role === 1) this.$store.dispatch('setRole', 'student')
        else this.$store.dispatch('setRole', 'teacher')
        this.$router.push('/auth/registeration/complete')
      }
    }
  }
}
</script>
