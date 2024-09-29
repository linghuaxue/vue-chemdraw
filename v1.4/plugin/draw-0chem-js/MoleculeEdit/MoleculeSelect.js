import DataMolecule from "../Molecule/DataMolecule";

export default class MoleculeSelect {
    constructor(name = 'child') {
        this.name = name;
        this.selectId = -1;
        this.selectAtoms = [];
        this.selectBonds = [];
        this.molecule = new DataMolecule();
        // this.source = null;
        this.position = null;
        this.rect = null;
        this.count = 0;
    }

    selectAddAtom(value) {
        this.selectAtoms.push(value);
    }

    selectAddBond(value) {
        this.selectBonds.push(value);
    }

    backup() {
        this.source = this.molecule.Copy();
    }
}