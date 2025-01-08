<script setup lang="ts">
import StickyBox from './components/StickyBox.vue';
</script>

<template>
  <div class="main-box">first box view</div>
  <div class="container">
    <StickyBox />

    <div class="main-box">main box</div>
  </div>

  <div class="main-box">2nd box view</div>
  <div class="main-box">3rd box view</div>
  <div class="main-box">4th box view</div>
</template>

<style lang="scss" scoped>
.main-box {
  width: 100%;
  height: 50vh;
  background-color: antiquewhite;
  color: black;
  font-size: 20px;
  text-align: center;
}

.container {
  display: flex;
  width: 100%;
  gap: 16px;
  padding: 48px 0;

  .main-box {
    height: 300vh;
    width: calc(100% - 300px);
    background-color: rgb(179, 179, 248);
  }
}
</style>
