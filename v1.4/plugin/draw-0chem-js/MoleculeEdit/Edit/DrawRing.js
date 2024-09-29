/*
Author: 史岩
Author URL: http://www.0chem.com
Date: 2022.2.21
*/
import Vector from "../../Molecule/Base/Vector";
import {CONFIG_MOLECULE, CHEM_SETTING} from "../../config";
import {BOND_TYPE, BOND_STEREO, DataBond} from "../../Molecule/Data/DataBond";
import {getMoleculeData} from "../cache";
import {DrawPoint} from "../../MoleculeDraw/Draw/DrawOther";
import {DataAtom} from "../../Molecule/Data/DataAtom";
import {drawCircle} from "../Draw/DrawOperate";
import {getDegree} from "../../MoleculeDraw/Identify/MoleculeCross";

/*=============================================================
判断状态
=============================================================*/
export const RING_ADD = {
    LINE: 1, FAST: 2,
    RING5: [{bondType: BOND_TYPE.BOND_SINGLE},
        {bondType: BOND_TYPE.BOND_DOUBLE, bondStereo: BOND_STEREO.STEREO_DOWN},
        {bondType: BOND_TYPE.BOND_SINGLE},
        {bondType: BOND_TYPE.BOND_DOUBLE, bondStereo: BOND_STEREO.STEREO_DOWN},
        {bondType: BOND_TYPE.BOND_SINGLE}],
    RING6: [{bondType: BOND_TYPE.BOND_DOUBLE, bondStereo: BOND_STEREO.STEREO_DOWN},
        {bondType: BOND_TYPE.BOND_SINGLE},
        {bondType: BOND_TYPE.BOND_DOUBLE, bondStereo: BOND_STEREO.STEREO_DOWN},
        {bondType: BOND_TYPE.BOND_SINGLE},
        {bondType: BOND_TYPE.BOND_DOUBLE, bondStereo: BOND_STEREO.STEREO_DOWN},
        {bondType: BOND_TYPE.BOND_SINGLE}],
    RING7: [{bondType: BOND_TYPE.BOND_SINGLE},
        {bondType: BOND_TYPE.BOND_SINGLE},
        {bondType: BOND_TYPE.BOND_SINGLE},
        {bondType: BOND_TYPE.BOND_SINGLE},
        {bondType: BOND_TYPE.BOND_SINGLE},
        {bondType: BOND_TYPE.BOND_SINGLE},
        {bondType: BOND_TYPE.BOND_SINGLE}],
    RING8: [{bondType: BOND_TYPE.BOND_SINGLE},
        {bondType: BOND_TYPE.BOND_SINGLE},
        {bondType: BOND_TYPE.BOND_SINGLE},
        {bondType: BOND_TYPE.BOND_SINGLE},
        {bondType: BOND_TYPE.BOND_SINGLE},
        {bondType: BOND_TYPE.BOND_SINGLE},
        {bondType: BOND_TYPE.BOND_SINGLE},
        {bondType: BOND_TYPE.BOND_SINGLE}]
}

/*=============================================================
判断状态
=============================================================*/
function Add(molecule, operate, mouse, degreeStart = Math.PI / 2, linkId = -1, atomId = -1) {
    let atom_begin = -1, atom_end = -1, atom_current = -1, value = operate.operateValue;
    let r = CONFIG_MOLECULE.DRAW_BOND.BOND_LENGTH / 2 / Math.sin(Math.PI / value.length);
    for (let i = 0; i < value.length; i++) {
        let degree = i * Math.PI * 2 / value.length + degreeStart;
        let atom_position = Vector.Create(mouse.x - r * Math.cos(degree), mouse.y - r * Math.sin(degree));
        let atom = new DataAtom(molecule.getAtomNewId(), 6, atom_position);
        if (i === 0) {
            if (linkId >= 0) atom.linkId = linkId;
            if (atomId >= 0) {
                let bond = new DataBond(molecule.getBondNewId(), atomId, atom.getId());//在添加时，使用atomId，放入数据时，修改成正确的id
                molecule.addBond = bond;
            }
        }
        molecule.addAtom = atom;
        if (i > 0) {
            let bondType = value[i - 1].bondType, bondStereo = BOND_STEREO.NONE;
            if (value[i - 1].bondStereo) {
                bondStereo = value[i - 1].bondStereo;
            }
            let bond = new DataBond(molecule.getBondNewId(), atom_current, atom.getId(), bondType, bondStereo);//在添加时，使用atomId，放入数据时，修改成正确的id
            molecule.addBond = bond;
        }
        atom_current = atom.getId();
        if (i === 0) atom_begin = atom.getId();
        if (i === value.length - 1) atom_end = atom.getId();
    }
    if (atom_begin >= 0 && atom_end >= 0) {
        let bondType = value[value.length - 1].bondType, bondStereo = BOND_STEREO.NONE;
        if (value[value.length - 1].bondStereo) {
            bondStereo = value[value.length - 1].bondStereo;
        }
        let bond = new DataBond(molecule.getBondNewId(), atom_begin, atom_end, bondType, bondStereo);//在添加时，使用atomId，放入数据时，修改成正确的id
        molecule.addBond = bond;
    }
    return true;
}

