/*
Author: 史岩
Author URL: http://www.0chem.com
Date: 2022.2.21
*/

import Vector from "../../Molecule/Base/Vector";

const SCALE_MIN = 0.1;
const SCALE_MAX = 4;

export default class Coordinate {
    constructor(scale, left, top, deep) {
        // let ele = document.getElementById("chem-molecule-svg");
        // if (!ele) ele = document.body;
        // this.left = ele.clientWidth / 2 + left;
        // this.top = ele.clientHeight / 2 + top;
        this.left = left;
        this.top = top;
        this.deep = deep;
        this.scale = scale;
    }

    static Create(scale, left = 0, top = 0, deep = 0) {
        return new Coordinate(scale, left, top, deep);
    }

    //region 变量
    //endregion

    //region 属性
    get getScale() {
        return this.scale;
    }//endregion

    //region 函数
    //  缩放移动
    //  校验缩放最小最大值
    Move(x, y, z) {
        return new Coordinate(this.left + x, this.top + y, this.deep + z, this.scale);
    }

    /// 去掉缩放移动
    VectorTo(v) {
        return Vector.Create(this.left + v.x * this.scale, this.top + v.y * this.scale, this.deep + v.z * this.scale);
    }

    AddX(x) {
        return this.left + x * this.scale;
    }

    AddY(y) {
        return this.top + y * this.scale;
    }

    /// 去掉缩放移动
    Sub(v) {
        return Vector.Create((v.x - this.left) / this.scale, (v.y - this.top) / this.scale, (v.z - this.deep) / this.scale);
    }

    SubX(v) {
        return (v - this.left) / this.scale;
    }

    SubY(v) {
        return (v - this.top) / this.scale;
    }//endregion

    //region 函数
    /// 复制
    Clone() {
        return new Coordinate(this.left, this.top, this.deep, this.scale);
    }

    // 比较
    equals(coordinate) {
        if (coordinate == null)
            return false;
        return coordinate.left === this.left && coordinate.top === this.top && coordinate.scale === this.scale;
    }

    Scale(v) {
        let x = (v.x - this.left) * this.scale + this.left;
        let y = (v.y - this.top) * this.scale + this.top;
        let z = v.z;
        return Vector.Create(x, y, z);
    }//endregion
}
