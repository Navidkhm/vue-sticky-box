// index.d.ts
import { DefineComponent, Ref } from 'vue';

declare module 'sticky-box' {
  interface VueStickyBoxProps {
    /**
     * The offset from the top of the viewport in pixels.
     * Default: 0
     */
    offsetTop?: number;

    /**
     * The offset from the bottom of the viewport in pixels.
     * Default: 0
     */
    offsetBottom?: number;
  }

  interface VueStickyBoxState {
    isScrollDown: boolean;
    isScrollUp: boolean;
    currentScroll: number;
    topLock: boolean;
    bottomLock: boolean;
  }

  export const VueStickyBox: DefineComponent<
    VueStickyBoxProps,
    {
      /**
       * Reference to the sticky content element.
       */
      stickyRef: Ref<HTMLDivElement | undefined>;

      /**
       * Reference to the top intersection point.
       */
      topRef: Ref<HTMLSpanElement | undefined>;

      /**
       * Reference to the bottom intersection point.
       */
      bottomRef: Ref<HTMLSpanElement | undefined>;

      /**
       * Current spacing from the top of the viewport.
       */
      spaceFromTop: Ref<number>;

      /**
       * Current spacing from the bottom of the viewport.
       */
      spaceFromBottom: Ref<number>;

      /**
       * The reactive state of the component.
       */
      state: VueStickyBoxState;
    },
    unknown
  >;
}
