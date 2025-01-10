<script setup lang="ts">
import StickyBox from './components/StickyBox.vue';
import { reactive } from 'vue';

const state = reactive({
  boxes: [
    {
      isOpen: true,
      title: 'title-1',
      body: 'qwerqwrqwerwrwr',
    },
    {
      isOpen: true,
      title: 'title-2',
      body: 'qwerqwrqwerwrwr',
    },
    {
      isOpen: true,
      title: 'title-3',
      body: 'qwerqwrqwerwrwr',
    },
    {
      isOpen: false,
      title: 'title-4',
      body: 'qwerqwrqwerwrwr',
    },
    {
      isOpen: false,
      title: 'title-5',
      body: 'qwerqwrqwerwrwr',
    },
    {
      isOpen: false,
      title: 'title-6',
      body: 'qwerqwrqwerwrwr',
    },
    {
      isOpen: false,
      title: 'title-7',
      body: 'qwerqwrqwerwrwr',
    },
    {
      isOpen: false,
      title: 'title-8',
      body: 'qwerqwrqwerwrwr',
    },
  ],
});

const toggleBox = (index: number) => {
  state.boxes[index].isOpen = !state.boxes[index].isOpen;
};
</script>

<template>
  <div class="main-box">first box view</div>
  <div class="container">
    <StickyBox :offset-top="20" :offset-bottom="20">
      <div
        v-for="(box, index) in state.boxes"
        :key="index"
        :class="['box', box.isOpen && 'is-open']"
      >
        <div class="box-header" @click="toggleBox(index)">
          {{ box.title }}

          <span class="box-toggle-icon">{{ box.isOpen ? '-' : '+' }}</span>
        </div>

        <div v-if="box.isOpen" class="box-body">{{ box.body }}</div>
      </div>
    </StickyBox>

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

.box {
  width: 100%;
  border-bottom: 1px solid;
  background-color: darkviolet;
  padding: 4px 8px;
  color: white;
}
.box-toggle-icon {
  font-size: 20px;
}

.box-header {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.box-body {
  height: 100px;
}
</style>
