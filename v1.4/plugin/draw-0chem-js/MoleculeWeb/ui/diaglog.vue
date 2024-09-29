<script setup>
import {CHEM_SETTING} from "../../config.js";
// import {ref} from "vue";

let props = defineProps({
  title: {type: String, default: ''}
})

// const formData = ref({show: true});

function dialogClose() {
  // formData.value.show = false;
  CHEM_SETTING.UI.DIALOG.value.SHOW = false;
}

function dialogShow() {
  // formData.value.show = true;
}
</script>

<template>
  <div class="_0chem_dialogLayout" v-if="CHEM_SETTING.UI.DIALOG.value.SHOW">
    <div class="_0chem_dialogBackground"></div>
    <div class="_0chem_dialogContainer">
      <div class="_0chem_dialogTitle">
        <a class="_0chem_dialogClose" href="javascript:void(0)" @click="dialogClose">&#10005</a>{{ props.title + CHEM_SETTING.UI.DIALOG.value.TITLE + CHEM_SETTING.UI.DIALOG.value.TITLE_DESC }}
      </div>
      <div class="_0chem_dialogContent">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>