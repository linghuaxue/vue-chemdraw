/*=============================================================

=============================================================*/
import {CONFIG_MOLECULE, CHEM_SETTING} from "../../config";
import {finishMolecule, getChild, getMoleculeData, getMoleculeDuplicate, setChild} from "../cache";
import Vector from "../../Molecule/Base/Vector";
import {Draw_Molecule,} from "../../MoleculeDraw/DrawMolecule";
import {getTextWidth} from "../../MoleculeDraw/Base/dimens";
import MoleculeSelect from "../MoleculeSelect";
import {MoleculeIdentify} from "../../MoleculeDraw/Identify/MoleculeIdentify";

/*=============================================================

=============================================================*/
const operateSvg = {
    "line": {id: "chem-operate-line"},
    "bottom": {id: "chem-operate-bottom", name: "bottom", icon: "icon", v: "M25,0A25,25,0,1,0,50,25,25,25,0,0,0,25,0Zm0,40.94-21.13-19H18V15.06H32v6.87H46.13Z"},
    "top": {id: "chem-operate-top", name: "top", icon: "icon", v: "M25,0A25,25,0,1,0,50,25,25,25,0,0,0,25,0Zm7,30.07v6.87H18V30.07H3.87L25,11.06l21.13,19Z"},
    "right": {id: "chem-operate-right", name: "right", icon: "icon", v: "M25,0A25,25,0,1,0,50,25,25,25,0,0,0,25,0ZM20.93,46.13V32H14.06V18h6.87V3.87L39.94,25Z"},
    "left": {id: "chem-operate-left", name: "left", icon: "icon", v: "M25,0A25,25,0,1,0,50,25,25,25,0,0,0,25,0Zm9.94,32H28.07V46.13L9.06,25l19-21.13V18h6.87Z"},
    "move": {id: "chem-operate-move", name: "move", icon: "icon", v: "M25,0C11.19,0,0,11.19,0,25s11.19,25,25,25s25-11.19,25-25S38.81,0,25,0z M35,33.5v-6h-7.5V35h6.25L25,45 l-8.75-10h6.25v-7.5H15v6.25L5,25l10-8.88v6.25h7.5V15h-6.25L25,5l8.75,10H27.5v7.38H35v-6.25L45,25L35,33.5z"},
    "revolve": {id: "chem-operate-revolve", name: "revolve", icon: "icon", v: "M25,0A25,25,0,1,0,50,25,25,25,0,0,0,25,0ZM44.14,26.86a1.67,1.67,0,0,1-1.67-1.67V22.85a17.85,17.85,0,0,0-1.25-4.7,17.6,17.6,0,1,0-7.65,22.23,17.73,17.73,0,0,0,6.26-5.88,1.6,1.6,0,1,1,2.7,1.73,20.83,20.83,0,1,1-2.81-25.95,21.21,21.21,0,0,1,2.75,3.4V11.8a1.68,1.68,0,0,1,3.35,0V25.19A1.68,1.68,0,0,1,44.14,26.86Z"}
};

const blank = CONFIG_MOLECULE.DRAW_ATOM.FONT_RADIUS2 + 30;

function drawSvg(layout, id, x, y, width = 50, height = 50) {
    let element = document.getElementById(id);
    if (!element) {
        element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        element.id = id;
        layout.appendChild(element);
    }
    element.setAttribute("x", (x - 25));
    element.setAttribute("y", (y - 25));
    element.setAttribute("width", width);
    element.setAttribute("height", height);
    return element;
}

function drawCircle(id, layout, x, y, radius = 3, fill = CHEM_SETTING.DRAW.value.COLOR_AUXILIARY_LINE) {
    let element = null;
    if (id != null) element = document.getElementById(id);
    if (!element) {
        element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        if (id != null) element.id = id;
        element.style.pointerEvents = "none";
        element.setAttribute("r", radius.toString());
        layout.appendChild(element);
    }
    element.setAttribute("cx", x.toString());
    element.setAttribute("cy", y.toString());
    element.style.fill = fill;
    return element;
}

