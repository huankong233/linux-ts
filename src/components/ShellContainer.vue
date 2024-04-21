<template>
  <CommandContainer v-for="(command, index) in commands" :key="index" :command="command" />
  <InputLine />
</template>

<script lang="ts" setup>
import { useMainStore } from '@/store/mainStore.js'
import { storeToRefs } from 'pinia'
import CommandContainer from '@/components/CommandContainer.vue'
import InputLine from '@/components/InputLine.vue'

const { commands } = storeToRefs(useMainStore())
</script>

<style lang="scss" scoped></style>
