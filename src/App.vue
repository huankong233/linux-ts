<template>
  <ShellContainer />
  <SoftKeyBoard v-if="isMobile()" />
</template>

<script lang="ts" setup>
import ShellContainer from '@/components/ShellContainer.vue'
import SoftKeyBoard from '@/components/SoftKeyBoard.vue'
import { isMobile } from './utils/isMobile.js'
</script>

<style lang="scss" scoped></style>
