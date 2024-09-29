<template>
  <svg id="chem-molecule-svg" xmlns="http://www.w3.org/2000/svg" version="1.1" ref="elementUI" :style="{fontFamily:fontFamily}" @mousedown="touchDown" @mousemove="touchMove" @mouseup="touchUp" @mouseenter="touchEnter">
    <g id="chem-background-add"></g>
    <g id="chem-background-bond"></g>
    <g id="chem-background-atom"></g>
    <g id="chem-layout-molecule"></g>
    <g id="chem-layout-add"></g>
  </svg>
</template>

<script>
import {CONFIG_MOLECULE} from "../../config";
import {initCache} from "../../MoleculeEdit/cache";
import {Draw_init} from "../../MoleculeDraw/DrawMolecule";
import {touchMove, touchDown, touchUp, touchEnter, elementEnter, elementOut, elementMove, touchAtom, touchBond} from "../ui/touch";

export default {
  name: "0chem-svg",
  props: ["operateName", "operateValue", "operateArg", "operateSymbol"],
  data() {
    return {fontFamily: CONFIG_MOLECULE.DRAW_CONST.FONT_FAMILY};
  },
  mounted() {
    initCache(this.$refs["elementUI"].clientWidth, this.$refs["elementUI"].clientHeight);
    Draw_init(this);
    // console.log("mounted");
  },
  methods: {
    getSvgRect() {
      return {width: this.$refs["elementUI"].clientWidth, height: this.$refs["elementUI"].clientHeight};
    },
    touchMove, touchDown, touchUp, touchEnter, touchSelect: elementEnter, touchCancel: elementOut, touchAtom, touchBond, touchSelectMove: elementMove
  }
}
</script>

<style lang="scss" scoped>

</style>
