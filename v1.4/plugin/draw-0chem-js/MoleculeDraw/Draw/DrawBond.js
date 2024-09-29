/*
Author: 史岩
Author URL: http://www.0chem.com
Date: 2022.2.21
*/

import {CONFIG_MOLECULE} from "../../config";
import {BOND_TYPE, BOND_STEREO} from "../../Molecule/Data/DataBond";
import {DrawGroup} from "../Base/DrawSvg";
import {ElementText, ElementLine, ElementCircle, ElementGroup} from "../Base/DrawElement";
import {nameChemType} from "./DrawBase";
import {nameSelected} from "../../MoleculeEdit/Edit/DrawSelect";

const chemTypeBond = "bond";
const chemTypeBondId = "bond-id";

//region 内部函数 - 创建事件背景层
function DrawEventLine(id, layout, x1, y1, x2, y2, stroke, color, mouseEnter, mouseOut, mouseDown, selected, name) {
    let element = document.getElementById(name + id);
    // var element = document.querySelector(layout + ">#" + id);
    if (!element) {
        element = document.createElementNS("http://www.w3.org/2000/svg", "line");
        element.id = name + id;
        // let l = document.querySelector(layout);
        // l.appendChild(element);
        element.setAttribute(nameChemType, chemTypeBond);
        element.setAttribute(chemTypeBondId, id);
        element.onmouseenter = mouseEnter;
        element.onmouseout = mouseOut;
        element.onmousedown = mouseDown;
        layout.appendChild(element);
    }
    element.setAttribute("x1", x1.toString());
    element.setAttribute("y1", y1.toString());
    element.setAttribute("x2", x2.toString());
    element.setAttribute("y2", y2.toString());
    if (selected) {
        element.setAttribute(nameSelected, selected)
    }
    element.setAttribute("style", "stroke:" + color + ";stroke-width:" + stroke);
    return element;
}
//endregion

//region
function DrawTriangle(bondDraw, fill, strokeWidth, strokeColor) {
    let x1 = bondDraw.position.x1;
    let y1 = bondDraw.position.y1;
    let x2 = bondDraw.movePoint(bondDraw.position.x2, -CONFIG_MOLECULE.DRAW_BOND.TRIANGLE_WIDTH * bondDraw.sin);
    let y2 = bondDraw.movePoint(bondDraw.position.y2, CONFIG_MOLECULE.DRAW_BOND.TRIANGLE_WIDTH * bondDraw.cos);
    let x3 = bondDraw.movePoint(bondDraw.position.x2, CONFIG_MOLECULE.DRAW_BOND.TRIANGLE_WIDTH * bondDraw.sin);
    let y3 = bondDraw.movePoint(bondDraw.position.y2, -CONFIG_MOLECULE.DRAW_BOND.TRIANGLE_WIDTH * bondDraw.cos);
    let element = document.createElementNS("http://www.w3.org/2000/svg", "path");
    element.setAttribute("name", name);
    element.setAttribute("d", "M" + x1 + " " + y1 + " L" + x2 + " " + y2 + " L" + x3 + " " + y3 + " Z");
    if (fill != null) element.style.fill = fill;
    if (strokeWidth != null) {
        element.style.strokeWidth = strokeWidth;
        if (strokeColor != null) element.style.stroke = strokeColor;
    }
    return element;
}

