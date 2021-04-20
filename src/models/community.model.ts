import InstitutionModel from "./institution.model"
import CourseModel from "./course.model"

export default class CommunityModel {
    public id: String
    public name: String
    public institution: InstitutionModel
    public course: CourseModel
    public communityType: String 

    constructor(){
        this.id =  null
        this.name = ''
        this.institution = null
        this.course = null
        this.communityType = ''
    }
}