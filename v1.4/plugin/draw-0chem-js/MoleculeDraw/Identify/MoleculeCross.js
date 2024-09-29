import {BOND_TYPE} from "../../Molecule/Data/DataBond";
import {CHEM_SETTING, CONFIG_MOLECULE} from "../../config";

//region 计算角度
export function getDegree(origin, bondType) {
//     if (selectId < 0) return Math.PI / 6;
//     let origin = molecule.getAtomById(selectId);
//     if (origin.getNeighborCount() == 0) {
//         return Math.PI / 6;
//     }
// }
//
// const getDegree = (origin, bondType) => {
    if (origin.getNeighborCount() === 0) {
        return Math.PI / 6;
    }
    let result = -1;
    let maxIndex = 0;
    if (origin.getNeighborCount() === 1) {
        result = origin.getNeighborByIndex(0).radians;
        // console.log("Origin:" + (result * 180 / Math.PI));
        // 双双键 或 单三键
        if (origin.getNeighborByIndex(0).bondType === BOND_TYPE.BOND_DOUBLE && bondType === BOND_TYPE.BOND_DOUBLE) {
            result += Math.PI;
        } else if (bondType === BOND_TYPE.BOND_TRIPLE) {
            result += Math.PI;
        } else if (origin.getNeighborByIndex(0).bondType === BOND_TYPE.BOND_TRIPLE) {
            result += Math.PI;
        } else {//基本操作
            result += (2 * Math.PI / 3);
        }
    } else if (origin.getNeighborCount() > 1) {
        //查找最大的角
        for (let i = 1; i < origin.getNeighborCount(); i++) {
            let v = Math.abs(origin.getNeighborByIndex(i).radians - origin.getNeighborByIndex(i - 1).radians);
            if (v > result) {
                maxIndex = i;
                result = v;
            }
        }
        //计算开始与结束之间的夹角
        let v = 2 * Math.PI - origin.getNeighborByIndex(origin.getNeighborCount() - 1).radians + origin.getNeighborByIndex(0).radians;
        if (v > result) {
            maxIndex = 0;
            result = v;
        }
        result = origin.getNeighborByIndex(maxIndex).radians - result / 2;
        // console.log("Result:" + result);
    }
    // console.log("Result:" + (result * 180 / Math.PI));
    return result;
}

//endregion

const crossAtom = (molecule, position, scale = CHEM_SETTING.getScale()) => {
    if (molecule != null)
        for (let i = 0; i < molecule.getAtomCount(); i++) {
            let atom = molecule.getAtomByIndex(i);
            if (atom.position.CrossPoint(position, CONFIG_MOLECULE.DRAW_ATOM.FONT_RADIUS * scale)) {
                return atom.getId();
            }
        }
    return -1;
}

const existBond = (molecule, atomA_id, atomB_id) => {
    for (let i = 0; i < molecule.getBondCount(); i++) {
        let bond = molecule.getBondByIndex(i);
        if ((bond.begin == atomA_id && bond.end === atomB_id) || (bond.begin == atomB_id && bond.end === atomA_id)) {
            return bond.getId();
        }
    }
    return -1;
}
//
export {crossAtom, existBond};