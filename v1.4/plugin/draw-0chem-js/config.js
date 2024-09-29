// Author: 史岩
// Author URL: http://www.0chem.com
// Date: 2024.8.1
import {ref} from "vue";
import {getCookie, setCookie} from "./MoleculeWeb/common/cookie";
import {BOND_STEREO, BOND_TYPE} from "./Molecule/Data/DataBond.js";
import {ZH_CN} from "./MoleculeWeb/lang/zh-cn.js";

export const LANG = ZH_CN;

//region ===========================================================================
// 分子专用
export const CONFIG_MOLECULE = {
    OPERATE_NAME: {
        "BOND": "bond",
        "BOND1": "bond1",
        "BOND2": "bond2",
        "BOND3": "bond3",
        "ATOM": "atom",
        "SELECT": "select",
        "MOVE": "move",
        "SCALE": "scale",
        "ERASER": "eraser",
        "RING": "ring",
        "FAST": "fast",
        "GROUP": "group",
        "ION": "ion"
    },
    DRAW_LAYOUT: {
        MAIN: "chem-molecule-svg",
        BACKGROUND_ADD: "chem-background-add",
        BACKGROUND_BOND: "chem-background-bond",
        BACKGROUND_ATOM: "chem-background-atom",
        MOLECULE: "chem-layout-molecule",
        ADD: "chem-layout-add",
        TYPE_ATOM: "atom",
        TYPE_BOND: "bond",
        ELEMENT_ATOM_ID: "atom-id",
        ELEMENT_BOND_ID: "bond-id"
    },
    DRAW_CONST: {
        "SELECT_ADD": 1,
        "FONT_FAMILY": "'Microsoft YaHei','微软雅黑'",
        "COLOR": "#111111",
        "COLOR_WHITE": "#FFFFFF",
        "BACKGROUND_SELECT": "#6590FF", //"#67c23a"//"#5fd600"//
        "BACKGROUND_TRANSPARENT": "transparent"
    },
    DRAW_ATOM: {
        "fontSize": 12,
        "radius": 13,
        "backgroundColor": "transparent",
        "backgroundEnterColor": "#fcab36", //"#fcab36",//FDA82D
        "FONT_RADIUS": 6,
        "FONT_RADIUS2": 10,
        "fontIdSize": 8,
        "fontIdColor": "#CD0074",
        "chargeFontSize": 10,
        "chargeFontColor": "#ff0000",
        "massColor": "#111111"
    },
    DRAW_BOND: {
        "BOND_LENGTH": 40,
        "BOND_WIDTH": 15,
        "BOND_BLANK": 5,
        "STROKE_DASHARRAY": "5 2",
        "COLOR": "#111111",
        "backgroundColor": "transparent",
        "backgroundEnterColor": "#fcab36",
        "bondCenterColor": "#ff0000",
        "fontIdSize": 10,
        "fontIdColor": "#A063FF",
        "TRIANGLE_WIDTH": 4,
        "TRIANGLE_START": 6,
        "TRIANGLE_BLANK": 4,
        "TRIANGLE_LINE_WIDTH": 1.2
    },
    OTHER: {
        SEPARATOR: " - ",
        COOKIE: {
            "ATOM_NUMBER": "ATOM_NUMBER",
            "BOND_NUMBER": "BOND_NUMBER"
        }
    }
}//endregion

//region ===========================================================================
// 常量定义
export const CHEM_CONFIG = {
    MESSAGE: {ICON_SUCCESS: 'success', ICON_ERROR: 'error', ICON_WARN: 'warn'},
    COOKIE: {ATOM_NUMBER: "ATOM_NUMBER", BOND_NUMBER: "BOND_NUMBER"},
    FUNCTION: {
        parseBool: (value) => {
            return value === true || value === 'true';
        },
        parseInt: (value, d = 0) => {
            return parseInt(value, d);
        },
        parseFloat: (value, d = 0) => {
            return parseFloat(value);
        }
    }
}//endregion

//region ===========================================================================
// 变量
export const CHEM_SETTING = {
    UI: {
        DIALOG: ref({TITLE: '', TITLE_DESC: ' - 0chem.com', INDEX: 1, SHOW: true}),
        MENU: ref({DISABLE: [{id: "chem_icon_undo", value: false}, {id: "chem_icon_redo", value: false}, {id: "chem_icon_save", value: false}]}),
        TOOLBAR: ref({SELECTED: 501}),
        STATUSBAR: ref({SELECT_H: false, BOND_STEREO: 101}),
        STATE: ref({FULL_PAGE: false, FULL_SCREEN: false}),
        MOLECULE: ref({OPEN_TEXT: '', SAVE_TEXT: ''})
    },
    OPERATE: ref({
        OPERATE_NAME: CONFIG_MOLECULE.OPERATE_NAME.SELECT,
        OPERATE_VALUE: BOND_TYPE.BOND_SINGLE,
        OPERATE_ARG: BOND_STEREO.NONE,
        OPERATE_SYMBOL: 6
    }),
    DRAW: ref({
        SHOW_NUMBER_ATOM: false,
        SHOW_NUMBER_BOND: false,
        SHOW_SYMBOL_COLOR: true,
        HISTORY_COUNT: 100,
        AUXILIARY_LINE_LENGTH: 60,
        COLOR_AUXILIARY_LINE: "#DE3F3F",
        COLOR_OPERATE: "#0068B7"
    }),
    MOLECULE: {
        COORDINATE: ref(),
        LIST: ref([]),
        INDEX: ref(0),
        CHILD: ref(),
        CURRENT: ref()
    },
    getScale: () => {
        return CHEM_SETTING.MOLECULE.COORDINATE.value.getScale;
    }
}//endregion

//region ===========================================================================
/// 方法
export function CONFIG_init() {
}
