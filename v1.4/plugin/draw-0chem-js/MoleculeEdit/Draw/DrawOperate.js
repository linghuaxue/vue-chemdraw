import {CONFIG_MOLECULE, CHEM_SETTING} from "../../config";
import Vector from "../../Molecule/Base/Vector";

const nameAngleHelpLineAB = "chem-angle-lineAB-";
const nameAngleHelpLineAC = "chem-angle-lineAC-";
const nameAngleHelpLineAD = "chem-angle-lineAD-";
const nameAngleTextBC = "chem-angle-textBC-";
const nameAngleTextBD = "chem-angle-textBD-";
const nameAngleLineBD = "chem-angle-lineBD-";
const nameAngleLineBC = "chem-angle-lineBC-";
const id = 1;

/*=============================================================
内部函数
=============================================================*/
export function drawCircle(id, layout, x, y, radius, color) {
    let element = document.getElementById(id);
    if (!element) {
        element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        element.id = id;
        element.style.pointerEvents = "none";
        layout.appendChild(element);
    }
    element.setAttribute("cx", x.toString());
    element.setAttribute("cy", y.toString());
    element.setAttribute("r", radius);
    element.style.fill = color;
    return element;
}

function drawAngleLine(id, layout, x1, y1, x2, y2, radius, f1, f2, scale, stroke, color, dash = null, opacity = 1) {
    let element = document.getElementById(id);
    if (!element) {
        element = document.createElementNS("http://www.w3.org/2000/svg", "path");
        element.id = id;
        element.style.pointerEvents = 'none';
        if (dash != null) {
            element.setAttribute("stroke-dasharray", dash);
        }
        if (opacity > 0 && opacity < 1) {
            element.setAttribute("stroke-opacity", opacity);
        }
        element.style.pointerEvents = "none";
        layout.appendChild(element);
    }
    element.style.strokeWidth = stroke;
    element.style.stroke = color;
    element.style.fill = CONFIG_MOLECULE.DRAW_BOND.backgroundColor;
    element.setAttribute("d", "M" + x1 + " " + y1 + "A" + radius + " " + radius + " 0 " + f1 + " " + f2 + " " + x2 + " " + y2);
    return element;
}

function drawAngleText(id, layout, text, x, y, fontSize) {
    let element = document.getElementById(id);
    if (!element) {
        element = document.createElementNS("http://www.w3.org/2000/svg", "text");
        element.id = id;
        element.setAttribute("font-size", fontSize.toString());
        element.style.pointerEvents = 'none';
        layout.appendChild(element);
    }
    element.setAttribute("x", x.toString());
    element.setAttribute("y", y.toString());
    element.innerHTML = text;
    return element;
}

function drawHelpLine(id, layout, x1, y1, x2, y2, stroke, color) {
    let element = document.getElementById(id);
    if (!element) {
        element = document.createElementNS("http://www.w3.org/2000/svg", "line");
        element.id = id;
        element.setAttribute("style", "stroke:" + color + ";stroke-width:" + stroke);
        element.setAttribute("stroke-dasharray", CONFIG_MOLECULE.DRAW_BOND.STROKE_DASHARRAY);
        element.style.pointerEvents = 'none';
        layout.appendChild(element);
    }
    element.setAttribute("x1", x1.toString());
    element.setAttribute("y1", y1.toString());
    element.setAttribute("x2", x2.toString());
    element.setAttribute("y2", y2.toString());
    return element;
}

