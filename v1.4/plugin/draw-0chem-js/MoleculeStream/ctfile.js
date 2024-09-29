/*!==================================================================
name: vue-chemdraw
website:  https://www.0chem.com/
author: 史岩
copyright: 0chem.com
date: 2024-9-2
version: 第7次重写
因为要改成微信小程序和web通用版本，而将写法降级为 es5
//================================================================!*/
import {getElementById, getElementBySymbol} from "../MoleculeDraw/Base/symbol.js";
import Vector from "../Molecule/Base/Vector.js";
import {DataAtom} from "../Molecule/Data/DataAtom.js";
import {DataBond} from "../Molecule/Data/DataBond.js";
import {DataGroup} from "../Molecule/Data/DataGroup.js";
import {MoleculeIdentify} from "../MoleculeDraw/Identify/MoleculeIdentify.js";
import RingIdentify from "../MoleculeDraw/Identify/RingIdentify.js";
import {CONFIG_MOLECULE} from "../config.js";
import DataMolecule from "../Molecule/DataMolecule.js";
import Coordinate from "../MoleculeDraw/Base/Coordinate.js";
//region 常量
// =================================================
// 常量
// =================================================
const STREAM_CONST = {
    // -------------------------------------------------
    // 常量
    MOL_VERSION_V2000: "V2000",
    MOL_VERSION_V3000: "V3000",

    headLinePartition: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6],
// aaabbblllfffcccsssxxxrrrpppiiimmmvvvvvv
    atomLinePartition: [10, 10, 10, 1, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    bondLinePartition: [3, 3, 3, 3, 3, 3, 3],
    atomListHeaderPartition: [3, 1, 1, 4, 1, 1], //endregion

    MOL_SPLIT: ' ',
    MOL_SPLIT_VALUE: '=',
    MOL_LINE_END: '\r\n',
    BASE_LINE_LINK: "-",
    MOL_V3000_LINE: "M  V30 ",
    MOL_V3000_COUNTS: "COUNTS",
    MOL_V3000_CTAB_BEGIN: "BEGIN CTAB",
    MOL_V3000_CTAB_END: "END CTAB",
    MOL_V3000_ATOM_BEGIN: "BEGIN ATOM",
    MOL_V3000_ATOM_END: "END ATOM",
    MOL_V3000_BOND_BEGIN: "BEGIN BOND",
    MOL_V3000_BOND_END: "END BOND",
    MOL_V3000_COLLECTION_BEGIN: "BEGIN COLLECTION",
    MOL_V3000_COLLECTION_END: "END COLLECTION",
    MOL_V3000_SGROUP_BEGIN: "BEGIN SGROUP",
    MOL_V3000_SGROUP_END: "END SGROUP",
    MOL_END: "M  END",

    atom_CHG: "CHG",
    atom_RAD: "RAD",
    atom_CFG: "CFG",
    atom_MASS: "MASS",
    atom_VAL: "VAL",
    atom_HCOUNT: "HCOUNT",
    atom_STBOX: "STBOX",
    atom_INVRET: "INVRET",
    atom_EXACHG: "EXACHG",
    atom_SUBST: "SUBST",
    atom_UNSAT: "UNSAT",
    atom_RBCNT: "RBCNT",
    atom_ATTCHPT: "ATTCHPT",
    atom_RGROUPS: "RGROUPS",
    atom_ATTCHORD: "ATTCHORD",
    atom_CLASS: "CLASS",
    atom_SEQID: "SEQID",

    bond_CFG: "CFG",
    bond_TOPO: "TOPO",
    bond_RXCRT: "RXCRT",
    bond_STBOX: "STBOX",

    MOL_SDF_END: "$$$$",

    // -------------------------------------------------
    // 常量
    partitionLine: function (line, format) {
        let result = [];
        for (let i = 0, shift = 0; i < format.length; i++) {
            let index = shift + format[i];
            if (index >= line.length) {
                result.push(line.substr(shift).trim());
                break;
            }
            result.push(line.substring(shift, index).trim());
            shift += format[i];
        }
        return result;
    },
    splitValue: function (line, split) {
        let p = line.indexOf(split);
        return [line.substring(0, p), line.substring(p + 1)];
    },
    parseLine: function (line) {
        let split = [],
            c, i = 0,
            pc = 0,
            i0 = -1,
            quoted = false;
        for (i = 0; i < line.length; ++i) {
            c = line.charAt(i);
            if (c === '(')
                pc++;
            else if (c === ')')
                pc--;
            if (c === '"')
                quoted = !quoted;
            if (!quoted && line.charAt(i) === STREAM_CONST.MOL_SPLIT && pc === 0) {
                if (i > i0 + 1)
                    split.push(line.substring(i0 + 1, i)); //此处使用的是从开始位置到结束位置，不是长度
                i0 = i;
            }
        }
        if (i > i0 + 1)
            split.push(line.substring(i0 + 1, i));
        return split;
    },
    parseInt: function (v) {
        if (isNaN(v))
            return -1;
        return parseInt(v);
    }
}
//endregion

