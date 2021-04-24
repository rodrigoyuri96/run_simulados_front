<template>
  <v-dialog v-model="dialog" width="600" scrollable>
    <v-card class="form-group">
      <v-card-title class="headline teal lighten-2 white--text">Cadastro Turma <v-spacer></v-spacer><v-icon  style="color: white" @click="dialog = !dialog">mdi-close</v-icon></v-card-title>
      <v-card-text>
        <v-form v-model="valid" class="mt-5">
          <v-row>
            <v-col>
              <v-text-field
                autocomplete="off"
                :counter="40"
                v-model="team.name"
                dense
                label="Nome da Turma"
                outlined
                :rules="[v=> !!v || 'Campo obrigatório',
                 v => (v || '').length <= 40 || 'O nome da turma deve ter no máximo 40 caracteres',
                 v=> (v || '').length > 3 || 'O nome da turma deve ter no mínimo 4 caracteres' ]" />
              <v-select
                v-model="team.period"
                dense
                :items="period"
                item-text="name"
                item-value="value"
                outlined
                label="Período"
                :rules="[v=> !!v || 'Campo obrigatório']" />
              <v-select
                v-model="team.category"
                dense
                :items="categories"
                item-text="name"
                item-value="value"
                outlined label="Categoria"
                :rules="[v=> !!v || 'Campo obrigatório']" />
              <run-date
                :rules="[v=> !!v || 'Campo obrigatório']"
                v-model="team.startDate"
                label="Data Previsão Inicio" />
              <run-teachers
                :rules="[v=> !!v && v.length > 0 || 'Campo obrigatório']"
                v-model="team.teachers" />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="!isUpdate? save() : update()"
          color="primary"
          class="white--text"
          :loading="loading"
          :disabled="!valid">
          {{isUpdate? 'Atualizar': 'Salvar'}}
        </v-btn>
        <v-btn @click="cancel" color="secondary" class="white--text" >Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script lang="ts">
import {Component, Prop, VModel, Vue} from "vue-property-decorator";
import {getModule} from "vuex-module-decorators";
import {TeamModule} from "@/store/modules/team.module";
import {TeacherModule} from "@/store/modules/teacher.module";
import RunTeachers from "@/components/run/Teachers.vue";
import RunDate from "@/components/run/Date.vue";
import {ValidationMessageModule} from "@/store/modules/validation/ValidationMessageModule";
import ValidationMessage from "@/models/validation/ValidationMessage";
import {period} from "@/models/constants/period.constant.ts"
import {categories} from "@/models/constants/categories.constant.ts"
import {TeamModel} from "@/models/team.model";
import {TypeMessage} from "@/models/validation/TypeMessage";

@Component({
  name: 'TeamDetail',
  components:{
    RunTeachers,
    RunDate
  }
})
export default class TeamDetail extends Vue{
  @VModel({type:Boolean}) dialog;
  @Prop({type: Boolean}) isUpdate = false;
  teamModule = getModule(TeamModule, this.$store);
  teacherModule = getModule(TeacherModule, this.$store);
  validationModule = getModule(ValidationMessageModule, this.$store);
  loading = false;
  period = period;
  categories = categories;
  valid = false;

  get teachers(){
    return this.teacherModule.teachers
  }

  get team(){
    return this.teamModule.team
  }

  set team(value){
    this.teamModule.setTeam(value)
  }

  update(){
    this.loading = true
    this.teamModule.update().then(res=>{
      if(res.status == 200){
        this.loading = false
        this.validationModule.setValidation(new ValidationMessage('Turma atualizada com sucesso.', TypeMessage.SUCCESS))
        this.teamModule._updateTeam(res.data)
      }
    }).catch(error=>{
      this.loading = false
      this.validationModule.setValidation(new ValidationMessage('Erro ao salvar turma.', TypeMessage.ERROR))
    }).finally(() =>{
      this.loading = false
      this.dialog=false
    })

    this.team = new TeamModel()
  }

  save(){
    this.loading = true
    this.teamModule.save().then(res=>{
      if(res.status == 201){
        this.loading = false
        this.validationModule.setValidation(new ValidationMessage("Turma salva com sucesso!", TypeMessage.SUCCESS))
        this.teamModule._addToTeams(res.data)
      }
    }).catch(error=>{
      this.loading = false
      this.validationModule.setValidation(new ValidationMessage('Erro ao salvar turma.', TypeMessage.ERROR))
      console.log(error)
    }).finally(() =>{
      this.loading = false
      this.dialog=false
    })

    this.team = new TeamModel()
  }

  cancel(){
    this.team = new TeamModel()
  }

  mounted(){
  }

  created(){
    this.teacherModule.findAll()
  }

}
</script>

<style scoped>

</style>
