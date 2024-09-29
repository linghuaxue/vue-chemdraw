<script setup>
import {CONFIG_MOLECULE, CHEM_SETTING} from "../../config.js";
import {BOND_STEREO, BOND_TYPE} from "../../Molecule/Data/DataBond.js";
import {RING_ADD} from "../../MoleculeEdit/Edit/DrawRing.js";

const toolbars = [
  {
    "title": "常规", "show": false, "data": [
      {
        "id": 501, "icon": "chem_chem_select", "code": "\ue631", "name": "工具 - 选择", "click": () => {
          CHEM_SETTING.OPERATE.value.OPERATE_NAME = CONFIG_MOLECULE.OPERATE_NAME.SELECT;
          CHEM_SETTING.UI.TOOLBAR.value.SELECTED = 501;
        }
      },
      {
        "id": 502, "icon": "chem_chem_eraser", "code": "\ue607", "name": "工具 - 橡皮擦", "click": () => {
          CHEM_SETTING.OPERATE.value.OPERATE_NAME = CONFIG_MOLECULE.OPERATE_NAME.ERASER;
          CHEM_SETTING.UI.TOOLBAR.value.SELECTED = 502;
        }
      },
      {
        "id": 401, "code": "\ue61c", "name": "移动", "click": () => {
          CHEM_SETTING.OPERATE.value.OPERATE_NAME = CONFIG_MOLECULE.OPERATE_NAME.MOVE;
          CHEM_SETTING.UI.TOOLBAR.value.SELECTED = 401;
        }
      },
      {
        "id": 402, "code": "\ue61d", "name": "缩放", "click": () => {
          CHEM_SETTING.OPERATE.value.OPERATE_NAME = CONFIG_MOLECULE.OPERATE_NAME.SCALE;
          CHEM_SETTING.UI.TOOLBAR.value.SELECTED = 402;
        }
      }, {
        "id": 303, "code": "\ue621", "name": "显示选中 离子+", "click": () => {
          CHEM_SETTING.OPERATE.value.OPERATE_NAME = CONFIG_MOLECULE.OPERATE_NAME.ION;
          CHEM_SETTING.OPERATE.value.OPERATE_VALUE = 1;
          CHEM_SETTING.UI.TOOLBAR.value.SELECTED = 303;
        }
      }, {
        "id": 304, "code": "\ue627", "name": "显示选中 离子-", "click": () => {
          CHEM_SETTING.OPERATE.value.OPERATE_NAME = CONFIG_MOLECULE.OPERATE_NAME.ION;
          CHEM_SETTING.OPERATE.value.OPERATE_VALUE = -1;
          CHEM_SETTING.UI.TOOLBAR.value.SELECTED = 304;
        }
      }
    ]
  },
  {
    "title": "键", "show": false, "data": [
      {
        "id": 101, "code": "\ue616", "name": "任意键", "click": () => {
          CHEM_SETTING.OPERATE.value.OPERATE_NAME = CONFIG_MOLECULE.OPERATE_NAME.BOND;
          CHEM_SETTING.OPERATE.value.OPERATE_VALUE = BOND_TYPE.BOND_ANY;
          CHEM_SETTING.OPERATE.value.OPERATE_ARG = BOND_STEREO.NONE;
          CHEM_SETTING.OPERATE.value.OPERATE_SYMBOL = 6;
          CHEM_SETTING.UI.TOOLBAR.value.SELECTED = 101;
        }
      },
      {
        "id": 102, "icon": "chem_bond_single", "code": "\ue618", "name": "单键", "click": () => {
          CHEM_SETTING.OPERATE.value.OPERATE_NAME = CONFIG_MOLECULE.OPERATE_NAME.BOND;
          CHEM_SETTING.OPERATE.value.OPERATE_VALUE = BOND_TYPE.BOND_SINGLE;
          CHEM_SETTING.OPERATE.value.OPERATE_ARG = BOND_STEREO.NONE;
          CHEM_SETTING.UI.TOOLBAR.value.SELECTED = 102;
        }
      },
      {
        "id": 103, "icon": "chem_bond_double", "code": "\ue61a", "name": "双键", "click": () => {
          CHEM_SETTING.OPERATE.value.OPERATE_NAME = CONFIG_MOLECULE.OPERATE_NAME.BOND2;
          CHEM_SETTING.OPERATE.value.OPERATE_VALUE = BOND_TYPE.BOND_DOUBLE;
          CHEM_SETTING.UI.TOOLBAR.value.SELECTED = 103;
        }
      },
      {
        "id": 104, "code": "\ue619", "name": "三键", "click": () => {
          CHEM_SETTING.OPERATE.value.OPERATE_NAME = CONFIG_MOLECULE.OPERATE_NAME.BOND3;
          CHEM_SETTING.OPERATE.value.OPERATE_VALUE = BOND_TYPE.BOND_TRIPLE;
          CHEM_SETTING.OPERATE.value.OPERATE_ARG = BOND_STEREO.NONE;
          CHEM_SETTING.UI.TOOLBAR.value.SELECTED = 104;
        }
      },
      {
        "id": 105, "code": "\ue60e", "name": "单键(上)", "click": () => {
          CHEM_SETTING.OPERATE.value.OPERATE_NAME = CONFIG_MOLECULE.OPERATE_NAME.BOND1;
          CHEM_SETTING.OPERATE.value.OPERATE_VALUE = BOND_TYPE.BOND_SINGLE;
          CHEM_SETTING.OPERATE.value.OPERATE_ARG = BOND_STEREO.STEREO_UP;
          CHEM_SETTING.UI.TOOLBAR.value.SELECTED = 105;
        }
      },
      {
        "id": 106, "code": "\ue614", "name": "单键(下)", "click": () => {
          CHEM_SETTING.OPERATE.value.OPERATE_NAME = CONFIG_MOLECULE.OPERATE_NAME.BOND1;
          CHEM_SETTING.OPERATE.value.OPERATE_VALUE = BOND_TYPE.BOND_SINGLE;
          CHEM_SETTING.OPERATE.value.OPERATE_ARG = BOND_STEREO.STEREO_DOWN;
          CHEM_SETTING.UI.TOOLBAR.value.SELECTED = 106;
        }
      },
      {
        "id": 107, "code": "\ue634", "name": "单键(波浪)", "click": () => {
          CHEM_SETTING.OPERATE.value.OPERATE_NAME = CONFIG_MOLECULE.OPERATE_NAME.BOND;
          CHEM_SETTING.OPERATE.value.OPERATE_VALUE = BOND_TYPE.BOND_SINGLE;
          CHEM_SETTING.OPERATE.value.OPERATE_ARG = BOND_STEREO.STEREO_EITHER;
          CHEM_SETTING.UI.TOOLBAR.value.SELECTED = 107;
        }
      },
      {
        "id": 108, "code": "\ue609", "name": "单键(或)", "click": () => {
          CHEM_SETTING.OPERATE.value.OPERATE_NAME = CONFIG_MOLECULE.OPERATE_NAME.BOND1;
          CHEM_SETTING.OPERATE.value.OPERATE_VALUE = BOND_TYPE.BOND_SINGLE;
          CHEM_SETTING.OPERATE.value.OPERATE_ARG = BOND_STEREO.STEREO_CIS;
          CHEM_SETTING.UI.TOOLBAR.value.SELECTED = 108;
        }
      },
      {
        "id": 111, "code": "\ue61b", "name": "单键(或)", "click": () => {
          CHEM_SETTING.OPERATE.value.OPERATE_NAME = CONFIG_MOLECULE.OPERATE_NAME.FAST;
          CHEM_SETTING.OPERATE.value.OPERATE_VALUE = RING_ADD.LINE;
          CHEM_SETTING.UI.TOOLBAR.value.SELECTED = 111;
        }
      },
      {
        "id": 112, "code": "\ue622", "name": "单键(或)", "click": () => {
          CHEM_SETTING.OPERATE.value.OPERATE_NAME = CONFIG_MOLECULE.OPERATE_NAME.FAST;
          CHEM_SETTING.OPERATE.value.OPERATE_VALUE = RING_ADD.FAST;
          CHEM_SETTING.UI.TOOLBAR.value.SELECTED = 112;
        }
      },
      {
        "id": 113, "code": "\ue624", "name": "环戊二烯", "click": () => {
          CHEM_SETTING.OPERATE.value.OPERATE_NAME = CONFIG_MOLECULE.OPERATE_NAME.RING;
          CHEM_SETTING.OPERATE.value.OPERATE_VALUE = RING_ADD.RING5;
          CHEM_SETTING.UI.TOOLBAR.value.SELECTED = 113;
        }
      },
      {
        "id": 114, "code": "\ue623", "name": "苯环", "click": () => {
          CHEM_SETTING.OPERATE.value.OPERATE_NAME = CONFIG_MOLECULE.OPERATE_NAME.RING;
          CHEM_SETTING.OPERATE.value.OPERATE_VALUE = RING_ADD.RING6;
          CHEM_SETTING.UI.TOOLBAR.value.SELECTED = 114;
        }
      },
      {
        "id": 115, "code": "\ue625", "name": "庚环", "click": () => {
          CHEM_SETTING.OPERATE.value.OPERATE_NAME = CONFIG_MOLECULE.OPERATE_NAME.RING;
          CHEM_SETTING.OPERATE.value.OPERATE_VALUE = RING_ADD.RING7;
          CHEM_SETTING.UI.TOOLBAR.value.SELECTED = 115;
        }
      },
      {
        "id": 116, "code": "\ue626", "name": "辛环", "click": () => {
          CHEM_SETTING.OPERATE.value.OPERATE_NAME = CONFIG_MOLECULE.OPERATE_NAME.RING;
          CHEM_SETTING.OPERATE.value.OPERATE_VALUE = RING_ADD.RING8;
          CHEM_SETTING.UI.TOOLBAR.value.SELECTED = 116;
        }
      }]
  },
  {
    "title": "元素", "show": false, "data": [
      {
        "id": 201, "code": "*", "name": "任意 元素", text: true, "click": () => {
          CHEM_SETTING.OPERATE.value.OPERATE_NAME = CONFIG_MOLECULE.OPERATE_NAME.ATOM;
          CHEM_SETTING.OPERATE.value.OPERATE_VALUE = 1004;
          CHEM_SETTING.OPERATE.value.OPERATE_SYMBOL = 1004;
          CHEM_SETTING.UI.TOOLBAR.value.SELECTED = 201;
        }
      },
      {
        "id": 202, "code": "C", "name": "碳 元素", text: true, "click": () => {
          CHEM_SETTING.OPERATE.value.OPERATE_NAME = CONFIG_MOLECULE.OPERATE_NAME.ATOM;
          CHEM_SETTING.OPERATE.value.OPERATE_VALUE = 6;
          CHEM_SETTING.OPERATE.value.OPERATE_SYMBOL = 6;
          CHEM_SETTING.UI.TOOLBAR.value.SELECTED = 202;
        }
      },
      {
        "id": 203, "code": "H", "name": "氢 元素", text: true, "click": () => {
          CHEM_SETTING.OPERATE.value.OPERATE_NAME = CONFIG_MOLECULE.OPERATE_NAME.ATOM;
          CHEM_SETTING.OPERATE.value.OPERATE_VALUE = 1;
          CHEM_SETTING.OPERATE.value.OPERATE_SYMBOL = 1;
          CHEM_SETTING.UI.TOOLBAR.value.SELECTED = 203;
        }
      },
      {
        "id": 204, "code": "O", "name": "氧 元素", text: true, "click": () => {
          CHEM_SETTING.OPERATE.value.OPERATE_NAME = CONFIG_MOLECULE.OPERATE_NAME.ATOM;
          CHEM_SETTING.OPERATE.value.OPERATE_VALUE = 8;
          CHEM_SETTING.OPERATE.value.OPERATE_SYMBOL = 8;
          CHEM_SETTING.UI.TOOLBAR.value.SELECTED = 204;
        }
      },
      {
        "id": 205, "code": "N", "name": "氮 元素", text: true, "click": () => {
          CHEM_SETTING.OPERATE.value.OPERATE_NAME = CONFIG_MOLECULE.OPERATE_NAME.ATOM;
          CHEM_SETTING.OPERATE.value.OPERATE_VALUE = 7;
          CHEM_SETTING.OPERATE.value.OPERATE_SYMBOL = 7;
          CHEM_SETTING.UI.TOOLBAR.value.SELECTED = 205;
        }
      },
      {
        "id": 206, "code": "S", "name": "溜 元素", text: true, "click": () => {
          CHEM_SETTING.OPERATE.value.OPERATE_NAME = CONFIG_MOLECULE.OPERATE_NAME.ATOM;
          CHEM_SETTING.OPERATE.value.OPERATE_VALUE = 16;
          CHEM_SETTING.OPERATE.value.OPERATE_SYMBOL = 16;
          CHEM_SETTING.UI.TOOLBAR.value.SELECTED = 206;
        }
      },
      {
        "id": 211, "code": "Mg", "name": "镁 元素", text: true, "click": () => {
          CHEM_SETTING.OPERATE.value.OPERATE_NAME = CONFIG_MOLECULE.OPERATE_NAME.ATOM;
          CHEM_SETTING.OPERATE.value.OPERATE_VALUE = 12;
          CHEM_SETTING.OPERATE.value.OPERATE_SYMBOL = 12;
          CHEM_SETTING.UI.TOOLBAR.value.SELECTED = 211;
        }
      },
      {
        "id": 212, "code": "In", "name": "铟 元素", text: true, "click": () => {
          CHEM_SETTING.OPERATE.value.OPERATE_NAME = CONFIG_MOLECULE.OPERATE_NAME.ATOM;
          CHEM_SETTING.OPERATE.value.OPERATE_VALUE = 49;
          CHEM_SETTING.OPERATE.value.OPERATE_SYMBOL = 49;
          CHEM_SETTING.UI.TOOLBAR.value.SELECTED = 212;
        }
      },
      {
        "id": 207, "code": "P", "name": "磷 元素", text: true, "click": () => {
          CHEM_SETTING.OPERATE.value.OPERATE_NAME = CONFIG_MOLECULE.OPERATE_NAME.ATOM;
          CHEM_SETTING.OPERATE.value.OPERATE_VALUE = 15;
          CHEM_SETTING.OPERATE.value.OPERATE_SYMBOL = 15;
          CHEM_SETTING.UI.TOOLBAR.value.SELECTED = 207;
        }
      }
    ]
  }];

</script>

<template>
  <div class="_0chem_toolbar">
    <template v-for="tools in toolbars">
      <div v-for="item in tools.data" :title="item.name" @click="item.click" :class="['_0chem_toolbar_icon',item.id===CHEM_SETTING.UI.TOOLBAR.value.SELECTED?'_0chem_toolbar_selected':'',item.text?'_0chem_toolbar_text':'']">
        {{ item.code }}
      </div>
    </template>
  </div>
</template>

<style>
@import "../assets/0chem-style.css";
</style>