import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import Discipline from "@/models/Discipline";


@Module({ name: 'DisciplineModule', namespaced: true })
export class DisciplineModule extends VuexModule {
    _disciplines: Discipline[] = []
    _discipline: Discipline = {id: 0, name: ""}


    get disciplines(){
        return this._disciplines
    }

    get discipline(){
        return this._discipline
    }

    @Mutation
    setDiscipline(newDiscipline: Discipline){
        this._discipline = newDiscipline
    }

    @Mutation
    _addToDiscipline(newDiscipline: Discipline){
        this.disciplines.push(newDiscipline)
    }

    @Mutation
    _setDisciplines(disciplines: Discipline[]){
        this._disciplines = disciplines
    }

    @Action({commit: '_setDisciplines'})
    findAll(){

        const c1 = new Discipline()
        c1.name = 'Matemática'
        c1.id = 1
        const c2 = new Discipline()
        c2.name = "Geografia"
        c2.id = 2

        const c3: Discipline[] = []

        c3.push(c1,c2)

        return c3

    }

}
