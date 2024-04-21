import { VFS } from '@/utils/VFS.js'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Command {
  input: string
  output: string
}

export const useMainStore = defineStore('MainStore', () => {
  const commands = ref<Command[]>([])
  const fs = new VFS()
  const nowDir = ref('/')
  const username = ref('huan_kong')

  return { commands, fs, nowDir, username }
})
