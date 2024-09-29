<template>
  <svg id="chem-molecule-svg" xmlns="http://www.w3.org/2000/svg" class="chem_draw" ref="chemDraw"></svg>
  <text class="title">{{ title }}</text>
</template>

<script>
import {DrawMolecule} from "./MoleculeDraw/DrawMolecule";
import {readMolStream} from "./MoleculeStream/ctfile";
import {ref} from "vue";

export default {
  name: "v-chemDraw",
  props: ["name", "value", "data"],
  data() {
    return {title: ''};
  },
  created() {
    this.$watch(
        () => this.$props.data,
        (toParams, previousParams) => {
          // 对路由变化做出响应...
          this.setData(this.$props.name, this.$props.data);
        }
    );
  },
  mounted() {
    // console.log(this.$props.data);
    if (this.$props.data) {
      this.setData(this.$props.name, this.$props.data);
    }
  },
  methods: {
    setData(name, data) {
      let layout = this.$refs.chemDraw;
      layout.innerHTML = '';
      let stream = readMolStream(data);
      this.$data.title = stream.title;
      if (stream.finish) {
        DrawMolecule(stream.molecule, layout, 1, "chem-molecule-" + name);
      }
    }
  }
}
</script>

<style scoped>
.title {
  position: absolute;
  top: 5px;
  right: 5px;
}

.chem_draw {
  margin: 0;
  padding: 0;
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #44CA78;
}
</style>