//region 函数
// =================================================
// 常量
// =================================================
const ReadV2000 = {
    Create: function () {
        let model = {};
        //region 解析数据行
        model.parseCTabV2000 = function (data, stream) { // eslint-disable-line max-statements
            model.data = data;
            let i = 0;
            while (model.parseAtomLine(i, data[stream.shift], stream)) {
                stream.shift++;
                i++;
            }
            i = 0;
            while (model.parseBondLine(i, data[stream.shift], stream)) {
                stream.shift++;
                i++;
            }
            //解析属性
            while (model.parsePropertyLines(data[stream.shift], stream)) {
                stream.shift++;
            }
            return true;
        } //endregion

        //region 基本解析
        model.getArray = function (line, formatValue) {
            let result = [];
            for (let shift = 0; shift < line.length;) {
                result.push(line.substr(shift, formatValue).trim());
                shift += formatValue;
            }
            return result;
        }

        model.getProps = function (line, formatId, formatValue) {
            let count = STREAM_CONST.parseInt(line.substr(0, 3).trim());
            let length = (formatId + formatValue) * count;
            if (length + 3 !== line.length) {
                return null;
            }
            let result = [];
            for (let shift = 3; shift < line.length;) {
                let id = STREAM_CONST.parseInt(line.substr(shift, formatId));
                shift += formatId;
                if (id > 0) {
                    result.push({
                        id: id,
                        value: line.substr(shift, formatValue).trim()
                    });
                }
                shift += formatValue;
            }
            return result;
        } //endregion

        //region 基本行解析
        model.parseAtomLine = function (id, line, stream) {
            let atomSplit = STREAM_CONST.partitionLine(line, STREAM_CONST.atomLinePartition);
            if (!atomSplit || atomSplit.length < 4)
                return false;
            let symbol = getElementBySymbol(atomSplit[4]);
            if (symbol == null) {
                debugger;
                return false;
            }
            if (symbol.id === 1 && atomSplit.length > 4) {
                if (!isNaN(atomSplit[5].trim())) {
                    switch (STREAM_CONST.parseInt(atomSplit[5].trim())) {
                        case 1:
                            symbol.id = 2001;
                            break;
                        case 2:
                            symbol.id = 2002;
                            break;
                    }
                }
            }
            let position = Vector.Create(parseFloat(atomSplit[0]), -parseFloat(atomSplit[1]), parseFloat(atomSplit[2]));
            let atom = new DataAtom(id, symbol.id, position);
            if (symbol.id === 1011) {
                atom.title = atomSplit[4];
            }
            if (atomSplit.length > 6) {
                atom.charge = STREAM_CONST.parseInt(atomSplit[6]);
            }
            stream.molecule.addAtom = atom;
            return true;
        }

        model.parseBondLine = function (id, line, stream) {
            let bondSplit = STREAM_CONST.partitionLine(line, STREAM_CONST.bondLinePartition);
            if (bondSplit.length < 3) return false;
            if (bondSplit[0] === "M") return false;
            let begin = STREAM_CONST.parseInt(bondSplit[0]) - 1,
                end = STREAM_CONST.parseInt(bondSplit[1]) - 1;
            if (begin >= 0 && end >= 0) {
                let bond = new DataBond(id, begin, end, bondSplit[2]);
                if (bondSplit.length > 3 && bondSplit[3].length > 0)
                    bond.bondStereo = STREAM_CONST.parseInt(bondSplit[3]);
                if (bondSplit.length > 5 && bondSplit[5].length > 0)
                    bond.bondTopology = STREAM_CONST.parseInt(bondSplit[5]);
                if (bondSplit.length > 6 && bondSplit[6].length > 0)
                    bond.bondStereo = STREAM_CONST.parseInt(bondSplit[6]);
                stream.molecule.addBond = bond;
                return true;
            }
            return false;
        } //endregion

        //region 基本属性解析
        model.parsePropertyLines = function (line, stream) { // eslint-disable-line max-statements, max-params
            if (line.length > 6)
                if (line[0] === "M") {
                    return model.parseMultipleProperty(line.substr(3, 3), line.substr(6).replace("\r", ""), stream);
                } else {
                    let id = STREAM_CONST.parseInt(line.substr(3, 3));
                    let atom = stream.molecule.getAtomById(id - 1);
                    if (atom !== null)
                        switch (line[0]) {
                            case "A":
                                if (line.length < 6 || line.substr(6).trim().length < 1) {
                                    let v = model.data[stream.shift + 1];
                                    if (v.length > 0) {
                                        atom.title = v;
                                        stream.shift++;
                                    }
                                } else {
                                    atom.title = line.substr(6).trim();
                                }
                                return true;
                            case "V":
                                atom.title = line.substr(6).trim();
                                return true;
                            case "G":
                                let array = model.getArray(line.substr(3));
                                let v = model.data[stream.shift + 1];
                                if (v.length > 0 && array.length > 0) {
                                    for (let i = 0; i < array.length; i++) {
                                        let atom = stream.molecule.getAtomById(parseInt(array[i]));
                                        atom.title = v;
                                    }
                                }
                                stream.shift++;
                                return true;
                        }
                }
            return false;
        }

        model.parseMultipleProperty = function (n, v, stream) {
            let id, group, count, value;
            switch (n) {
                case "STY":
                    let props = model.getProps(v, 4, 4);
                    for (let i = 0; i < props.length; i++) {
                        let item = props[i];
                        stream.molecule.addSGroup(DataGroup.Create(item.id - 1, item.value));
                    }
                    break;
                case "SLB":
                    id = STREAM_CONST.parseInt(v.substr(0, 4)) - 1;
                    group = stream.molecule.getSGroupById(id);
                    break;
                case "SAL":
                    id = STREAM_CONST.parseInt(v.substr(0, 4)) - 1;
                    group = stream.molecule.getSGroupById(id);
                    count = STREAM_CONST.parseInt(v.substr(4, 3));
                    value = model.getArray(v.substr(7), 4);
                    for (let i = 0; i < value.length; i++) {
                        let a = STREAM_CONST.parseInt(value[i]) - 1;
                        group.atoms.push(a);
                        let atom = stream.molecule.getAtomById(a);
                        if (atom !== null) {
                            atom.groupId = id;
                            if (i > 0) atom.groupIn = true;
                        }
                    }
                    break;
                case "SBL":
                    id = STREAM_CONST.parseInt(v.substr(0, 4)) - 1;
                    group = stream.molecule.getSGroupById(id);
                    count = STREAM_CONST.parseInt(v.substr(4, 3));
                    value = model.getArray(v.substr(7), 4);
                    for (let i = 0; i < value.length; i++) {
                        let b = STREAM_CONST.parseInt(value[i]) - 1;
                        group.bonds.push(b);
                        let bond = stream.molecule.getBondById(b);
                        if (bond !== null) bond.groupId = id;
                    }
                    break;
                case "SMT":
                    id = STREAM_CONST.parseInt(v.substr(0, 4)) - 1;
                    group = stream.molecule.getSGroupById(id);
                    group.title = v.substr(4).trim();
                    // console.log(group);
                    break;
                case "SBV": {
                    // id = parseInt(v.substr(4, 3)) - 1;
                    // let bond = model.molecule.getBondById(id);
                    // let atomA = model.molecule.getAtomById(bond.begin);
                    // if (atomA.getNeighborCount() < 2) atomA.groupIn = true;
                    // let atomB = model.molecule.getAtomById(bond.end);
                    // if (atomB.getNeighborCount() < 2) atomB.groupIn = true;
                }
                    break;
                case "ISO":
                    break;
            }
            return true;
        } //endregion
        return model;
    }
};
//endregion

