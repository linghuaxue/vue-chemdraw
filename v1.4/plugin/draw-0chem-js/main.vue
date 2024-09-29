<!--
Author: 史岩
Author URL: http://www.0chem.com
Date: 2024.8.5
-->
<script setup name="chemDraw">
import {onMounted, ref} from "vue";
import {pasteText, copyText} from "./MoleculeWeb/common/clipboard.js";
import {CHEM_SETTING, CHEM_CONFIG, LANG} from "./config.js";
import chemDialog from "./MoleculeWeb/ui/diaglog.vue";
import chemMessage from "./MoleculeWeb/ui/message.vue";
import chemMenu from "./MoleculeWeb/views/menu.vue";
import chemToolbar from "./MoleculeWeb/views/toolbar.vue";
import chemStatusbar from "./MoleculeWeb/views/statusbar.vue";
import chemSvg from "./MoleculeWeb/views/svg.vue";
import {theme} from "./MoleculeWeb/common/theme.js";
import {readMolStream} from "./MoleculeStream/ctfile.js";
import {finishMolecule} from "./MoleculeEdit/cache.js";
import {Draw_Molecule} from "./MoleculeDraw/DrawMolecule.js";

CHEM_SETTING.UI.DIALOG.value.TITLE = LANG.MESSAGE.INIT_TITLE;

const formData = {
  canvas: ref(),
  message: ref(),
  openText: ref(), openState: ref(), file: ref(),
}

function openFile() {
  formData.file.value.dispatchEvent(new MouseEvent('click'));
}

function openFileStream() {
  if (formData.file.value.files && formData.file.value.files.length > 0) {
    if (formData.file.value.files[0].size > 1024 * 1024 * 4) {
      formData.message.value.MessageAdd("文件过大！", CHEM_CONFIG.MESSAGE.ICON_ERROR);
      formData.openState.value = formData.file.value.files[0].name + " 文件过大！";
      return;
    }
    let reader = new FileReader();
    reader.readAsText(formData.file.value.files[0], "UTF-8");
    reader.onload = function (e) {
      let content = e.target.result;
      formData.openText.value = content;
      let rect = formData.canvas.value.getSvgRect();
      console.log(rect);
      let stream = readMolStream(content, rect.width, rect.height);
      console.log(stream);
      if (stream.code > 90) {
        finishMolecule(99, stream.molecule);
        Draw_Molecule(stream.molecule);
      }
    }
  }
}

function openPaste() {
  pasteText((code, value) => {
    if (code > 0) {
      formData.openText.value = value;
      formData.message.value.MessageAdd(value, CHEM_CONFIG.MESSAGE.ICON_SUCCESS);
    } else {
      formData.message.value.MessageAdd(value, CHEM_CONFIG.MESSAGE.ICON_ERROR);
    }
  })
}

function saveFile() {
  let element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(CHEM_SETTING.UI.MOLECULE.value.SAVE_TEXT));
  element.setAttribute('download', "download.mol");
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function saveCopy() {
  copyText(CHEM_SETTING.UI.MOLECULE.value.SAVE_TEXT, (code, value) => {
    if (code > 0) {
      formData.message.value.MessageAdd(value, CHEM_CONFIG.MESSAGE.ICON_WARN);
    } else {
      formData.message.value.MessageAdd(value, CHEM_CONFIG.MESSAGE.ICON_ERROR);
    }
  });
}

onMounted(() => {
  console.log("============================================= loaded");
});
</script>

<template>
  <div class="_0chem_container {{CHEM_SETTING.UI.STATE.value.FULL_PAGE?'':''}}" id="chem_main">
    <chemSvg class="_0chem_canvas" :ref="formData.canvas"/>
    <chemMenu/>
    <chemToolbar/>
    <chemStatusbar/>
    <div class="_0chem_statusbar_tip">工具打水</div>
    <!--  对话框部分  -->
    <chemDialog>
      <input id="_0chem_file" type="file" accept=".mol,.sdf,.txt" :ref="formData.file" @change="openFileStream" class="_0chem-hide"/>
      <div v-if="CHEM_SETTING.UI.DIALOG.value.INDEX===0">
        开发中...，敬请期待
      </div>
      <div v-else-if="CHEM_SETTING.UI.DIALOG.value.INDEX===1">
        <div v-for="item of LANG.MESSAGE.INIT_MSG" v-html="item"></div>
      </div>
      <div v-else-if="CHEM_SETTING.UI.DIALOG.value.INDEX===2">
        <dl>
          <dt></dt>
          <dd><label><input class="_0chem-switch _0chem-switch-animbg" type="checkbox">默认未选中</label></dd>
        </dl>
      </div>
      <div v-else-if="CHEM_SETTING.UI.DIALOG.value.INDEX===3">
        <div><a href="javascript:void(0)" class="_0chem-link-button" @click="openFile">打开</a><a href="javascript:void(0)" class="_0chem-link-button" @click="openPaste">粘贴</a></div>
        <div class="_0chem-base-title">请输入molfile格式数据：</div>
        <textarea rows="15" class="_0chem-textbox">{{ formData.openText }}</textarea>
        <div v-if="formData.openState">状态：{{ formData.openState }}</div>
      </div>
      <div v-else-if="CHEM_SETTING.UI.DIALOG.value.INDEX===4">
        <div><a href="javascript:void(0)" class="_0chem-link-button" @click="saveFile">下载</a><a href="javascript:void(0)" class="_0chem-link-button" @click="saveCopy">拷贝</a></div>
        <div class="_0chem-base-title">当前分子：</div>
        <textarea rows="20" class="_0chem-textbox">{{ CHEM_SETTING.UI.MOLECULE.SAVE_TEXT }}</textarea>
      </div>
      <div v-else-if="CHEM_SETTING.UI.DIALOG.value.INDEX===99">
        <dl>
          <dt>切换主题</dt>
          <dd><label><input class="_0chem-switch _0chem-switch-animbg" type="checkbox" @click="theme"></label></dd>
        </dl>
        <dl>
          <dt>显示原子序号</dt>
          <dd><label><input class="_0chem-switch _0chem-switch-animbg" type="checkbox" v-model="CHEM_SETTING.DRAW.value.SHOW_NUMBER_ATOM"></label></dd>
        </dl>
        <dl>
          <dt>显示键序号</dt>
          <dd><label><input class="_0chem-switch _0chem-switch-animbg" type="checkbox" v-model="CHEM_SETTING.DRAW.value.SHOW_NUMBER_BOND"></label></dd>
        </dl>
        <dl>
          <dt>使用原子颜色</dt>
          <dd><label><input class="_0chem-switch _0chem-switch-animbg" type="checkbox" v-model="CHEM_SETTING.DRAW.value.SHOW_SYMBOL_COLOR"></label></dd>
        </dl>
      </div>
    </chemDialog>
    <chemMessage :ref="formData.message"/>
  </div>
</template>

<style>
@import "./MoleculeWeb/assets/0chem-font.css";
@import "./MoleculeWeb/assets/0chem-style.css";

._0chem-textbox {
  width: 600px;
  line-height: 1.2em;
}

._0chem-base-title {
  height: 30px;
  line-height: 30px;
}
</style>