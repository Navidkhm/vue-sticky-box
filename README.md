# vue-sticky-box

A simple and lightweight Vue 3 component for creating sticky containers with ease. It provides flexible options to control the sticky behavior and supports offsets from the viewport.

## Requirements

### 🎨 Styling

You **should** import the default styles provided by the package for work then add your own customized style.
To use the default styles, import them into your project:

```bash
import 'vue-sticky-box/style.css'
```

### 🔧 Package

This package requires Vue 3 as a peer dependency. Ensure Vue is installed in your project:

```bash
npm install vue@^3.0.0
```

## 📖 Example

Here's a complete example:

```bash
<script setup>
import VueStickyBox from 'vue-sticky-box';
import 'vue-sticky-box/style.css';
</script>

<template>
  <div style="height: 2000px">
    <VueStickyBox :offsetTop="50" :offsetBottom="30">
      <div style="background: lightgray; padding: 20px; border-radius: 5px;">
        This box will stay sticky!
      </div>
    </VueStickyBox>
  </div>
</template>
```

## 🔑 Props

The `VueStickyBox` component accepts the following props:

| **Prop**       | **Type** | **Default** | **Description**                                       |
| -------------- | -------- | ----------- | ----------------------------------------------------- |
| `offsetTop`    | `number` | `0`         | The offset in pixels from the top of the viewport.    |
| `offsetBottom` | `number` | `0`         | The offset in pixels from the bottom of the viewport. |

## 🚀 Features

- Lightweight and easy to use.
- Customizable offsets from the top and bottom of the viewport.
- Reactive state for sticky positioning.
- Compatible with modern Vue 3 applications.

## 🛠️ Build and Contribute

If you'd like to contribute or build the project locally:

### Clone the repository:

`git clone https://github.com/Navidkhm/vue-sticky-box.git`

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## 📄 License

This package is licensed under the MIT License.

## 🐛 Reporting Issues

If you encounter any issues or have suggestions for improvement, please open an issue on [Github](https://github.com/Navidkhm/vue-sticky-box/issues).
