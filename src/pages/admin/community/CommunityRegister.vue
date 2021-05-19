<template>
  <v-dialog v-model="dialog" width="1500px" scrollable>
    <v-card class="form-group">
      <v-card-title
        class="headline teal lighten-2 white--text font-weight-regular"
      >
        {{ isInsert ? "Cadastro de Comunidade" : "Atualização da comunidade" }}
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = !dialog">
          <v-icon class="white--text">mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-form v-model="validCommunity">
          <v-row class="mt-5">
            <v-col>
              <v-text-field
                v-model="getName"
                label="Nome da comunida
                de"
                outlined
                dense
                disabled
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-select
                v-model="community.communityType"
                :items="items"
                :rules="[(e) => !!e || 'Campo obrigatório']"
                outlined
                dense
                label="Tipo da comunidade"
              >
              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <run-institution
                v-model="community.institution"
                @valid="validInstitution = $event"
                :rules="[(i) => !!i || 'Campo obrigatório']"
              />
            </v-col>
            <v-col>
              <run-course
                v-model="community.course"
                @valid="validCourse = $event"
                :rules="[(i) => !!i || 'Campo obrigatório']"
              />
            </v-col>
          </v-row>
        </v-form>
        <v-card-actions>
          <v-row align="center" justify="center">
            <v-col cols="4" align-self="end">
              <v-btn
                block
                color="primary"
                class="white--text"
                :disabled="!isValid"
                @click="save"
              >
                {{ isInsert ? "Salvar" : "Atualizar" }}
              </v-btn>
            </v-col>

            <v-col cols="4" align-self="start">
              <v-btn
                :disabled="!validateUpdateAction"
                block
                color="secondary"
                class="white--text"
                @click="cancel()"
              >
                Cancelar
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import RunInstitution from "@/components/run/Institutions.vue";
import RunCourse from "@/components/run/Course.vue";
import { CommunityModule } from "@/store/modules/community.module";
import { getModule } from "vuex-module-decorators";
import { InstitutionModule } from "@/store/modules/institution.module";
import { CourseModule } from "@/store/modules/course.module";
import { ValidationMessageModule } from "@/store/modules/validation/ValidationMessageModule";
import ValidationMessage from "@/models/validation/ValidationMessage";
import { RegisterStatusEnum } from "@/models/register.status.enum";
import CommunityModel from "@/models/community.model";
import { TypeMessage } from "@/models/validation/TypeMessage";

@Component({
  name: "CommunityRegister",
  components: { RunInstitution, RunCourse },
})
export default class CommunityRegister extends Vue {
  @VModel({ type: Boolean }) dialog: boolean | false;

  communityModule = getModule(CommunityModule, this.$store);
  institutionModule = getModule(InstitutionModule, this.$store);
  courseModule = getModule(CourseModule, this.$store);
  validationMessageModule = getModule(ValidationMessageModule, this.$store);
  items = ["Vestibulinho", "Vestibular", "Concurso público"];
  validInstitution: boolean = false;
  validCourse: boolean = false;
  validCommunity: boolean = false;

  get isInsert() {
    return this.communityModule.registerStatus == RegisterStatusEnum.INSERT;
  }

  get isValid() {
    return this.validCommunity && this.validInstitution && this.validCourse;
  }

  constructor() {
    super();
  }

  get community() {
    return this.communityModule.community;
  }

  get communities() {
    return this.communityModule.communities;
  }

  set community(community: CommunityModel) {
    this.communityModule.setCommunity(community);
  }

  get snack() {
    return this.validationMessageModule.snack;
  }

  set snack(newValue: boolean) {
    this.validationMessageModule.setSnack(newValue);
  }

  get getName() {
    if (this.community.course && this.community.institution) {
      return (
        this.community.course.name + " - " + this.community.institution.name
      );
    }

    return "";
  }

  save() {
    const v = new ValidationMessage( "Comunidade salva com sucesso", TypeMessage.SUCCESS);
    this.dialog = false;
    if (this.communityModule.registerStatus == RegisterStatusEnum.INSERT) {
      this.communityModule.save().then((res) => {
        if (!(res.status == 201)) {
          v.message = "Erro ao salvar comunidade";
          v.type = TypeMessage.ERROR;
          this.communityModule.addToCommunities(res.data);
        }
      });
    } else {
      this.communityModule
        .update()
        .then((res) => {
          if (!(res.status == 200)) {
            v.message = "Erro ao atualizar comunidade";
            v.type = TypeMessage.ERROR;
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
      v.message = "Comunidade atualizada com sucesso";
    }

    this.validationMessageModule.setValidation(v);
    this.communityModule.findAll();
    this.communityModule.setDialog(false);
  }


  get validateUpdateAction(): Boolean {
    return this.communityModule.registerStatus == RegisterStatusEnum.UPDATE
      ? this.isValid
      : new Boolean(true);
  }

  cancel() {
    this.community = new CommunityModel();
    this.dialog = false;
  }
}
</script>

<style>
</style>