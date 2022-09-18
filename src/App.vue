<template>
  <div class="container">
    <TheHeader></TheHeader>
    <TheNavbar></TheNavbar>
    <TheContent></TheContent>
  </div>
</template>

<script>
import TheHeader from "@/components/layout/TheHeader.vue";
import TheNavbar from "@/components/layout/TheNavbar.vue";
import TheContent from "@/components/layout/TheContent.vue";

export default {
  components : {
    TheHeader, TheNavbar, TheContent
  },
}
</script>

<style>
@import url(@/css/common.css);
.container {
  display: grid;
  grid-template-columns: 230px calc(100% - 230px);
  grid-template-rows: 55px calc(100vh - 55px);
}
</style>
