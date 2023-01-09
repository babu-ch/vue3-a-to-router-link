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
</template>

<script setup>
import AToRouterLink from "./components/AToRouterLink.vue"
const html = `<p><a href="/a">to page a(relative)</a></p>` +
    `<p><a href="${window.location.origin}/a">to page a(full)</a></p>`+
    `<p><a href="https://google.com">to google</a></p>`

const cbHtml = `<p><a href="/">to Home</a></p>` +
                `<p><a href="https://google.com/">to google</a></p>`
const beforeMoveInternal = () => {
  return confirm("move?")
}
const beforeMoveExternal = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return confirm("(async) move?")
}
const afterMoveExternal = (href) => {console.log("afterMoveExternal", href)}
const afterMoveInternal = (href) => {console.log("afterMoveInternal", href)}
const afterMove = (href) => {console.log("afterMove", href)}
</script>

<style scoped></style>
