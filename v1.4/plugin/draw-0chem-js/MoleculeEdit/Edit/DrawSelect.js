import {ref} from "vue";
import {CONFIG_MOLECULE, CHEM_SETTING} from "../../config";
import {getMoleculeData, setChild} from "../cache";
import {Draw_ClearSelect, Draw_EventChangeLine, Draw_EventChangePoint} from "../../MoleculeDraw/DrawMolecule";
import {Transform_Select} from "./DrawTransform";
import MoleculeSelect from "../MoleculeSelect";
import {MoleculeIdentify} from "../../MoleculeDraw/Identify/MoleculeIdentify";

const nameSelect = "chem-draw-select";
const touchBegin = ref({x: -1, y: -1, selected: false});
export const nameSelected = "chem-draw-selected"

/*=============================================================

=============================================================*/
function DrawRect(id, layout, x, y, width, height, fill, strokeWidth, strokeColor, strokeDasharray, fillOpacity) {
    let element = document.getElementById(id);
    if (!element) {
        element = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        element.id = id;
        layout.appendChild(element);
    }
    element.setAttribute("x", x);
    element.setAttribute("y", y);
    element.setAttribute("width", width);
    element.setAttribute("height", height);
    if (strokeDasharray != null)
        element.setAttribute("stroke-dasharray", strokeDasharray);
    if (fill != null) element.style.fill = fill;
    if (fillOpacity) element.style.fillOpacity = fillOpacity;
    if (strokeWidth != null) {
        element.style.strokeWidth = strokeWidth;
        if (strokeColor != null) element.style.stroke = strokeColor;
    }
    return element;
}

function Draw_SelectRect(x1, y1, x2, y2) {
    let layoutAdd = document.getElementById(CONFIG_MOLECULE.DRAW_LAYOUT.ADD);
    if (layoutAdd != null) {
        let width = Math.abs(x1 - x2), height = Math.abs(y1 - y2);
        x1 = x1 > x2 ? x2 : x1;
        y1 = y1 > y2 ? y2 : y1;
        x2 = x1 + width;
        y2 = y1 + height;
        DrawRect(nameSelect, layoutAdd, x1, y1, width, height, CHEM_SETTING.DRAW.value.COLOR_AUXILIARY_LINE, 0.5, CHEM_SETTING.DRAW.value.COLOR_AUXILIARY_LINE, "6 2", 0.3);
        let molecule = getMoleculeData();
        for (let i = 0; i < molecule.getAtomCount(); i++) {
            let atom = molecule.getAtomByIndex(i);
            if (atom.position.x >= x1 && atom.position.x <= x2 && atom.position.y >= y1 && atom.position.y <= y2) {
                atom.select = true;
                Draw_EventChangePoint(atom.id, CONFIG_MOLECULE.DRAW_CONST.BACKGROUND_SELECT, true);
            } else {
                atom.select = false;
                Draw_EventChangePoint(atom.id, CONFIG_MOLECULE.DRAW_ATOM.backgroundColor, false);
            }
        }
        for (let i = 0; i < molecule.getBondCount(); i++) {
            let bond = molecule.getBondByIndex(i);
            let atomA = molecule.getAtomById(bond.begin);
            let atomB = molecule.getAtomById(bond.end);
            bond.select = (atomA.select && atomB.select) ? true : false;
            if (bond.select) {
                Draw_EventChangeLine(bond.id, CONFIG_MOLECULE.DRAW_CONST.BACKGROUND_SELECT, true);
            } else {
                Draw_EventChangeLine(bond.id, CONFIG_MOLECULE.DRAW_ATOM.backgroundColor, false);
            }
        }
    }
    return true;
}

/*=============================================================

=============================================================*/
export function Select_is(operateName) {
    if (operateName === CONFIG_MOLECULE.OPERATE_NAME.SELECT) {
        return true;
    }
    return false;
};

/*=============================================================

=============================================================*/
export function Select_Init(mouse) {
    touchBegin.value = {x: -1, y: -1, selected: false};
    touchBegin.value.x = mouse.x;
    touchBegin.value.y = mouse.y;
}

export function Select_Move(mouse) {
    console.log("==== touchMove");
    if (touchBegin.value !== null) {
        Draw_SelectRect(touchBegin.value.x, touchBegin.value.y, mouse.x, mouse.y);
    }
}

export function Select_Finish(mouse, event) {
    Draw_ClearSelect();
    if (touchBegin.value != null) {
        let select = new MoleculeSelect();
        let molecule = getMoleculeData(), x1 = 100000, y1 = 100000, x2 = -100000, y2 = -100000, count = 0;
        for (let i = 0; i < molecule.getAtomCount(); i++) {
            let atom = molecule.getAtomByIndex(i);
            if (atom.select) {
                if (atom.position.x < x1) x1 = atom.position.x;
                if (atom.position.x > x2) x2 = atom.position.x;
                if (atom.position.y < y1) y1 = atom.position.y;
                if (atom.position.y > y2) y2 = atom.position.y;
                select.selectAtoms.push(atom.getId());
                select.count++;
            }
        }
        select.molecule = getMoleculeData().Copy();
        MoleculeIdentify(select.molecule);
        select.rect = {left: x1, top: y1, right: x2, bottom: y2};
        setChild(select);
        Transform_Select(select.rect, event, select.count);
    }
    touchBegin.value = null;
}
