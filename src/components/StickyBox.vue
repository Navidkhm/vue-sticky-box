<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';

const props = defineProps({
  offsetTop: {
    type: Number,
    required: false,
    default: 0,
  },
  offsetBottom: {
    type: Number,
    required: false,
    default: 0,
  },
});

const state = reactive({
  isScrollDown: false,
  isScrollUp: false,
  currentScroll: 0,
  topLock: false,
  bottomLock: false,
});

const scrollHandler = () => {
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

  if (stickyRef.value.clientHeight + spaceFromTop.value < innerHeight) {
    stickyRef.value.style.top = `${spaceFromTop.value}px`;
    stickyRef.value.style.position = 'sticky';
    state.topLock = true;
    state.bottomLock = false;
    return;
  }

  if (state.isScrollUp) {
    if (state.bottomLock) {
      state.bottomLock = false;
      const calcTop = stickyRef.value.offsetTop + diffScroll;
      stickyRef.value.style.top = `${calcTop}px`;
      stickyRef.value.style.position = 'relative';
    }
  }
  if (state.isScrollDown) {
    if (state.topLock) {
      state.topLock = false;
      const calcTop = stickyRef.value.offsetTop + diffScroll;
      stickyRef.value.style.top = `${calcTop}px`;
      stickyRef.value.style.position = 'relative';
    }
  }
};

const topIntersection = ref();
const bottomIntersection = ref();
const topRef = ref();
const bottomRef = ref();
const stickyRef = ref();
const spaceFromTop = ref(props.offsetTop);
const spaceFromBottom = ref(props.offsetBottom);

watch(
  () => props.offsetTop,
  (newValue) => {
    spaceFromTop.value = newValue;
    topRef.value.style.top = `-${newValue}px`;
  },
);

watch(
  () => props.offsetBottom,
  (newValue) => {
    spaceFromBottom.value = newValue;
    bottomRef.value.style.bottom = `-${newValue}px`;
  },
);

const intersectionHandler = (entries: Array<IntersectionObserverEntry>) => {
  entries.forEach((entry: IntersectionObserverEntry) => {
    if (state.isScrollDown) {
      if (entry.isIntersecting && entry.target.classList.contains('end')) {
        state.bottomLock = true;
        state.topLock = false;
        stickyRef.value.style.position = 'sticky';
        const calcTop = -(stickyRef.value.clientHeight + spaceFromBottom.value - innerHeight);
        stickyRef.value.style.top = `${calcTop}px`;
      }

      // if (entry.isIntersecting && entry.target.classList.contains('start')) {
      //   state.topLock = true;
      //   state.bottomLock = false;
      //   stickyRef.value.style.position = 'sticky';
      //   stickyRef.value.style.top = `${spaceFromTop.value}px`;
      // }
    }
    if (state.isScrollUp) {
      if (entry.isIntersecting && entry.target.classList.contains('start')) {
        state.topLock = true;
        state.bottomLock = false;
        stickyRef.value.style.position = 'sticky';
        stickyRef.value.style.top = `${spaceFromTop.value}px`;
      }

      if (entry.isIntersecting && entry.target.classList.contains('end')) {
        state.topLock = false;
        state.bottomLock = true;
      }
    }
  });
};

onMounted(() => {
  state.currentScroll = window.scrollY;

  topRef.value.style.top = `-${spaceFromTop.value}px`;
  bottomRef.value.style.bottom = `-${spaceFromBottom.value}px`;

  document.addEventListener('scroll', () => scrollHandler());
  topIntersection.value = new IntersectionObserver(intersectionHandler, {});
  bottomIntersection.value = new IntersectionObserver(intersectionHandler, {});
  topIntersection.value.observe(topRef.value);
  bottomIntersection.value.observe(bottomRef.value);

  stickyRef.value.style.position = 'sticky';
  stickyRef.value.style.top = `${spaceFromTop.value}px`;
  state.topLock = true;
});
</script>

<template>
  <div class="sticky-box">
    <div ref="stickyRef" class="sticky-content">
      <span ref="topRef" class="start marked-sticky-point" />
      <div class="sticky-box-wrapper">
        <slot></slot>
      </div>
      <span ref="bottomRef" class="end marked-sticky-point" />
    </div>
  </div>
</template>

<style lang="scss">
.sticky-box {
  display: flex;
  flex-direction: column;
  position: relative;
}

.sticky-content {
  width: 100%;
  position: relative;
}

.marked-sticky-point {
  position: absolute;
  width: 100%;
  height: 0px;
}
</style>