function drawEvent(name, layout, mouseDown = null, x = 25, y = 25, radius = 25) {
    let element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    layout.appendChild(element);
    element.setAttribute("name", name);
    element.setAttribute("cx", x.toString());
    element.setAttribute("cy", y.toString());
    element.setAttribute("r", radius.toString());
    element.style.fill = CONFIG_MOLECULE.DRAW_CONST.BACKGROUND_TRANSPARENT;
    element.onmouseenter = MouseEnter;
    element.onmouseout = MouseOut;
    if (mouseDown != null) element.onmousedown = mouseDown;
    return element;
}

function drawPath(id, layout, v, fill = null, strokeWidth = 0, strokeColor = null, strokeDasharray = null, fillOpacity = null) {
    let element = null;
    if (id != null) element = document.getElementById(id);
    if (!element) {
        element = document.createElementNS("http://www.w3.org/2000/svg", "path");
        if (id != null) element.id = id;
        element.style.pointerEvents = "none";
        element.style.fill = CONFIG_MOLECULE.DRAW_CONST.BACKGROUND_TRANSPARENT;
        if (strokeDasharray != null) element.setAttribute("stroke-dasharray", strokeDasharray);
        if (fillOpacity != null) element.style.fillOpacity = fillOpacity;
        layout.appendChild(element);
    }
    if (fill != null) element.style.fill = fill;
    if (strokeWidth > 0) element.style.strokeWidth = strokeWidth;
    if (strokeColor != null) element.style.stroke = strokeColor;
    element.setAttribute("d", v);
    return element;
}

function drawText(id, layout, text, x, y, fontSize, fill = "white", fontFamily = CONFIG_MOLECULE.DRAW_CONST.FONT_FAMILY) {
    let element = null;
    if (id != null) element = document.getElementById(id);
    if (!element) {
        element = document.createElementNS("http://www.w3.org/2000/svg", "text");
        if (id != null) element.id = id;
        element.setAttribute("font-size", fontSize.toString());
        element.style.fontFamily = fontFamily;
        element.style.fill = fill;
        layout.appendChild(element);
    }
    element.setAttribute("x", x.toString());
    element.setAttribute("y", y.toString());
    element.innerHTML = text;
    return element;
}

function drawButton(layout, id, x, y, path, color, name = null, mouseDown = null) {
    let element = drawSvg(layout, id, x, y);
    element.innerHTML = "";
    drawPath(null, element, path, color);
    if (name != null)
        drawEvent(name, element, mouseDown);
}

function MouseEnter(e) {
    e.stopPropagation();
    e.target.parentNode.childNodes[0].style.fill = CONFIG_MOLECULE.DRAW_ATOM.backgroundEnterColor;
}

function MouseOut(e) {
    e.stopPropagation();
    e.target.parentNode.childNodes[0].style.fill = CHEM_SETTING.DRAW.value.COLOR_OPERATE;
}

/*=============================================================

=============================================================*/
function getBox(buttonSelect, rect, mouse, atom) {
    let v, position = atom.position;
    switch (buttonSelect) {
        case operateSvg.move.name:
            let x1 = mouse.x - blank - rect.right, y1 = mouse.y - blank - rect.bottom;
            return Vector.Create(position.x + x1, position.y + y1, position.z);
        case operateSvg.left.name:
            v = (mouse.x + blank - rect.right) / (rect.left - rect.right);
            return Vector.Create(rect.right + (position.x - rect.right) * v, position.y, position.z);
        case operateSvg.right.name:
            v = (mouse.x - blank - rect.left) / (rect.right - rect.left);
            return Vector.Create(rect.left + (position.x - rect.left) * v, position.y, position.z);
        case operateSvg.top.name:
            v = (mouse.y + blank - rect.bottom) / (rect.top - rect.bottom);
            return Vector.Create(position.x, rect.bottom + (position.y - rect.bottom) * v, position.z);
        case operateSvg.bottom.name:
            v = (mouse.y - blank - rect.top) / (rect.bottom - rect.top);
            return Vector.Create(position.x, rect.top + (position.y - rect.top) * v, position.z);
        case operateSvg.revolve.name:
            let x = (rect.left + rect.right) / 2, y = (rect.top + rect.bottom) / 2;
            let l = Math.sqrt(Math.pow(position.x - x, 2) + Math.pow(position.y - y, 2));
            let d1 = Math.atan2(mouse.y - y, mouse.x - x);
            let d2 = Math.atan2(rect.top - y, rect.right - x);
            let d = Math.atan2(position.y - y, position.x - x);
            return Vector.Create(x + Math.cos(d1 - d2 + d) * l, y + Math.sin(d1 - d2 + d) * l, position.z);
    }
    return null;
}

