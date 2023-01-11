<template>
  <router-view />
  <h3>normal</h3>
  <AToRouterLink :html="html" />
  <h3>has callback</h3>
  <AToRouterLink
    :html="cbHtml"
    :before-move-internal-call-back="beforeMoveInternal"
    :before-move-external-call-back="beforeMoveExternal"
    @afterMoveExternal="afterMoveExternal"
    @afterMoveInternal="afterMoveInternal"
    @afterMove="afterMove"
  />
  <h3>check blank</h3>
  <AToRouterLink
      :html="blankHtml"
      :check-blank-external-link="true"
      :check-blank-internal-link="true"
  />
</template>

<script setup lang="ts">
import AToRouterLink from "./components/AToRouterLink.vue"
const html = `<p><a href="/a">to page a(relative)</a></p>` +
    `<p><a href="${window.location.origin}/a">to page a(full)</a></p>`+
    `<p><a href="https://google.com">to google</a></p>`

const cbHtml = `<p><a href="/">to Home</a></p>` +
                `<p><a href="https://google.com/">to google</a></p>`
const beforeMoveInternal = (href: String) => {
  return confirm(`move to ${href}?`)
}
const beforeMoveExternal = async (href: String) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return confirm(`(async) move to ${href}?`)
}
const afterMoveExternal = (href: String) => {console.log("afterMoveExternal", href)}
const afterMoveInternal = (href: String) => {console.log("afterMoveInternal", href)}
const afterMove = (href: String) => {console.log("afterMove", href)}

const blankHtml = `<p><a href="/b" target="_blank">to page b(blank)</a></p>` +
    `<p><a href="https://google.com">to google(same tab)</a></p>` +
    `<p><a href="https://google.com" target="_blank">to google(blank)</a></p>`
</script>

<style scoped></style>
