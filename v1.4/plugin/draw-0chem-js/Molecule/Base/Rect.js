/*
Author: 史岩
Author URL: http://www.0chem.com
Date: 2022.2.21
*/

Rect = class {
    //region
    //endregion

    //region
    getLeft() {
        return this.x1;
    }

    getTop() {
        return y1;
    }

    getRight() {
        return x2;
    }

    getBottom() {
        return y2;
    }

    getCenterX() {
        return (x1 + x2) / 2;
    }

    getCenterY() {
        return (y1 + y2) / 2;
    }

    Clone() {
        let result = new Rect();
        result.x1 = x1;
        result.y1 = y1;
        result.x2 = x2;
        result.y2 = y2;
        return result;
    }

    //endregion
}

Rect.prototype.Max = () => {
    let result = new Rect();
    result.x1 = 1000000;
    result.y1 = 1000000;
    result.x2 = -1000000;
    result.y2 = -1000000;
    return result;
}


Rect.prototype.CoordinateSub = (coordinate) => {
    let result = new Rect();
    result.x1 = coordinate.SubX(x1);
    result.y1 = coordinate.SubY(y1);
    result.x2 = coordinate.SubX(x2);
    result.y2 = coordinate.SubY(y2);
    return result;
}

Rect.prototype.CoordinateAdd = (coordinate, radius) => {
    let result = new Rect();
    result.x1 = coordinate.AddX(x1 - radius);
    result.y1 = coordinate.AddY(y1 - radius);
    result.x2 = coordinate.AddX(x2 + radius);
    result.y2 = coordinate.AddY(y2 + radius);
    return result;
}

Rect.prototype.Inside = (v) => {
    if (v.getX() > x1 && v.getX() < x2 && v.getY() > y1 && v.getY() < y2) {
        return true;
    }
    return false;
}

Rect.prototype.setArea = (v) => {
    x1 = Math.min(x1, v.getX());
    y1 = Math.min(y1, v.getY());
    x2 = Math.max(x2, v.getX());
    y2 = Math.max(y2, v.getY());
}

Rect.prototype.Expand = (length) => {
    let rect = new Rect();
    rect.x1 = x1 - length;
    rect.y1 = y1 - length;
    rect.x2 = x2 + length;
    rect.y2 = y2 + length;
    return rect;
}
