import SubjectsModel from "./subjects.model"

export default class Tag {
    public subject: SubjectsModel

    constructor(){
        this.subject = new SubjectsModel()
    }
}
