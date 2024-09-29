/*
Author: 史岩
Author URL: http://www.0chem.com
Date: 2022.2.21
copyright:0chem.com
*/

//region 基本
export default class Vector {
    constructor(x, y, z) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
        this.z = parseFloat(z);
    }

    //region 基本
    static Create(x, y, z = 0) {
        return new Vector(x, y, z);
    }

    Radians(v) {
        return Math.atan2(v.y - this.y, v.x - this.x);
    }

    CrossPoint(p, length) {
        let a = Math.abs(p.x - this.x);
        let b = Math.abs(p.y - this.y);
        let c = Math.abs(p.z - this.z);
        return a < length && b < length && c < length;

    }

    Move(x, y) {
        this.x += x;
        this.y += y;
        return this;
    }

    Add(x, y, z = 0) {
        x = this.x + x;
        y = this.y + y;
        z = this.z + z;
        return Vector.Create(x, y, z);
    }

    toMax(v) {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        this.z = Math.max(this.z, v.z);
    }

    toMin(v) {
        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        this.z = Math.min(this.z, v.z);
    }

    Clone() {
        return new Vector(this.x, this.y, this.z);
    }

    getCenter(v) {
        return Vector.Create((this.x + v.x) / 2, (this.y + v.y) / 2, (this.z + v.z) / 2);
    }

    toCenter(v) {
        return Vector.Create(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    //endregion

    //region 基本方法
    Equals(v) {
        return this.x === v.x && this.y === v.y && this.z === v.z;
    }//endregion

    // region 长度
    Length(v) {
        let a = this.x - v.x;
        let b = this.y - v.y;
        return Math.sqrt((a * a) + (b * b));
    }//endregion

    // 计算角度
    Sub(v) {
        return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    IncludedAngle(b, c) {
        return (c.x - b.x) * (this.y - b.y) - (this.x - b.x) * (c.y - b.y);
    }

    Cross(x, y, length, left, top) {
        let a = x - left, b = y - top;
        return a * a + b * b < length * length;
    }

    getArea(b, x, y) {
        return Math.abs(x * this.y + y * b.x + this.x * b.y - x * b.y - y * this.x - this.y * b.x) / 2;
    }
}//endregion