//region 解析V3000
//====================================================================================
const ReadV3000 = {
    Create: function () {
        let model = {};
        //region 主
        model.parseCTabV3000 = function (data, stream) {
            model.data = data;
            model.shift = stream.shift;
            if (model.readLine() !== STREAM_CONST.MOL_V3000_CTAB_BEGIN) //检查头
                return false;
            let L = model.readLine();
            if (L.substr(0, STREAM_CONST.MOL_V3000_COUNTS.length) !== STREAM_CONST.MOL_V3000_COUNTS) //获取数量
                return false;
            let v = L.substring(7).split(STREAM_CONST.MOL_SPLIT);
            stream.molecule.setChiral(v[4]);

            //添加原子
            if (model.readLine() === STREAM_CONST.MOL_V3000_ATOM_BEGIN) {
                //添加元素点
                while ((L = model.readLine()) != null) {
                    if (L === STREAM_CONST.MOL_V3000_ATOM_END) break;
                    let atom = model.parseAtomLineV3000(L);
                    if (atom == null) debugger;
                    stream.molecule.addAtom(atom);
                }
            }

            //添加键
            if (model.readLine() === STREAM_CONST.MOL_V3000_BOND_BEGIN) {
                while ((L = model.readLine()) !== null) {
                    if (L === STREAM_CONST.MOL_V3000_BOND_END) {
                        L = model.readLine();
                        break;
                    }
                    let bond = model.parseBondLineV3000(L);
                    if (bond == null) debugger;
                    stream.molecule.addBond(bond);
                }
            }

            // TODO: let sections follow in arbitrary order
            if (L === STREAM_CONST.MOL_V3000_COLLECTION_BEGIN) {
                // TODO: read collection information
                //                    shift = v3000parseCollection(ctab, ctabLines, shift);
                while ((L = model.readLine()) != null) {
                    if (L === STREAM_CONST.MOL_V3000_COLLECTION_END) {
                        L = model.readLine();
                        break;
                    }
                    debugger;
                }
            }
            if (L === STREAM_CONST.MOL_V3000_SGROUP_BEGIN) {
                // stream.sGroups = new ArrayList<>();
                while ((L = model.readLine()) != null) {
                    if (L === STREAM_CONST.MOL_V3000_SGROUP_END) {
                        L = model.readLine();
                        break;
                    }
                    debugger;
                    // SGroup sGroup = ReadSgroupV3000.Read(L);
                    // if (!sGroup) break;
                    // stream.sGroups.add(sGroup);
                }
                //                    shift = v3000parseSGroup(ctab, ctabLines, sgroups, atomMap, shift);
            }
            //            L = readLine();
            if (L != null && L === STREAM_CONST.MOL_V3000_CTAB_END) {
                stream.molecule.state = true;
                return true;
            }
        } //endregion

        //region 基本 - 数据解析
        model.stripV30 = function (line) {
            if (line.length < 10 || line.substr(0, STREAM_CONST.MOL_V3000_LINE.length) !== STREAM_CONST.MOL_V3000_LINE)
                return null;
            return line.substring(7).trim();
        }

        model.readLine = function () {
            if (model.shift < model.data.length) {
                let line = model.stripV30(model.data[model.shift++]);
                if (line == null)
                    return null;
                while (line.substr(line.length - 1) === STREAM_CONST.BASE_LINE_LINK) {
                    line = line.substr(0, line.length - 1) + model.stripV30(model.data[model.shift++]);
                }
                return line.trim();
            }
            return null;
        } //endregion

        //region 基本 - 解析
        model.parseAtomLineV3000 = function (line) { // eslint-disable-line max-statements
            let split = STREAM_CONST.parseLine(line);
            if (split.length < 5)
                return null;
            let vector = Vector.Create(parseFloat(split[2]), -parseFloat(split[3]), parseFloat(split[4]));
            if (isNaN(vector.x) || isNaN(vector.y) || isNaN(vector.z)) {
                debugger;
            }
            let atom = new DataAtom(parseInt(split[0]) - 1, -1, vector);
            //        atom.setReactionAttribute(split.get(5), null, null);
            let label = split[1].trim();
            if (label.charAt(0) === '"' && label.charAt(label.length - 1) === '"') //除去引号
                label = label.substring(1, label.length - 1); // strip qutation marks
            if (label.charAt(label.length - 1) === ']') { // assume atom list 开包原子列表
                label = label.substring(0, label.length - 1); // remove ']'
                let isNot = false;
                if (label.substring(0, 5) === "NOT [") {
                    isNot = true;
                    label = label.substring(5); // remove 'NOT ['
                } else if (label.charAt(0) !== '[') { //只能开包一次
                    //                throw new Error('Error: atom list expected, found \'' + label + '\'');
                    return null;
                } else {
                    label = label.substring(1); // remove '['
                }
                let symbol = getElementBySymbol("S#");
                atom.elementId = symbol.id;
                debugger;
                // atom.addAtom(Arrays.asList(label.split(",")), isNot);
            } else {
                let element = getElementBySymbol(split[1]);
                atom.elementId = element.id;
            }
            let shift = 6;
            for (; shift < split.length; shift++) {
                debugger;
                let sub = STREAM_CONST.splitValue(split.get(shift), STREAM_CONST.MOL_SPLIT_VALUE);
                if (sub == null || sub.length !== 2)
                    continue;
                let key = sub[0].toUpperCase();
                switch (key) {
                    case STREAM_CONST.atom_CHG:
                        atom.charge = parseInt(sub[1]);
                        break;
                }
                //            key = subsplit[0];
                //            value = subsplit[1];
                //            if (key in utils.fmtInfo.v30atomPropMap){
                //                let ival = utils.parseDecimalInt(value);
                //                if (key == 'VAL') {
                //                    if (ival == 0)
                //                        continue; // eslint-disable-line no-continue
                //                    if (ival == -1)
                //                        ival = 0;
                //                }
                //                params[utils.fmtInfo.v30atomPropMap[key]] = ival;
                //            } else if (key == 'RGROUPS') {
                //                value = value.trim().substr(1, value.length - 2);
                //                let rgrsplit = value.split(' ').slice(1);
                //                params.rglabel = 0;
                //                for (let j = 0; j < rgrsplit.length; ++j)
                //                    params.rglabel |= 1 << (rgrsplit[j] - 1);
                //            } else if (key == 'ATTCHPT') {
                //                params.attpnt = value.trim() - 0;
                //            }
            }
            return atom;
        }

        model.parseBondLineV3000 = function (line) {
            let split = STREAM_CONST.parseLine(line);
            let bond = new DataBond(parseInt(split[0]) - 1, parseInt(split[2]) - 1, parseInt(split[3]) - 1, parseInt(split[1]));
            let shift = 4;
            for (; shift < split.length; shift++) {
                debugger;
                let p = STREAM_CONST.splitValue(split[shift], STREAM_CONST.MOL_SPLIT_VALUE);
                if (p[0] === STREAM_CONST.bond_CFG) { //"CFG"
                    //                params.stereo = utils.fmtInfo.v30bondStereoMap[utils.parseDecimalInt(value)];
                    //                if (params.type == Bond.PATTERN.TYPE.DOUBLE && params.stereo == Bond.PATTERN.STEREO.EITHER)
                    //                    params.stereo = Bond.PATTERN.STEREO.CIS_TRANS;
                } else if (p[0] === STREAM_CONST.bond_TOPO) { //"TOPO"
                    //                params.topology = utils.fmtInfo.bondTopologyMap[utils.parseDecimalInt(value)];
                } else if (p[0] === STREAM_CONST.bond_RXCRT) { //"RXCTR"
                    //                params.reactingCenterStatus = utils.parseDecimalInt(value);
                } else if (p[0] === STREAM_CONST.bond_STBOX) { //"STBOX"
                    //                params.stereoCare = utils.parseDecimalInt(value);
                }
            }
            return bond;
        }
        //endregion
        return model;
    }
};

