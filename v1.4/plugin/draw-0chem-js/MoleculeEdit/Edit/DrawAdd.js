import {CONFIG_MOLECULE} from "../../config";
import Vector from "../../Molecule/Base/Vector";
import {DrawOperate_BondLine} from "../Draw/DrawOperate";
import {finishMolecule, getChild, getMoleculeData, setChild} from "../cache";
import {MoleculeIdentify} from "../../MoleculeDraw/Identify/MoleculeIdentify";
import {Draw_Move, Draw_Molecule} from "../../MoleculeDraw/DrawMolecule";
import {BOND_STEREO, BOND_TYPE, DataBond} from "../../Molecule/Data/DataBond";
import {getDegree} from "../../MoleculeDraw/Identify/MoleculeCross";
import {MoleculeRing_Add, MoleculeRing_Move} from "./DrawRing";
import {DataAtom} from "../../Molecule/Data/DataAtom";
import MoleculeSelect from "../MoleculeSelect";
import {Fast_Move} from "./DrawFast";
import {crossAtom} from "../../MoleculeDraw/Identify/MoleculeCross";

/*=============================================================
判断状态
=============================================================*/
function NewAtom(molecule, position, elementId = 6) {
    let atomA = new DataAtom(molecule.getAtomNewId(), elementId, position);
    molecule.addAtom = atomA;
}

function NewBond(molecule, position, id, bondDegree, bondType = BOND_TYPE.BOND_SINGLE, bondStereo = BOND_STEREO.NONE, bondLength = CONFIG_MOLECULE.DRAW_BOND.BOND_LENGTH, elementId = 6) {
    let atomA = new DataAtom(molecule.getAtomNewId(), elementId, position);
    if (id >= 0) atomA.linkId = id;
    molecule.addAtom = atomA;
    let p = Vector.Create(position.x + bondLength * Math.cos(bondDegree), position.y + bondLength * Math.sin(bondDegree), position.z);
    let atomB = new DataAtom(molecule.getAtomNewId(), elementId, p);
    molecule.addAtom = atomB;
    let d = crossAtom(getMoleculeData(), p);
    if (d >= 0) atomB.linkId = d;
    let bond = new DataBond(molecule.getBondNewId(), atomA.getId(), atomB.getId(), bondType, bondStereo);//在添加时，使用atomId，放入数据时，修改成正确的id
    molecule.addBond = bond;
}

/*=============================================================
判断状态
=============================================================*/
export function Add_is(operateName, state = 0) {
    return operateName === CONFIG_MOLECULE.OPERATE_NAME.ATOM || operateName === CONFIG_MOLECULE.OPERATE_NAME.BOND
        || operateName === CONFIG_MOLECULE.OPERATE_NAME.RING || operateName === CONFIG_MOLECULE.OPERATE_NAME.GROUP
        || operateName === CONFIG_MOLECULE.OPERATE_NAME.FAST;
}

export function Add_isAtom(operateName, state = 0) {
    return operateName === CONFIG_MOLECULE.OPERATE_NAME.BOND || operateName === CONFIG_MOLECULE.OPERATE_NAME.RING || operateName === CONFIG_MOLECULE.OPERATE_NAME.GROUP || operateName === CONFIG_MOLECULE.OPERATE_NAME.FAST;
}

export function Add_isBond(operateName, state = 0) {
    return operateName === CONFIG_MOLECULE.OPERATE_NAME.RING || operateName === CONFIG_MOLECULE.OPERATE_NAME.GROUP || operateName === CONFIG_MOLECULE.OPERATE_NAME.FAST;
}

/*=============================================================

=============================================================*/
export function Add_Add(operate, position, id = -1) {
    let child = new MoleculeSelect();
    if (operate.operateName === CONFIG_MOLECULE.OPERATE_NAME.BOND) {
        //通过标准坐标系进行计算
        let degree = Math.PI / 6;
        if (child.selectId >= 0) {
            let molecule = getMoleculeData();
            let atom = molecule.getAtomById(child.selectId);
            if (atom !== null) degree = getDegree(atom, operate.operateValue);
        }
        if (id >= 0) {
            let molecule = getMoleculeData();
            let atom = molecule.getAtomById(id);
            if (atom !== null) degree = getDegree(atom, operate.operateValue);
        }
        NewBond(child.molecule, position, id, degree, operate.operateValue, operate.operateArg);
    } else if (operate.operateName === CONFIG_MOLECULE.OPERATE_NAME.ATOM) {
        //通过标准坐标系进行计算
        NewAtom(child.molecule, position, operate.operateValue);
    } else if (operate.operateName === CONFIG_MOLECULE.OPERATE_NAME.FAST) {
        let atomA = new DataAtom(child.molecule.getAtomNewId(), 6, position);
        child.molecule.addAtom = atomA;
    } else if (operate.operateName === CONFIG_MOLECULE.OPERATE_NAME.RING) {
        if (!MoleculeRing_Add(child, operate, position, id)) {
            return false;
        }
    } else {
        return false;
    }
    MoleculeIdentify(child.molecule);
    Draw_Move(child.molecule);
    setChild(child);
    return true;
}

