/*
Author: 史岩
Author URL: http://www.0chem.com
Date: 2022.2.21
*/

import {CONFIG_MOLECULE} from "../../config";
import {getElementById, getChargeString} from "../Base/symbol";
import {getTextWidth} from "../Base/dimens";
import {DrawGroup} from "../Base/DrawSvg";
import {ElementText, ElementCircle, ElementGroup} from "../Base/DrawElement";
import {nameChemType} from "./DrawBase";

//region 内部函数
function DrawEventPoint(id, layout, x, y, radius, color, mouseEnter, mouseOut, mouseMove, mouseDown, selected, name) {
    let element = document.getElementById(name + id);
    if (!element) {
        element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        element.id = name + id;
        element.setAttribute(nameChemType, CONFIG_MOLECULE.DRAW_LAYOUT.TYPE_ATOM);
        element.onmouseenter = mouseEnter;
        element.onmouseout = mouseOut;
        element.onmousedown = mouseDown;
        element.onmousemove = mouseMove;
        layout.appendChild(element);
    }
    element.setAttribute(CONFIG_MOLECULE.DRAW_LAYOUT.ELEMENT_ATOM_ID, id);
    element.setAttribute("cx", x.toString());
    element.setAttribute("cy", y.toString());
    element.setAttribute("r", radius);
    // element.setAttribute(nameSelected, selected);
    element.style.fill = color;
    return element;
}//endregion

const DrawAtomBackground = (layout, atom, scale, mouseEnter, mouseOut, mouseMove, atomClick, name) => {
    let background = CONFIG_MOLECULE.DRAW_ATOM.backgroundColor;
    DrawEventPoint(atom.id, layout, atom.position.x, atom.position.y, CONFIG_MOLECULE.DRAW_ATOM.radius, background, mouseEnter, mouseOut, mouseMove, atomClick, atom.getSelected(), name);
}

const DrawAtom = (layout, atom, scale, showId, name, title = null) => {
    let elementGroup = ElementGroup();
    if (elementGroup.hasChildNodes()) {
        return;
    }
    let symbol = getElementById(atom.elementId);
    let symbolHalfWidth = getTextWidth(symbol.symbol, CONFIG_MOLECULE.DRAW_ATOM.fontSize, CONFIG_MOLECULE.DRAW_CONST.FONT_FAMILY) / 2 - 1;
    if (title !== null || atom.isLabelShow() > 0) {
        if (elementGroup) {
            if (title === null) {
                title = symbol.symbol;
                if (atom.title != null) {
                    title = atom.title;
                    title = title.replace(/\d+\w?/g, '<tspan style="baseline-shift: sub;font-size: 10px">$&</tspan>');
                }
            } else {
                title = title.replace(/\d+/g, '<tspan style="baseline-shift: sub;font-size: 10px">$&</tspan>');
            }
            let elementSymbol = ElementText(title, atom.position.x - symbolHalfWidth, atom.position.y, symbol.colorFont, CONFIG_MOLECULE.DRAW_ATOM.fontSize, CONFIG_MOLECULE.DRAW_CONST.FONT_FAMILY);
            elementGroup.appendChild(elementSymbol);
        }
        /// 显示同位素
        if (elementGroup && atom.mass > 0) {
            let t = atom.mass.toString();
            let width = getTextWidth(t);
            console.log(width);
        }
        /// 显示电荷
        let charge = getChargeString(atom.charge);
        if (elementGroup && charge.length > 0) {
            let htmlCharge = ElementText(charge, atom.position.x + symbolHalfWidth, atom.position.y - CONFIG_MOLECULE.DRAW_ATOM.fontSize / 2, CONFIG_MOLECULE.DRAW_ATOM.chargeFontColor, CONFIG_MOLECULE.DRAW_ATOM.chargeFontSize, CONFIG_MOLECULE.DRAW_CONST.FONT_FAMILY);
            elementGroup.appendChild(htmlCharge);
        }
        // let p = ElementCircle(atom.position.x, atom.position.y);
        // elementGroup.appendChild(p);
    }
    /// 显示序号
    if (elementGroup && showId === true) {
        let t = atom.id.toString();
        let width = getTextWidth(t, CONFIG_MOLECULE.DRAW_ATOM.fontIdSize, CONFIG_MOLECULE.DRAW_CONST.FONT_FAMILY);
        width += symbolHalfWidth;
        let element = ElementText(t, atom.position.x - width, atom.position.y - CONFIG_MOLECULE.DRAW_ATOM.fontSize / 3, CONFIG_MOLECULE.DRAW_ATOM.fontIdColor, CONFIG_MOLECULE.DRAW_ATOM.fontIdSize, CONFIG_MOLECULE.DRAW_CONST.FONT_FAMILY);
        elementGroup.appendChild(element);
    }
    if (elementGroup.childNodes.length > 0) layout.appendChild(elementGroup);
}

//region 删除
const RemoveAtomDraw = (id, name) => {
    let element = document.getElementById(name + id);
    if (element != null) element.remove();
}

const RemoveAtomBackground = (id, name) => {
    let element = document.getElementById(name + id);
    if (element != null) element.remove();
}
//endregion

export {
    DrawAtom, DrawAtomBackground,
    RemoveAtomDraw, RemoveAtomBackground
};