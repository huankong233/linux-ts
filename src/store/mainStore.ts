import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Command {
  input: string
  output: string
}

export const useMainStore = defineStore('MainStore', () => {
  const commands = ref<Command[]>([])

  return { commands }
})
