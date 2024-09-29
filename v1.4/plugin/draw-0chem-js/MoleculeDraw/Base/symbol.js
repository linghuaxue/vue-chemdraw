/*
Author: 史岩
Author URL: http://www.0chem.com
Date: 2022.2.21
*/

const countElement = 118;
const countElementAll = 126;
const countAll = 131;

const getChargeString = (charge) => {
    switch (charge) {
        case 0:
            return "";
        case 1:
            return "+";
        case -1:
            return "-";
        default:
            let s = Math.abs(charge);
            if (charge > 0)
                s += "+";
            else
                s += "-";
            return s;
    }
}

const Symbol = class {
    constructor(elementId, symbol, nameEN, nameCN, cnType, pinYin,
                mass, row, color, fontColor,
                hydrogen, valence, o2nd, o3rd, o4th) {
        this.id = elementId;
        this.symbol = symbol;
        this.label = symbol.toLowerCase();
        this.nameEN = nameEN;
        this.nameCN = nameCN;
        this.cnType = cnType;
        this.PinYin = pinYin;

        this.weight = mass;
        this.row = row;
        this.background = color;
        this.colorBackground = color;
        this.colorFont = fontColor;

        this.hydrogen = hydrogen;
        this.valence = valence;
        this.o2nd = o2nd;
        this.o3rd = o3rd;
        this.o4th = o4th;
    }

    // public static Element newInstanceBySymbol(String name) {
    //     for (int i = 0; i < 131; i++) {
    //         Element model = Element.newInstanceByIndex(i);
    //         if (model.label.equals(name.toLowerCase())) {
    //             return model;
    //         }
    //     }
    //     return null;
    // }
    //
    // public static Element newInstanceByIndex(int index) {
    //     return newInstanceById(index + 1);
    // }

//    public static Element newInstanceById(int id) {
//        if (id >= 0 && id < 126)
//            return getElement(data.get(id - 1));
//        if (id > 1000 && id < 1010) {
//            for (int i = data.size() - 10; i < data.size(); i++) {
//                Model_PeriodicTable model = data.get(i);
//                if (model.getElementId() == id)
//                    return getElement(model);
//            }
//        }
//        return null;
//    }

//    public static Element newInstanceByIndex(int index) {
//        return getElement(data.get(index));
//    }

    //region 变量
    // protected int id;
    // protected String symbol;
    // protected String nameEN;
    // protected String nameCN;
    // private int cnType;
    // protected String PinYin;
    //
    // protected double weight;
    // protected int row;
    // public String background;
    // protected int colorBackground;
    // protected int colorFont;
    //
    // public int hydrogen;
    // public int valence;
    // public int o2nd;
    // public int o3rd;
    // public int o4th;
    //
    // private int mass;
    // protected String label;
    //endregion

    //region 属性
    // public int getElementId() {
    //     return id;
    // }
    //
    // public String getSymbol() {
    //     return symbol;
    // }
    //
    // public int getRow() {
    //     return row;
    // }
    //
    // public int getBackgroundColor() {
    //     return colorBackground;
    // }
    //
    // public int getFontColor() {
    //     return colorFont;
    // }
    //
    // public String getNameEN() {
    //     return nameEN;
    // }
    //
    // public String getNameCN() {
    //     return nameCN;
    // }
    //
    // public int getCnType() {
    //     return cnType;
    // }
    //
    // public String getPinYin() {
    //     return PinYin;
    // }
    //
    // public double getWeight() {
    //     return weight;
    // }
    //
    // public int getHydrogen() {
    //     return hydrogen;
    // }
    //
    // public int getValence() {
    //     return valence;
    // }
    //
    // public int get2nd() {
    //     return o2nd;
    // }
    //
    // public int get3rd() {
    //     return o3rd;
    // }
    //
    // public int get4th() {
    //     return o4th;
    // }
    //
    // public int getMass() {
    //     return mass;
    // }
    //
    // public String getTag() {
    //     return nameCN + "(" + symbol + ")";
    // }
    // //endregion
    //
    // //region 辅助
    // public static String getLabel(int elementId) {
    //     return newInstanceById(elementId).symbol;
    // }
    //
    // public static String getTag(int elementId) {
    //     Element element = newInstanceById(elementId);
    //     return element.getTag();
    // }
    //
    // public static String getChargeString(int charge) {
    //     switch (charge) {
    //         case 0:
    //             return "";
    //         case 1:
    //             return "+";
    //         case -1:
    //             return "-";
    //         default:
    //             String s = String.valueOf(Math.abs(charge));
    //             if (charge > 0)
    //                 s += "+";
    //             else
    //                 s += "-";
    //             return s;
    //     }
    // }
    //endregion
}

