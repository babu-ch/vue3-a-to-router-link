# Vue3 v-html link handler

replace the link in v-html with router.push

# Usage

```html
# simple
<VHtmlLinkHandler :html="html"/>
```

## Props

```js
const props = defineProps({
   // v-html value
   html: {
      type: String,
      required: false,
      default: "",
   },
   // tag. default is div
   tag: {
      type: String,
      required: false,
      default: "div",
   },
   // Callback called before navigating with router.push
   // move only if true
   beforeMoveInternalCallBack: {
      type: Function,
      required: false,
   },
   // Callback invoked before navigating outside
   // move only if true
   beforeMoveExternalCallBack: {
      type: Function,
      required: false,
   },
   // check target=_blank internal link
   checkBlankInternalLink: {
      type: Boolean,
      required: false,
      default: false,
   },
   // check target=_blank external link
   checkBlankExternalLink: {
      type: Boolean,
      required: false,
      default: false,
   }
})
```

## emit

```ts
const emits = defineEmits<{
  // Always emit when navigating to a link
  (e: "afterMove", href: String): void
  // Always emit when navigating to an internal link
  (e: "afterMoveInternal", href: String): void
  // Always emit when navigating to an external link
  (e: "afterMoveExternal", href: String): void
}>()
```

# develop

```
pnpm install

pnpm dev

pnpm build
```


# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