//region 解析V3000
//====================================================================================
const CTFileWrite = {
    Create: function () {
        let model = {};
        model.getRound = function (v) {
            let n = Math.round(v * 10000 / CONFIG_MOLECULE.DRAW_BOND.BOND_LENGTH) / 10000;
            n = n.toString();
            let i = n.lastIndexOf('.');
            if (i >= 0) {
                i = n.length - i;
                if (i < 5) {
                    for (; i < 5; i++) {
                        n += '0';
                    }
                }
            } else {
                n += '.0000';
            }
            return n;
        }
        model.getNumberToString = function (v, length) {
            let n = v.toString();
            for (; n.length < length;) {
                n = STREAM_CONST.MOL_SPLIT + n;
            }
            return n.substr(0, length);
        }
        model.getSymbolV2000 = function (v) {
            let n = v + STREAM_CONST.MOL_SPLIT;
            if (n.length < 3) {
                n = STREAM_CONST.MOL_SPLIT + n;
            }
            return n.substr(0, 3);
        }
        model.getEnd = function () {
            let result = '';
            result += STREAM_CONST.MOL_END + STREAM_CONST.MOL_LINE_END;
            result += STREAM_CONST.MOL_SDF_END + STREAM_CONST.MOL_LINE_END;
            return result;
        }
        model.toStringV2000 = function (molecule) {
            let idStart = 1,
                result = model.getNumberToString(molecule.getAtomCount(), 3) + model.getNumberToString(molecule.getBondCount(), 3) + '  0     0  0            999 ' + STREAM_CONST.MOL_VERSION_V2000 + STREAM_CONST.MOL_LINE_END;
            //添加原子
            for (let i = 0; i < molecule.getAtomCount(); i++) {
                let atom = molecule.getAtomByIndex(i);
                let symbol = getElementById(atom.elementId);
                result += model.getNumberToString(model.getRound(atom.position.x), 10) + model.getNumberToString(model.getRound(atom.position.y), 10) + model.getNumberToString(model.getRound(atom.position.z), 10) + model.getSymbolV2000(symbol.symbol) + '  0  0  0  0  0  0  0  0  0  0  0  0' + STREAM_CONST.MOL_LINE_END;
            }
            //添加键
            for (let i = 0; i < molecule.getBondCount(); i++) {
                let bond = molecule.getBondByIndex(i);
                result += model.getNumberToString(bond.begin + idStart, 3) + model.getNumberToString(bond.end + idStart, 3) + model.getNumberToString(bond.bondType, 3) + model.getNumberToString(bond.bondStereo, 3) + '  0  0  0' + STREAM_CONST.MOL_LINE_END;
            }
            return result + model.getEnd();
        }
        model.toStringV3000 = function (molecule) {
            let idStart = 1,
                result = '  0  0  0     0  0            999 ' + STREAM_CONST.MOL_VERSION_V3000 + STREAM_CONST.MOL_LINE_END;
            result += STREAM_CONST.MOL_V3000_LINE + STREAM_CONST.MOL_V3000_CTAB_BEGIN + STREAM_CONST.MOL_LINE_END;
            result += STREAM_CONST.MOL_V3000_LINE + STREAM_CONST.MOL_V3000_COUNTS + STREAM_CONST.MOL_SPLIT + molecule.getAtomCount() + STREAM_CONST.MOL_SPLIT + molecule.getBondCount() + STREAM_CONST.MOL_SPLIT + '0' + STREAM_CONST.MOL_SPLIT + '0' + STREAM_CONST.MOL_SPLIT + '0' + STREAM_CONST.MOL_LINE_END; //获取数量
            //添加原子
            result += STREAM_CONST.MOL_V3000_LINE + STREAM_CONST.MOL_V3000_ATOM_BEGIN + STREAM_CONST.MOL_LINE_END;
            for (let i = 0; i < molecule.getAtomCount(); i++) {
                let atom = molecule.getAtomByIndex(i);
                let symbol = getElementBySymbol(atom.elementId);
                result += STREAM_CONST.MOL_V3000_LINE + (atom.getId() + idStart) + STREAM_CONST.MOL_SPLIT + symbol.symbol + STREAM_CONST.MOL_SPLIT + model.getRound(atom.position.x) + STREAM_CONST.MOL_SPLIT + model.getRound(atom.position.y) + STREAM_CONST.MOL_SPLIT + model.getRound(atom.position.z) + STREAM_CONST.MOL_SPLIT + '0' + STREAM_CONST.MOL_LINE_END;
            }
            result += STREAM_CONST.MOL_V3000_LINE + STREAM_CONST.MOL_V3000_ATOM_END + STREAM_CONST.MOL_LINE_END;
            //添加键
            result += STREAM_CONST.MOL_V3000_LINE + STREAM_CONST.MOL_V3000_BOND_BEGIN + STREAM_CONST.MOL_LINE_END;
            for (let i = 0; i < molecule.getBondCount(); i++) {
                let bond = molecule.getBondByIndex(i);
                result += STREAM_CONST.MOL_V3000_LINE + (bond.getId() + idStart) + STREAM_CONST.MOL_SPLIT + bond.bondType + STREAM_CONST.MOL_SPLIT + (bond.begin + idStart) + STREAM_CONST.MOL_SPLIT + (bond.end + idStart) + STREAM_CONST.MOL_LINE_END;
            }
            result += STREAM_CONST.MOL_V3000_LINE + STREAM_CONST.MOL_V3000_BOND_END + STREAM_CONST.MOL_LINE_END;
            return result + model.getEnd();
        }
        //endregion
        return model;
    }
}