//region 数据
const getElementById = (elementId) => {
    switch (elementId) {
        //region element
        case 1:
            return new Symbol(1, "H", "hydrogen", "氢", 0, "qīng", 1.00797, 1, "#df3963", "#000000", 1, 1, 0, 0, 0);
        case 2:
            return new Symbol(2, "He", "helium", "氦", 0, "hài", 4.0026, 1, "#f6a2b6", "#d9ffff", 0, 0, 0, 0, 0);
        case 3:
            return new Symbol(3, "Li", "lithium", "锂", 0, "lǐ", 6.941, 2, "#b2d36e", "#cc80ff", 1, 1, 0, 0, 0);
        case 4:
            return new Symbol(4, "Be", "beryllium", "铍", 0, "pí", 9.01218, 2, "#91bd38", "#c2ff00", 2, 2, 0, 0, 0);
        case 5:
            return new Symbol(5, "B", "boron", "硼", 0, "péng", 10.811, 2, "#ad6dac", "#ffb5b5", 3, 3, 0, 0, 0);
        case 6:
            return new Symbol(6, "C", "carbon", "碳", 0, "tàn", 12.011, 2, "#df3963", "#000000", 4, 4, 2, 4, 0);
        case 7:
            return new Symbol(7, "N", "nitrogen", "氮", 0, "dàn", 14.0067, 2, "#df3963", "#304ff7", 3, 3, 5, 4, 2);
        case 8:
            return new Symbol(8, "O", "oxygen", "氧", 0, "yǎng", 15.9994, 2, "#df3963", "#ff0d0d", 2, 2, 0, 0, 0);
        case 9:
            return new Symbol(9, "F", "fluorine", "氟", 0, "fú", 18.9984, 2, "#e96a8a", "#8fe04f", 1, 1, 0, 0, 0);
        case 10:
            return new Symbol(10, "Ne", "neon", "氖", 0, "nǎi", 20.1797, 2, "#f6a2b6", "#b3e3f5", 0, 0, 0, 0, 0);
        case 11:
            return new Symbol(11, "Na", "sodium", "钠", 0, "nà", 22.98977, 3, "#b2d36e", "#ab5cf2", 1, 1, 0, 0, 0);
        case 12:
            return new Symbol(12, "Mg", "magnesium", "镁", 0, "měi", 24.305, 3, "#91bd38", "#8aff00", 2, 2, 0, 0, 0);
        case 13:
            return new Symbol(13, "Al", "aluminum", "铝", 0, "lǚ", 26.98154, 3, "#8e368c", "#bfa6a6", 3, 3, 0, 0, 0);
        case 14:
            return new Symbol(14, "Si", "silicon", "硅", 0, "guī", 28.0855, 3, "#ad6dac", "#f0c7a1", 4, 4, 2, 0, 0);
        case 15:
            return new Symbol(15, "P", "phosphorus", "磷", 0, "lín", 30.97376, 3, "#df3963", "#ff8000", 3, 5, 5, 4, 0);
        case 16:
            return new Symbol(16, "S", "sulfur", "硫", 0, "liú", 32.066, 3, "#df3963", "#d9a61a", 2, 6, 4, 6, 0);
        case 17:
            return new Symbol(17, "Cl", "chlorine", "氯", 0, "lǜ", 35.4527, 3, "#e96a8a", "#1ff01f", 1, 1, 3, 5, 7);
        case 18:
            return new Symbol(18, "Ar", "argon", "氩", 0, "yà", 39.948, 3, "#f6a2b6", "#80d1e3", 0, 0, 0, 0, 0);
        case 19:
            return new Symbol(19, "K", "potassium", "钾", 0, "jiǎ", 39.0983, 4, "#b2d36e", "#8f40d4", 1, 1, 0, 0, 0);
        case 20:
            return new Symbol(20, "Ca", "calcium", "钙", 0, "gài", 40.078, 4, "#91bd38", "#3dff00", 2, 2, 0, 0, 0);
        case 21:
            return new Symbol(21, "Sc", "scandium", "钪", 0, "kàng", 44.9559, 4, "#3661b6", "#e6e6e6", 3, 3, 0, 0, 0);
        case 22:
            return new Symbol(22, "Ti", "titanium", "钛", 0, "tài", 47.88, 4, "#3661b6", "#bfc2c7", 4, 4, 3, 0, 0);
        case 23:
            return new Symbol(23, "V", "vanadium", "钒", 0, "fán", 50.9415, 4, "#3661b6", "#a6a6ab", 5, 5, 4, 3, 2);
        case 24:
            return new Symbol(24, "Cr", "chromium", "铬", 0, "gè", 51.996, 4, "#3661b6", "#8a99c7", 3, 3, 6, 2, 0);
        case 25:
            return new Symbol(25, "Mn", "manganese", "锰", 0, "měng", 54.938, 4, "#3661b6", "#9c7ac7", 4, 4, 2, 7, 6);
        case 26:
            return new Symbol(26, "Fe", "iron", "铁", 0, "tiě", 55.847, 4, "#3661b6", "#e06633", 3, 3, 3, 0, 0);
        case 27:
            return new Symbol(27, "Co", "cobalt", "钴", 0, "gǔ", 58.9332, 4, "#3661b6", "#f08fa1", 2, 2, 3, 0, 0);
        case 28:
            return new Symbol(28, "Ni", "nickel", "镍", 0, "niè", 58.6934, 4, "#3661b6", "#4fd14f", 2, 2, 3, 0, 0);
        case 29:
            return new Symbol(29, "Cu", "copper", "铜", 0, "tóng", 63.456, 4, "#3661b6", "#c78033", 2, 2, 1, 0, 0);
        case 30:
            return new Symbol(30, "Zn", "zinc", "锌", 0, "xīn", 65.39, 4, "#3661b6", "#7d80b0", 2, 2, 0, 0, 0);
        case 31:
            return new Symbol(31, "Ga", "gallium", "镓", 0, "jiā", 69.723, 4, "#8e368c", "#c28f8f", 3, 3, 0, 0, 0);
        case 32:
            return new Symbol(32, "Ge", "germanium", "锗", 0, "zhě", 72.61, 4, "#ad6dac", "#668f8f", 4, 4, 0, 0, 0);
        case 33:
            return new Symbol(33, "As", "arsenic", "砷", 0, "shēn", 74.9216, 4, "#ad6dac", "#bd80e3", 3, 3, 5, 0, 0);
        case 34:
            return new Symbol(34, "Se", "selenium", "硒", 0, "xī", 78.96, 4, "#df3963", "#ffa100", 4, 4, -2, 6, 0);
        case 35:
            return new Symbol(35, "Br", "bromine", "溴", 0, "xiù", 79.904, 4, "#e96a8a", "#a62929", 1, 1, 5, 7, 0);
        case 36:
            return new Symbol(36, "Kr", "krypton", "氪", 0, "kè", 83.8, 4, "#f6a2b6", "#5cb8d1", 0, 0, 2, 0, 0);
        case 37:
            return new Symbol(37, "Rb", "rubidium", "铷", 0, "rú", 85.4678, 5, "#b2d36e", "#702eb0", 1, 1, 0, 0, 0);
        case 38:
            return new Symbol(38, "Sr", "strontium", "锶", 0, "sī", 87.62, 5, "#91bd38", "#00ff00", 2, 2, 0, 0, 0);
        case 39:
            return new Symbol(39, "Y", "yttrium", "钇", 0, "yǐ", 88.9059, 5, "#3661b6", "#94ffff", 3, 3, 0, 0, 0);
        case 40:
            return new Symbol(40, "Zr", "zirconium", "锆", 0, "gào", 91.224, 5, "#3661b6", "#94e0e0", 4, 4, 0, 0, 0);
        case 41:
            return new Symbol(41, "Nb", "niobium", "铌", 0, "ní", 92.9064, 5, "#3661b6", "#73c2c9", 5, 5, 3, 0, 0);
        case 42:
            return new Symbol(42, "Mo", "molybdenum", "钼", 0, "mù", 95.94, 5, "#3661b6", "#54b5b5", 6, 6, 5, 4, 3);
        case 43:
            return new Symbol(43, "Tc", "technetium", "锝", 0, "dé", 98.0, 5, "#3661b6", "#3b9e9e", 7, 7, 0, 0, 0);
        case 44:
            return new Symbol(44, "Ru", "ruthenium", "钌", 0, "liǎo", 101.07, 5, "#3661b6", "#248f8f", 3, 3, 4, 2, 6);
        case 45:
            return new Symbol(45, "Rh", "rhodium", "铑", 0, "lǎo", 102.9055, 5, "#3661b6", "#0a7d8c", 3, 3, 2, 4, 0);
        case 46:
            return new Symbol(46, "Pd", "palladium", "钯", 0, "bǎ", 106.42, 5, "#3661b6", "#006985", 2, 2, 4, 0, 0);
        case 47:
            return new Symbol(47, "Ag", "silver", "银", 0, "yín", 107.868, 5, "#3661b6", "#bfbfbf", 1, 1, 0, 0, 0);
        case 48:
            return new Symbol(48, "Cd", "cadmium", "镉", 0, "gé", 112.41, 5, "#3661b6", "#ffd98f", 2, 2, 0, 0, 0);
        case 49:
            return new Symbol(49, "In", "indium", "铟", 0, "yīn", 114.82, 5, "#8e368c", "#a67573", 3, 3, 0, 0, 0);
        case 50:
            return new Symbol(50, "Sn", "tin", "锡", 0, "xī", 118.71, 5, "#8e368c", "#668080", 4, 4, 2, 0, 0);
        case 51:
            return new Symbol(51, "Sb", "antimony", "锑", 0, "tī", 121.757, 5, "#ad6dac", "#9e63b5", 3, 3, 5, 0, 0);
        case 52:
            return new Symbol(52, "Te", "tellurium", "碲", 0, "dì", 127.6, 5, "#ad6dac", "#d47a00", 4, 4, -2, 6, 0);
        case 53:
            return new Symbol(53, "I", "iodine", "碘", 0, "diǎn", 126.9045, 5, "#e96a8a", "#940094", 1, 1, 5, 7, 0);
        case 54:
            return new Symbol(54, "Xe", "xenon", "氙", 0, "xiān", 131.29, 5, "#f6a2b6", "#429eb0", 0, 0, 2, 4, 6);
        case 55:
            return new Symbol(55, "Cs", "cesium", "铯", 0, "sè", 132.9054, 6, "#b2d36e", "#57178f", 1, 1, 0, 0, 0);
        case 56:
            return new Symbol(56, "Ba", "barium", "钡", 0, "bèi", 137.33, 6, "#91bd38", "#00c900", 2, 2, 0, 0, 0);
        case 57:
            return new Symbol(57, "La", "lanthanum", "镧", 0, "lán", 138.9055, 11, "#93a9d7", "#70d4ff", 3, 3, 0, 0, 0);
        case 58:
            return new Symbol(58, "Ce", "cerium", "铈", 0, "shì", 140.12, 11, "#93a9d7", "#ffffc7", 3, 3, 4, 0, 0);
        case 59:
            return new Symbol(59, "Pr", "praseodymium", "镨", 0, "pǔ", 140.9077, 11, "#93a9d7", "#d9ffc7", 3, 3, 4, 0, 0);
        case 60:
            return new Symbol(60, "Nd", "neodymium", "钕", 0, "nǚ", 144.24, 11, "#93a9d7", "#c7ffc7", 3, 3, 0, 0, 0);
        case 61:
            return new Symbol(61, "Pm", "promethium", "钷", 0, "pǒ", 145.0, 11, "#93a9d7", "#a3ffc7", 3, 3, 0, 0, 0);
        case 62:
            return new Symbol(62, "Sm", "samarium", "钐", 0, "shān", 150.36, 11, "#93a9d7", "#8fffc7", 3, 3, 2, 0, 0);
        case 63:
            return new Symbol(63, "Eu", "europium", "铕", 0, "yǒu", 151.965, 11, "#93a9d7", "#61ffc7", 3, 3, 2, 0, 0);
        case 64:
            return new Symbol(64, "Gd", "gadolinium", "钆", 0, "gá", 157.25, 11, "#93a9d7", "#45ffc7", 3, 3, 0, 0, 0);
        case 65:
            return new Symbol(65, "Tb", "terbium", "铽", 0, "tè", 158.9253, 11, "#93a9d7", "#30ffc7", 3, 3, 4, 0, 0);
        case 66:
            return new Symbol(66, "Dy", "dysprosium", "镝", 0, "dī", 162.5, 11, "#93a9d7", "#1fffc7", 3, 3, 0, 0, 0);
        case 67:
            return new Symbol(67, "Ho", "holmium", "钬", 0, "huǒ", 164.9303, 11, "#93a9d7", "#00ff9c", 3, 3, 0, 0, 0);
        case 68:
            return new Symbol(68, "Er", "erbium", "铒", 0, "ěr", 167.26, 11, "#93a9d7", "#00e675", 3, 3, 0, 0, 0);
        case 69:
            return new Symbol(69, "Tm", "thulium", "铥", 0, "diū", 168.9342, 11, "#93a9d7", "#00d452", 3, 3, 2, 0, 0);
        case 70:
            return new Symbol(70, "Yb", "ytterbium", "镱", 0, "yì", 173.04, 11, "#93a9d7", "#00bf38", 3, 3, 2, 0, 0);
        case 71:
            return new Symbol(71, "Lu", "lutetium", "镥", 0, "lǔ", 174.967, 11, "#93a9d7", "#00ab24", 3, 3, 0, 0, 0);
        case 72:
            return new Symbol(72, "Hf", "hafnium", "铪", 0, "hā", 178.49, 6, "#3661b6", "#4dc2ff", 4, 4, 0, 0, 0);
        case 73:
            return new Symbol(73, "Ta", "tantalum", "钽", 0, "tǎn", 180.9479, 6, "#3661b6", "#4da6ff", 5, 5, 0, 0, 0);
        case 74:
            return new Symbol(74, "W", "tungsten", "钨", 0, "wū", 183.85, 6, "#3661b6", "#2194d6", 6, 6, 5, 4, 3);
        case 75:
            return new Symbol(75, "Re", "rhenium", "铼", 0, "lái", 186.207, 6, "#3661b6", "#267dab", 7, 7, 4, 6, 2);
        case 76:
            return new Symbol(76, "Os", "osmium", "锇", 0, "é", 190.2, 6, "#3661b6", "#266696", 4, 4, 3, 6, 8);
        case 77:
            return new Symbol(77, "Ir", "iridium", "铱", 0, "yī", 192.22, 6, "#3661b6", "#175487", 4, 4, 2, 3, 6);
        case 78:
            return new Symbol(78, "Pt", "platinum", "铂", 0, "bó", 195.08, 6, "#3661b6", "#d1d1e0", 4, 4, 2, 0, 0);
        case 79:
            return new Symbol(79, "Au", "gold", "金", 0, "jīn", 196.9665, 6, "#3661b6", "#ffd124", 3, 3, 1, 0, 0);
        case 80:
            return new Symbol(80, "Hg", "mercury", "汞", 0, "gǒng", 200.59, 6, "#3661b6", "#b8b8d1", 2, 2, 1, 0, 0);
        case 81:
            return new Symbol(81, "Tl", "thallium", "铊", 0, "tā", 204.383, 6, "#8e368c", "#a6544d", 1, 1, 3, 0, 0);
        case 82:
            return new Symbol(82, "Pb", "lead", "铅", 0, "qiān", 207.2, 6, "#8e368c", "#575961", 2, 2, 4, 0, 0);
        case 83:
            return new Symbol(83, "Bi", "bismuth", "铋", 0, "bì", 208.9804, 6, "#8e368c", "#9e4fb5", 3, 3, 5, 0, 0);
        case 84:
            return new Symbol(84, "Po", "polonium", "钋", 0, "pō", 209.0, 6, "#ad6dac", "#ab5c00", 4, 4, 2, 6, 0);
        case 85:
            return new Symbol(85, "At", "astatine", "砹", 0, "ài", 210.0, 6, "#e96a8a", "#754f45", 1, 1, 3, 5, 7);
        case 86:
            return new Symbol(86, "Rn", "radon", "氡", 0, "dōng", 222.0, 6, "#f6a2b6", "#428296", 0, 0, 2, 0, 0);
        case 87:
            return new Symbol(87, "Fr", "francium", "钫", 0, "fāng", 223.0, 7, "#b2d36e", "#420066", 1, 1, 0, 0, 0);
        case 88:
            return new Symbol(88, "Ra", "radium", "镭", 0, "léi", 226.0254, 7, "#91bd38", "#007d00", 2, 2, 0, 0, 0);
        case 89:
            return new Symbol(89, "Ac", "actinium", "锕", 0, "ā", 227.0, 12, "#93aaff", "#70abfa", 3, 3, 0, 0, 0);
        case 90:
            return new Symbol(90, "Th", "thorium", "钍", 0, "tǔ", 232.0381, 12, "#93aaff", "#00baff", 4, 4, 0, 0, 0);
        case 91:
            return new Symbol(91, "Pa", "protactinium", "镤", 0, "pú", 231.0359, 12, "#93aaff", "#00a1ff", 5, 5, 4, 0, 0);
        case 92:
            return new Symbol(92, "U", "uranium", "铀", 0, "yóu", 238.029, 12, "#93aaff", "#008fff", 6, 6, 5, 4, 3);
        case 93:
            return new Symbol(93, "Np", "neptunium", "镎", 0, "ná", 237.0482, 12, "#93aaff", "#0080ff", 5, 5, 6, 4, 3);
        case 94:
            return new Symbol(94, "Pu", "plutonium", "钚", 0, "bù", 244.0, 12, "#93aaff", "#006bff", 4, 4, 6, 5, 3);
        case 95:
            return new Symbol(95, "Am", "americium", "镅", 0, "méi", 243.0, 12, "#93aaff", "#545cf2", 3, 3, 6, 5, 4);
        case 96:
            return new Symbol(96, "Cm", "curium", "锔", 0, "jú", 247.0, 12, "#93aaff", "#785ce3", 3, 3, 0, 0, 0);
        case 97:
            return new Symbol(97, "Bk", "berkelium", "锫", 0, "péi", 247.0, 12, "#93aaff", "#8a4fe3", 3, 3, 4, 0, 0);
        case 98:
            return new Symbol(98, "Cf", "californium", "锎", 0, "kāi", 251.0, 12, "#93aaff", "#a136d4", 0, 0, 0, 0, 0);
        case 99:
            return new Symbol(99, "Es", "einsteinium", "锿", 0, "āi", 252.0, 12, "#93aaff", "#b31fd4", 3, 3, 0, 0, 0);
        case 100:
            return new Symbol(100, "Fm", "fermium", "镄", 0, "fèi", 257.0, 12, "#93aaff", "#000000", 3, 3, 0, 0, 0);
        case 101:
            return new Symbol(101, "Md", "mendelevium", "钔", 0, "mén", 258.0, 12, "#93aaff", "#000000", 3, 3, 0, 0, 0);
        case 102:
            return new Symbol(102, "No", "nobelium", "锘", 0, "nuò", 259.0, 12, "#93aaff", "#000000", 3, 3, 2, 0, 0);
        case 103:
            return new Symbol(103, "Lr", "lawrencium", "铹", 0, "láo", 260.0, 12, "#93aaff", "#000000", 3, 3, 0, 0, 0);
        case 104:
            return new Symbol(104, "Rf", "rutherfordium", "\ud872\udf3b", 1, "lú", 261.0, 7, "#3661b6", "#000000", 0, 0, 0, 0, 0);
        case 105:
            return new Symbol(105, "Ha", "hahnium", "\ud872\udf4a", 1, "dù", 262.0, 7, "#3661b6", "#000000", 0, 0, 0, 0, 0);
        case 106:
            return new Symbol(106, "Sg", "seaborgium", "\ud872\udf73", 1, "xǐ", 263.0, 7, "#3661b6", "#000000", 0, 0, 0, 0, 0);
        case 107:
            return new Symbol(107, "Bh", "bohrium", "\ud872\udf5b", 1, "bō", 265.0, 7, "#3661b6", "#000000", 0, 0, 0, 0, 0);
        case 108:
            return new Symbol(108, "Hs", "hassium", "\ud872\udf76", 1, "hēi", 262.0, 7, "#3661b6", "#000000", 0, 0, 0, 0, 0);
        case 109:
            return new Symbol(109, "Mt", "meitnerium", "\u9fcf", 1, "mài", 266.0, 7, "#3661b6", "#000000", 0, 0, 0, 0, 0);
        case 110:
            return new Symbol(110, "Ds", "darmstadtium", "\ud86d\udffc", 1, "dá", 269.0, 7, "#3661b6", "#000000", 0, 0, 0, 0, 0);
        case 111:
            return new Symbol(111, "Rg", "roentgenium", "\ud872\udf2d", 1, "lún", 272.0, 7, "#3661b6", "#000000", 0, 0, 0, 0, 0);
        case 112:
            return new Symbol(112, "Cn", "Copernicium", "\\uF004", 2, "gē", 285.0, 7, "#3661b6", "#000000", 0, 0, 0, 0, 0);
        case 113:
            return new Symbol(113, "Nh", "Nihonium", "\\uF003", 2, "nǐ", 284.0, 7, "#8e368c", "#000000", 0, 0, 0, 0, 0);
        case 114:
            return new Symbol(114, "Fl", "Flerovium", "\ud86d\udce7", 1, "fū", 289.0, 7, "#8e368c", "#000000", 0, 0, 0, 0, 0);
        case 115:
            return new Symbol(115, "Mc", "Moscovium", "\u9546", 1, "mò", 288.0, 7, "#8e368c", "#000000", 0, 0, 0, 0, 0);
        case 116:
            return new Symbol(116, "Lv", "Livermorium", "\\uF005", 2, "lì", 292.0, 7, "#8e368c", "#000000", 0, 0, 0, 0, 0);
        case 117:
            return new Symbol(117, "Ts", "Tennesine", "\\uF001", 2, "tián", 0.0, 7, "#e96a8a", "#000000", 0, 0, 0, 0, 0);
        case 118:
            return new Symbol(118, "Og", "oganesson", "\\uF002", 2, "ào", 294.0, 7, "#f6a2b6", "#000000", 0, 0, 0, 0, 0);
        case 119:
            return new Symbol(119, "Uue", "ununenium", "Uue", 0, "null", 0.0, 8, "#b2d36e", "#000000", 0, 0, 0, 0, 0);
        case 120:
            return new Symbol(120, "Ubn", "unbinilium", "Ubn", 0, "null", 0.0, 8, "#91bd38", "#000000", 0, 0, 0, 0, 0);
        case 121:
            return new Symbol(121, "Ubu", "unbiunium", "Ubu", 0, "null", 0.0, 13, "#6e8ac8", "#000000", 0, 0, 0, 0, 0);
        case 122:
            return new Symbol(122, "Ubb", "unbibium", "Ubb", 0, "null", 0.0, 13, "#6e8ac8", "#000000", 0, 0, 0, 0, 0);
        case 123:
            return new Symbol(123, "Ubt", "Unbitrium", "Ubt", 0, "null", 0.0, 13, "#6e8ac8", "#000000", 0, 0, 0, 0, 0);
        case 124:
            return new Symbol(124, "Ubq", "unbiquadium", "Ubq", 0, "null", 0.0, 13, "#6e8ac8", "#000000", 0, 0, 0, 0, 0);
        case 125:
            return new Symbol(125, "Ubp", "unbipentium", "Ubp", 0, "null", 0.0, 13, "#6e8ac8", "#000000", 0, 0, 0, 0, 0);
        case 126:
            return new Symbol(126, "Ubh", "unbihexium", "Ubh", 0, "null", 0.0, 13, "#6e8ac8", "#000000", 0, 0, 0, 0, 0);
        case 127:
        case 1001:
            return new Symbol(1001, "*", "any", "任意官能团", -1, "null", 0.0, 99, "#0000FF", "#000000", 0, 0, 0, 0, 0);
        case 128:
        case 1002:
            return new Symbol(1002, "X", "X", "X", -1, "null", 0.0, 99, "#00FF0F", "#000000", 0, 0, 0, 0, 0);
        case 129:
        case 1003:
            return new Symbol(1003, "Z", "Z", "Z", -1, "null", 0.0, 99, "#00F0FF", "#000000", 9, 9, 0, 0, 0);
        case 130:
        case 1010:
            return new Symbol(1010, "R#", "Rgroup", "Rgroup", -1, "null", 0.0, 99, "#0000FF", "#000000", 0, 0, 0, 0, 0);
        case 131:
        case 1011:
            return new Symbol(1011, "A", "any", "任意元素", -1, "null", 0.0, 99, "#00FF0F", "#000000", 0, 0, 0, 0, 0);
        case 132:
        case 1012:
            return new Symbol(1012, "Q", "any atom but C or H", "非碳氢", -1, "null", 0.0, 99, "#FF00FF", "#000000", 0, 0, 0, 0, 0);
        // case 133:
        // case 1014:
        //     return new Symbol(1014, "S#", "null", "Sgroup", -1, "null", 0.0, 99, "#00F0FF", "#000000", 9, 9, 0, 0, 0);
        case 133:
        case 1013:
            return new Symbol(1013, "L", "any", "任意元素", -1, "null", 0.0, 99, "#00FF0F", "#000000", 0, 0, 0, 0, 0);
        case 134:
        case 1014:
            return new Symbol(1014, "G", "any", "任意元素", -1, "null", 0.0, 99, "#00FF0F", "#000000", 0, 0, 0, 0, 0);
        case 135:
        case 1015:
            return new Symbol(1015, "R", "any", "任意元素", -1, "null", 0.0, 99, "#00FF0F", "#000000", 0, 0, 0, 0, 0);
        case 136:
        case 2001:
            return new Symbol(2001, "D", "deuterium", "氘（deuterium）", -1, "null", 0.0, 99, "#00FF0F", "#000000", 0, 0, 0, 0, 0);
        case 137:
        case 2002:
            return new Symbol(2002, "T", "tritium", "氚[tritium]", -1, "null", 0.0, 99, "#00FF0F", "#000000", 0, 0, 0, 0, 0);
        //endregion
    }
    return null;
}

function getElementBySymbol(s) {
    s = s.toString().toLowerCase();
    if (s.length > 1 && (s[0] === "r" || s[0] === "x" || s[0] === "z") && !isNaN(s[1])) {
        return getElementById(1011);
    }
    for (let i = 1; i < 136; i++) {
        let element = getElementById(i);
        if (s === element.label)
            return element;
    }
    return null;
}//endregion

export {getElementById, getChargeString, getElementBySymbol}