/*
Author: 史岩
Author URL: http://www.0chem.com
Date: 2022.2.21
*/

import {ref} from "vue";
import {CONFIG_MOLECULE, CHEM_SETTING} from "../../config";
import {Add_is, Add_Add, Add_Move, Add_Finish, Add_isBond, Add_isAtom} from "../../MoleculeEdit/Edit/DrawAdd";
import {Change_Atom, Change_Bond, Change_Finish, Change_isAtom, Change_isBond} from "../../MoleculeEdit/Edit/DrawChange";
import {Select_Finish, Select_Init, Select_is, Select_Move} from "../../MoleculeEdit/Edit/DrawSelect";
import {DrawText} from "../../MoleculeDraw/Base/DrawSvg";
import Vector from "../../Molecule/Base/Vector";
import {getMoleculeData} from "../../MoleculeEdit/cache";
import {Element_Enter, Element_Out} from "../../MoleculeEdit/Edit/DrawElement";
import {Transform_Finish, Transform_Move} from "../../MoleculeEdit/Edit/DrawTransform";
import {Scale_Finish, Scale_is, Scale_Move} from "../../MoleculeEdit/Edit/DrawScale";

function getState(s = 0, a = false, b = null) {
    return {s: s, a: a, b: b}
}

const touchState = ref(getState()), touchPosition = ref(),
    TOUCH_STATE = {NONE: 0, RUN: 2, STATE: 10, ADD: 11, CHANGE: 21, SELECT: 31, TRANSFORM: 41, SCALE: 42};
const nameId = {
    showMousePosition: "chem-mouse-position",
};

function getOperate(props) {
    // return {
    //     "operateName": props.operateName, "operateValue": props.operateValue, "operateArg": props.operateArg,
    // }
    var name = CHEM_SETTING.OPERATE.value.OPERATE_NAME;
    if (name.substring(0, 4) === CONFIG_MOLECULE.OPERATE_NAME.BOND)
        name = CONFIG_MOLECULE.OPERATE_NAME.BOND;
    let v = {
        operateName: name, operateValue: CHEM_SETTING.OPERATE.value.OPERATE_VALUE, operateArg: CHEM_SETTING.OPERATE.value.OPERATE_ARG
    };
    return v;
}

function getPosition(e, s = false) {
    let position = Vector.Create(e.layerX, e.layerY);
    if (s) touchPosition.value = position;
    return position;
}

/*=============================================================
鼠标操作
=============================================================*/
const touchDown = function (e) {
    console.log("==== touchDown");
    if (touchState.value.a) return;
    let operate = getOperate(this.$props), position = getPosition(e, true);
    if (Add_is(operate.operateName, 1)) {
        Add_Add(operate, position);
        touchState.value.s = TOUCH_STATE.ADD;
    } else if (Select_is(operate.operateName, 1)) {
        Select_Init(position);
        touchState.value.s = TOUCH_STATE.SELECT;
    } else if (Scale_is(operate.operateName, 1)) {
        touchState.value.s = TOUCH_STATE.SCALE;
    }
    touchState.value.a = true;
}

const touchMove = function (e) {
    let start = new Date().getTime();

    if (touchState.value.s < TOUCH_STATE.STATE) return;
    touchState.value.s = TOUCH_STATE.RUN;
    let position = getPosition(e), operate = getOperate(this.$props);
    DrawText(nameId.showMousePosition, document.getElementById(CONFIG_MOLECULE.DRAW_LAYOUT.MAIN), "比例:" +CHEM_SETTING. getScale() * 100 + "% " + "x:" + position.x + " y:" + position.y, 100, 80, 13);

    // 实时坐标放入 isDrawSelect
    if (touchState.value.b != null) {
        Transform_Move(position, touchState.value.b, Transform_Down);
        touchState.value.s = TOUCH_STATE.TRANSFORM;
        return;
    } else if (Add_is(operate.operateName, 2)) {
        Add_Move(operate, position);
        touchState.value.s = TOUCH_STATE.ADD;
    } else if (Select_is(operate.operateName, 2)) {
        Select_Move(position);
        touchState.value.s = TOUCH_STATE.SELECT;
    } else if (Scale_is(operate.operateName, 2)) {
        Scale_Move(operate, position, touchPosition.value);
        touchState.value.s = TOUCH_STATE.SCALE;
    }

    touchState.value.a = true;
    let end = new Date().getTime();
    // console.log("耗时：" + (end - start).toString());
}

