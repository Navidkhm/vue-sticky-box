<script setup lang="ts">
import StickyBox from './components/StickyBox.vue';
import { reactive, ref } from 'vue';

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
      isOpen: true,
      title: 'title-4',
      body: 'qwerqwrqwerwrwr',
    },
    {
      isOpen: true,
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

const exampleRef = ref(null);

// const toggleBox = (index: number) => {
//   state.boxes[index].isOpen = !state.boxes[index].isOpen;
// };

const scrollInto = (ref) => {
  ref?.scrollIntoView({
    block: 'center',
    behavior: 'smooth',
  });
};
</script>

<template>
  <div class="container-w-sm">
    <div class="intro py-8">
      <div class="flex-col flex-center">
        <div class="intro-heading flex-center h1">
          <img src="/vue-sticky-box-logo.png" alt="vue-sticky-box-logo" width="100px" />
          <h1 class="text-center mb-0">Vue Sticky Box</h1>
        </div>

        <h3 class="text-center mx-auto mb-3">
          A simple and lightweight Vue 3 component for creating sticky containers with ease. It
          provides flexible options to control the sticky behavior and supports offsets from the
          viewport.
        </h3>

        <button class="example-btn" @click="scrollInto(exampleRef)">
          Scroll and See how it works!
        </button>
      </div>

      <div>
        <h3>🚀 Features</h3>

        <ul>
          <li>Lightweight and easy to use.</li>
          <li>Customizable offsets from the top and bottom of the viewport.</li>
          <li>Reactive state for sticky positioning.</li>
          <li>Compatible with modern Vue 3 applications.</li>
        </ul>
      </div>

      <div>
        <h3>Requirements</h3>
        <div class="mb-3">
          <h4>🎨 Styling</h4>
          <p>
            You should import the default styles provided by the package for work then add your own
            customized style. To use the default styles, import them into your project:
          </p>
          <pre>import 'vue-sticky-box/style.css'</pre>
        </div>

        <div>
          <h4>🔧 Package</h4>
          <p>
            This package requires Vue 3 as a peer dependency. Ensure Vue is installed in your
            project:
          </p>

          <pre>npm install vue@^3.0.0</pre>
        </div>
      </div>

      <div>
        <h3>🔑 Props</h3>

        <p>The <code>VueStickyBox</code> component accepts the following props:</p>

        <table>
          <thead>
            <tr>
              <th><strong>Prop</strong></th>
              <th><strong>Type</strong></th>
              <th><strong>Default</strong></th>
              <th><strong>Description</strong></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>offsetTop</code></td>
              <td><code>number</code></td>
              <td><code>0</code></td>
              <td>The offset in pixels from the top of the viewport.</td>
            </tr>
            <tr>
              <td><code>offsetBottom</code></td>
              <td><code>number</code></td>
              <td><code>0</code></td>
              <td>The offset in pixels from the bottom of the viewport.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h3>📖 Example</h3>

        <pre
          class="pre-code"
          style="position: relative"
        ><span class="pl-k">&lt;</span>script setup<span class="pl-k">&gt;</span>
import VueStickyBox from <span class="pl-s"><span class="pl-pds">'</span>vue-sticky-box<span class="pl-pds">'</span></span><span class="pl-k">;</span>
import <span class="pl-s"><span class="pl-pds">'</span>vue-sticky-box/style.css<span class="pl-pds">'</span></span><span class="pl-k">;</span>
<span class="pl-k">&lt;</span>/script<span class="pl-k">&gt;</span>

<span class="pl-k">&lt;</span>template<span class="pl-k">&gt;</span>
  <span class="pl-k">&lt;</span>div style=<span class="pl-s"><span class="pl-pds">"</span>height: 2000px<span class="pl-pds">"</span></span><span class="pl-k">&gt;</span>
    <span class="pl-k">&lt;</span>VueStickyBox :offsetTop=<span class="pl-s"><span class="pl-pds">"</span>50<span class="pl-pds">"</span></span> :offsetBottom=<span class="pl-s"><span class="pl-pds">"</span>30<span class="pl-pds">"</span></span><span class="pl-k">&gt;</span>
      <span class="pl-k">&lt;</span>div style=<span class="pl-s"><span class="pl-pds">"</span>background: lightgray; padding: 20px; border-radius: 5px;<span class="pl-pds">"</span></span><span class="pl-k">&gt;</span>
        This box will stay sticky<span class="pl-k">!</span>
      <span class="pl-k">&lt;</span>/div<span class="pl-k">&gt;</span>
    <span class="pl-k">&lt;</span>/VueStickyBox<span class="pl-k">&gt;</span>
  <span class="pl-k">&lt;</span>/div<span class="pl-k">&gt;</span>
<span class="pl-k">&lt;</span>/template<span class="pl-k">&gt;</span><div class="open_grepper_editor" title="Edit &amp; Save To Grepper"></div>
</pre>
      </div>
    </div>

    <div class="example-box" ref="exampleRef">
      <div class="main-box">First box view</div>
      <div class="container px-2">
        <StickyBox
          v-if="exampleRef"
          :offset-top="20"
          :offset-bottom="20"
          v-bind:scrollInsideABox="true"
          :scrolledBoxRef="exampleRef"
        >
          <div class="simple-box text-center">Sticky box</div>
        </StickyBox>

        <div class="main-box">Main box</div>
      </div>

      <div class="main-box">2nd box view</div>
      <div class="main-box">3rd box view</div>
      <div class="main-box">4th box view</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use './assets/typography.scss';

.intro {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.main-box {
  width: 100%;
  height: 400px;
  background-color: antiquewhite;
  color: black;
  font-size: 20px;
  text-align: center;
}

.example-box {
  position: relative;
  width: 100%;
  border: 1px solid var(--vt-c-primary);
  border-radius: 4px;
  overflow-x: hidden;
  margin: auto;
  max-height: 600px;
  margin-bottom: 10vh;
}

.container {
  display: flex;
  width: 100%;
  gap: 16px;
  padding-top: 48px;
  padding-bottom: 48px;

  .main-box {
    height: 150vh;
    width: calc(100% - 284px);
    background-color: rgb(179, 179, 248);
  }
}

.sticky-box {
  width: 270px;
}

.simple-box {
  background-color: aquamarine;
  height: 115vh;
  padding: 4px;
  font-size: 20px;
}

.example-btn {
  min-width: 200px;
  min-height: 48px;
  padding: 1.25rem 1.5rem;
  font-size: 2.5dvb;
  border-radius: 4px;
  background-color: var(--vt-c-primary);
  color: var(--vt-c-white);
  outline: none;
  border: 1px solid rgb(45 140 97);
  cursor: pointer;
}

.pre-code {
  margin-right: 64px;
  font-size: 1rem;
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
