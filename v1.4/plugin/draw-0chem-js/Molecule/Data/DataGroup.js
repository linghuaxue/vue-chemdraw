export class DataGroup {
    static Create() {

    }

    constructor(id, type) {
        this.id = id;
        this.title = null;
        this.type = type;
        this.atoms = [];
        this.bonds = [];
        this.superBonds = [];
    }

    addSuperBond(id, x, y) {
        this.superBonds.push({bondId: id, x: parseFloat(x), y: parseFloat(y)});
    }
}