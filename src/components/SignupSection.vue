<template>
    <div class="container-fluid">
        <h1>EEE Alumni Class of 2020 </h1>
        <h2>Sign Up</h2>

        <div v-if="authError" class="container-fluid error">
      <p>{{ showError() }}</p>
    </div>
    <div v-if="requestIsLoading" class="container-fluid loading">
      <p>Loading...</p>
    </div>

        <div class="form mx-auto">
      <form @submit.prevent="signup">
        <div class="form-block">
            <label for="">First Name</label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter Firstname"
            v-model="firstName"
            
          />
        </div>

        <div class="form-block">
        <label for="">Last Name</label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter Lastname"
            v-model="lastName"
          />
        </div>

        <div class="form-block">
            <label for="">Gender</label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter gender"
            v-model="gender"
            
          />
        </div>

        <div class="form-block">
            <label for="">Email</label>
          <input
            type="email"
            class="form-control"
            placeholder="Enter email"
            v-model="email"
          />
        </div>

        <div class="form-block">
            <label for="">Password</label>
         
          <input
            type="password"
            class="form-control"
            placeholder="Enter password"
            v-model="password"
            
          />
        </div>

        <div class="form-block">
            <label for="">Confirm Password:</label>
          <input
            type="password"
            class="form-control"
          :class="[{ isNotValid: isNotValid }, {valid: valid}]"
            placeholder="Confirm password"
            v-model="confirmPassword"
          />
        </div>

        <div class="form-block">
            <label for="">Reg Number:</label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter Reg Number"
            v-model="regnum"
          />
        </div>

        <button
          class="btn loginbtn"
          :disabled="isDisabled"
          :class="[{ isDisabled: isDisabled }]"
        >
          <h5>Signup</h5>
        </button>
      </form>
       <p class="or mt"><b>Or</b></p>
      <p class="signin mt-4"><router-link to="/">sign in</router-link></p>
    </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store";
import { State } from "../store/modules/auth";

import { Status } from "../types/auth";

import router from "../router";

export default defineComponent({
  components: {},
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      gender:"",
      password: "",
      confirmPassword: "",
      regnum: "",
      isDisabled: false,
      isNotValid: true,
      valid: false,
    };
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const loadingState = ref({
      getAuth: computed<Status>(
        () => authState.value.authRequestStatus.signupUser
      ),
    });

    const authState = computed<State>(() => store.state.auth);

    const requestIsLoading = computed<boolean>(
      () => loadingState.value.getAuth == Status.LOADING
    );

    const signupWasSuccessful = computed<boolean>(
      () => authState.value.authRequestStatus.signupUser == Status.SUCCESS
    );

    const authError = computed<any>(
      () => authState.value.authenticationError
    );

    return {
      router,
      requestIsLoading,
      authError,
      signupWasSuccessful,
      store,
    };
  },
  methods: {
    toLogin() {
      this.router.push({ path: "/" });
    },
    grayLogin() {
      this.isDisabled = true;
    },

    notValid(){
      this.isNotValid = true
    },
    
    isValid(){
      this.valid = true
    },
    showError() {
      if (this.authError == 418) {
        return "User with Email already exist";
      } else if (this.authError == 419) {
        return "User with Reg Number already exists";
      }

    },


    signup() {
      this.authError = Status.IDLE;
      this.signupUser();
    },

    async signupUser() {
      if (this.password !== this.confirmPassword) {
        alert("passwords do not match")
        return
        
      }
      const signupDetails = {
        firstname: this.firstName,
        lastname: this.lastName,
        gender: this.gender,
        email: this.email,
        password: this.password,
        regnum: this.regnum,
      };
      await this.store.dispatch("auth/signupUser", signupDetails);
      if (!this.signupWasSuccessful) {
        return;
      }
      router.push({ path: "/", query: { alert: "Signup Successful" } });
    },
  },
  watch: {
    firstName(value: string) {
      this.firstName = value;

      if (value.length) {
        this.isDisabled = false;
      }

      if (
        !value.length ||
        !this.password.length ||
        !this.email.length ||
        !this.lastName.length ||
        !this.confirmPassword.length ||
        !this.gender.length || 
        !this.regnum.length
      ) {
        this.grayLogin();
      }
    },

    lastName(value: string) {
      this.lastName = value;

      if (value.length) {
        this.isDisabled = false;
      }

      if (
        !value.length ||
        !this.password.length ||
        !this.email.length ||
        !this.firstName.length ||
        !this.confirmPassword.length ||
        !this.regnum.length ||
        !this.gender.length
      ) {
        this.grayLogin();
      }
    },

    email(value: string) {
      this.email = value;

      if (value.length) {
        this.isDisabled = false;
      }

      if (
        !value.length ||
        !this.password.length ||
        !this.firstName.length ||
        !this.lastName.length ||
        !this.confirmPassword.length ||
        !this.regnum.length ||
        !this.gender.length
      ) {
        this.grayLogin();
      }
    },

    gender(value: string) {
        this.gender = value;

        if (value.length) {
            this.isDisabled = false
        }
        if (
        !value.length ||
        !this.password.length ||
        !this.firstName.length ||
        !this.lastName.length ||
        !this.confirmPassword.length ||
        !this.regnum.length ||
        !this.email.length
      ) {
        this.grayLogin();
      }

    },

    password(value: string) {
      this.password = value;
      if (value.length) {
        this.isDisabled = false;
      }

      if (
        !value.length ||
        !this.firstName.length ||
        !this.email.length ||
        !this.lastName.length ||
        !this.confirmPassword.length ||
        !this.regnum.length ||
        !this.gender.length
      ) {
        this.grayLogin();
      }
    },

    confirmPassword(value: string) {
      this.confirmPassword = value;
      if (value !== this.password) {
        this.notValid()
      } else {
        this.isNotValid = false
        this.isValid()
      }

      if (value.length) {
        this.isDisabled = false;
      }

      if (
        !value.length ||
        !this.password.length ||
        !this.email.length ||
        !this.lastName.length ||
        !this.firstName.length ||
        !this.regnum.length ||
        !this.gender.length
      ) {
        this.grayLogin();
      }
    },

    regnum(value: string) {
      this.regnum = value;

      if (value.length) {
        this.isDisabled = false;
      }

      if (
        !value.length ||
        !this.password.length ||
        !this.email.length ||
        !this.lastName.length ||
        !this.confirmPassword.length ||
        !this.firstName.length ||
        !this.gender.length
      ) {
        this.grayLogin();
      }
    },
  },

  mounted() {
    this.authError = Status.IDLE;
    this.grayLogin();
    
  },

  // watch: {
  //       'requestQuery.search': function (searchString: string) {
  //           if (searchString.length) return;

  //           if (this.activeTab === 'all') {
  //               this.getRevenueSummary();
  //               return;
  //           }

  //           this.getUnrenewedRevenueSummary();
  //       },
  //   },
});
</script>
