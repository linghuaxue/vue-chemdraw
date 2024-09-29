class Identify {
    //region 结构更新
    constructor(molecule) {
        // 清除并重建所有半债券
        this.initUpdate(molecule);
        if (molecule == null || molecule.getAtomCount() < 1 || molecule.getBondCount() < 1)
            return;
        this.initNeighbors(molecule);
        // FindLoop.init(molecule);
        //绘制键计算
        // BondDraw(molecule);
        // console.log(molecule);
    }

    //endregion

    //region 基本 - 变量
    //endregion

    //region 基本 - 属性
    //endregion

    //region 辅助方法
    //endregion

    //region 初始化
    //清除分子一些旧的残留数据
    initUpdate(molecule) {
        if (molecule == null)
            return;
        // 初始化
        for (let i = 0; i < molecule.getAtomCount(); i++) {
            let atom = molecule.getAtomByIndex(i);
            atom.clearNeighbor();
        }
    }

    /// 计算相邻
    initNeighbors(molecule) {
        // 添加临原子
        for (let i = 0; i < molecule.getBondCount(); i++) {
            let bond = molecule.getBondByIndex(i);
            // AtomPoint应该是非H
            let a = molecule.getAtomById(bond.begin);
            let b = molecule.getAtomById(bond.end);
            a.addNeighbor(b.getId(), bond.id, bond.bondType, a.position.Radians(b.position));
            b.addNeighbor(a.getId(), bond.id, bond.bondType, b.position.Radians(a.position));
        }
    }

// BondDraw(molecule) {
//     for (let i = 0; i < molecule.getBondCount(); i++) {
//         let bond = molecule.getBondByIndex(i);
//         let atomA = molecule.getAtomById(bond.begin);
//         let atomB = molecule.getAtomById(bond.end);
//         if (atomA.getAromatic() != DataAtom.AromaticType.Null && atomB.getAromatic() != DataAtom.AromaticType.Null)
//             bond.setAromatic(true);
//         if (bond.InAromatic()) {
//             //计算芳香环方向
//             /// 由A点出发，添加一个非本键的芳环点
//             let aAngles = new ArrayList<>();
// //                for (DataNeighbor item : dataAtomA.getNeighbors()) {
//             for (let n = 0; n < atomA.getNeighborCount(); n++) {
//                 if (atomA.getNeighborByIndex(n).getAtomId() == b)
//                     continue;
//                 let atomC = molecule.getAtomById(atomA.getNeighborByIndex(n).getAtomId());
//                 if (atomC.getAromatic() != DataAtom.AromaticType.Null) {
//                     aAngles.add(atomA.getPosition().IncludedAngle(atomB.getPosition(), atomC.getPosition()));
// //                        draw2DBond.AddLeftRight(dataAtomC.getPosition());
//                 }
//             }
//             /// 由B点出发，计算其角度
//             List<Double> bAngles = new ArrayList<>();
// //                for (DataNeighbor item : dataAtomB.getNeighbors()) {
//             for (int n = 0; n < atomB.getNeighborCount(); n++) {
//                 if (atomB.getNeighborByIndex(n).getAtomId() == a)
//                     continue;
//                 DataAtom dataAtomC = moleculeData.getAtomById(atomB.getNeighborByIndex(n).getAtomId());
//                 if (dataAtomC.getAromatic() != DataAtom.AromaticType.Null) {
//                     bAngles.add(atomB.getPosition().IncludedAngle(atomA.getPosition(), dataAtomC.getPosition()));
//                 }
//             }
//             if (aAngles.size() == 1 && bAngles.size() > 1) {
//                 if (aAngles.get(0) > 0) {
//                     bond.setLeftRight(1);
//                 } else {
//                     bond.setLeftRight(-1);
//                 }
//             } else if (aAngles.size() > 1 && bAngles.size() == 1) {
//                 if (bAngles.get(0) < 0) {
//                     bond.setLeftRight(1);
//                 } else {
//                     bond.setLeftRight(-1);
//                 }
//             } else if (aAngles.size() == 1 && bAngles.size() == 1) {
//                 if ((aAngles.get(0) > 0 && bAngles.get(0) < 0) || (aAngles.get(0) < 0 && bAngles.get(0) > 0)) {
//                     bond.setLeftRight(aAngles.get(0) > 0 ? 1 : -1);
//                 }
//             } else {
//                 /// 取第五个点判断方向
//                 for (int n = 0; n < atomA.getNeighborCount(); n++) {
//                     if (atomA.getNeighborByIndex(n).getAtomId() == b)
//                         continue;
//                     //找到c点
//                     DataAtom atomC = moleculeData.getAtomById(atomA.getNeighborByIndex(n).getAtomId());
//                     if (atomC.getAromatic() != DataAtom.AromaticType.Null) {
//                         //找到d点
//                         for (int m = 0; m < atomC.getNeighborCount(); m++) {
//                             if (atomC.getNeighborByIndex(m).getAtomId() == a)
//                                 continue;
//                             DataAtom dataAtomD = moleculeData.getAtomById(atomC.getNeighborByIndex(m).getAtomId());
//                             if (dataAtomD.getAromatic() != DataAtom.AromaticType.Null) {
//                                 double angle = atomC.getPosition().IncludedAngle(atomA.getPosition(), dataAtomD.getPosition());
//                                 bond.setLeftRight(angle > 0 ? 1 : -1);
//                                 break;
//                             }
//                         }
//                         break;
//                     }
//                 }
//             }
//         }
//     }
// }
//endregion
}

const MoleculeIdentify = (molecule) => {
    let result = new Identify(molecule);
    return result;
}

export {MoleculeIdentify};