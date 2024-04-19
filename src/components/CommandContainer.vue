<template>
  <div class="command">
    <div class="input">{{ command.input }}</div>
    <div class="output">{{ command.output }}</div>
  </div>
</template>

<script lang="ts" setup>
const { command } = defineProps(['command'])
</script>

<style lang="scss" scoped></style>
