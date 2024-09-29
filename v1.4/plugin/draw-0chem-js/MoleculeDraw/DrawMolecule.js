/*
Author: 史岩
Author URL: http://www.0chem.com
Date: 2022.2.21
*/
import {ref} from "vue";
import {CHEM_SETTING, CONFIG_MOLECULE} from "../config";
import {DrawAtom, DrawAtomBackground} from "./Draw/DrawAtom";
import {Draw_Bond, Draw_BondBackground, DrawBondData,} from "./Draw/DrawBond";
import {nameSelected} from "../MoleculeEdit/Edit/DrawSelect";

const layout_background_atom = "background-atomId-";
const layout_background_bond = "background-bondId-";
const SETTING_DRAW = CHEM_SETTING.DRAW;

/*=============================================================

=============================================================*/
export function DrawMolecule(molecule, layout, scale, name = "molecule") {
    if (molecule == null || molecule.getAtomCount() < 1) {
        return;
    }
    for (let i = 0; i < molecule.getAtomCount(); i++) {
        let atom = molecule.getAtomByIndex(i);
        if (!atom.groupIn) {
            let title = null;
            if (atom.groupId >= 0) title = molecule.getGroupById(atom.groupId).title;
            DrawAtom(layout, atom, scale, false, name + "-atomId-", title);
        }
    }
    for (let i = 0; i < molecule.getBondCount(); i++) {
        let bond = molecule.getBondByIndex(i);
        let atomA = molecule.getAtomById(bond.begin);
        let atomB = molecule.getAtomById(bond.end);
        if (!atomA.groupIn && !atomB.groupIn) {
            let bondData = new DrawBondData(atomA.position, atomB.position, bond, atomA.isLabelShow(), atomB.isLabelShow(), scale);
            Draw_Bond(layout, bondData, false, name + "-bondId-");
        }
    }
}

/*=============================================================

=============================================================*/
function Draw_Clear() {
    let backgroundBond = document.getElementById(CONFIG_MOLECULE.DRAW_LAYOUT.BACKGROUND_BOND);
    backgroundBond.innerHTML = "";
    let backgroundAtom = document.getElementById(CONFIG_MOLECULE.DRAW_LAYOUT.BACKGROUND_ATOM);
    backgroundAtom.innerHTML = "";
    let backgroundAdd = document.getElementById(CONFIG_MOLECULE.DRAW_LAYOUT.MOLECULE);
    backgroundAdd.innerHTML = "";
}

export function Draw_ClearSelect() {
    let backgroundAdd = document.getElementById(CONFIG_MOLECULE.DRAW_LAYOUT.BACKGROUND_ADD);
    backgroundAdd.innerHTML = "";
    let layoutAdd = document.getElementById(CONFIG_MOLECULE.DRAW_LAYOUT.ADD);
    layoutAdd.innerHTML = "";
}

/*=============================================================

=============================================================*/
const event = ref();

export function Draw_init(panel) {
    event.value = panel;
}

/*=============================================================

=============================================================*/
export function Draw_Molecule(molecule, LayoutMolecule = CONFIG_MOLECULE.DRAW_LAYOUT.MOLECULE, scale = CHEM_SETTING.getScale(), GroundAtom = CONFIG_MOLECULE.DRAW_LAYOUT.BACKGROUND_ATOM, GroundBond = CONFIG_MOLECULE.DRAW_LAYOUT.BACKGROUND_BOND) {
    Draw_ClearSelect();
    Draw_Clear();
    if (molecule == null || molecule.getAtomCount() < 1) {
        return;
    }
    let backgroundBond = document.getElementById(GroundBond);
    let backgroundAtom = document.getElementById(GroundAtom);
    let layoutMolecule = document.getElementById(LayoutMolecule);
    for (let i = 0; i < molecule.getAtomCount(); i++) {
        let atom = molecule.getAtomByIndex(i);
        if (!atom.groupIn) {
            let title = null;
            if (atom.groupId >= 0) {
                title = molecule.getGroupById(atom.groupId).title;
            }
            DrawAtom(layoutMolecule, atom, scale, SETTING_DRAW.value.SHOW_NUMBER_ATOM, "molecule-atomId-", title);
            DrawAtomBackground(backgroundAtom, atom, scale, event.value.touchSelect, event.value.touchCancel, event.value.touchSelectMove, event.value.touchAtom, layout_background_atom);
        }
    }
    for (let i = 0; i < molecule.getBondCount(); i++) {
        let bond = molecule.getBondByIndex(i);
        let atomA = molecule.getAtomById(bond.begin);
        let atomB = molecule.getAtomById(bond.end);
        if (!atomA.groupIn && !atomB.groupIn) {
            // let selected = atomA.getSelected() && atomB.getSelected() ? true : false;
            let bondData = new DrawBondData(atomA.position, atomB.position, bond, atomA.isLabelShow(), atomB.isLabelShow(), scale);
            Draw_Bond(layoutMolecule, bondData, SETTING_DRAW.value.SHOW_NUMBER_BOND, "molecule-bondId-");
            Draw_BondBackground(bond.id, backgroundBond, atomA.position, atomB.position, scale, false, event.value.touchSelect, event.value.touchCancel, event.value.touchBond, layout_background_bond);
        }
    }
}

