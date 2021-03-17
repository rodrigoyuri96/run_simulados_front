import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import QuestionRegister from "@/models/QuestionRegister"
import Discipline from "@/models/Discipline";
import Exam from "@/models/Exam";
import DisciplineRule from "@/models/DisciplineRule"
import Institution from "@/models/Institution"
import {RegisterStatus} from "@/models/RegisterStatus";

@Module({ name: 'QuestionModule', namespaced: true})
export class QuestionModule extends VuexModule {
    _questions: QuestionRegister[] = []
    _question: QuestionRegister = new QuestionRegister()
    _validField: boolean = false
    _dialog: boolean = false
    _registerStatus: RegisterStatus = RegisterStatus.INSERT
    _index: number = -1
    _validUpdate: boolean = false

    get dialog(){
        return this._dialog
    }

    get questions(){
        return this._questions
    }

    get question(){
        return this._question
    }

    get validField(){
        return this._validField
    }

    get registerStatus(){
        return this._registerStatus
    }

    get validUpdate(){
        return this._validUpdate
    }

    @Mutation
    setValidUpdate(newValue: boolean){
        this._validUpdate = newValue
    }

    @Mutation
    setValidField(newValue: boolean){
        this._validField = newValue
    }

    @Mutation
    setQuestion(newQuestion: QuestionRegister){
        this._question = newQuestion
    }

    @Mutation
    _addToQuestion(newQuestion: QuestionRegister){
        this._questions.push(newQuestion)
    }

    @Mutation
    _setQuestions(questions: QuestionRegister[]){
        this._questions = questions
    }

    @Mutation
    setDialog(newValue: boolean){
        this._dialog = newValue
    }

    @Mutation
    setRegisterStatus(newValue: RegisterStatus){
        this._registerStatus = newValue
    }


    @Action({commit: '_setQuestions'})
    findAll(){
        const q1 = new QuestionRegister()
        q1.numberQuestion = 23
        q1.discipline.name = 'Fisica'
        q1.exam.title = "Fuvest"
        const d1 = new Discipline()
        d1.id = 1
        d1.name = 'Fisica'
        const e1 = new Exam()
        e1.title = 'FUVEST - 1 Fase/2019'
        e1.id = 1
        e1.obs= 'Questões 3 e 4 anuladas'
        e1.book = 'Caderno 2'
        e1.year = 2019
        const i1 = new Institution()
        i1.name = 'USP'
        i1.id = 1
        const dr1 = new DisciplineRule()
        dr1.discipline = d1
        dr1.numberOfQuestions = 10
        const dr2 = new DisciplineRule()
        const d2 = new Discipline()
        d2.id = 2
        d2.name = 'Geografia'
        dr2.discipline = d2
        dr2.numberOfQuestions = 10
        e1.disciplinesRules.push(dr1, dr2)
        const questions: QuestionRegister[] = []
        questions.push(q1)
        return questions
    }

    @Action({commit: '_addToQuestion'})
    save(newQuestion: QuestionRegister){
        return newQuestion
    }
}
