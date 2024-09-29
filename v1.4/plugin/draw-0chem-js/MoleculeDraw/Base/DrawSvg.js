/*
Author: 史岩
Author URL: http://www.0chem.com
Date: 2022.8.17
*/

//region 基本常用
import {CONFIG_MOLECULE} from "../../config";

const DrawText = (id, layout, text, x, y, fontSize, fontFamily = CONFIG_MOLECULE.DRAW_CONST.FONT_FAMILY) => {
    let element = null;
    if (id != null) element = document.getElementById(id);
    if (!element) {
        element = document.createElementNS("http://www.w3.org/2000/svg", "text");
        element.id = id;
        layout.appendChild(element);
    }
    element.setAttribute("x", x.toString());
    element.setAttribute("y", y.toString());
    element.setAttribute("font-size", fontSize.toString());
    element.style.fontFamily = fontFamily;
    element.innerHTML = text;
    return element;
}
//endregion

//region 绘制分子
const DrawGroup = (id, layout) => {
    let element = document.getElementById(id);
    if (element) {
        element.remove();
    }
    element = document.createElementNS("http://www.w3.org/2000/svg", "g");
    if (id !== null) element.id = id;
    element.style.pointerEvents = "none";
    layout.appendChild(element);
    return element;
}
//endregion

export {
    DrawText, DrawGroup
}