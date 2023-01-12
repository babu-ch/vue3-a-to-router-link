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
const { beforeMoveInternalCallBack, beforeMoveExternalCallBack, checkBlankExternalLink, checkBlankInternalLink } = toRefs(props)

const router = useRouter()

const callCb = async (cb: Ref<Function|undefined>|undefined, href: string) => {
  if (!cb?.value) {
    return true
  }
  return await cb?.value(href)
}

const onClick = async (event: Event) => {
  const target = event.target as (HTMLAnchorElement|null)
  if (target === null || target.tagName !== "A") {
    return
  }
  event.preventDefault()

  const href = target.href
  const origin = window.location.origin
  const isBlank = target.target === "_blank"

  if (href.startsWith(origin)) {
    if (!( await callCb(beforeMoveInternalCallBack, href))) {
      return
    }
    if (checkBlankInternalLink?.value && isBlank) {
      window.open(href, "_blank")
    } else {
      await router.push(href.replace(origin, ""))
    }
    emits("afterMoveInternal", href)
  } else {
    if (!( await callCb(beforeMoveExternalCallBack, href))) {
      return
    }
    if (checkBlankExternalLink?.value) {
      window.open(href, isBlank ? "_blank" : "_self")
    } else {
      // default is blank
      window.open(href, "_blank")
    }
    emits("afterMoveExternal", href)
  }
  emits("afterMove", href)
}
</script>

<template>
  <component :is="tag" v-html="html" @click="onClick" />
</template>
