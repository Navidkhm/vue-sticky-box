<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';

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
  isScrollDown: false,
  isScrollUp: false,
  currentScroll: 0,
  topLock: false,
  bottomLock: false,
});

const toggleBox = (index: number) => {
  state.boxes[index].isOpen = !state.boxes[index].isOpen;
};

const scrollHandler = () => {
  // console.log(window.scrollY, state.currentScroll, 'topLock', state.topLock, state.bottomLock);

  console.log(
    stickyRef.value.parentElement.clientHeight + stickyRef.value.parentElement.offsetTop,
    window.scrollY + innerHeight,
  );

  if (window.scrollY <= state.currentScroll) {
    state.isScrollUp = true;
    state.isScrollDown = false;
  } else {
    state.isScrollUp = false;
    state.isScrollDown = true;
  }

  let diffScroll = state.currentScroll - window.scrollY;

  if (
    window.scrollY < stickyRef.value.parentElement.offsetTop ||
    stickyRef.value.parentElement.clientHeight + stickyRef.value.parentElement.offsetTop <
      window.scrollY + innerHeight
  ) {
    diffScroll = 0;
  }

  state.currentScroll = window.scrollY;

  if (stickyRef.value.clientHeight < innerHeight - (spaceFromTop + spaceFromBottom)) {
    console.log('kkkk');
    stickyRef.value.style.top = `${spaceFromTop}px`;
    stickyRef.value.style.position = 'sticky';
    state.topLock = true;
    state.bottomLock = false;
    return;
  }

  if (state.isScrollUp) {
    if (state.bottomLock) {
      console.log(diffScroll);
      state.bottomLock = false;
      const calcTop = stickyRef.value.offsetTop + diffScroll;
      stickyRef.value.style.top = `${calcTop}px`;
      stickyRef.value.style.position = 'relative';
      console.log(stickyRef.value.offsetTop);
    }
  }
  if (state.isScrollDown) {
    if (state.topLock) {
      console.log(diffScroll);

      state.topLock = false;
      const calcTop = stickyRef.value.offsetTop + diffScroll;
      stickyRef.value.style.top = `${calcTop}px`;
      stickyRef.value.style.position = 'relative';
      console.log(stickyRef.value.offsetTop);
    }
  }
};

const topIntersection = ref();
const bottomIntersection = ref();
const top = ref();
const bottom = ref();
const stickyRef = ref();
const spaceFromTop = 100;
const spaceFromBottom = 20;

const intersectionHandler = (entries: Array<IntersectionObserverEntry>) => {
  entries.forEach((entry: IntersectionObserverEntry) => {
    console.log(window.scrollY, state.currentScroll, 'intersecting:', entry.target.classList[0]);

    if (state.isScrollDown) {
      if (entry.isIntersecting && entry.target.classList.contains('end')) {
        console.log('qwer');
        state.bottomLock = true;
        state.topLock = false;
        stickyRef.value.style.position = 'sticky';
        const calcTop = -(stickyRef.value.clientHeight + spaceFromBottom - innerHeight);
        console.log(calcTop, stickyRef.value.clientHeight, innerHeight);
        stickyRef.value.style.top = `${calcTop}px`;
      }

      // if (entry.isIntersecting && entry.target.classList.contains('start')) {
      //   console.log('gottttttta');
      //   state.topLock = true;
      //   state.bottomLock = false;
      //   stickyRef.value.style.position = 'sticky';
      //   stickyRef.value.style.top = `${spaceFromTop}px`;
      // }
    }
    if (state.isScrollUp) {
      if (entry.isIntersecting && entry.target.classList.contains('start')) {
        console.log('zxcv');
        state.topLock = true;
        state.bottomLock = false;
        stickyRef.value.style.position = 'sticky';
        stickyRef.value.style.top = `${spaceFromTop}px`;
      }

      if (entry.isIntersecting && entry.target.classList.contains('end')) {
        console.log('opoiy');
        state.topLock = false;
        state.bottomLock = true;
      }
    }
  });
};

onMounted(() => {
  console.log('mounted');
  state.currentScroll = window.scrollY;
  document.addEventListener('scroll', () => scrollHandler());

  topIntersection.value = new IntersectionObserver(intersectionHandler, {});
  bottomIntersection.value = new IntersectionObserver(intersectionHandler, {});
  topIntersection.value.observe(top.value);
  bottomIntersection.value.observe(bottom.value);

  stickyRef.value.style.position = 'sticky';
  stickyRef.value.style.top = `${spaceFromTop}px`;
  state.topLock = true;
});
</script>

<template>
  <div class="sticky-box">
    <div ref="stickyRef" class="sticky-content">
      <span ref="top" class="start marked-sticky"> </span>
      <div>
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
      </div>

      <span ref="bottom" class="end marked-sticky"> </span>
    </div>
  </div>
</template>

<style lang="scss">
.sticky-box {
  width: 270px;
  display: flex;
  flex-direction: column;
  background: goldenrod;
  position: relative;
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

.sticky-content {
  width: 100%;
  position: relative;
}

.marked-sticky {
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: blue;
}

.start {
  top: -100px;
}

.end {
  bottom: -20px;
}
</style>
