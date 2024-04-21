<template>
  <div class="input-line" id="input-line">
    <span class="shell-prompt">{{ prompt }}</span>
    <span class="input-area" ref="inputArea" contenteditable="true"></span>
    <span class="hint-area"> {{ hint }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMainStore } from '@/store/mainStore.js'
import { storeToRefs } from 'pinia'
const { fs, username, nowDir } = storeToRefs(useMainStore())

const prompt = computed(
  () =>
    `[${username.value}@${location.hostname} ${nowDir.value === `/home/${username.value}` ? '~' : nowDir.value}]$ `
)
const hint = ref('')
</script>

<style scoped>
.input-line {
  line-height: 23px;
  font-size: 17px;
}

.shell-prompt {
  white-space: pre;
}

.input-area {
  outline: none;
  word-break: break-all;
}

.hint-area {
  opacity: 0.3;
}
</style>