function AddAtom(molecule, operate, atom, id = -1, scale = 1) {
    let origin_degree = Math.PI / 2, v = operate.operateValue, position = atom.position.Clone(), atomId = -1;
    let r = scale * CONFIG_MOLECULE.DRAW_BOND.BOND_LENGTH / 2 / Math.sin(Math.PI / v.length);
    if (atom.getNeighborCount() === 1) {
        let neighbor = atom.getNeighborByIndex(0);
        origin_degree = neighbor.radians + Math.PI;
        position = Vector.Create(position.x + r * Math.cos(origin_degree), position.y + r * Math.sin(origin_degree), position.z);
    } else if (atom.getNeighborCount() > 1) {
        let bondType = BOND_TYPE.BOND_SINGLE, bondStereo = BOND_STEREO.NONE;
        origin_degree = getDegree(atom, bondType);
        let atomA = new DataAtom(molecule.getAtomNewId(), 6, position);
        atomA.linkId = id;
        molecule.addAtom = atomA;
        id = -1;
        atomId = atomA.getId();
        position =Vector.Create(position.x + (r + CONFIG_MOLECULE.DRAW_BOND.BOND_LENGTH) * Math.cos(origin_degree), position.y + (r + CONFIG_MOLECULE.DRAW_BOND.BOND_LENGTH) * Math.sin(origin_degree), position.z);
    }
    // console.log("============ " + atom.getNeighborCount());
    // let layout = document.getElementById( CONFIG_MOLECULE.DRAW_LAYOUT.ADD);
    // drawCircle("a-001", layout, position.x, position.y, 3, CHEM_SETTING.DRAW.value.COLOR_AUXILIARY_LINE);
    return Add(molecule, operate, position, origin_degree, id, atomId);
}

export function MoleculeRing_Add(child, operate, mouse, id) {
    if (operate.operateValue.length < 3) return false;
    child.position = mouse.Clone();
    if (id < 0) {
        return Add(child.molecule, operate, mouse);
    }
    let source = getMoleculeData();
    let atom = source.getAtomById(id);
    if (atom != null && atom.getNeighborCount() > 0) {
        child.position = atom.position.Clone();
        if (AddAtom(child.molecule, operate, atom, id)) {
            child.backup();
        }
        return true;
    }
    return false;
}

function Move(molecule, position, radian) {
    let r = CONFIG_MOLECULE.DRAW_BOND.BOND_LENGTH / 2 / Math.sin(Math.PI / molecule.getAtomCount());
    for (let i = 0; i < molecule.getAtomCount(); i++) {
        let degree = Math.PI / 2 + i * Math.PI * 2 / molecule.getAtomCount() + radian;
        let atom_position =Vector.Create(position.x - r * Math.cos(degree), position.y - r * Math.sin(degree));
        molecule.atoms[i].position = atom_position;
    }
    return true;
}

