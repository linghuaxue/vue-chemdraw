# vue 化学分子绘图

### 简介

这是一个基于 vue3 开发的化学分子绘图组件，可以你直接实现化学分子绘图的功能。

本插件完整自主开发，只需要 vue3 基础框架就可以使用，让您可以轻松放心使用。

[0chem.com](https://0chem.com) 是插件的官方网站。

### 使用说明

1、本程序基于vuejs开发，无需其他插件即可使用。

2、本程序纯CSS显示效果，不包含任何图片，支持离线使用。

3、本程序默认字体是思源黑体，备用为系统的"微软雅黑"

4、本程序中的元素周期表的元素，使用的字体是程序内部字体，基于思源字体制作的独立编码。

5、本程序是开源分子绘图软件，您可以放心使用

6、欢迎来访问 [0chem.com](https://0chem.com) ，进群一起研发

### 使用方法

#### 1. 安装

```sh
npm create vite@latest
>> vue
>> javascript
```

```sh
npm install vue-chemdraw
```

#### 2. 引用
在 main.js 文件中修改如下：
```angular2html
import {createApp} from 'vue'
import App from './App.vue'
import chemDraw from "vue-chemdraw";

const app = createApp(App);
app.use(chemDraw);
app.mount('#app')
```

在 使用页面中直接使用即可
```angular2html
<draw-0chem class="chemDraw" />
```
需要说明的是 插件默认大小为 width:100%, height:100%，

所以建议自定义一下插件的大小，避免高宽为0，而无法显示。例如：

```angular2html
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
```
### 发布

2024年9月12日 v1.4.6 测试版