/*=============================================================
判断状态
=============================================================*/
export function DrawOperate_BondLine(position, degree, radianAB, radianAC, f2, radius = CHEM_SETTING.DRAW.value.AUXILIARY_LINE_LENGTH) {
    let scale = CHEM_SETTING.getScale();
    let length = radius;
    let b = Vector.Create(position.x + length * Math.cos(radianAB), position.y + length * Math.sin(radianAB));
    let c = Vector.Create(position.x + length * Math.cos(radianAC), position.y + length * Math.sin(radianAC));
    let t = Vector.Create(position.x + length * Math.cos(radianAB / 2), position.y + length * Math.sin(radianAB / 2));
    degree = Math.abs(degree);
    if (degree > 180) degree = 360 - degree;
    let strokeWidth = 0.8;
    let layout = document.getElementById(CONFIG_MOLECULE.DRAW_LAYOUT.ADD);
    drawHelpLine(nameAngleHelpLineAB + id, layout, position.x, position.y, b.x, b.y, strokeWidth,CHEM_SETTING.DRAW.value.COLOR_AUXILIARY_LINE);
    drawHelpLine(nameAngleHelpLineAC + id, layout, position.x, position.y, c.x, c.y, strokeWidth,CHEM_SETTING.DRAW.value.COLOR_AUXILIARY_LINE);
    drawAngleLine(nameAngleLineBC + id, layout, b.x, b.y, c.x, c.y, radius, 0, f2, scale, strokeWidth,CHEM_SETTING.DRAW.value.COLOR_AUXILIARY_LINE, CONFIG_MOLECULE.DRAW_BOND.STROKE_DASHARRAY);
    degree = degree + "\u00b0";
    drawAngleText(nameAngleTextBC + id, layout, degree, t.x, t.y, CONFIG_MOLECULE.DRAW_ATOM.fontSize);
}

const DrawAngle = (a, b, c, t, degree, scale, radius, f1, f2) => {
    let strokeWidth = 0.8;
    let layout = document.getElementById(CONFIG_MOLECULE.DRAW_LAYOUT.ADD);
    drawHelpLine(nameAngleHelpLineAB + id, layout, a.x, a.y, b.x, b.y, strokeWidth, CHEM_SETTING.DRAW.value.COLOR_AUXILIARY_LINE);
    drawHelpLine(nameAngleHelpLineAC + id, layout, a.x, a.y, c.x, c.y, strokeWidth, CHEM_SETTING.DRAW.value.COLOR_AUXILIARY_LINE);
    drawAngleText(nameAngleTextBC + id, layout, degree, t.x, t.y, CONFIG_MOLECULE.DRAW_ATOM.fontSize);
    drawAngleLine(nameAngleLineBC + id, layout, b.x, b.y, c.x, c.y, radius, f1, f2, scale, strokeWidth, CHEM_SETTING.DRAW.value.COLOR_AUXILIARY_LINE, CONFIG_MOLECULE.DRAW_BOND.STROKE_DASHARRAY);
}

const DrawAngleABD = (a, b, d, t, degree, scale, radius, f1, f2) => {
    let id = 1, strokeWidth = 0.8;
    let layout = document.getElementById(CONFIG_MOLECULE.DRAW_LAYOUT.ADD);
    drawHelpLine(nameAngleHelpLineAD + id, layout, a.x, a.y, d.x, d.y, strokeWidth,CHEM_SETTING.DRAW.value.COLOR_AUXILIARY_LINE);
    drawAngleText(nameAngleTextBD + id, layout, degree, t.x, t.y, CONFIG_MOLECULE.DRAW_ATOM.fontSize);
    drawAngleLine(nameAngleLineBD + id, layout, b.x, b.y, d.x, d.y, radius, f1, f2, scale, strokeWidth, CHEM_SETTING.DRAW.value.COLOR_AUXILIARY_LINE);
}