function drawBox(left, right, top, bottom, buttonSelect, mouse) {
    let b = CONFIG_MOLECULE.DRAW_ATOM.FONT_RADIUS2;
    left -= b;
    right += b;
    top -= b
    bottom += b;
    let layout = document.getElementById(CONFIG_MOLECULE.DRAW_LAYOUT.ADD);
    drawPath(operateSvg.line.id, layout, "M" + left + " " + top + " L" + right + " " + top + " L" + right + " " + bottom + " L" + left + " " + bottom + " L" + left + " " + top, null, 0.5, CHEM_SETTING.DRAW.value.COLOR_AUXILIARY_LINE, "6 3", 0.8);
    drawCircle(operateSvg.left.id + "-1", layout, left, top);
    drawCircle(operateSvg.left.id + "-2", layout, right, top);
    drawCircle(operateSvg.left.id + "-3", layout, left, bottom);
    drawCircle(operateSvg.left.id + "-4", layout, right, bottom);
    drawCircle(operateSvg.left.id + "-0", layout, (left + right) / 2, (top + bottom) / 2);
    switch (buttonSelect) {
        case operateSvg.move.name:
            drawButton(layout, operateSvg.move.id, mouse.x, mouse.y, operateSvg.move.v, CONFIG_MOLECULE.DRAW_ATOM.backgroundEnterColor);
            removeDraw(operateSvg.left.id);
            removeDraw(operateSvg.right.id);
            removeDraw(operateSvg.top.id);
            removeDraw(operateSvg.bottom.id);
            removeDraw(operateSvg.revolve.id);
            break;
        case operateSvg.left.name:
            // drawPath(operateSvg.line.id, layout, "M" + left + " " + top + " L" + right + " " + top + " L" + right + " " + bottom + " L" + left + " " + bottom + " v" + (-v) + " m0 -50 v" + (-v), null, 0.5, CHEM_SETTING.DRAW.value.COLOR_AUXILIARY_LINE, "6 3", 0.8);
            drawButton(layout, operateSvg.left.id, mouse.x, (top + bottom) / 2, operateSvg.left.v, CONFIG_MOLECULE.DRAW_ATOM.backgroundEnterColor);
            removeDraw(operateSvg.right.id);
            removeDraw(operateSvg.top.id);
            removeDraw(operateSvg.bottom.id);
            removeDraw(operateSvg.revolve.id);
            break;
        case operateSvg.right.name:
            // drawPath(operateSvg.line.id, layout, "M" + left + " " + top + " L" + right + " " + top + " v" + (v) + " m0 50 v" + (v) + " L" + left + " " + bottom + " L" + left + " " + top, null, 0.5, CHEM_SETTING.DRAW.value.COLOR_AUXILIARY_LINE, "6 3", 0.8);
            drawButton(layout, operateSvg.right.id, mouse.x, (top + bottom) / 2, operateSvg.right.v, CONFIG_MOLECULE.DRAW_ATOM.backgroundEnterColor);
            removeDraw(operateSvg.left.id);
            removeDraw(operateSvg.top.id);
            removeDraw(operateSvg.bottom.id);
            removeDraw(operateSvg.revolve.id);
            break;
        case operateSvg.top.name:
            // drawPath(operateSvg.line.id, layout, "M" + left + " " + top + " h" + h + " m" + 50 + " 0 h" + h + " L" + right + " " + bottom + " L" + left + " " + bottom + " L" + left + " " + top, null, 0.5, CHEM_SETTING.DRAW.value.COLOR_AUXILIARY_LINE, "6 3", 0.8);
            drawButton(layout, operateSvg.top.id, (left + right) / 2, mouse.y, operateSvg.top.v, CONFIG_MOLECULE.DRAW_ATOM.backgroundEnterColor);
            removeDraw(operateSvg.right.id);
            removeDraw(operateSvg.left.id);
            removeDraw(operateSvg.bottom.id);
            removeDraw(operateSvg.revolve.id);
            break;
        case operateSvg.bottom.name:
            // drawPath(operateSvg.line.id, layout, "M" + left + " " + top + " L" + right + " " + top + " L" + right + " " + bottom + " h" + -h + " m" + -50 + " 0 h" + -h + " L" + left + " " + top, null, 0.5, CHEM_SETTING.DRAW.value.COLOR_AUXILIARY_LINE, "6 3", 0.8);
            drawButton(layout, operateSvg.bottom.id, (left + right) / 2, mouse.y, operateSvg.bottom.v, CONFIG_MOLECULE.DRAW_ATOM.backgroundEnterColor);
            removeDraw(operateSvg.right.id);
            removeDraw(operateSvg.top.id);
            removeDraw(operateSvg.left.id);
            removeDraw(operateSvg.revolve.id);
            break;
        case operateSvg.revolve.name:
            removeDraw(operateSvg.left.id);
            removeDraw(operateSvg.right.id);
            removeDraw(operateSvg.top.id);
            removeDraw(operateSvg.bottom.id);
            break;
    }
}

