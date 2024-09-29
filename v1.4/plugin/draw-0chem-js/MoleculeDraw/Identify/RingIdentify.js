import {BOND_STEREO, BOND_TYPE} from "../../Molecule/Data/DataBond";
import Vector from "../../Molecule/Base/Vector";

class SingleRing {
    constructor(count) {
        this.position = null;
        this.data = [];
        this.finger = [];//整个分子的按照原子顺序的1一维表，为true时代表已经使用过此原子
        if (count > 0)
            for (let i = 0; i < count; i++) {
                this.finger.push(false);
            }
    }

    //region 环操作
    getFirstAtomId() {
        if (this.data.length > 0) {
            let id = this.data[this.data.length - 1].atomId;
            // console.log(id);
            return id;
        }
        return -1;
    }

    Add(atomId, bondId) {
        if (atomId >= this.finger.length || this.data.length >= this.finger.length)// 去掉最长连
            return false;
        if (this.finger[atomId] === true)// 查看是否存在
            return false;
        this.data.unshift({atomId: atomId, bondId: bondId});
        this.finger[atomId] = true;
        return true;
    }

    Remove() {
        this.data.shift();
    }

    Close(bondId) {
        let d = this.data[this.data.length - 1];
        if (d.bondId < 0) {
            d.bondId = bondId;
        } else {
            debugger;
        }
    }

    Clone(bondId) {
        let r = new SingleRing();
        r.data = Array.from(this.data);
        r.finger = Array.from(this.finger);
        let d = r.data[r.data.length - 1];
        if (d.bondId < 0) {
            d.bondId = bondId;
        }
        return r;
    }//endregion
}

class LoopAtom {
    constructor(id, neighborAtoms) {
        this.id = id;
        this.ring = 0;
        this.neighborAtoms = neighborAtoms;
    }

    //region Loop
    getNeighborsCount() {
        return this.neighborAtoms.length;
    }

    getNeighborByIndex(index) {
        if (index < 0 || index >= this.neighborAtoms.length)
            return -1;
        return this.neighborAtoms[index];
    }

    clear() {
        this.neighborAtoms = [];
    }

    removeNeighborByAtomId(id) {
        for (let i = 0; i < this.neighborAtoms.length; i++) {
            if (this.neighborAtoms[i].atomId === id) {
                this.neighborAtoms.splice(i, 1);
            }
        }
    }

    setRing() {
        this.ring += 1;
    }

    inRing() {
        return this.ring > 0;
    }//endregion
}

class FindLoop {
    //region 变量
    constructor() {
        this.data = [];
        this.ringArray = [];
        this.molecule = null;
    }// endregion

    // region 查找环
    // 原来采用路径遍历，现在采用环剪枝之后在遍历
    Run(molecule) {
        if (molecule.getAtomCount() < 3)
            return false;
        for (let i = 0; i < molecule.getAtomCount(); i++) {/// 建立基础环数据，用来查找环
            let item = molecule.getAtomByIndex(i);
            this.data.push(new LoopAtom(item.getId(), item.getNeighborsForRing()));
        }
        this.ringCut();/// 环修剪
        if (this.data == null || this.data.length < 1)//不存在环
            return false;
        this.molecule = molecule;
        // 优化，如果是多环，优先以大于3连接度原子作为起点（不再进行2连接度为起点的验证），查找3~6连接度的环，简化计算
        for (let i = 0; i < this.data.length; i++) {
            // 判断是否是一个大环
            let a = this.data[i];
            if (a.getNeighborsCount() > 2) {
                this.loop = new SingleRing(molecule.getAtomCount());//创建一个环，用来记录环中的原子id
                this.findRing(a.id, -1, 0, 6);//优先6元环一下的，简化计算
            }
        }
        // 再找大环
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].inRing() === false && this.data[i].getNeighborsCount() > 1) {
                this.loop = new SingleRing(molecule.getAtomCount());//创建一个环，用来记录环中的原子id
                this.findRing(this.data[i].id, -1, 0, this.data.length);//修剪后的最大值
            }
        }
        return true;
    }//endregion

    //region 环修剪法，去掉连接度小于2的
    getLoopAtomById(id) {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                return this.data[i];
            }
        }
        return null;
    }

    ringCut() {
        let isContinue = false;
        for (let i = 0; i < this.data.length; i++) {
            let a = this.data[i];
            switch (a.getNeighborsCount()) {
                case 1:
                    isContinue = true;
                    let neighbor = a.getNeighborByIndex(0);
                    let b = this.getLoopAtomById(neighbor.atomId);
                    if (b != null) {
                        b.removeNeighborByAtomId(a.id);
                    }
                    this.data.splice(i, 1);// 最后清理当前键
                    i--;
                    break;//穿透操作
                case 0:
                    this.data.splice(i, 1);
                    i--;
                    break;
            }
        }
        if (isContinue) {
            this.ringCut();//每出现一次，连接度为1的，就需要再次修剪
        }
    }//endregion

    //region 查找环
    findRing(atomId, bondId, deep, maxDeep) {
        if (deep > maxDeep) //还有Loop添加限制
            return false;
        if (deep > 2 && this.loop.getFirstAtomId() === atomId) {
            if (this.ringArray.push(this.loop.Clone(bondId))) {// 找到环并进行保存
                for (let i = 0; i < this.loop.data.length; i++) {
                    let a = this.getLoopAtomById(this.loop.data[i].atomId);
                    if (a) {
                        a.setRing();// 修改环属性，标记已经在环中
                    }
                }
            }
            return false;//继续查找，防止最大环刚好包含多个环，例如萘的最大环刚好包含2个苯环
        }
        if (!this.loop.Add(atomId, bondId))
            return false;
        let neighborAtoms = this.getLoopAtomById(atomId).neighborAtoms;
        for (let j = 0; j < neighborAtoms.length; j++) {
            this.findRing(neighborAtoms[j].atomId, neighborAtoms[j].bondId, deep + 1, maxDeep);
        }
        this.loop.Remove();
        return false;
    }//endregion

    //region 在molecule写入结果
    setRingBond() {
        for (let i = 0; i < this.ringArray.length; i++) {
            let r = this.ringArray[i].data;
            let x = 0, y = 0;
            for (let j = 0; j < r.length; j++) {
                let atom = this.molecule.getAtomById(r[j].atomId);
                x += atom.position.x;
                y += atom.position.y;
            }
            r.position = Vector.Create(x / r.length, y / r.length);
            for (let j = 0; j < r.length; j++) {
                let v = this.getLoopAtomById(r[j].atomId);
                let bond = this.molecule.getBondById(r[j].bondId);
                if (bond.bondType === BOND_TYPE.BOND_DOUBLE) {
                    bond.bondStereo = BOND_STEREO.STEREO_UP;
                    let a = this.molecule.getAtomById(bond.begin);
                    let b = this.molecule.getAtomById(bond.end);
                    let rA = r.position.Radians(a.position);
                    let rB = r.position.Radians(b.position);
                    if ((rA < 0 && rB > 0) || (rA > 0 && rB < 0)) {
                        if (rA < -Math.PI / 2) rA = 2 * Math.PI + rA;
                        if (rB < -Math.PI / 2) rB = 2 * Math.PI + rB;
                    }
                    if ((rB - rA) > 0) bond.bondStereo = BOND_STEREO.STEREO_DOWN;
                }
            }
        }
    }//endregion
}

export default function RingIdentify(molecule) {
    let ring = new FindLoop();
    if (ring.Run(molecule)) {
        console.log("ring identify finish");
        ring.setRingBond(molecule);
    }
}