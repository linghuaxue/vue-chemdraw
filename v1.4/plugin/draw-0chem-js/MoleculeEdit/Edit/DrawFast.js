import {CONFIG_MOLECULE} from "../../config";
import Vector from "../../Molecule/Base/Vector";
import {DrawFastLine} from "../Draw/DrawOperate";
import {MoleculeIdentify} from "../../MoleculeDraw/Identify/MoleculeIdentify";
import {Draw_Move} from "../../MoleculeDraw/DrawMolecule";
import {DataBond} from "../../Molecule/Data/DataBond";
import {DataAtom} from "../../Molecule/Data/DataAtom";

const radians = [Math.PI / 6, Math.PI / 2, Math.PI * 5 / 6, Math.PI * 7 / 6, Math.PI * 3 / 2, Math.PI * 11 / 6];

/*=============================================================
判断状态
=============================================================*/
function fastDraw(child, atomO, atomA, bondDegree, scale, bondLength = CONFIG_MOLECULE.DRAW_BOND.BOND_LENGTH) {
    let p = Vector.Create(atomO.position.x + bondLength * Math.cos(bondDegree), atomO.position.y + bondLength * Math.sin(bondDegree), 0);
    if (atomO.getId() === atomA.getId()) {
        let molecule = child.molecule;
        atomA = new DataAtom(molecule.getAtomNewId(), 6, p);
        molecule.addAtom = atomA;
        let bond = new DataBond(molecule.getBondNewId(), atomO.getId(), atomA.getId());//在添加时，使用atomId，放入数据时，修改成正确的id
        molecule.addBond = bond;
        child.selectId = atomO.getId();
    } else {
        atomA.position = p;
    }
    MoleculeIdentify(child.molecule);
    Draw_Move(child.molecule);
    return child;
}

/*=============================================================
判断状态
=============================================================*/
export function Fast_Move(child, operate, mouse) {
    let fastData = [{name: "chem-angle-lineAB-", f: 0, color: CONFIG_MOLECULE.DRAW_CONST.BACKGROUND_SELECT, index: 0, used: false},
        {name: "chem-angle-lineAC-", f: 0, color: CONFIG_MOLECULE.DRAW_CONST.BACKGROUND_SELECT, index: 2, used: false},
        {name: "chem-angle-lineAD-", f: 0, color: CONFIG_MOLECULE.DRAW_CONST.BACKGROUND_SELECT, index: 4, used: false}];
    // 获得原点坐标
    let atomO = null;
    if (child.molecule == null || child.molecule.getAtomCount() > 0) {
        if (child.selectId >= 0) {
            atomO = child.molecule.getAtomById(child.selectId);
        }
        if (atomO == null) {
            atomO = child.molecule.getAtomByIndex(child.molecule.getAtomCount() - 1)
        }
    }
    if (atomO == null) return;
    // 计算与原点的距离
    let atomA = child.molecule.getAtomByIndex(child.molecule.getAtomCount() - 1);
    let width = mouse.x - atomO.position.x, height = mouse.y - atomO.position.y;
    let length = Math.sqrt(width * width + height * height);
    if (length > CONFIG_MOLECULE.DRAW_BOND.BOND_LENGTH * 3 / 2) {
        if (atomA.getId() !== atomO.getId()) {
            child.selectId = atomA.getId();
        }
        // console.log("add");
        return;
    } else if (length > CONFIG_MOLECULE.DRAW_BOND.BOND_LENGTH * 2 / 3) {
        // 计算当前鼠标角度
        let degree = Math.atan2(height, width), degreeStart = 0;
        if (degree < 0) degree = Math.PI * 2 + degree;
        if (atomO.getNeighborCount() > 1) { // 如果有选中 原子
            // 根据选中原子的元素角度计算
            let neighbor = atomO.getNeighborByIndex(0);
            if (neighbor.atomId === atomA.getId()) neighbor = atomO.getNeighborByIndex(1);
            let radian = neighbor.radians;
            if (radian < 0) radian += 2 * Math.PI;
            let a = radian % (Math.PI / 3), b = radian % (2 * Math.PI / 3);
            // console.log("r: " + neighbor.radians + " a" + a + " b" + b);
            if (a === b) degreeStart = Math.PI / 3;
            // if ((radian > radians[0] - Math.PI / 90 && radian < radians[0] + Math.PI / 90) || (radian > radians[2] - Math.PI / 90 && radian < radians[2] + Math.PI / 90) || (radian > radians[4] - Math.PI / 90 && radian < radians[4] + Math.PI / 90)) {
            //     degreeStart += Math.PI / 3;
            //     fastData[0].index = 1;
            //     fastData[1].index = 3;
            //     fastData[2].index = 5;
            // }
            // let b_position = child.getAtomById(b_id).position;
            // let b_radians = Math.atan2(b_position.y - position.y, b_position.x - position.x);
            // b_radians -= Math.PI / 3;
            // fastData[0].degree = b_radians;
            // if (fastData[0].degree < 0) fastData[0].degree += Math.PI * 2;
            // fastData[0].used = true;
            // fastData[1].degree = b_radians + Math.PI * 2 / 3;
            // if (fastData[1].degree < 0) fastData[1].degree += Math.PI * 2;
            // fastData[2].degree = b_radians + Math.PI * 4 / 3;
            // console.log(fastData[0].degree * 180 / Math.PI);
            // console.log(fastData[1].degree * 180 / Math.PI);
            // console.log(fastData[2].degree * 180 / Math.PI);
        }
        // 判定选中范围
        if (degree > radians[0] + degreeStart && degree < radians[2] + degreeStart) {
            fastData[0].color = CONFIG_MOLECULE.DRAW_BOND.backgroundEnterColor;
            degree = radians[1] + degreeStart;
        } else if (degree > radians[2] + degreeStart && degree < radians[4] + degreeStart) {
            fastData[1].color = CONFIG_MOLECULE.DRAW_BOND.backgroundEnterColor;
            degree = radians[3] + degreeStart;
        } else if (degree > radians[4] + degreeStart) {
            fastData[2].color = CONFIG_MOLECULE.DRAW_BOND.backgroundEnterColor;
            degree = radians[5] + degreeStart;
        } else {
            fastData[2].color = CONFIG_MOLECULE.DRAW_BOND.backgroundEnterColor;
            degree = radians[5] + degreeStart;
        }
        // 绘制键
        fastDraw(child, atomO, atomA, degree);
    }
    // 绘制操作盘
    DrawFastLine(1, atomO.position, fastData);
}