function drawRevolve(x, y, x1, y1, mouse) {
    let width = x1 - x, height = y1 - y;
    let l = Math.sqrt(width * width + height * height);
    let d1 = Math.atan2(mouse.y - y, mouse.x - x);
    let degree = Math.round((d1 - Math.atan2(height, width)) * 180 / Math.PI);
    let fontSize = CONFIG_MOLECULE.DRAW_ATOM.fontSize;
    if (degree > 180) degree -= 360;
    if (degree < -180) degree += 360;
    degree = degree + "\u00b0";
    let fontWidth = getTextWidth(degree, fontSize);
    console.log(fontWidth);
    let layout = document.getElementById(CONFIG_MOLECULE.DRAW_LAYOUT.ADD);
    let e0 = drawSvg(layout, operateSvg.revolve.id, x + Math.cos(d1) * l, y + Math.sin(d1) * l);
    let text = document.getElementById(operateSvg.revolve.id + "-t");
    if (!text) {
        e0.innerHTML = "";
        drawPath(null, e0, operateSvg.revolve.v, CONFIG_MOLECULE.DRAW_ATOM.backgroundEnterColor);
        drawText(operateSvg.revolve.id + "-t", e0, degree, 29 - fontWidth / 2, 30, fontSize);
    } else {
        drawText(operateSvg.revolve.id + "-t", e0, degree, 29 - fontWidth / 2, 30, fontSize);
    }
}

/*=============================================================

=============================================================*/
function removeDraw(id) {
    let element = document.getElementById(id);
    if (element) element.remove();
}