const CTFileRead = {
    //region 解释数据行
    Head: function (line, shift) {
        let stream = {
            code: -1,
            molecule: new DataMolecule(),
            shift: shift
        };
        let countsLine = STREAM_CONST.partitionLine(line, STREAM_CONST.headLinePartition);
        if (countsLine.length !== STREAM_CONST.headLinePartition.length)
            return null;
        //获取版本
        stream.version = countsLine[countsLine.length - 1].toUpperCase();
        if (!(stream.version === STREAM_CONST.MOL_VERSION_V2000) && !(stream.version === STREAM_CONST.MOL_VERSION_V3000))
            return null;
        /* reader */
        stream.atomCount = STREAM_CONST.parseInt(countsLine[0]);
        stream.bondCount = parseInt(countsLine[1]);
        stream.atomListCount = parseInt(countsLine[2]);
        // stream.setChiral(countsLine[4]);//设置手性
        stream.stextLinesCount = parseInt(countsLine[5]);
        return stream;
    }, //endregion
    //region
    toMolecule: function (molecule, screenWidth, screenHeight) {
        //键初始化
        let bond_AverageLength = 1;
        if (molecule.getBondCount() > 0) {
            let bond_MinLength = 1000000000, bond_MaxLength = -1000000000; //计算最小键长，默认最大值
            bond_AverageLength = 0;
            for (let i = 0; i < molecule.getBondCount(); i++) {
                let bond = molecule.getBondByIndex(i);
                let atomA = molecule.getAtomById(bond.begin),
                    atomB = molecule.getAtomById(bond.end);
                let length = atomA.position.Length(atomB.position);
                if (length < bond_MinLength)
                    bond_MinLength = length;
                if (length > bond_MaxLength)
                    bond_MaxLength = length;
                bond_AverageLength += length;
            }
            if (molecule.getBondCount() > 4) {
                bond_AverageLength = (bond_AverageLength - bond_MaxLength - bond_MinLength) / (molecule.getBondCount() - 2);
                // bond_AverageLength = (bond_AverageLength + bond_MinLength) / 2;//防止最小键太小，看不见
            } else
                bond_AverageLength = bond_AverageLength / molecule.getBondCount();
        }
        //基础坐标
        let scale = CONFIG_MOLECULE.DRAW_BOND.BOND_LENGTH / bond_AverageLength;
        let coordinateBase = Coordinate.Create(scale, screenWidth / 2, screenHeight / 2);
        // 计算范围
        let positionMin = null,
            positionMax = null;
        for (let i = 0; i < molecule.getAtomCount(); i++) {
            let atom = molecule.getAtomByIndex(i);
            let vector = atom.position;
            if (positionMax != null) {
                positionMax.toMax(vector);
            } else {
                positionMax = vector.Clone();
            }
            if (positionMin != null) {
                positionMin.toMin(vector);
            } else {
                positionMin = vector.Clone();
            }
        }
        //坐标修正
        let positionCenter = positionMax.getCenter(positionMin);
        for (let i = 0; i < molecule.getAtomCount(); i++) {
            let atom = molecule.getAtomByIndex(i);
            atom.position = coordinateBase.VectorTo(atom.position.toCenter(positionCenter));
        }
        //错误检查
        for (let i = 0; i < molecule.getAtomCount(); i++) {
            let atom = molecule.getAtomByIndex(i);
            if (isNaN(atom.position.x) || isNaN(atom.position.y)) {
                debugger;
            }
        }
        // let width = (positionMax.x - positionMin.x) * scale;
        // let height = (positionMax.y - positionMin.y) * scale;
        // let BOND_LENGTH = bond_AverageLength * scale;
        return true;
    } //endregion
};

