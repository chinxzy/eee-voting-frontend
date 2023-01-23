<template>
  <router-view />
</template>


<style lang="scss">
#app {
  font-family: "Source Sans Pro", sans-serif;
}
.web {
  display: block;
  @media only screen and (max-width: 600px) {
    display: none !important;
  }
}
</style>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
  mounted() {},
});
</script>