export function MoleculeRing_Move(child, position, radian) {
    let atom = child.molecule.getAtomByIndex(0), origin_degree = 0;
    if (atom.linkId >= 0) {
        let o = getMoleculeData().getAtomById(atom.linkId);
        if (o.getNeighborCount() === 1) {
            let neighbor = o.getNeighborByIndex(0);
            origin_degree = radian - neighbor.radians + Math.PI;
        } else if (o.getNeighborCount() > 1) {
            origin_degree = radian - getDegree(atom) + Math.PI * 2 / 3;
        }
        for (let i = 1; i < child.molecule.getAtomCount(); i++) {
            let b = child.source.getAtomByIndex(i);
            let width = b.position.x - position.x, height = b.position.y - position.y;
            let length = Math.sqrt(width * width + height * height), d = Math.atan2(height, width) % (2 * Math.PI);
            let a = child.molecule.getAtomByIndex(i);
            a.position =Vector.Create(o.position.x + length * Math.cos(d + origin_degree), o.position.y + length * Math.sin(d + origin_degree), o.position.z);
        }
        return origin_degree;
    }
    return Move(child.molecule, position, radian);
}

// export function MoleculeRing_Move(molecule, position, radian) {
//     let r = CONFIG_MOLECULE.DRAW_BOND.BOND_LENGTH / 2 / Math.sin(Math.PI / molecule.getAtomCount());
//     for (let i = 0; i < molecule.getAtomCount(); i++) {
//         let degree = Math.PI / 2 + i * Math.PI * 2 / molecule.getAtomCount() + radian;
//         let atom_position =Vector.Create(position.x - r * Math.cos(degree), position.y - r * Math.sin(degree));
//         molecule.atoms[i].position = atom_position;
//     }
//     return true;
// }

/*=============================================================
判断状态
=============================================================*/
// const AddRing = function (position, atom_begin, radian, molecule, v, r) {
//     let atom_current = atom_begin;
//     for (let i = 1; i < v.length; i++) {
//         let degree = radian + i * Math.PI * 2 / v.length;
//         let positionA =Vector.Create(position.x - r * Math.cos(degree), position.y - r * Math.sin(degree), position.z);
//         let atom_id = crossAtom(molecule, positionA, getCoordinate().scale);
//         if (atom_id < 0) {
//             atom_id = NewAtom(molecule, positionA).getId();
//         }
//         let existBondId = existBond(molecule, atom_current, atom_id);
//         if (existBondId < 0) {
//             let bondType = v[i - 1].bondType, bondStereo = BOND_STEREO.NONE;
//             if (v[i - 1].bondStereo) {
//                 bondStereo = v[i - 1].bondStereo;
//             }
//             LinkBond(molecule, atom_current, atom_id, bondType, bondStereo);
//         }
//         atom_current = atom_id;
//     }
//     if (atom_begin >= 0 && atom_current >= 0) {
//         LinkBond(molecule, atom_begin, atom_current, v[v.length - 1].bondType, BOND_STEREO.NONE);
//     }
//     console.log(molecule);
//     return true;
// }

// const MoleculeRingAdd = function (mouse, molecule, operate) {
//     if (operate.operateValue.length > 4) {
//         let atom_begin = -1, atom_end = -1, atom_current = -1, value = operate.operateValue;
//         let r = CONFIG_MOLECULE.DRAW_BOND.BOND_LENGTH / 2 / Math.sin(Math.PI / value.length);
//         for (let i = 0; i < value.length; i++) {
//             let degree = Math.PI / 2 + i * Math.PI * 2 / value.length;
//             let atom_position =Vector.Create(mouse.x - r * Math.cos(degree), mouse.y - r * Math.sin(degree), mouse.z);
//             let atom_id = crossAtom(molecule, atom_position, getCoordinate().scale);
//             if (atom_id < 0) {
//                 atom_id = NewAtom(molecule, atom_position).getId();
//             }
//             if (i > 0) {
//                 let existBondId = existBond(molecule, atom_current, atom_id);
//                 if (existBondId < 0) {
//                     let bondType = value[i - 1].bondType, bondStereo = BOND_STEREO.NONE;
//                     if (value[i - 1].bondStereo) {
//                         bondStereo = value[i - 1].bondStereo;
//                     }
//                     LinkBond(molecule, atom_current, atom_id, bondType, bondStereo);
//                 }
//             }
//             atom_current = atom_id;
//             if (i === 0) atom_begin = atom_id;
//             if (i === value.length - 1) atom_end = atom_id;
//         }
//         if (atom_begin >= 0 && atom_end >= 0) {
//             LinkBond(molecule, atom_begin, atom_end, BOND_TYPE.BOND_SINGLE, BOND_STEREO.NONE);
//         }
//         return true;
//     }
//     return false;
// }