function DrawTriangleLine(group, bondDraw) {
    let blank = CONFIG_MOLECULE.DRAW_BOND.TRIANGLE_BLANK / bondDraw.scale;
    let l = Math.sqrt((bondDraw.position.x1 - bondDraw.position.x2) * (bondDraw.position.x1 - bondDraw.position.x2) + (bondDraw.position.y1 - bondDraw.position.y2) * (bondDraw.position.y1 - bondDraw.position.y2));
    let count = (l - CONFIG_MOLECULE.DRAW_BOND.TRIANGLE_START) / blank + 1;
    // let eleFirst = ElementLine(null, bondDraw.x1, bondDraw.y1, bondDraw.movePoint(1, CONFIG_MOLECULE.DRAW_BOND.TRIANGLE_START * bondDraw.cos, scale), bondDraw.movePoint(3, CONFIG_MOLECULE.DRAW_BOND.TRIANGLE_START * bondDraw.sin, scale), CONFIG_MOLECULE.DRAW_BOND.TRIANGLE_LINE_WIDTH, bondDraw.color);
    let eleFirst = ElementLine({
        x1: bondDraw.position.x1,
        y1: bondDraw.position.y1,
        x2: bondDraw.movePoint(bondDraw.position.x1, CONFIG_MOLECULE.DRAW_BOND.TRIANGLE_START * bondDraw.cos),
        y2: bondDraw.movePoint(bondDraw.position.y1, CONFIG_MOLECULE.DRAW_BOND.TRIANGLE_START * bondDraw.sin)
    }, CONFIG_MOLECULE.DRAW_BOND.TRIANGLE_LINE_WIDTH, bondDraw.color);
    group.appendChild(eleFirst);
    for (let i = 0; i < count; i++) {
        let a = (CONFIG_MOLECULE.DRAW_BOND.TRIANGLE_START + i * blank);
        let m = bondDraw.cos * a, n = bondDraw.sin * a;
        let o = bondDraw.bondHeight * CONFIG_MOLECULE.DRAW_BOND.TRIANGLE_WIDTH * a / (bondDraw.bondLength * bondDraw.bondLength), p = bondDraw.bondWidth * CONFIG_MOLECULE.DRAW_BOND.TRIANGLE_WIDTH * a / (bondDraw.bondLength * bondDraw.bondLength);
        let ele = ElementLine({
            x1: bondDraw.movePoint(bondDraw.position.x1, m - o),
            y1: bondDraw.movePoint(bondDraw.position.y1, n + p),
            x2: bondDraw.movePoint(bondDraw.position.x1, m + o),
            y2: bondDraw.movePoint(bondDraw.position.y1, n - p)
        }, CONFIG_MOLECULE.DRAW_BOND.TRIANGLE_LINE_WIDTH, bondDraw.color);
        // let ele = ElementLine(null, bondDraw.movePoint(1, m - o, scale), bondDraw.movePoint(3, n + p, scale), bondDraw.movePoint(1, m + o, scale), bondDraw.movePoint(3, n - p, scale), CONFIG_MOLECULE.DRAW_BOND.TRIANGLE_LINE_WIDTH, bondDraw.color);
        group.appendChild(ele);
    }
}

function DrawCurve(group, bondDraw) {
    let count = 7;
    let blank = CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK / bondDraw.scale;
    let l = Math.sqrt((bondDraw.position.x1 - bondDraw.position.x2) * (bondDraw.position.x1 - bondDraw.position.x2) + (bondDraw.position.y1 - bondDraw.position.y2) * (bondDraw.position.y1 - bondDraw.position.y2));
    let v = l / count;
    let d = 'M ' + bondDraw.position.x1 + ',' + bondDraw.position.y1 + '';
    // group.appendChild(ElementCircle(bondDraw.position.x1, bondDraw.position.y1, 3));
    let o = CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * bondDraw.sin, p = CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * bondDraw.cos;
    d += " C" + bondDraw.movePoint(bondDraw.position.x1, -o) + " " + bondDraw.movePoint(bondDraw.position.y1, p);
    for (let i = 1; i < count; i++) {
        let a = i * v;
        let m = bondDraw.cos * a, n = bondDraw.sin * a;
        if (i % 2 === 0) {
            d += " " + bondDraw.movePoint(bondDraw.position.x1, m + o) + " " + bondDraw.movePoint(bondDraw.position.y1, n - p);
            d += " " + bondDraw.movePoint(bondDraw.position.x1, m) + " " + bondDraw.movePoint(bondDraw.position.y1, n) + " S";
        } else {
            d += " " + bondDraw.movePoint(bondDraw.position.x1, m - o) + " " + bondDraw.movePoint(bondDraw.position.y1, n + p);
            d += " " + bondDraw.movePoint(bondDraw.position.x1, m) + " " + bondDraw.movePoint(bondDraw.position.y1, n) + " S";
        }
        // group.appendChild(ElementCircle(bondDraw.movePoint(bondDraw.position.x1, m - o), bondDraw.movePoint(bondDraw.position.y1, n + p), 3));
    }
    d += " " + bondDraw.movePoint(bondDraw.position.x2, -o) + " " + bondDraw.movePoint(bondDraw.position.y2, p);
    d += " " + bondDraw.position.x2 + " " + bondDraw.position.y2;
    // d += " T" + bondDraw.position.x2 + "," + bondDraw.position.y2;
    // group.appendChild(ElementCircle(bondDraw.position.x2, bondDraw.position.y2, 3));
    let element = document.createElementNS("http://www.w3.org/2000/svg", "path");
    element.setAttribute("name", name);
    element.setAttribute("d", d);
    element.style.fill = "none";
    element.style.strokeWidth = bondDraw.scale;
    element.style.stroke = "#222222";
    group.appendChild(element);
}