/*=============================================================

=============================================================*/
function drawTransform(left, right, top, bottom, mouseDown, count) {
    left -= blank;
    right += blank;
    top -= blank;
    bottom += blank;
    if (left > right) {
        let t = left;
        left = right;
        right = t;
    }
    if (top > bottom) {
        let t = top;
        top = bottom;
        bottom = t;
    }
    let layout = document.getElementById(CONFIG_MOLECULE.DRAW_LAYOUT.ADD);
    drawButton(layout, operateSvg.move.id, right, bottom, operateSvg.move.v, CHEM_SETTING.DRAW.value.COLOR_OPERATE, operateSvg.move.name, mouseDown);
    if (count === 1) {
        return;
    }
    let h = (right - left) / 2 - 25, v = (bottom - top) / 2 - 25;
    drawPath(operateSvg.line.id, layout, "M" + left + " " + top + " h" + h + " m" + 50 + " 0 h" + h + " v" + v + " m 0 50 v" + v + " h" + (-h) + " m-50 0 h" + (-h) + " v" + (-v) + " m0 -50 v" + (-v), null, 0.5, CHEM_SETTING.DRAW.value.COLOR_AUXILIARY_LINE, "6 3", 0.8);
    drawButton(layout, operateSvg.top.id, (left + right) / 2, top, operateSvg.top.v, CHEM_SETTING.DRAW.value.COLOR_OPERATE, operateSvg.top.name, mouseDown);
    drawButton(layout, operateSvg.bottom.id, (left + right) / 2, bottom, operateSvg.bottom.v, CHEM_SETTING.DRAW.value.COLOR_OPERATE, operateSvg.bottom.name, mouseDown);
    drawButton(layout, operateSvg.left.id, left, (top + bottom) / 2, operateSvg.left.v, CHEM_SETTING.DRAW.value.COLOR_OPERATE, operateSvg.left.name, mouseDown);
    drawButton(layout, operateSvg.right.id, right, (top + bottom) / 2, operateSvg.right.v, CHEM_SETTING.DRAW.value.COLOR_OPERATE, operateSvg.right.name, mouseDown);
    let e0 = drawSvg(layout, operateSvg.revolve.id, right, top);
    let fontSize = CONFIG_MOLECULE.DRAW_ATOM.fontSize;
    if (e0.childNodes.length < 1) {
        drawPath(null, e0, operateSvg.revolve.v, CHEM_SETTING.DRAW.value.COLOR_OPERATE);
        drawText(null, e0, "0\u00b0", 20, 30, fontSize);
        drawEvent(operateSvg.revolve.name, e0, mouseDown);
    }
}

function getSelect() {
    let select = getChild(), molecule = getMoleculeData(), x1 = 100000, y1 = 100000, x2 = -100000, y2 = -100000, count = 0;
    for (let item of select.selectAtoms) {
        let atom = molecule.getAtomById(item);
        if (atom.position.x < x1) x1 = atom.position.x;
        if (atom.position.x > x2) x2 = atom.position.x;
        if (atom.position.y < y1) y1 = atom.position.y;
        if (atom.position.y > y2) y2 = atom.position.y;
    }
    select.rect = {left: x1, top: y1, right: x2, bottom: y2};
    return select;
}

/*=============================================================

=============================================================*/
export function Transform_Select(rect, mouseDown, count) {
    drawTransform(rect.left, rect.right, rect.top, rect.bottom, mouseDown, count);
}

export function Transform_Move(mouse, buttonSelect) {
    // console.log("====================== move");
    let select = getChild(), x1 = 100000, y1 = 100000, x2 = -100000, y2 = -100000;
    // console.log(select);
    let molecule = getMoleculeDuplicate(), source = getMoleculeData();
    if (buttonSelect === operateSvg.move.name) {
        if (select.selectAtoms.length === 1) {
            let position = Vector.Create(mouse.x - blank, mouse.y - blank, 0);
            let layout = document.getElementById(CONFIG_MOLECULE.DRAW_LAYOUT.ADD);
            molecule.getAtomById(select.selectAtoms[0]).position = position;
            Draw_Molecule(molecule);
            drawCircle(operateSvg.move.id + "-0", layout, position.x, position.y);
            setChild(2, molecule);
            return;
        }
    }
    for (let item of select.selectAtoms) {
        let atom = source.getAtomById(item);
        if (atom != null && atom.position != null) {
            let position = getBox(buttonSelect, select.rect, mouse, atom)
            molecule.getAtomById(item).position = position;
            if (position.x < x1) x1 = position.x;
            if (position.x > x2) x2 = position.x;
            if (position.y < y1) y1 = position.y;
            if (position.y > y2) y2 = position.y;
        }
    }
    Draw_Molecule(molecule);
    drawBox(x1, x2, y1, y2, buttonSelect, mouse);
    if (buttonSelect === operateSvg.revolve.name) {
        drawRevolve((select.rect.left + select.rect.right) / 2, (select.rect.top + select.rect.bottom) / 2, select.rect.right + blank, select.rect.top - blank, mouse);
    }
    setChild(2, molecule);
}

