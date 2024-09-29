/*
Author: 史岩
Author URL: http://www.0chem.com
Date: 2022.2.21
*/

import {ref} from "vue";
import {CHEM_SETTING} from "../config";
import DataMolecule from "../Molecule/DataMolecule";
import {MoleculeIdentify} from "../MoleculeDraw/Identify/MoleculeIdentify";
import Coordinate from "../MoleculeDraw/Base/Coordinate.js";

/*=============================================================
鼠标操作
=============================================================*/
const cache = {
    moleculeList: ref({"list": [], "index": 0, "child": null, "molecule": null, "coordinate": null, "count": 1}),
    info: ref([]),
};

/*=============================================================
鼠标操作
=============================================================*/

/*=============================================================
鼠标操作
=============================================================*/
const initCache = (width, height) => {
    let data = cache.moleculeList.value;
    CHEM_SETTING.MOLECULE.COORDINATE.value = Coordinate.Create(1, width / 2, height / 2, 0);
    finishMolecule(1);
}

export function getMoleculeData() {
    let data = cache.moleculeList.value;
    if (data.list.length > 0 && data.index >= 0 && data.index < data.list.length)
        return data.list[data.index];
    return null;
}

export function getMoleculeDuplicate() {
    let data = cache.moleculeList.value;
    if (data.molecule === null) {
        data.molecule = getMoleculeData().Copy();
        MoleculeIdentify(data.molecule);
    }
    return data.molecule;
}

const setChild = (v, d) => {
    if (v === 2) {
        cache.moleculeList.value.molecule = d;
        return;
    }
    cache.moleculeList.value.child = v;
}

const getChild = () => {
    return cache.moleculeList.value.child;
}

// const addMolecule = (v) => {
//     let data = cache.moleculeList.value;
//     data.index++;
//     for (let i = 0; data.list.length > data.index; i++) {
//         let l = data.list.pop();
//         if (i > 100) break;
//     }
//     data.list.push(v);
//     // 检查最大记录数量
//     for (let i = 0; data.list.length > CHEM_SETTING.DRAW.value.HISTORY_COUNT; i++) {
//         let l = data.list.shift();
//         if (i > 100) break;
//     }
//     if (data.index >= CHEM_SETTING.DRAW.value.HISTORY_COUNT)
//         data.index = CHEM_SETTING.DRAW.value.HISTORY_COUNT - 1;
// }

function clearMoleculeList() {
    let data = cache.moleculeList.value;
    if (data.index > 0) {
        for (let i = 0; i < data.index; i++) {
            data.list.shift();
        }
        data.index = 0;
    }
    while (data.list.length >= CHEM_SETTING.DRAW.value.HISTORY_COUNT) {
        data.list.pop();
    }
}

const finishMolecule = (v, m) => {
    let data = cache.moleculeList.value;
    if (v === 99) {
        data.count++;
        clearMoleculeList();
        data.list.unshift(m);
        data.molecule = null;
        CHEM_SETTING.UI.MENU.value.DISABLE[0].value = false;
        console.log("======================= finishMolecule1");
        return true;
    }
    // 分子修改
    if (v === 2) {
        let molecule = data.molecule;
        MoleculeIdentify(molecule);
        data.count++;
        clearMoleculeList();
        data.list.unshift(molecule);
        data.molecule = null;
        console.log("======================= finishMolecule2");
        return true;
    }
    clearMoleculeList();
    data.molecule = null;
    if (v === 1) {
        let molecule = getMoleculeData();
        if (molecule == null || molecule.getAtomCount() > 0) {
            molecule = new DataMolecule();
            data.list.unshift(molecule);
        }
        // console.log("======================= finishMolecule3");
        return true;
    }
    // 分子添加
    if (data.child != null && data.child.molecule != null && data.child.molecule.getAtomCount() > 0) {
        data.count++;
        clearMoleculeList();
        let molecule = getMoleculeData();
        if (molecule === null) {
            molecule = data.child.molecule;
        } else {
            molecule = molecule.AddChild(data.child.molecule);
        }
        data.child = null;
        MoleculeIdentify(molecule);
        data.list.unshift(molecule);
        CHEM_SETTING.UI.MENU.value.DISABLE[0].value = true;
        CHEM_SETTING.UI.MENU.value.DISABLE[2].value = true;
        console.log("======================= finishMolecule4");
        return true;
    }
    return false;
}

const setMoleculeIndex = (v) => {
    let data = cache.moleculeList.value;
    data.index += v;
    CHEM_SETTING.UI.MENU.value.DISABLE[0].value = true;
    CHEM_SETTING.UI.MENU.value.DISABLE[1].value = true;
    if (data.index <= 0) {
        data.index = 0;
        CHEM_SETTING.UI.MENU.value.DISABLE[1].value = false;
    }
    if (data.index >= data.list.length - 1) {
        data.index = data.list.length - 1;
        CHEM_SETTING.UI.MENU.value.DISABLE[0].value = false;
    }
}

export function Cathe_Log() {
    console.log(cache.moleculeList.value.list);
}

export {
    initCache, setChild, getChild,
    setMoleculeIndex, finishMolecule,
};
