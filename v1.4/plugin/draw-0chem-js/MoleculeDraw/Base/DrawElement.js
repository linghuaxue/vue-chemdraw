/*
Author: 史岩
Author URL: http://www.0chem.com
Date: 2022.8.17
*/

import {CONFIG_MOLECULE, CHEM_SETTING} from "../../config";

//region
export function ElementGroup() {
    let element = document.createElementNS("http://www.w3.org/2000/svg", "g");
    element.style.pointerEvents = "none";
    return element;
}

//endregion

//region
export function ElementText(text, x, y, color, fontSize, fontFamily = DRAW_CONST.FONT_FAMILY) {
    let element = document.createElementNS("http://www.w3.org/2000/svg", "text");
    element.style.pointerEvents = "none";
    element.style.dominantBaseline = "central";
    element.style.textAnchor = "start";
    element.style.fontFamily = fontFamily;
    element.style.fontSize = fontSize;
    element.setAttribute("name", name);
    element.innerHTML = text;
    element.setAttribute("x", x);
    element.setAttribute("y", y);
    element.style.fill = color;
    return element;
}

export function ElementCircle(x, y, radius = 1, fill = CHEM_SETTING.DRAW.value.COLOR_AUXILIARY_LINE) {
    let element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    element.style.pointerEvents = "none";
    element.setAttribute("r", radius.toString());
    element.setAttribute("cx", x.toString());
    element.setAttribute("cy", y.toString());
    element.style.fill = fill;
    return element;
}

export function ElementLine(position, strokeWidth, strokeColor) {
    if (isNaN(position.x1) || isNaN(position.x2)) {
        debugger;
    }
    let element = document.createElementNS("http://www.w3.org/2000/svg", "line");
    element.style.pointerEvents = 'none';
    element.setAttribute("x1", position.x1);
    element.setAttribute("y1", position.y1);
    element.setAttribute("x2", position.x2);
    element.setAttribute("y2", position.y2);
    element.style.stroke = strokeColor;
    element.style.strokeWidth = strokeWidth;
    return element;
}

//endregion