export function Draw_Bond(layout, drawBondData, showId, name) {
    let elementGroup = ElementGroup();
    if (elementGroup.hasChildNodes()) {
        return;
    }
    if (drawBondData.bondType === BOND_TYPE.BOND_SINGLE) {
        switch (drawBondData.bondStereo) {
            case BOND_STEREO.STEREO_CIS: {
                let element = DrawTriangle(drawBondData, "transparent", 1, drawBondData.color);
                elementGroup.appendChild(element);
            }
                break;
            case BOND_STEREO.STEREO_UP: {
                let element = DrawTriangle(drawBondData, drawBondData.color);
                elementGroup.appendChild(element);
            }
                break;
            case BOND_STEREO.STEREO_EITHER: {
                DrawCurve(elementGroup, drawBondData);
            }
                break
            case BOND_STEREO.STEREO_DOWN:
                DrawTriangleLine(elementGroup, drawBondData);
                break;
            default: {
                let element = ElementLine(drawBondData.position, drawBondData.scale, drawBondData.color);
                elementGroup.appendChild(element);
            }
                break
        }
    }
    let bondMid = ElementLine(drawBondData.position, drawBondData.scale, drawBondData.color);
    let bondUp = ElementLine({
        x1: drawBondData.movePoint(drawBondData.location.x1, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * drawBondData.sin),
        y1: drawBondData.movePoint(drawBondData.location.y1, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * -drawBondData.cos),
        x2: drawBondData.movePoint(drawBondData.location.x2, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * drawBondData.sin),
        y2: drawBondData.movePoint(drawBondData.location.y2, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * -drawBondData.cos)
    }, drawBondData.scale, drawBondData.color);
    let bondDown = ElementLine({
        x1: drawBondData.movePoint(drawBondData.location.x1, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * -drawBondData.sin),
        y1: drawBondData.movePoint(drawBondData.location.y1, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * drawBondData.cos),
        x2: drawBondData.movePoint(drawBondData.location.x2, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * -drawBondData.sin),
        y2: drawBondData.movePoint(drawBondData.location.y2, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * drawBondData.cos)
    }, drawBondData.scale, drawBondData.color);
    switch (drawBondData.bondType) {
        case BOND_TYPE.BOND_DOUBLE:
            switch (drawBondData.bondStereo) {
                case BOND_STEREO.STEREO_UP: {
                    elementGroup.appendChild(bondMid);
                    elementGroup.appendChild(bondUp);
                }
                    break;
                case BOND_STEREO.STEREO_DOWN: {
                    elementGroup.appendChild(bondMid);
                    elementGroup.appendChild(bondDown);
                }
                    break;
                default: {
                    let eleA = ElementLine({
                        x1: drawBondData.movePoint(drawBondData.position.x1, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * drawBondData.sin / 2),
                        y1: drawBondData.movePoint(drawBondData.position.y1, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * -drawBondData.cos / 2),
                        x2: drawBondData.movePoint(drawBondData.position.x2, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * drawBondData.sin / 2),
                        y2: drawBondData.movePoint(drawBondData.position.y2, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * -drawBondData.cos / 2)
                    }, drawBondData.scale, drawBondData.color);
                    let eleB = ElementLine({
                        x1: drawBondData.movePoint(drawBondData.position.x1, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * -drawBondData.sin / 2),
                        y1: drawBondData.movePoint(drawBondData.position.y1, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * drawBondData.cos / 2),
                        x2: drawBondData.movePoint(drawBondData.position.x2, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * -drawBondData.sin / 2),
                        y2: drawBondData.movePoint(drawBondData.position.y2, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * drawBondData.cos / 2)
                    }, drawBondData.scale, drawBondData.color);
                    elementGroup.appendChild(eleA);
                    elementGroup.appendChild(eleB);
                }
                    break;
            }
            // 中心线颜色
            let element = ElementLine(drawBondData.source, CONFIG_MOLECULE.DRAW_BOND.bondCenterColor);
            elementGroup.appendChild(element);
            break;
        case BOND_TYPE.BOND_TRIPLE:
            switch (drawBondData.bondStereo) {
                case BOND_STEREO.STEREO_EITHER:
                    elementGroup.appendChild(bondUp);
                    elementGroup.appendChild(bondDown);
                    break;
                default:
                    let eleA = ElementLine({
                        x1: drawBondData.movePoint(drawBondData.position.x1, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * drawBondData.sin),
                        y1: drawBondData.movePoint(drawBondData.position.y1, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * -drawBondData.cos),
                        x2: drawBondData.movePoint(drawBondData.position.x2, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * drawBondData.sin),
                        y2: drawBondData.movePoint(drawBondData.position.y2, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * -drawBondData.cos)
                    }, drawBondData.scale, drawBondData.color);
                    let eleB = ElementLine({
                        x1: drawBondData.movePoint(drawBondData.position.x1, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * -drawBondData.sin),
                        y1: drawBondData.movePoint(drawBondData.position.y1, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * drawBondData.cos),
                        x2: drawBondData.movePoint(drawBondData.position.x2, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * -drawBondData.sin),
                        y2: drawBondData.movePoint(drawBondData.position.y2, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * drawBondData.cos)
                    }, drawBondData.scale, drawBondData.color);
                    elementGroup.appendChild(eleA);
                    elementGroup.appendChild(eleB);
                    break;
            }
            elementGroup.appendChild(bondMid);
            break;
        case BOND_TYPE.BOND_ANY: {
            let element = ElementLine(drawBondData.position, drawBondData.scale, drawBondData.color);
            element.setAttribute("stroke-dasharray", CONFIG_MOLECULE.DRAW_BOND.STROKE_DASHARRAY);
            elementGroup.appendChild(element);
        }
            break;
        case BOND_TYPE.BOND_AROMATIC: {
            let eleA = ElementLine({
                x1: drawBondData.movePoint(drawBondData.position.x1, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * drawBondData.sin / 2),
                y1: drawBondData.movePoint(drawBondData.position.y1, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * -drawBondData.cos / 2),
                x2: drawBondData.movePoint(drawBondData.position.x2, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * drawBondData.sin / 2),
                y2: drawBondData.movePoint(drawBondData.position.y2, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * -drawBondData.cos / 2)
            }, drawBondData.scale, drawBondData.color);
            let eleB = ElementLine({
                x1: drawBondData.movePoint(drawBondData.position.x1, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * -drawBondData.sin / 2),
                y1: drawBondData.movePoint(drawBondData.position.y1, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * drawBondData.cos / 2),
                x2: drawBondData.movePoint(drawBondData.position.x2, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * -drawBondData.sin / 2),
                y2: drawBondData.movePoint(drawBondData.position.y2, CONFIG_MOLECULE.DRAW_BOND.BOND_BLANK * drawBondData.cos / 2)
            }, drawBondData.scale, drawBondData.color);
            elementGroup.appendChild(eleA);
            eleB.setAttribute("stroke-dasharray", CONFIG_MOLECULE.DRAW_BOND.STROKE_DASHARRAY);
            elementGroup.appendChild(eleB);
        }
            break;
    }
    if (showId) {
        let element = ElementText(drawBondData.id, (drawBondData.source.x1 + drawBondData.source.x2) / 2, (drawBondData.source.y1 + drawBondData.source.y2) / 2, CONFIG_MOLECULE.DRAW_BOND.fontIdColor, CONFIG_MOLECULE.DRAW_BOND.fontIdSize, CONFIG_MOLECULE.DRAW_CONST.FONT_FAMILY);
        elementGroup.appendChild(element);
    }
    if (elementGroup.childNodes.length > 0) layout.appendChild(elementGroup);
}

