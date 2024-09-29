/*
Author: 史岩
Author URL: http://www.0chem.com
Date: 2022.8.20
*/

import {CHEM_SETTING, CONFIG_MOLECULE} from "../../config";
import {finishMolecule, getMoleculeData, getMoleculeDuplicate, setChild} from "../cache";
import Coordinate from "../../MoleculeDraw/Base/Coordinate";
import Vector from "../../Molecule/Base/Vector";
import {MoleculeIdentify} from "../../MoleculeDraw/Identify/MoleculeIdentify";
import {Draw_Molecule} from "../../MoleculeDraw/DrawMolecule";

/*=============================================================
鼠标操作
=============================================================*/
function move(molecule, x1, y1, x2, y2, source = getMoleculeData()) {
    // console.log("x1:" + x1 + " y1:" + y1 + " x2:" + x2 + " y2" + y2);
    for (let i = 0; i < source.getAtomCount(); i++) {
        let atomSource = source.getAtomByIndex(i);
        let atom = molecule.getAtomByIndex(i);
        atom.position =Vector.Create(atomSource.position.x + x1 - x2, atomSource.position.y + y1 - y2, atomSource.position.z);
    }
    MoleculeIdentify(molecule);
    Draw_Molecule(molecule,  CONFIG_MOLECULE.DRAW_LAYOUT.ADD);
    setChild(2, molecule);
}

function scale(molecule, y1, y2, source = getMoleculeData()) {
    let coordinate = new Coordinate(CHEM_SETTING.getScale());
    coordinate.scale += (y1 - y2) / 1000;
    for (let i = 0; i < source.getAtomCount(); i++) {
        let atomSource = source.getAtomByIndex(i);
        let atom = molecule.getAtomByIndex(i);
        atom.position = coordinate.Scale(atomSource.position);
    }
    Draw_Molecule(molecule);
}

/*=============================================================
鼠标操作
=============================================================*/
export function Scale_is(operateName, state = 0) {
    if (operateName === CONFIG_MOLECULE.OPERATE_NAME.SCALE || operateName === CONFIG_MOLECULE.OPERATE_NAME.MOVE) {
        return true;
    }
    return false;
}

export function Scale_Move(operate, tPosition, fPosition) {
    let molecule = getMoleculeDuplicate();
    if (operate.operateName === CONFIG_MOLECULE.OPERATE_NAME.MOVE) {
        move(molecule, tPosition.x, tPosition.y, fPosition.x, fPosition.y);
    } else if (operate.operateName === CONFIG_MOLECULE.OPERATE_NAME.SCALE) {
        scale(molecule, tPosition.y, fPosition.y);
    }
}

export function Scale_Finish(operate) {
    // console.log("============ change finish");
    // console.log(operate);
    if (operate.operateName === CONFIG_MOLECULE.OPERATE_NAME.MOVE) {
        if (finishMolecule(2)) {
            Draw_Molecule(getMoleculeData());
        }
    }
}