/*=============================================================

=============================================================*/
export function Add_Move(operate, mouse) {
    let child = getChild();
    if (operate.operateName === CONFIG_MOLECULE.OPERATE_NAME.BOND) {
        let atomA = child.molecule.getAtomById(0);
        let atomB = child.molecule.getAtomById(1);
        let degree = Math.atan2(mouse.y - atomA.position.y, mouse.x - atomA.position.x);
        let position = Vector.Create(atomA.position.x + CONFIG_MOLECULE.DRAW_BOND.BOND_LENGTH * Math.cos(degree), atomA.position.y + CONFIG_MOLECULE.DRAW_BOND.BOND_LENGTH * Math.sin(degree), atomA.position.z);
        atomB.position = position;
        MoleculeIdentify(child.molecule);
        Draw_Move(child.molecule);
        DrawOperateLine_Bond(atomA, operate, degree, -1);
    } else if (operate.operateName === CONFIG_MOLECULE.OPERATE_NAME.ATOM) {
        let atomA = child.molecule.getAtomById(0);
        atomA.position = mouse;
        Draw_Move(child.molecule);
    } else if (operate.operateName === CONFIG_MOLECULE.OPERATE_NAME.RING) {
        let position = child.position;
        let a = {index: -1, degree: 1000, f: 0, radianText: 0};
        a.degree = Math.atan2(mouse.y - position.y, mouse.x - position.x);
        MoleculeRing_Move(child, position, a.degree);
        if ((a.degree < 0 && a.degree > -180) || a.degree > 180) {
            a.f = 1;
        }
        Draw_Move(child.molecule);
        // DrawOperate_BondLine(position, parseInt(a.degree * 180 / Math.PI), a.degree, radianAC, getCoordinate().scale, a.f);
    } else if (operate.operateName === CONFIG_MOLECULE.OPERATE_NAME.FAST) {
        Fast_Move(child, operate, mouse);
    }
}

/*=============================================================

=============================================================*/
export function Add_Finish(operate) {
    if (finishMolecule()) {
        Draw_Molecule(getMoleculeData());
    }
}

function DrawOperateLine_Bond(atomA, operate, radianAB, idB) {
    let radianAC = 0, a = {index: -1, degree: 1000, f: 0, radianText: 0};
    if (atomA.linkId >= 0) {
        let atom = getMoleculeData().getAtomById(atomA.linkId);
        for (let i in atom.neighbors) {
            let item = atom.neighbors[i];
            if (item.atomId !== idB) {
                let degree = Math.abs(radianAB - item.radians);
                if (degree > Math.PI) degree = Math.PI * 2 - degree;
                if (degree < -Math.PI) degree = Math.PI * 2 + degree;
                if (degree < a.degree) {
                    a.degree = degree;
                    a.index = i;
                    radianAC = item.radians;
                }
            }
        }
        a.degree = parseInt((radianAB - radianAC) * 180 / Math.PI);
        a.radianText = (radianAB + radianAC) / 2;
        if ((a.degree < 0 && a.degree > -180) || a.degree > 180) {
            a.f = 1;
        }
        if ((a.degree < -180) || (a.degree > 180)) {
            a.radianText += Math.PI;
        }
    } else {
        a.degree = parseInt(radianAB * 180 / Math.PI);
        radianAB = a.degree * Math.PI / 180;
        radianAC = 0;
        a.radianText = radianAB / 2;
        if (a.degree < 0) {
            a.f = 1;
            a.degree = -a.degree;
        }
    }
    DrawOperate_BondLine(atomA.position, a.degree, radianAB, radianAC, a.f);
}

const DrawEditBond = (operate) => {
    let molecule = getMoleculeCopy();
    // console.log(molecule);
    let bond = molecule.getBondById(operate.id);
    // console.log(bond);
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
        } else {
            bond.bondType = operate.operateValue;
            bond.bondStereo = operate.operateArg;
        }
    } else if (operate.operateName === CONFIG_MOLECULE.OPERATE_NAME.RING) {
        MoleculeRingBond(bond, molecule, operate);
        MoleculeIdentify(molecule);
        console.log(molecule);
    } else if (operate.operateName === CONFIG_MOLECULE.OPERATE_NAME.ERASER) {
        let bond = molecule.getBondById(operate.id);
        MoleculeIdentify(molecule);
    } else {
        return false;
    }
    let clear = {bonds: [operate.id]};
    DrawClear(clear);
    DrawMolecule(molecule);
    setChild(molecule);
    return true;
}

const DrawHoverSelectAtom = (e, operate) => {
    if (operate.operateName === CONFIG_MOLECULE.OPERATE_NAME.FAST) {
        return;
    }
    e.target.style.fill = CONFIG_MOLECULE.DRAW_ATOM.backgroundEnterColor;
    // if (operate.operateName === OPERATE_NAME.bond && mouseState.value.state) {
    //     let selected = selectGet();
    //     if (selected.selectId !== operate.id) {
    //         let molecule = getMoleculeData();
    //         let atom = molecule.getAtomById(operate.id);
    //         if (atom) {
    //             let child = getChild();
    //             let atomA = child.getAtomById(selected.selectId);
    //             let atomB = child.getAtomById(selected.selectAtoms[0]);
    //             atomB.enable = atom.getId();
    //             atomB.position = atom.position.Clone();
    //             let degree = Math.atan2(atom.position.y - atomA.position.y, atom.position.x - atomA.position.x);
    //             MoleculeIdentify(child);
    //             DrawOperatoLine(atomA, operate, degree, atomB.getId());
    //             DrawMove(child, getCoordinate(), selected);
    //             console.log(child);
    //         }
    //     }
    // }
}
