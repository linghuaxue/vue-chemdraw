/*
Author: 史岩
Author URL: http://www.0chem.com
Date: 2022.2.21
*/

import {uuid} from "./Base/uuid";
import {DataBond} from "./Data/DataBond";

export default class DataMolecule {
    constructor(name = 'molecule') {
        this.name = name;
        this.clear();
    }

    clear() {
        this.atoms = [];
        this.bonds = [];
        this.sgroup = [];
        this.others = [];
    }

    setChiral(v) {
    }

    // //region 基本
    // private UUID id;
    // private int operateState = 0;
    //
    // protected List<LoopItem> loops;
    // protected HashMap<Integer, Integer> loopStatistics;
    // //endregion
    //
    // //region 属性
    // public boolean getOperateState() {
    //     return operateState != 0;
    // }
    //
    // public void setOperateState(int value) {
    //     operateState = value;
    // }
    // //endregion
    //
    // //region 分子变量
    // public void setDataLoops(List<LoopItem> loops, HashMap<Integer, Integer> statistics) {
    //     this.loops = loops;
    //     loopStatistics = statistics;
    // }
    //
    // public List<LoopItem> getLoops() {
    //     return loops;
    // }
    //
    // public HashMap<Integer, Integer> getLoopStatistics() {
    //     return loopStatistics;
    // }
    // //endregion

    //region 键操作
    getBondCount() {
        return this.bonds.length;
    }

    getBondById(id) {
        // console.log(this.bonds);
        id = parseInt(id);
        if (id >= 0 && id < this.bonds.length) {
            let bond = this.bonds[id];
            if (bond.getId() === id)
                return bond;
        }
        for (let i = 0; i < this.bonds.length; i++) {
            let bond = this.bonds[i];
            if (bond.getId() === id)
                return bond;
        }
        return null;
    }

    getBondByIndex(index) {
        return this.bonds[index];
    }

    getBondNewId() {
        if (this.bonds == null || this.bonds.length < 1)
            return 0;
        return this.bonds[this.bonds.length - 1].getId() + 1;
    }//endregion

    //region 原子操作
    getAtomCount() {
        return this.atoms.length;
    }

    getAtomById(id) {
        if (isNaN(id)) {
            return null;
        }
        id = parseInt(id);
        if (id >= 0 && id < this.atoms.length) {
            let atom = this.atoms[id];
            if (atom.getId() === id)
                return atom;
        }
        for (let i = 0; i < this.atoms.length; i++) {
            let atom = this.atoms[i];
            if (atom.getId() === id)
                return atom;
        }
        return null;
    }

    getAtomByIndex(index) {
        return this.atoms[index];
    }

    getAtomNewId() {
        if (this.atoms == null || this.atoms.length < 1)
            return 0;
        return this.atoms[this.atoms.length - 1].getId() + 1;
    }

    //endregion

    //region 删除操作
    removeAtomById(id) {
        id = parseInt(id);
        if (id >= 0 && id < this.atoms.length && this.atoms[id].getId() === id) {
            this.atoms.splice(id, 1);
            return true;
        }
        for (let i = 0; i < this.atoms.length; i++) {
            if (this.atoms[i].getId() === id) {
                this.atoms.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    removeBondById(id) {
        if (id >= 0 && id < this.bonds.length && this.bonds[id].getId() === id) {
            this.bonds.splice(id, 1);
            return true;
        }
        for (let i = 0; i < this.bonds.length; i++) {
            let bond = this.bonds[i];
            if (bond.getId() === id) {
                this.bonds.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    removeBondByIndex(index) {
        this.bonds.splice(index, 1);
    }//endregion

    //region 添加操作
    // set addAtom(v) {
    //     if (v != null) this.atoms.push(v);
    // }
    //
    // set addBond(v) {
    //     if (v != null) this.bonds.push(v);
    // }//endregion
    set addAtom(v) {
        if (v != null) this.atoms.push(v);
    }

    set addBond(v) {
        if (v != null) this.bonds.push(v);
    }//endregion

    // //region Other
    // public void addOther(OtherData value) {
    //     others.add(value);
    // }
    //
    // public int getOtherCount() {
    //     return others.size();
    // }
    //
    // public OtherData getOtherIndex(int index) {
    //     return others.get(index);
    // }
    //
    // public boolean removeOther(int index) {
    //     if (index >= 0 && index < others.size()) {
    //         others.remove(index);
    //         return true;
    //     }
    //     return false;
    // }
    // //endregion

    //region 数据拷贝
    findBond(idA, idB) {
        for (let item of this.bonds) {
            // console.log("==== bond:" + item.begin + " - " + item.end);
            if ((item.begin === idA && item.end === idB) || (item.begin === idB && item.end === idA)) {
                return true;
            }
        }
        return false;
    }

    AddChild(v) {
        let result = this.Copy();
        for (let i = 0; i < v.getAtomCount(); i++) {
            let id = result.getAtomNewId();
            let atom = v.getAtomByIndex(i);
            if (atom.linkId < 0) {
                atom.linkId = id;
                result.addAtom = atom.Copy(id, "molecule-atomId-");
            }
        }
        for (let i = 0; i < v.getBondCount(); i++) {
            let bond = v.getBondByIndex(i);
            let atomA = v.getAtomById(bond.begin);
            let atomB = v.getAtomById(bond.end);
            if (this.findBond(atomA.linkId, atomB.linkId)) {
                continue;
            }
            let bondData = new DataBond(result.getBondNewId(), atomA.linkId, atomB.linkId, bond.bondType, bond.bondStereo);
            bondData.name = "molecule-bondId-";
            result.addBond = bondData;
        }
        return result;
    }

    Copy() {
        let result = new DataMolecule();
        result.name = uuid();
        for (let i = 0; i < this.getAtomCount(); i++) {
            result.atoms.push(this.getAtomByIndex(i).Copy())
        }
        for (let i = 0; i < this.getBondCount(); i++) {
            result.bonds.push(this.getBondByIndex(i).Clone())
        }
        return result;
    }

    Clear(selected) {
        if (selected) {
            for (let i = 0; i < selected.selectBonds.length; i++) {
                let id = selected.selectBonds[i];
                let bond = this.getBondById(id);
                let atomA = this.getAtomById(bond.begin);
                if (atomA.enable >= 0) {
                    bond.begin = atomA.enable;
                }
                let atomB = this.getAtomById(bond.end);
                if (atomB.enable >= 0) {
                    bond.end = atomB.enable;
                }
            }
            for (let i = 0; i < this.atoms.length; i++) {
                if (this.atoms[i].enable >= 0) {
                    this.atoms.splice(i, 1);
                }
            }
        }
        return this;
    }//endregion

    //region DataGroup
    set addSGroup(v) {
        if (v !== null && !isNaN(v.id)) {
            let g = this.getGroupById(v.id);
            if (g === null) this.sgroup.push(v);
        }
    }

    getGroupById(id) {
        if (isNaN(id)) {
            return null;
        }
        if (id >= 0 && id < this.sgroup.length) {
            let group = this.sgroup[id];
            if (group.id === id)
                return group;
        }
        for (let i = 0; i < this.sgroup.length; i++) {
            let group = this.sgroup[i];
            if (group.id === id)
                return group;
        }
        return null;
    }//endregion
}