export function Draw_BondBackground(id, layout, a, b, scale, selected, mouseEnter, mouseOut, bondClick, name) {
    let background = CONFIG_MOLECULE.DRAW_BOND.backgroundColor;
    if (selected) background = CONFIG_MOLECULE.DRAW_CONST.BACKGROUND_SELECT;
    DrawEventLine(id, layout, a.x, a.y, b.x, b.y, CONFIG_MOLECULE.DRAW_ATOM.fontSize * scale, background, mouseEnter, mouseOut, bondClick, selected, name);
};

const DrawBondData = class {
    constructor(atomA_position, atomB_position, bond, aLabel, bLabel, scale) {
        //初始化坐标
        this.id = bond.id;
        this.color = bond.color;
        this.bondType = bond.bondType;
        this.bondStereo = bond.bondStereo;
        this.select = bond.select;
        this.scale = scale;
        //修剪坐标
        this.source = {x1: atomA_position.x, y1: atomA_position.y, x2: atomB_position.x, y2: atomB_position.y};
        this.position = {x1: atomA_position.x, y1: atomA_position.y, x2: atomB_position.x, y2: atomB_position.y};
        this.initLabel(aLabel, bLabel);
    }

    //region 基本
    initLabel(aLabel, bLabel) {
        this.bondWidth = this.source.x2 - this.source.x1;
        this.bondHeight = this.source.y2 - this.source.y1;
        this.bondLength = Math.sqrt(this.bondWidth * this.bondWidth + this.bondHeight * this.bondHeight);
        this.sin = this.bondHeight / this.bondLength;
        this.cos = this.bondWidth / this.bondLength;

        let Font_Radius = CONFIG_MOLECULE.DRAW_ATOM.FONT_RADIUS;
        this.location = {
            x1: this.source.x1 + this.cos * Font_Radius,
            y1: this.source.y1 + this.sin * Font_Radius,
            x2: this.source.x2 - this.cos * Font_Radius,
            y2: this.source.y2 - this.sin * Font_Radius
        };
        if (aLabel > 0) {
            Font_Radius = CONFIG_MOLECULE.DRAW_ATOM.FONT_RADIUS;
            if (aLabel > 1) {
                Font_Radius = CONFIG_MOLECULE.DRAW_ATOM.FONT_RADIUS2;
            }
            this.position.x1 = this.source.x1 + this.cos * Font_Radius;
            this.position.y1 = this.source.y1 + this.sin * Font_Radius;
        }
        if (bLabel > 0) {
            let Font_Radius = CONFIG_MOLECULE.DRAW_ATOM.FONT_RADIUS;
            if (bLabel > 1) {
                Font_Radius = CONFIG_MOLECULE.DRAW_ATOM.FONT_RADIUS2;
            }
            this.position.x2 = this.source.x2 - this.cos * Font_Radius;
            this.position.y2 = this.source.y2 - this.sin * Font_Radius;
        }
        // this.lx = this.startX > this.stopX ? this.stopX : this.startX;
        // this.ly = this.startY > this.stopY ? this.stopY : this.startY;
        // this.rx = this.startX < this.stopX ? this.stopX : this.startX;
        // this.ry = this.startY < this.stopY ? this.stopY : this.startY;

        this.degrees = Math.acos(this.cos);
        this.degrees = this.degrees * 180 / Math.PI;//此值只能是0~180
        if (this.position.y1 > this.position.y2) {
            this.degrees = -this.degrees;
        }
    }

    //endregion

    //region 键 - 传参
    movePoint(v, m) {
        return v + m * this.scale;
    }//endregion
}
//endregion

//region 删除
const RemoveBondDraw = (id, name) => {
    let element = document.getElementById(name + id);
    if (element != null) element.remove();
}

const RemoveBondBackground = (id, name) => {
    let element = document.getElementById(name + id);
    if (element != null) element.remove();
}
//endregion

export {
    DrawBondData
};