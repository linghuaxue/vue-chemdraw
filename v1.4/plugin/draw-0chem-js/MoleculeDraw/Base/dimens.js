/*
Author: 史岩
Author URL: http://www.0chem.com
Date: 2022.2.21
*/
import {CONFIG_MOLECULE} from "../../config";

/*=============================================================
鼠标操作
=============================================================*/
const dimenCanvas = document.createElement("canvas");
const dimenContent = dimenCanvas.getContext("2d");

/*=============================================================
鼠标操作
=============================================================*/
function getTextWidth3(text, fontSize, fontFamily = CONFIG_MOLECULE.DRAW_CONST.FONT_FAMILY) {
    dimenContent.font = fontSize + " " + fontFamily;
    return dimenContent.measureText(text).width;
}

function getTextWidth2(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}

const getTextDimen = (text, fontSize, fontFamily) => {
    var span = document.createElement("span");
    var result = {"width": 0, "height": 0};
    span.style.visibility = "hidden";
    span.style.fontSize = fontSize;
    span.style.display = "inline-block";
    document.body.appendChild(span);
    if (typeof span.textContent != "undefined") {
        span.textContent = text;
    } else {
        span.innerText = text;
    }
    result.width = parseFloat(window.getComputedStyle(span).width) - span.offsetWidth;
    result.height = parseFloat(window.getComputedStyle(span).height) - span.offsetHeight;
    return result;
}

/*=============================================================
鼠标操作
=============================================================*/
export function getTextWidth(text, fontSize, fontFamily = CONFIG_MOLECULE.DRAW_CONST.FONT_FAMILY) {
    const dom = document.createElement('span');
    dom.style.display = 'inline-block';
    dom.style.fontFamily = fontFamily;
    dom.style.fontSize = fontSize;
    dom.textContent = text;
    document.body.appendChild(dom);
    const width = dom.clientWidth;
    document.body.removeChild(dom);
    return width;
}
