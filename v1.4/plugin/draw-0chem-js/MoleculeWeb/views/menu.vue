<!--
Author: 史岩
Author URL: http://www.0chem.com
Date: 2024.8.7
-->
<script setup>
import {CHEM_SETTING, LANG} from "../../config.js";
import {finishMolecule, getMoleculeData, setMoleculeIndex} from "../../MoleculeEdit/cache.js";
import {Draw_Molecule} from "../../MoleculeDraw/DrawMolecule.js";
import {writeMolStream} from "../../MoleculeStream/ctfile.js"

//region
const chem_menu = [
  // {
  //   "icon": "chem_icon_info", "code": "\ue652", "name": "识别", "click": () => {
  //   }
  // },
  // {
  //   "icon": "chem_icon_info", "code": "\ue63e", "name": "扫码", "click": () => {
  //   }
  // },
  {
    "icon": "chem_icon_new", "code": "\ue640", "name": LANG.UI.MENU.MENU_NEW, "click": () => {
      if (finishMolecule(1)) {
        Draw_Molecule(getMoleculeData());
      }
    }
  },
  {
    "icon": "chem_icon_open", "code": "\ue64d", "name": LANG.UI.MENU.MENU_OPEN, "click": () => {
      CHEM_SETTING.UI.DIALOG.value.TITLE = LANG.UI.MENU.MENU_OPEN;
      CHEM_SETTING.UI.DIALOG.value.INDEX = 3;
      CHEM_SETTING.UI.DIALOG.value.SHOW = true;
    }
  },
  {
    "icon": "chem_icon_save", "code": "\ue612", "name": LANG.UI.MENU.MENU_SAVE, "click": () => {
      if (!isDisable("chem_icon_save")) return;
      CHEM_SETTING.UI.DIALOG.value.TITLE = LANG.UI.MENU.MENU_SAVE;
      CHEM_SETTING.UI.DIALOG.value.INDEX = 4;
      CHEM_SETTING.UI.DIALOG.value.SHOW = true;
      CHEM_SETTING.UI.MOLECULE.value.SAVE_TEXT = writeMolStream(getMoleculeData());
    }
  },
  {
    "icon": "chem_icon_undo", "code": "\ue617", "name": LANG.UI.MENU.MENU_UNDO, "click": () => {
      if (!isDisable("chem_icon_undo")) return;
      setMoleculeIndex(1);
      Draw_Molecule(getMoleculeData());
      console.log("========= Undo");
    }
  },
  {
    "icon": "chem_icon_redo", "code": "\ue611", "name": LANG.UI.MENU.MENU_REDO, "click": () => {
      if (!isDisable("chem_icon_redo")) return;
      setMoleculeIndex(-1);
      Draw_Molecule(getMoleculeData());
      console.log("========= Redo");
    }
  },
  // {
  //   "icon": "chem_icon_info", "code": "\ue606", "name": "信息", "click": () => {
  //   }
  // },
  // {
  //   "icon": "chem_icon_info", "code": "\ue66f", "name": "同步", "click": () => {
  //
  //   }
  // },
  // {
  //   "icon": "chem_icon_info", "code": "\ue655", "name": "粘图", "click": () => {
  //   }
  // },
  // {
  //   "icon": "chem_icon_info", "code": "\ue6d1", "name": "导图", "click": () => {
  //   }
  // },
  // {
  //   "icon": "chem_icon_info", "code": "\ue651", "name": "触屏", "click": () => {
  //   }
  // },
  // {
  //   "icon": "chem_icon_info", "code": "\ue65d", "name": "鼠标", "click": () => {
  //   }
  // },
  // {
  //   "icon": "chem_icon_search", "code": "\ue600", "name": "搜索", "click": () => {
  //   }
  // },
  {
    "icon": "chem_icon_page", "code": "\ue6cc", "name": LANG.UI.MENU.MENU_FULL_PAGE, "click": () => {
    }
  },
  // {
  //   "icon": "chem_icon_usually", "code": "\ue62b", "name": "恢复", "click": () => {
  //   }
  // },
  {
    "icon": "chem_icon_fullscreen", "code": "\ue62c", "name": LANG.UI.MENU.MENU_FULL_SCREEN, "click": () => {
    }
  },
  {
    "icon": "chem_icon_setting", "code": "\ue602", "name": "恢复", "click": () => {
    }
  },
  {
    "icon": "chem_icon_setting", "code": "\ue615", "name": LANG.UI.MENU.MENU_SETTING, "click": () => {
      CHEM_SETTING.UI.DIALOG.value.TITLE = LANG.UI.MENU.MENU_SETTING;
      CHEM_SETTING.UI.DIALOG.value.INDEX = 99;
      CHEM_SETTING.UI.DIALOG.value.SHOW = true;
    }
  }
];

//endregion

function isDisable(id) {
  for (let item of CHEM_SETTING.UI.MENU.value.DISABLE) {
    if (item.id === id) {
      return item.value;
    }
  }
  return true;
}
</script>

<template>
  <div class="_0chem_menu">
    <template v-for="item in chem_menu">
      <template v-if="isDisable(item.icon)">
        <div class="_0chem_menu_button" @click="item.click(this)">
          <div class="_0chem_menu_icon">{{ item.code }}</div>
          <div class="_0chem_menu_text">{{ item.name }}</div>
        </div>
      </template>
      <template v-else>
        <div class="_0chem_menu_disable">
          <div class="_0chem_menu_icon">{{ item.code }}</div>
          <div class="_0chem_menu_text">{{ item.name }}</div>
        </div>
      </template>
    </template>
  </div>
</template>

<style>
@import "../assets/0chem-style.css";
</style>