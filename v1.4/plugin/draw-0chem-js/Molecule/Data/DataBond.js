/*
Author: 史岩
Author URL: http://www.0chem.com
Date: 2022.2.21
*/
import {CONFIG_MOLECULE} from "../../config";

const BOND_TYPE = {BOND_SINGLE: 1, BOND_DOUBLE: 2, BOND_TRIPLE: 3, BOND_ANY: 8, BOND_AROMATIC: 4};//bondAromatic
const BOND_STEREO = {NONE: 0, STEREO_UP: 1, STEREO_DOWN: 6, STEREO_EITHER: 4,STEREO_CIS: 3}

const DataBond = class {
    constructor(id, begin, end, bondType = BOND_TYPE.BOND_SINGLE, bondStereo = BOND_STEREO.NONE) {
        this.id = parseInt(id);
        this.begin = parseInt(begin);
        this.end = parseInt(end);
        this.bondType = parseInt(bondType);
        this.bondStereo = parseInt(bondStereo);
        this.color = CONFIG_MOLECULE.DRAW_BOND.COLOR;
        this.groupId = -1;

        this.selected = false;
    }

    getId() {
        return this.id;
    }

    setSelected(v) {
        this.selected = v;
    }

//     public static DataBond newInstance(int id, int begin, int end, BondType bondType) {
//         DataBond bondData = new DataBond();
//         bondData.id = id;
//         bondData.begin = begin;
//         bondData.end = end;
//         bondData.bondType = bondType;
//         return bondData;
//     }
//
//     public enum BondType {
//         None,
//         Bond_SINGLE, Bond_DOUBLE, Bond_TRIPLE, Bond_AROMATIC, Bond_ANY,
//         STEREO_UP, STEREO_EITHER, STEREO_DOWN, STEREO_CIS_TRANS,
//     }
//
// //    public static boolean notBondStyle(DataBond.BondType bondType) {
// //        if (bondType == DataBond.BondType.None || bondType == DataBond.BondType.DataGroup || bondType == DataBond.BondType.ArrowLine)
// //            return true;
// //        return false;
// //    }
//
//     //region 变量
//     private boolean enable = true;
//     private int selected = 0;
//     //endregion
//
//     //region 化学变量
//     private int id = -1;
//     private int begin = -1;
//     private int end = -1;
//     private BondType bondType = BondType.None;
//     private int color = Color.BLACK;
//     //endregion
//
//     //region 结构化变量
//     private boolean inAromatic = false;
//     //    private boolean aHasLabel = false;
// //    private boolean bHasLabel = false;
//     private int leftRight = 0;
//     //endregion
//
//     //region 化学属性
//     public void setBondType(BondType value) {
//         bondType = value;
//     }
//
//     public static BondType getBondType(int bondType, int bondStereo) {
//         switch (bondType) {
//             case 1:
//                 switch (bondStereo) {
//                     case 0:
//                         return BondType.Bond_SINGLE;
//                     case 1:
//                         return BondType.STEREO_UP;
//                     case 6:
//                         return BondType.STEREO_DOWN;
//                     case 4:
//                         return BondType.STEREO_EITHER;
//                     case 3:
//                         return BondType.STEREO_CIS_TRANS;
//                 }
//                 break;
//             case 2:
//                 return BondType.Bond_DOUBLE;
//             case 3:
//                 return BondType.Bond_TRIPLE;
//             case 4:
//                 return BondType.Bond_AROMATIC;
//             case 8:
//                 return BondType.Bond_ANY;
//         }
//         return BondType.None;
//     }

//     public int getBegin() {
//         return begin;
//     }
//
//     public int getEnd() {
//         return end;
//     }
//
//     public BondType getBondType() {
//         return bondType;
//     }
//
//     public int getColor() {
//         return color;
//     }
//     //endregion
//
//     //region 基本属性
//     public void setAromatic(boolean value) {
//         inAromatic = value;
//     }
//
//     public boolean InAromatic() {
//         return inAromatic;
//     }
//
//     public void setLeftRight(int v) {
//         leftRight = v;
//     }
//
//     public int getLeftRight() {
//         return leftRight;
//     }
//     //endregion

    //region 结构化
    getEnable() {
        return this.enable;
    }

    setEnable(value) {
        this.enable = value;
    }

    //endregion

//     //region
//     public DataBond Clone() {
//         DataBond bondData = new DataBond();
//         bondData.id = id;
//         bondData.begin = begin;
//         bondData.end = end;
//         bondData.bondType = bondType;
//         bondData.color = color;
//
// //        bondData.aHasLabel = aHasLabel;
// //        bondData.bHasLabel = bHasLabel;
//         bondData.inAromatic = inAromatic;
//         bondData.leftRight = leftRight;
//         return bondData;
//     }
//     //endregion

    //region 复制
    Clone() {
        let v = new DataBond(this.id, this.begin, this.end, this.bondType, this.bondStereo);
        v.name = this.name;
        return v;
    }

    //endregion
}

export {DataBond, BOND_TYPE, BOND_STEREO};