/*=============================================================

=============================================================*/
export function Draw_Move(molecule, scale = CHEM_SETTING.getScale(), backgroundState = true, selectBond = -1) {
    Draw_ClearSelect();
    let layoutMolecule = document.getElementById(CONFIG_MOLECULE.DRAW_LAYOUT.ADD);
    for (let i = 0; i < molecule.getAtomCount(); i++) {
        let atom = molecule.getAtomByIndex(i);
        if (!atom.groupIn) {
            let title = null;
            if (atom.groupId >= 0) title = molecule.getGroupById(atom.groupId).title;
            DrawAtom(layoutMolecule, atom, scale, false, "molecule-atomId-", title);
        }
    }
    for (let i = 0; i < molecule.getBondCount(); i++) {
        let bond = molecule.getBondById(i);
        let atomA = molecule.getAtomById(bond.begin);
        let atomB = molecule.getAtomById(bond.end);
        if (!atomA.groupIn && !atomB.groupIn) {
            let bondData = new DrawBondData(atomA.position, atomB.position, bond, atomA.isLabelShow(), atomB.isLabelShow(), scale);
            if (bondData.id === selectBond) {
                bondData.color = CONFIG_MOLECULE.DRAW_BOND.backgroundEnterColor;
            }
            Draw_Bond(layoutMolecule, bondData, false, "child-bondId-");
        }
    }
}

/*=============================================================

=============================================================*/
export function Draw_EventChangePoint(id, color, select) {
    let element = document.getElementById(layout_background_atom + id);
    if (!element) {
        return null;
    }
    element.setAttribute(nameSelected, select);
    element.style.fill = color;
    return element;
}

export function Draw_EventChangeLine(id, strokeColor, select) {
    let element = document.getElementById(layout_background_bond + id);
    if (!element) {
        return null;
    }
    element.setAttribute(nameSelected, select);
    element.style.stroke = strokeColor;
    return element;
}

/*=============================================================

=============================================================*/
const DrawSelect = function (molecule, coordinate) {
    if (molecule == null || molecule.getAtomCount() < 1) {
        return;
    }
    let layoutBackground = document.getElementById(CONFIG_MOLECULE.DRAW_LAYOUT.BACKGROUND_ADD);
    let layoutMolecule = document.getElementById(CONFIG_MOLECULE.DRAW_LAYOUT.ADD);
    for (let i = 0; i < molecule.getAtomCount(); i++) {
        let atom = molecule.getAtomByIndex(i);
        DrawAtom(layoutMolecule, atom, coordinate.scale, false);
        // DrawAtomBackground(layoutBackground, atom, coordinate.scale);
    }
    for (let i = 0; i < molecule.getBondCount(); i++) {
        let bond = molecule.getBondByIndex(i);
        let atomA = molecule.getAtomById(bond.begin);
        // console.log(atomA.position);
        let atomB = molecule.getAtomById(bond.end);
        // console.log(atomB.position);
        let selected = atomA.getSelected() && atomB.getSelected() ? true : false;
        let bondData = new DrawBondData(atomA.position, atomB.position, bond, atomA.isLabelShow(), atomB.isLabelShow(), coordinate.scale);
        // console.log(bondData);
        DrawBond(layoutMolecule, bondData, false);
        // DrawBondBackground(bondData.id, layoutBackground, atomA.position, atomB.position, coordinate.scale, false);
    }
}