const touchUp = function (e) {
    console.log("==== touchUp");
    if (!touchState.value.a) return;
    if (touchState.value.s === TOUCH_STATE.ADD) {
        Add_Finish();
    } else if (touchState.value.s === TOUCH_STATE.CHANGE) {
        Change_Finish();
    } else if (touchState.value.s === TOUCH_STATE.SELECT) {
        Select_Finish(getPosition(e), Transform_Down);
    } else if (touchState.value.s === TOUCH_STATE.SCALE) {
        Scale_Finish(getOperate(this.$props));
    } else if (touchState.value.s === TOUCH_STATE.TRANSFORM) {
        Transform_Finish(Transform_Down);
    }
    touchState.value = getState();
}

/*=============================================================
鼠标操作 - 元素选中
=============================================================*/
const touchAtom = function (e) {
    console.log("==== touchAtom");
    let operate = getOperate(this.$props), position = getPosition(e), id = e.target.getAttribute(CONFIG_MOLECULE.DRAW_LAYOUT.ELEMENT_ATOM_ID);
    if (Change_isAtom(operate.operateName, 1)) {
        e.stopPropagation();
        e.target.style.fill = CONFIG_MOLECULE.DRAW_ATOM.backgroundEnterColor;
        Change_Atom(operate, id);
        touchState.value = getState(TOUCH_STATE.CHANGE, true);
    } else if (Add_isAtom(operate.operateName, 1)) {
        e.stopPropagation();
        e.target.style.fill = CONFIG_MOLECULE.DRAW_ATOM.backgroundEnterColor;
        let molecule = getMoleculeData();
        let atom = molecule.getAtomById(id);
        if (atom != null) {
            position = atom.position.Clone();
        }
        Add_Add(operate, position, id);
        touchState.value = getState(TOUCH_STATE.ADD, true);
    }
}

const touchBond = function (e) {
    let operate = getOperate(this.$props), position = getPosition(e), id = e.target.getAttribute(CONFIG_MOLECULE.DRAW_LAYOUT.ELEMENT_BOND_ID);
    if (Change_isBond(operate.operateName)) {
        e.stopPropagation();
        e.target.style.stroke = CONFIG_MOLECULE.DRAW_BOND.backgroundEnterColor;
        Change_Bond(operate, position, id);
        touchState.value = getState(TOUCH_STATE.CHANGE, true);
    } else if (Add_isBond(operate.operateName, 1)) {
        e.stopPropagation();
        e.target.style.stroke = CONFIG_MOLECULE.DRAW_BOND.backgroundEnterColor;
        touchState.value = getState(TOUCH_STATE.ADD, true);
    }
}

// 进入画布
const touchEnter = function (e) {
    let operateName = this.$props.operateName;
}

/*=============================================================
鼠标操作 - 元素内部操作
=============================================================*/
const elementEnter = function (e) {
    // let operateName = this.$props.operateName;
    // let chemType = e.target.getAttribute(nameChemType);
    // if (chemType === "atom") {
    //     let operate = getOperate(e, this.$props, e.target.getAttribute( CONFIG_MOLECULE.DRAW_LAYOUT.ELEMENT_ATOM_ID));
    //     // DrawHoverSelectAtom(e, operate);
    // } else if (chemType === "bond") {
    //     let operate = getOperate(e, this.$props, e.target.getAttribute( CONFIG_MOLECULE.DRAW_LAYOUT.ELEMENT_BOND_ID));
    //     // DrawHoverSelectBond(e, operate);
    // }
    if (touchState.value.s < TOUCH_STATE.STATE) {
        //console.log("================================ elementEnter");
        e.stopPropagation();
        Element_Enter(e, getOperate(this.$props));
    }
}

const elementOut = function (e) {
    if (touchState.value.s < TOUCH_STATE.STATE) {
        console.log("================================ elementOut");
        e.stopPropagation();
        Element_Out(e);
    }
}

const elementMove = function (e) {
    if (touchState.value.s < TOUCH_STATE.STATE) {
        console.log("================================ elementMove");
        e.stopPropagation();
    }
}

/*=============================================================
鼠标操作 - 形变按钮
=============================================================*/
function Transform_Down(e) {
    e.stopPropagation();
    console.log(e.target);
    touchState.value = getState(TOUCH_STATE.TRANSFORM, true, e.target.getAttribute("name"));
}

export {
    touchMove, touchDown, touchUp, touchEnter,
    touchAtom, touchBond,
    elementEnter, elementOut, elementMove
}