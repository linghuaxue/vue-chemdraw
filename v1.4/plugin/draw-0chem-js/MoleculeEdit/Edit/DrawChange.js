/*
Author: 史岩
Author URL: http://www.0chem.com
Date: 2022.2.21
*/

import {CONFIG_MOLECULE} from "../../config";
import {Cathe_Log, finishMolecule, getMoleculeData, getMoleculeDuplicate, setChild} from "../cache";
import {BOND_STEREO, BOND_TYPE} from "../../Molecule/Data/DataBond";
import {MoleculeIdentify} from "../../MoleculeDraw/Identify/MoleculeIdentify";
import {Draw_Molecule} from "../../MoleculeDraw/DrawMolecule";

/*=============================================================
判断状态
=============================================================*/
export function Change_isBond(operateName, state = 0) {
    if (operateName === CONFIG_MOLECULE.OPERATE_NAME.ERASER || operateName === CONFIG_MOLECULE.OPERATE_NAME.BOND) {
        return true;
    }
    return false;
}

export function Change_isAtom(operateName, state = 0) {
    if (operateName === CONFIG_MOLECULE.OPERATE_NAME.ATOM || operateName === CONFIG_MOLECULE.OPERATE_NAME.ERASER || operateName === CONFIG_MOLECULE.OPERATE_NAME.ION) {
        return true;
    }
    return false;
}

/*=============================================================
判断状态
=============================================================*/
export function Change_Bond(operate, position, id) {
    id = parseInt(id);
    let molecule = getMoleculeDuplicate();
    let bond = molecule.getBondById(id);
    if (operate.operateName === CONFIG_MOLECULE.OPERATE_NAME.BOND) {
        if (operate.operateValue === BOND_TYPE.BOND_SINGLE && operate.operateArg === BOND_STEREO.NONE
            && bond.bondType === BOND_TYPE.BOND_SINGLE) {
            bond.bondType = BOND_TYPE.BOND_DOUBLE;
            bond.bondStereo = BOND_STEREO.NONE;
        } else if (operate.operateValue === BOND_TYPE.BOND_DOUBLE && bond.bondType === BOND_TYPE.BOND_DOUBLE) {
            switch (bond.bondStereo) {
                case BOND_STEREO.NONE:
                    bond.bondStereo = BOND_STEREO.STEREO_UP;
                    break
                case BOND_STEREO.STEREO_UP:
                    bond.bondStereo = BOND_STEREO.STEREO_DOWN;
                    break
                case BOND_STEREO.STEREO_DOWN:
                    bond.bondStereo = BOND_STEREO.NONE;
                    break
            }
        } else if (operate.operateValue === BOND_TYPE.BOND_TRIPLE && bond.bondType === BOND_TYPE.BOND_TRIPLE) {
            switch (bond.bondStereo) {
                case BOND_STEREO.NONE:
                    bond.bondStereo = BOND_STEREO.STEREO_EITHER;
                    break
                case BOND_STEREO.STEREO_EITHER:
                    bond.bondStereo = BOND_STEREO.NONE;
                    break
            }
        } else if (operate.operateValue === BOND_TYPE.BOND_SINGLE && operate.operateArg > 0 && bond.bondStereo > 0 && bond.bondStereo !== BOND_STEREO.STEREO_EITHER && operate.operateArg === bond.bondStereo) {
            let t = bond.begin;
            bond.begin = bond.end;
            bond.end = t;
        } else {
            bond.bondType = operate.operateValue;
            bond.bondStereo = operate.operateArg;
        }
    } else if (operate.operateName === CONFIG_MOLECULE.OPERATE_NAME.RING) {
        MoleculeRingBond(bond, molecule, operate);
    } else if (operate.operateName === CONFIG_MOLECULE.OPERATE_NAME.ERASER) {
        let m = getMoleculeData();
        let atomA = m.getAtomById(bond.begin);
        if (atomA.getNeighborCount() === 1) molecule.removeAtomById(bond.begin);
        let atomB = m.getAtomById(bond.end);
        if (atomB.getNeighborCount() === 1) molecule.removeAtomById(bond.end);
        molecule.removeBondById(id);
    } else {
        return false;
    }
    MoleculeIdentify(molecule);
    Draw_Molecule(molecule);
    setChild(2, molecule);
    Cathe_Log();
    return true;
}

export function Change_Atom(operate, id) {
    id = parseInt(id);
    let molecule = getMoleculeData().Copy();
    let atom = molecule.getAtomById(id);
    if (operate.operateName === CONFIG_MOLECULE.OPERATE_NAME.ION) {
        atom.charge += parseInt(operate.operateValue);
    } else if (operate.operateName === CONFIG_MOLECULE.OPERATE_NAME.ATOM) {
        atom.elementId = operate.operateValue;
    } else if (operate.operateName === CONFIG_MOLECULE.OPERATE_NAME.ERASER) {
        molecule.removeAtomById(id);
        for (let i = 0; i < molecule.getBondCount(); i++) {
            let bond = molecule.getBondByIndex(i);
            if (bond.begin === id || bond.end === id) {
                molecule.removeBondByIndex(i);
            }
        }
    }
    MoleculeIdentify(molecule);
    Draw_Molecule(molecule);
    setChild(2, molecule);
}

/*=============================================================
判断状态
=============================================================*/
export function Change_Finish(operate) {
    console.log("============ change finish");
    if (finishMolecule(2)) {
        Draw_Molecule(getMoleculeData());
    }
}