// const DrawFastLine2 = (position, degree, f1, f2, scale, degreeStart = 30) => {
//     let layout = document.getElementById( CONFIG_MOLECULE.DRAW_LAYOUT.ADD), id = 1, radian = -1;
//     let degreeAdd = 120, color = DRAW_CONST.BACKGROUND_SELECT;
//     drawCircle(nameAngleTextBC + id, layout, position.x, position.y, 3, CHEM_SETTING.DRAW.value.COLOR_AUXILIARY_LINE);
//     if (degree > degreeStart && degree < degreeStart + degreeAdd) {
//         color = CONFIG_MOLECULE.DRAW_BOND.backgroundEnterColor;
//         radian = (degreeStart + degreeAdd / 2) * Math.PI / 180;
//     }
//     drawFastAngle(nameAngleHelpLineAB + id, layout, position, degreeStart + degreeAdd / 2, f1, 1, scale, color);
//     color = DRAW_CONST.BACKGROUND_SELECT
//     if (degree > degreeStart + degreeAdd && degree < degreeStart + degreeAdd * 2) {
//         color = CONFIG_MOLECULE.DRAW_BOND.backgroundEnterColor;
//         radian = (degreeStart + degreeAdd + degreeAdd / 2) * Math.PI / 180;
//     }
//     drawFastAngle(nameAngleHelpLineAC + id, layout, position, degreeStart + degreeAdd + degreeAdd / 2, f1, 1, scale, color);
//     color = DRAW_CONST.BACKGROUND_SELECT
//     if ((degree > degreeStart + degreeAdd * 2 && degree <= 360) || (degree > 0 && degree < degreeStart)) {
//         color = CONFIG_MOLECULE.DRAW_BOND.backgroundEnterColor;
//         radian = (degreeStart + degreeAdd * 2 + degreeAdd / 2) * Math.PI / 180;
//     }
//     drawFastAngle(nameAngleHelpLineAD + id, layout, position, degreeStart + degreeAdd * 2 + degreeAdd / 2, f1, 1, scale, color);
//     return radian;
// }

/*=============================================================
判断状态
=============================================================*/
const radians = [Math.PI / 6, Math.PI / 2, Math.PI * 5 / 6, Math.PI * 7 / 6, Math.PI * 3 / 2, Math.PI * 11 / 6];

const DrawFastLine = (id, position, data) => {
    let scale = CHEM_SETTING.getScale();
    let layout = document.getElementById(CONFIG_MOLECULE.DRAW_LAYOUT.ADD);
    drawCircle(nameAngleTextBC + id, layout, position.x, position.y, 3, CHEM_SETTING.DRAW.value.COLOR_AUXILIARY_LINE);
    // console.log(radians);
    for (let item of data) {
        drawFastAngle(item.name + id, layout, position, radians[item.index], item.f, 1, scale, item.color, data.length);
    }
}

const drawFastAngle = (name, layout, position, degree, f1, f2, scale, color, divide) => {
    let strokeWidth = 20, radius = CHEM_SETTING.DRAW.value.AUXILIARY_LINE_LENGTH;
    let radian = degree + Math.PI / 360;
    let a = position.Add(radius * Math.cos(radian), radius * Math.sin(radian));
    radian = degree + Math.PI * 2 / divide - Math.PI / 360;
    let b = position.Add(radius * Math.cos(radian), radius * Math.sin(radian));
    drawAngleLine(name, layout, a.x, a.y, b.x, b.y, radius, f1, f2, scale, strokeWidth, color, null, 0.6);
}

/*=============================================================
判断状态
=============================================================*/
const DrawAngleClear = () => {
    let select = document.getElementById(nameAngleHelpLineAB + id);
    if (select != null) select.remove();
    select = document.getElementById(nameAngleHelpLineAC + id);
    if (select != null) select.remove();
    select = document.getElementById(nameAngleHelpLineAD + id);
    if (select != null) select.remove();
    select = document.getElementById(nameAngleTextBC + id);
    if (select != null) select.remove();
    select = document.getElementById(nameAngleTextBD + id);
    if (select != null) select.remove();
    select = document.getElementById(nameAngleLineBC + id);
    if (select != null) select.remove();
    select = document.getElementById(nameAngleLineBD + id);
    if (select != null) select.remove();
}

export {DrawAngle, DrawAngleABD, DrawAngleClear, DrawFastLine};