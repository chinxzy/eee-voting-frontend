<template>
    <signup-section />
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import SignupSection from "../components/SignupSection.vue";
  //   import { useStore } from "../store/index";
  
  export default defineComponent({
      components: {
          SignupSection,
      },
  });
  </script>
  
  <style lang='scss'>
  @import "src/styles/login.scss";
  </style>