export function Transform_Finish(event) {
    console.log("===================== Transform_Finish");
    if (finishMolecule(2)) {
        Draw_Molecule(getMoleculeData());
    }
    let select = getSelect();
    Transform_Select(select.rect, event, select.count);
}

// function drawTransform(left, right, top, bottom, degree, mouseDown, select = null) {
//     left -= blank;
//     right += blank;
//     top -= blank;
//     bottom += blank;
//     if (left > right) {
//         let t = left;
//         left = right;
//         right = t;
//         if (select != null && select != operateSvg.revolve.id)
//             if (select === operateSvg.left.id) {
//                 select = operateSvg.right.id;
//             } else {
//                 select = operateSvg.left.id;
//             }
//     }
//     if (top > bottom) {
//         let t = top;
//         top = bottom;
//         bottom = t;
//         if (select != null && select != operateSvg.revolve.id)
//             if (select === operateSvg.top.id) {
//                 select = operateSvg.bottom.id;
//             } else {
//                 select = operateSvg.top.id;
//             }
//     }
//     let fontSize = DRAW_ATOM.fontSize;
//     let layout = document.getElementById( CONFIG_MOLECULE.DRAW_LAYOUT.ADD);
//     let h = (right - left) / 2 - 25, v = (bottom - top) / 2 - 25;
//     drawPath(operateSvg.line.id, layout, "M" + left + " " + top + " h" + h + " m" + 50 + " 0 h" + h + " v" + v + " m 0 50 v" + v + " h" + (-h) + " m-50 0 h" + (-h) + " v" + (-v) + " m0 -50 v" + (-v), null, 0.5, CHEM_SETTING.DRAW.value.COLOR_AUXILIARY_LINE, "6 3", 0.8);
//     drawButton(layout, operateSvg.top.id, (left + right) / 2, top, select, operateSvg.top.v, operateSvg.top.name, mouseDown);
//     drawButton(layout, operateSvg.bottom.id, (left + right) / 2, bottom, select, operateSvg.bottom.v, operateSvg.bottom.name, mouseDown);
//     drawButton(layout, operateSvg.left.id, left, (top + bottom) / 2, select, operateSvg.left.v, operateSvg.left.name, mouseDown);
//     drawButton(layout, operateSvg.right.id, right, (top + bottom) / 2, select, operateSvg.right.v, operateSvg.right.name, mouseDown);
//     let x = right, y = top;
//     if (Math.abs(degree) > Math.PI / 2) x = left;
//     if (degree > 0) y = bottom;
//     let e0 = drawSvg(layout, operateSvg.revolve.id, x, y);
//     if (e0.childNodes.length < 1) {
//         drawPath(null, e0, operateSvg.revolve.v, CHEM_SETTING.DRAW.value.COLOR_OPERATE);
//         drawText(operateSvg.revolve.id + "-t", e0, "0\u00b0", 20, 30, fontSize);
//         drawCircle(operateSvg.revolve.name, e0, mouseDown);
//     }
//     let b = e0.childNodes[0];
//     if (b)
//         if (select === operateSvg.revolve.id) {
//             b.style.fill = DRAW_ATOM.backgroundEnterColor;
//             degree = String(Math.round(degree * 180 / Math.PI)) + "\u00b0";
//             let fontWidth = getTextWidth(degree, fontSize);
//             drawText(operateSvg.revolve.id + "-t", e0, degree, 25.5 - fontWidth * 3 / 5, 30, fontSize);
//         } else {
//             b.style.fill = CHEM_SETTING.DRAW.value.COLOR_OPERATE;
//         }
// }
