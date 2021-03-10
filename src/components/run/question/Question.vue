<template>
  <v-container>

    <!-- cadastro-questão -->
    <v-card v-show="card == false" >
      <v-card-title>Pré-visualização
        <v-spacer></v-spacer>
        <v-btn
          icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <div class="ql-editor" v-html="content" />
        <v-row>
          <v-col>
            <v-radio-group>
              <v-radio 
                disabled
                v-for="(option, i) in options" 
                :key="i" 
                :label="option.description">
              </v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- detalhe-questão -->
    <div v-show="card == true" >
      <h3>Pré-visualização</h3>
      <div class="ql-editor" v-html="content" />
      <v-row>
        <v-col>
          <v-radio-group>
            <v-radio
              disabled
              v-for="(option, i) in options" 
              :key="i"
              :label="option.description" ></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
    </div>

  </v-container>
</template>

<script lang="ts">

import { Vue, Component, Prop } from "vue-property-decorator";
import { OptionModule } from "@/store/modules/OptionModule";
import { getModule } from "vuex-module-decorators";

@Component({
  name: "Question",
  components: {}
})
export default class Question extends Vue {

  @Prop({ type: String }) content: string | "";
  @Prop({ type: Boolean }) close: boolean | false;
  @Prop({ type: Boolean }) card: boolean | false;

  private optionModule = getModule(OptionModule, this.$store);

  get option() {
    return this.optionModule.option;
  }

  get options() {
    return this.optionModule.options;
  }



  created() {
    this.optionModule.findAll();
  }
}
</script>

<style scoped>

</style>
