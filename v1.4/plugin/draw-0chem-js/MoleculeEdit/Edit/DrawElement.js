import {nameChemType} from "../../MoleculeDraw/Draw/DrawBase";
import {CONFIG_MOLECULE} from "../../config";
import {nameSelected} from "./DrawSelect";

/*=============================================================

=============================================================*/
export function Element_Enter(e, operate) {
    let chemType = e.target.getAttribute(nameChemType);
    if (chemType === "atom") {
        e.target.style.fill = CONFIG_MOLECULE.DRAW_ATOM.backgroundEnterColor;
        let id = e.target.getAttribute(CONFIG_MOLECULE.DRAW_LAYOUT.ELEMENT_ATOM_ID);
        console.log("================================ enter atom " + id);
    } else if (chemType === "bond") {
        e.target.style.stroke = CONFIG_MOLECULE.DRAW_BOND.backgroundEnterColor;
        let id = e.target.getAttribute(CONFIG_MOLECULE.DRAW_LAYOUT.ELEMENT_BOND_ID);
        console.log("================================ enter bond " + id);
    }
}

export function Element_Out(e) {
    let chemType = e.target.getAttribute(nameChemType);
    let selected = e.target.getAttribute(nameSelected);
    if (chemType === "atom") {
        if (selected === "true" || selected === true)
            e.target.style.fill = CONFIG_MOLECULE.DRAW_CONST.BACKGROUND_SELECT;
        else
            e.target.style.fill = CONFIG_MOLECULE.DRAW_ATOM.backgroundColor;
    } else if (chemType === "bond") {
        if (selected === "true" || selected === true)
            e.target.style.stroke = CONFIG_MOLECULE.DRAW_CONST.BACKGROUND_SELECT;
        else
            e.target.style.stroke = CONFIG_MOLECULE.DRAW_BOND.backgroundColor;
    }
}