export const MoleculeRingBond = (bond, molecule, operate) => {
    let v = operate.operateValue;
    let r = CONFIG_MOLECULE.DRAW_BOND.BOND_LENGTH / 2 / Math.sin(Math.PI / v.length);
    let atomA = molecule.getAtomById(bond.begin), atomB = molecule.getAtomById(bond.end);
    let degree = (Math.PI - 2 * Math.PI / v.length) / 2;
    let position =Vector.Create(0, 0, 0);
    let mirror = 1;
    console.log(degree * 180 / Math.PI);
    if (atomB.position.y > atomA.position.y || (atomB.position.y === atomA.position.y && atomB.position.x < atomA.position.x)) {
        mirror = getMirror(bond, molecule, atomA, atomB, v);
        position.Move(atomA.position.x, atomA.position.y);
        degree -= Math.abs(atomA.position.Radians(atomB.position)) * mirror;
    } else {
        mirror = getMirror(bond, molecule, atomB, atomA, v);
        position.Move(atomB.position.x, atomB.position.y);
        degree -= Math.abs(atomB.position.Radians(atomA.position)) * mirror;
    }
    console.log(degree * 180 / Math.PI);
    position.Move(r * Math.cos(degree), -r * Math.sin(degree) * mirror, 0);
    DrawPoint(10001, position.x, position.y);
    let atom_begin = -1, atom_end = -1, atom_current = -1;
    if (mirror === 1) {
        degree = Math.PI - degree;
    } else {
        degree = degree - Math.PI + 2 * Math.PI / v.length;
    }
    console.log(degree * 180 / Math.PI);
    for (let i = 0; i < v.length; i++) {
        let angle = degree + i * Math.PI * 2 / v.length;
        let atom_position =Vector.Create(position.x + r * Math.cos(angle), position.y + r * Math.sin(angle), position.z);
        let atom_id = crossAtom(molecule, atom_position, getCoordinate().scale);
        if (atom_id < 0) {
            atom_id = NewAtom(molecule, atom_position).getId();
        }
        if (i > 0) {
            let existBondId = existBond(molecule, atom_current, atom_id);
            if (existBondId < 0) {
                let bondType = v[i - 1].bondType, bondStereo = BOND_STEREO.NONE;
                if (v[i - 1].bondStereo) {
                    bondStereo = v[i - 1].bondStereo;
                }
                LinkBond(molecule, atom_current, atom_id, bondType, bondStereo);
            }
        }
        atom_current = atom_id;
        if (i === 0) atom_begin = atom_id;
        if (i === v.length - 1) atom_end = atom_id;
    }
    // if (atom_begin >= 0 && atom_end >= 0) {
    //     LinkBond(molecule, atom_begin, atom_end, BOND_TYPE.BOND_SINGLE, BOND_STEREO.NONE);
    // }
    // console.log(position);
}

const getMirror = (bond, molecule, atomA, atomB, v) => {
    // let degree = (Math.PI - 2 * Math.PI / v.length) / 2;
    let degreeB = atomA.position.Radians(atomB.position);
    let degreeA = atomB.position.Radians(atomA.position);
    console.log("A:" + atomB.getId() + " " + (degreeA * 180 / Math.PI));
    let boolA = false, boolB = false;
    for (let item of atomA.neighbors) {
        console.log(item);
        if (item.atomId !== atomB.getId() && item.radians > degreeA) {
            boolA = true;
        }
    }
    console.log("B: " + atomA.getId() + " " + (degreeB * 180 / Math.PI));
    for (let item of atomB.neighbors) {
        console.log(item);
        if (item.atomId !== atomA.getId() && item.radians < degreeB) {
            boolB = true;
        }
    }
    if (boolA && boolB) return -1;
    return 1;
}