/**
 * Created by si8822fb on 4/24/2018.
 */



class Project{
    constructor(name, creator, description){
        this._creator = creator;
        this._name = name;
        this._description = description;
        this._githubLink = null;
        this._status = null;
    }

    get creator() {
        return this._creator;
    }

    set creator(value) {
        this._creator = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    set githubLink(value) {
        this._githubLink = value;
    }

    set status(value) {
        this._status = value;
    }
}
module.exports = Project;