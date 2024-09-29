<script setup>
import {CONFIG_MOLECULE, CHEM_SETTING} from "../../config.js";
import {BOND_STEREO, BOND_TYPE} from "../../Molecule/Data/DataBond.js";

const statusbar = [{
  id: CONFIG_MOLECULE.OPERATE_NAME.BOND2, name: "bond", data: [{
    "id": 101, "code": "\ue61a", "name": "双键", "click": res => {
      CHEM_SETTING.OPERATE.value.OPERATE_ARG = BOND_STEREO.NONE;
      CHEM_SETTING.UI.STATUSBAR.value.BOND_STEREO = 101;
    }
  }, {
    "id": 102, "code": "\ue65e", "name": "双键(上)", "click": res => {
      CHEM_SETTING.OPERATE.value.OPERATE_ARG = BOND_STEREO.STEREO_UP;
      CHEM_SETTING.UI.STATUSBAR.value.BOND_STEREO = 102;
    }
  }, {
    "id": 103, "code": "\ue657", "name": "双键(下)", "click": res => {
      CHEM_SETTING.OPERATE.value.OPERATE_ARG = BOND_STEREO.STEREO_DOWN;
      CHEM_SETTING.UI.STATUSBAR.value.BOND_STEREO = 103;
    }
  }]
},
  {
    id: CONFIG_MOLECULE.OPERATE_NAME.BOND3, name: "三键", data: [{
      "id": 104, "code": "\ue619", "name": "三键", "click": res => {
        CHEM_SETTING.OPERATE.value.OPERATE_ARG = BOND_STEREO.STEREO_DOWN;
        CHEM_SETTING.UI.STATUSBAR.value.BOND_STEREO = 104;
      }
    }, {
      "id": 105, "code": "\ue65b", "name": "三键(短)", "click": res => {
        CHEM_SETTING.OPERATE.value.OPERATE_ARG = BOND_STEREO.STEREO_DOWN;
        CHEM_SETTING.UI.STATUSBAR.value.BOND_STEREO = 105;
      }
    }]
  },
  {
    id: CONFIG_MOLECULE.OPERATE_NAME.BOND1, name: "反向", data: [{
      "id": 107, "code": "\ue628", "name": "翻转", "click": res => {
      }
    }]
  },
  {
    id: CONFIG_MOLECULE.OPERATE_NAME.SCALE, name: "缩放", data: [{
      "id": 403, "code": "\ue61f", "name": "恢复默认1:1", "click": res => {
      }
    }, {
      "id": 404, "code": "\ue620", "name": "适合屏幕", "click": res => {
      }
    }]
  },
  {
    id: CONFIG_MOLECULE.OPERATE_NAME.SELECT, name: "选择", data: [{
      "id": 301, "code": "\ue645", "name": "选中删除", "click": res => {
      }
    }, {
      "id": 302, "code": "\ue61e", "name": "显示选中 H 数量", "click": res => {
        CHEM_SETTING.UI.TOOLBAR.value.SELECT_H = !CHEM_SETTING.UI.TOOLBAR.value.SELECT_H;
      }
      // }, {
      //   "id": 304, "code": "\ue628", "name": "翻转", "click": res => {
      //   }
    }]
    // },
    // {
    //   id: 401, name: "离子", data: [{
    //     "id": 401, "code": "\uedfe", "name": "离子", "click": res => {
    //     }
    //   }, {
    //     "id": 913, "code": "3-", text: true, "name": "离子", "click": res => {
    //       chem_toolbar.selected.value = 913;
    //     }
    //   }, {
    //     "id": 912, "code": "2-", text: true, "name": "离子", "click": res => {
    //       chem_toolbar.selected.value = 912;
    //     }
    //   }, {
    //     "id": 911, "code": "-", text: true, "name": "离子", "click": res => {
    //       chem_toolbar.selected.value = 911;
    //     }
    //   }, {
    //     "id": 900, "code": "0", text: true, "name": "离子", "click": res => {
    //       chem_toolbar.selected.value = 900;
    //     }
    //   }, {
    //     "id": 901, "code": "+", text: true, "name": "离子", "click": res => {
    //       chem_toolbar.selected.value = 901;
    //     }
    //   }, {
    //     "id": 902, "code": "2+", text: true, "name": "离子", "click": res => {
    //       chem_toolbar.selected.value = 902;
    //     }
    //   }, {
    //     "id": 903, "code": "3+", text: true, "name": "离子", "click": res => {
    //       chem_toolbar.selected.value = 903;
    //     }
    //   }]
  }];
</script>

<template>
  <div class="_0chem_statusbar">
    <!--<div class="_0chem_statusbar_row">-->
    <template v-for="list in statusbar">
      <template v-if="list.id===CHEM_SETTING.OPERATE.OPERATE_NAME" v-for="item in list.data">
        <div :title="item.name" @click="item.click" :class="['_0chem_statusbar_icon',item.text?'chem-text':'',item.id===302&&CHEM_SETTING.UI.STATUSBAR.SELECT_H?'':'',item.id===CHEM_SETTING.UI.STATUSBAR.BOND_STEREO?'':'']">{{ item.code }}</div>
      </template>
    </template>
    <!--</div>-->
  </div>
</template>

<style scoped>

</style>