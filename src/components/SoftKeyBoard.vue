<template>
  <div class="keyboard">
    <div class="key" @click="onTab">TAB</div>
    <div class="key" @click="onEnter">Enter</div>
    <div class="key" @click="onCtrlC">Ctrl-C</div>
    <div class="key" @click="onArrowUp">UP</div>
    <div class="key" @click="onArrowDown">DOWN</div>
  </div>
</template>

<script lang="ts" setup>
const onTab = () => {}

const onEnter = () => {}

const onCtrlC = () => {}

const onArrowUp = () => {}

const onArrowDown = () => {}
</script>

<style scoped>
.keyboard {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 45px;
  background-color: rgba(88, 88, 88, 0.5);
  user-select: none;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  .key {
    width: 20%;
    color: #fff;
    text-align: center;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      right: 0;
      height: 23px;
      border-left: 2px solid hsla(0, 0%, 100%, 0.6);
    }

    &:last-child::after {
      display: none;
    }
  }
}
</style>
