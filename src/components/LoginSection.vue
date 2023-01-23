<template>
    <div class="container-fluid">
      <h1>EEE Alumni Class of 2020 </h1>
        <h2>Log in</h2>

        <div v-if="authError" class="container-fluid error info-block">
      <p>{{ showError() }}</p>
    </div>
    <div v-if="requestIsLoading" class="container-fluid loading info-block">
      <p>Loading....</p>
    </div>
      <div class="form mx-auto">
        <form @submit.prevent="login">
          <div class="form-block">
            <label for="">Email</label>
            
            <input
              type="email"
              class="form-control"
              placeholder="Enter username"
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

          <button
            class="btn loginbtn"
            :disabled="isDisabled"
            :class="[{ isDisabled: isDisabled }]"
          >
            Login
          </button>
        </form>
  
        <p class="or"><b>Or</b></p>
        <div class="d-flex justify-content-center signin">
          <router-link to="/signup"><h5 class="signin">sign up</h5></router-link>
        </div>
      </div>
  
    </div>
  </template>
  <script lang="ts">
  import { computed, defineComponent, ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useStore } from "../store";
  import { State } from "../store/modules/auth";
  
  import { Status } from "../types/auth";
  
  import router from "../router";
  export default defineComponent({
    components: {
    
    },
    data() {
      return {
        email: "",
        password: "",
        isDisabled: false,
        alert: "",
        forgetPasswordEmail: "",
      };
    },
    setup() {
      const router = useRouter();
      const store = useStore();
      const route = useRoute();
  
      const authState = computed<State>(() => store.state.auth);
  
      const loadingState = ref({
        getAuth: computed<Status>(
          () => authState.value.authRequestStatus.loginUser
        ),
      });
      const requestIsLoading = computed<boolean>(
        () => loadingState.value.getAuth == Status.LOADING
      );
  
      const loginWasSuccessful = computed<boolean>(
        () => authState.value.authRequestStatus.loginUser == Status.SUCCESS
      );
  
      const forgotWasSuccessful = computed<boolean>(
        () => authState.value.authRequestStatus.forgotUser == Status.SUCCESS
      );
  
      const authError = computed<any>(
        () => authState.value.authenticationError
      );
  
      return {
        router,
        requestIsLoading,
        authError,
        loginWasSuccessful,
        forgotWasSuccessful,
        store,
        route,
      };
    },
    methods: {
      toSignup() {
        this.router.push({ path: "/signup" });
      },
      grayLogin() {
        this.isDisabled = true;
      },
  
      showError() {
        if (this.authError == 419) {
          return "email or password incorrect";
        }
      },
  
      login() {
        this.store.dispatch("auth/clearError");
        this.loginUser();
      },
  
      async loginUser() {
        const loginDetails = {
          email: this.email,
          password: this.password,
        };
  
        await this.store.dispatch("auth/loginUser", loginDetails);
  
        if (!this.loginWasSuccessful) {
          return;
        }
        router.push({ path: "/vote", query: { alert: "Login Successful" } });
      },
 
    },
    watch: {
      email(value: string) {
        this.email = value;
  
        if (value.length) {
          this.isDisabled = false;
        }
  
        if (!value.length || !this.password.length) {
          this.grayLogin();
        }
      },
  
      password(value: string) {
        this.password = value;
        if (value.length) {
          this.isDisabled = false;
        }
  
        if (!value.length || !this.email.length) {
          this.grayLogin();
        }
      },
    },
  
    mounted() {
      if (this.$route.query.alert) {
        this.alert = String(this.$route.query.alert);
      }
      this.grayLogin();
      console.log("route-query", this.route.params.query);
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
  
  
  