export function readMolStream(molData, screenWidth, screenHeight) {
    molData = molData.split("\n");
    if (molData == null || molData.length < 5)
        return {code: -1, msg: '文件行数错误'};
    for (let i = 0; i < molData.length; i++) {
        molData[i] = molData[i].replace('\r', '');
    }
    let stream = CTFileRead.Head(molData[0], 1);
    if (!stream) {
        stream = CTFileRead.Head(molData[3], 4);
        if (stream) {
            stream.title = molData[0];
            stream.name = molData[1];
            stream.CommentLine = molData[2];
        }
    }
    if (!stream) return false;
    if (stream.version === STREAM_CONST.MOL_VERSION_V2000) {
        ReadV2000.Create().parseCTabV2000(molData, stream);
    } else if (stream.version === STREAM_CONST.MOL_VERSION_V3000) {
        ReadV3000.Create().parseCTabV3000(molData, stream)
    }
    MoleculeIdentify(stream.molecule);
    RingIdentify(stream.molecule);
    if (CTFileRead.toMolecule(stream.molecule, screenWidth, screenHeight)) {
        stream.code = 99;
    }
    return stream;
}

export function writeMolStream(molecule, version) {
    let write = CTFileWrite.Create();
    if (version === STREAM_CONST.MOL_VERSION_V3000) {
        return write.toStringV3000(molecule);
    } else {
        return write.toStringV2000(molecule);
    }
}//endregion =====================================================================