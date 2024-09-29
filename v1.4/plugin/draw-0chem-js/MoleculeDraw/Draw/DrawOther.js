import {CONFIG_MOLECULE} from "../../config";

const DrawPoint = (id, x, y) => {
    let layout = document.getElementById(CONFIG_MOLECULE.DRAW_LAYOUT.BACKGROUND_ADD);
    let element = document.getElementById(id);
    if (!element) {
        element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        element.id = id;
        element.style.pointerEvents = "none";
        element.setAttribute("r", CONFIG_MOLECULE.DRAW_ATOM.FONT_RADIUS);
        element.style.fill = CONFIG_MOLECULE.DRAW_ATOM.backgroundEnterColor;
        layout.appendChild(element);
    }
    element.setAttribute("cx", x);
    element.setAttribute("cy", y);
    return element;
}

//region 箭头
// const DrawArrowLine=(x1,y1,x2,y2,scale)=>{
//     double length = a.Length(b);
//     double head = Draw2DBond.BOND_LENGTH / 3, strokeWidth = 1;
//     Path path = new Path();
//     Vector vector = coordinate.Add(a.Move(0, strokeWidth));
//     path.moveTo((float) vector.getX(), (float) vector.getY());
//     vector = coordinate.Add(a.Move(length - head, strokeWidth));
//     path.lineTo((float) vector.getX(), (float) vector.getY());
//     vector = coordinate.Add(a.Move(length - head, head / 3));
//     path.lineTo((float) vector.getX(), (float) vector.getY());
//     vector = coordinate.Add(a.Move(length, 0));
//     path.lineTo((float) vector.getX(), (float) vector.getY());
//     vector = coordinate.Add(a.Move(length - head, -head / 3));
//     path.lineTo((float) vector.getX(), (float) vector.getY());
//     vector = coordinate.Add(a.Move(length - head, -strokeWidth));
//     path.lineTo((float) vector.getX(), (float) vector.getY());
//     vector = coordinate.Add(a.Move(0, -strokeWidth));
//     path.lineTo((float) vector.getX(), (float) vector.getY());
//     path.close();
//     canvas.drawPath(path, Draw2DBond.getDrawSelect(COLOR_Arrow));
// }
//endregion

//region SGroup绘制
// const DrawSGroupLine(x1,y1,x2,y2,scale,  topString,  bottomString)=>{
//     double width = LENGTH_SGroup;
//     if (a.getX() > b.getX()) {
//         width = -width;
//     }
//     drawSGroupLine(canvas, coordinate, a, width, b.getY() - a.getY());
//     drawSGroupLine(canvas, coordinate, b, -width, a.getY() - b.getY());
//     drawSGroupLabel(canvas, coordinate, a, b, topString, bottomString);
// }
//
// private void drawSGroupLine(Canvas canvas, Coordinate coordinate, Vector vector, double width, double height) {
//     Path path = new Path();
//     Vector current = coordinate.Add(vector.Move(width, 0));
//     path.moveTo((float) current.getX(), (float) current.getY());
//     current = coordinate.Add(vector.Move(0, 0));
//     path.lineTo((float) current.getX(), (float) current.getY());
//     current = coordinate.Add(vector.Move(0, height));
//     path.lineTo((float) current.getX(), (float) current.getY());
//     current = coordinate.Add(vector.Move(width, height));
//     path.lineTo((float) current.getX(), (float) current.getY());
//     canvas.drawPath(path, Draw2DBond.getDrawBond(Color.BLUE, coordinate.getScale()));
// }
//
// private void drawSGroupLabel(Canvas canvas, Coordinate coordinate, Vector a, Vector b, String top, String bottom) {
//     Paint paint_Text = Draw2DAtom.getDrawText(TEXT_LABEL * coordinate.getScale(), COLOR_SGroup);
//     double fontHeight = Draw2DAtom.getFontHeight(paint_Text);
//     double x = a.getX(), y = a.getY();
//     if (x < b.getX()) {
//         x = b.getX();
//     }
//     if (y < b.getY()) {
//         y = b.getY();
//     }
//     double height = Math.abs(b.getY() - a.getY());
//     Vector vector = coordinate.Add(Vector.newInstance(x + 1, y + fontHeight, 0));
//     if (bottom != null && !bottom.isEmpty())
//         canvas.drawText(bottom, (float) (vector.getX()), (float) (vector.getY()), paint_Text);
//     vector = coordinate.Add(Vector.newInstance(x + 1, y - height, 0));
//     if (top != null && !top.isEmpty())
//         canvas.drawText(top, (float) (vector.getX()), (float) (vector.getY()), paint_Text);
// }
//endregion

export {
    DrawPoint
}