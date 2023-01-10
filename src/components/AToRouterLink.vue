<script setup lang="ts">
import {useRouter} from "vue-router";
import {Ref, toRefs} from "vue";

const emits = defineEmits<{
  // Always emit when navigating to a link
  (e: "afterMove", href: String): void
  // Always emit when navigating to an internal link
  (e: "afterMoveInternal", href: String): void
  // Always emit when navigating to an external link
  (e: "afterMoveExternal", href: String): void
}>()

const props = defineProps({
  // v-html value
  html: String,
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
})
const { beforeMoveInternalCallBack, beforeMoveExternalCallBack } = toRefs(props)

const router = useRouter()

const callCb = async (cb: Ref<Function|undefined>|undefined) => {
  if (!cb?.value) {
    return true
  }
  return await cb?.value()
}

const onClick = async (event: Event) => {
  const target = event.target as (HTMLAnchorElement|null)
  if (target === null || target.tagName !== "A") {
    return
  }
  event.preventDefault()

  const href = target.href
  const origin = window.location.origin

  if (href.startsWith(origin)) {
    if (!( await callCb(beforeMoveInternalCallBack))) {
      return
    }
    await router.push(href.replace(origin, ""))
    emits("afterMoveInternal", href)
  } else {
    if (!( await callCb(beforeMoveExternalCallBack))) {
      return
    }
    window.open(href)
    emits("afterMoveExternal", href)
  }
  emits("afterMove", href)
}
</script>

<template>
  <component :is="tag" v-html="html" @click="onClick" />
</template>
