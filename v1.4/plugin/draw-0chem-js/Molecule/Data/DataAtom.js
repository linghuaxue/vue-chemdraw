/*
Author: 史岩
Author URL: http://www.0chem.com
Date: 2022.2.21
*/

import {BOND_TYPE} from "./DataBond";
import {getElementById} from "../../MoleculeDraw/Base/symbol";

const DataAtom = class {
    constructor(id, elementId, postion) {
        this.id = parseInt(id);
        this.elementId = parseInt(elementId);
        this.title = null;
        this.position = postion;
        this.enable = -1;
        this.charge = 0;
        this.mass = 0;
        this.groupId = -1;
        this.groupIn = false;

        this.neighbors = [];
        this.bondSingle = [];
        this.bondDouble = [];
        this.bondTriple = [];
        this.bondAromatic = [];
        this.selected = false;

        this.linkId = -1;// 转义id
        this.crossId = -1;//内部相交
    }

    //region 变量 - 基本
    // private int id;//内部id, 从0开始计算，不包含H
    // private int elementId;
    // private Vector position;
    // private int charge;
    // private int mass;
    //endregion

    //region 变量 - 附加
    // private int idSource;//用于反查找，和添加使用
    // private boolean enable = true;
    // private int selected = 0;
    //endregion

    //region 变量 - 结构
    // private List<Integer> hydrogen = new ArrayList<>();
    // private DataAtom.AromaticType aromatic = DataAtom.AromaticType.Null;
    // List<Integer> loop = new ArrayList<>();
    // private List<Integer> bondSingle = new ArrayList<>();
    // private List<Integer> bondDouble = new ArrayList<>();
    // private List<Integer> bondTriple = new ArrayList<>();
    // private List<Integer> bondAromatic = new ArrayList<>();
    // private List<Integer> oxygen;
    //endregion

    //region 基本 - 属性
    getId() {
        return this.id;
    }

    // public void setId(int value) {
    //     id = value;
    // }
    // public int getElementId() {
    //     return elementId;
    // }
    // public void setElementId(int value) {
    //     elementId = value;
    // }
    // public int getCharge() {
    //     return charge;
    // }
    // public void setCharge(int value) {
    //     charge = value;
    // }
    // public int getMass() {
    //     return mass;
    // }
    // public void setMass(int value) {
    //     mass = value;
    // }
    // //用来从 atom 转换为 dataAtom
    // public boolean changeCoordinate(Coordinate coordinateBase) {
    //     position = coordinateBase.Add(position);
    //     return true;
    // }
    // public void setPosition(Vector position) {
    //     this.position = position.Clone();
    // }
    // public Vector getPosition() {
    //     return position;
    // }
    //endregion

    //region 初始化
    //endregion

    //region 结构化
    getEnable() {
        return this.enable;
    }

    setEnable(value) {
        this.enable = value;
    }

    getSelected() {
        return this.selected;
    }

    //endregion

    //region 属性 - 相邻ß
    addNeighbor(atomId, bondId, bondType, radians) {
        let neighbor = {"atomId": atomId, "bondId": bondId, "bondType": bondType, "radians": radians};
        let index = 0;
        for (; index < this.neighbors.length; index++) {
            let current = this.neighbors[index];
            if (current.radians > neighbor.radians) {
                this.neighbors.splice(index, 0, neighbor);
                break;
            }
        }
        if (index >= this.neighbors.length) {
            this.neighbors.push(neighbor);
        }
        switch (bondType) {
            case  BOND_TYPE.BOND_SINGLE:
                this.bondSingle.push(bondId);
                break;
            case BOND_TYPE.BOND_DOUBLE:
                this.bondDouble.push(bondId);
                break;
            case BOND_TYPE.BOND_TRIPLE:
                this.bondTriple.push(bondId);
                break;
            case BOND_TYPE.BOND_AROMATIC:
                this.bondAromatic.push(bondId);
                break;
        }
    }

    clearNeighbor() {
        this.neighbors = [];
        this.bondSingle = [];
        this.bondDouble = [];
        this.bondTriple = [];
        this.bondAromatic = [];
    }

    getNeighborByIndex(index) {
        return this.neighbors[index];
    }

    getNeighborCount() {
        return this.neighbors.length;
    }

    getNeighborsForRing() {
        let result = [];
        for (let i = 0; i < this.neighbors.length; i++) {
            result.push({atomId: this.neighbors[i].atomId, bondId: this.neighbors[i].bondId});
        }
        return result;
    }//endregion

//region Loop
// public void setRing(int v) {
//     loop.add(v);
// }
// public int inRing() {
//     return loop.size();
// }
//endregion

//region 识别 - 芳香烃
// public DataAtom.AromaticType getAromatic() {
//     return aromatic;
// }
// public void setAromatic(DataAtom.AromaticType aromatic) {
//     this.aromatic = aromatic;
// }
// public enum AromaticType {
//     Null, Aromatic, Benzene
// }
//endregion

//region 识别 - 键型统计
// public boolean includeDoubleOrAromatic() {
//     if (bondDouble.size() == 1 || bondAromatic.size() == 2)
//         return true;
//     return false;
// }
// public boolean includeAromaticElement() {
//     if (elementId >= 6 || elementId <= 8)
//         return true;
//     return false;
// }
// public boolean isError() {
//     Element element = Element.newInstanceById(elementId);
//     int bondCount = bondSingle.size() + bondDouble.size() * 2 + bondTriple.size() * 3 + bondAromatic.size() * 3 / 2;
//     if (element.valence == bondCount || element.o2nd == bondCount || element.o3rd == bondCount || element.o4th == bondCount)
//         return false;
//     if (bondCount <= element.hydrogen)
//         return false;
//     return true;
// }
//endregion

    //region 绘制
    isLabelShow() {
        if (this.title !== null || this.elementId !== 6 || this.charge !== 0 || this.mass !== 0 || this.neighbors.length === 0) {
            let element = getElementById(this.elementId);
            return element.symbol.length;
        }
        return 0;
    }//endregion

    //region 复制
    Copy(id = -1, name = null) {
        let v = new DataAtom(this.id, this.elementId, this.position);
        if (id >= 0) v.id = id;
        v.charge = this.charge;
        v.mass = this.mass;
        v.name = this.name;
        if (name !== null) v.name = name;
        return v;
    }

    //endregion
}

export {DataAtom};