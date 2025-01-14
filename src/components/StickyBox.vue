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
  scrollInsideABox: {
    type: Boolean,
    required: false,
    default: false,
  },
  scrolledBoxRef: {
    type: HTMLElement,
    required: false,
    default: null,
  },
});

const state = reactive({
  isScrollDown: false,
  isScrollUp: false,
  currentScroll: 0,
  topLock: false,
  bottomLock: false,
  scrolledBoxElement: props.scrolledBoxRef,
  innerHeight: window.innerHeight,
});

const scrollHandler = (e: UIEvent): void => {
  const scrollY = props.scrollInsideABox ? (e.target as HTMLElement).scrollTop : window.scrollY;

  if (scrollY <= state.currentScroll) {
    state.isScrollUp = true;
    state.isScrollDown = false;
  } else {
    state.isScrollUp = false;
    state.isScrollDown = true;
  }

  let diffScroll = state.currentScroll - scrollY;

  if (
    scrollY < stickyRef.value.parentElement.offsetTop ||
    stickyRef.value.parentElement.clientHeight + stickyRef.value.parentElement.offsetTop <
      scrollY + state.innerHeight
  ) {
    diffScroll = 0;
  }

  state.currentScroll = scrollY;

  if (stickyRef.value.clientHeight + spaceFromTop.value < state.innerHeight) {
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
        const calcTop = -(stickyRef.value.clientHeight + spaceFromBottom.value - state.innerHeight);
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

const initiateFunctionality = () => {
  if (props.scrollInsideABox) {
    state.currentScroll = state.scrolledBoxElement?.offsetTop;
    state.scrolledBoxElement.addEventListener('scroll', (e) => scrollHandler(e as UIEvent));
    state.innerHeight = state.scrolledBoxElement.clientHeight;
  } else {
    state.currentScroll = scrollY;
    document.addEventListener('scroll', (e) => scrollHandler(e as UIEvent));
  }

  topRef.value.style.top = `-${spaceFromTop.value}px`;
  bottomRef.value.style.bottom = `-${spaceFromBottom.value}px`;

  topIntersection.value = new IntersectionObserver(intersectionHandler, {});
  bottomIntersection.value = new IntersectionObserver(intersectionHandler, {});
  topIntersection.value.observe(topRef.value);
  bottomIntersection.value.observe(bottomRef.value);

  stickyRef.value.style.position = 'sticky';
  stickyRef.value.style.top = `${spaceFromTop.value}px`;
  state.topLock = true;
};

onMounted(() => {
  initiateFunctionality();
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
