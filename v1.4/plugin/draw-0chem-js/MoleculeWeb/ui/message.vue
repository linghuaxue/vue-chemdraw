<!--
Author: 史岩
Author URL: http://www.0chem.com
Date: 2024.8.10
-->
<script setup>
import {ref} from "vue";
import {CHEM_CONFIG} from "../../config.js";

const formData = {
  list: ref([]),
  timer: function () {
    setTimeout(formData.timer, 100);
    console.log(new Date());
  }
}

function messageClose(v) {
  v.show = false;
}

function MessageAdd(value, icon) {
  console.log(icon + ' ' + value);
  formData.list.value.push({msg: value, show: true, icon: icon, count: 30});
}

defineExpose({
  MessageAdd
})
</script>

<template>
  <div class="_0chem_messageLayout">
    <template v-for="item of formData.list.value">
      <div class="_0chem_messageRow" v-if="item.show">
        <div v-if="item.icon===CHEM_CONFIG.MESSAGE.ICON_ERROR" class="_0chem_messageContent" style="background-color: #FFF0F5;">
          <div class="_0chem_messageIcon chemfont" style="color: red;">&#xe922;</div>
          <a class="_0chem_messageClose" href="javascript:void(0)" @click="messageClose(item)">&#10005</a>{{ item.msg }}
        </div>
        <div v-if="item.icon===CHEM_CONFIG.MESSAGE.ICON_SUCCESS" class="_0chem_messageContent" style="background-color: #e8f8f5;">
          <div class="_0chem_messageIcon chemfont" style="color: green;">&#xe658;</div>
          <a class="_0chem_messageClose" href="javascript:void(0)" @click="messageClose(item)">&#10005</a>{{ item.msg }}
        </div>
        <div v-if="item.icon===CHEM_CONFIG.MESSAGE.ICON_WARN" class="_0chem_messageContent" style="background-color: #fef9e7;">
          <div class="_0chem_messageIcon chemfont" style="color: #FFA500;">&#xe6aa;</div>
          <a class="_0chem_messageClose" href="javascript:void(0)" @click="messageClose(item)">&#10005</a>{{ item.msg }}
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
</style>