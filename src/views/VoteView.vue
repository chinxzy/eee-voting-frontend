<template>
    <voting-section />
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import VotingSection from "../components/VotingSection.vue";
  //   import { useStore } from "../store/index";
  
  export default defineComponent({
      components: {
          VotingSection,
      },
  });
  </script>
  
  <style lang='scss'>
  @import "src/styles/login.scss";
  </style>