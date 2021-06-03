<template>
  <div>
    <v-autocomplete
      v-if="multiple == false"
      v-model="classes"
      :items="items"
      item-text="name"
      label="Turmas"
      :rules="rules"
      hide-no-data
      outlined
      dense
      :loading="loading"
      return-object
    />
    <v-autocomplete
      v-if="multiple == true"
      v-model="classes"
      :items="items"
      :loading="loading"
      item-text="name"
      label="Turmas"
      :rules="rules"
      outlined
      dense
      multiple
      return-object
      auto-select-first
      clearable
      chips
      deletable-chips
      small-chips
      hide-no-data
    >
      <template v-slot:selection="{ index }">
        <span v-if="index == 0" class="pink--text">
          ({{ classes.length }} turmas selecionadas)
        </span>
      </template>
    </v-autocomplete>
  </div>
</template>

<script lang="ts">
import { Vue, Component, VModel, Prop } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { ClassModule } from "@/store/modules/class.module";

@Component({
  name: "Class",
})
export default class Class extends Vue {
    classModule = getModule(ClassModule, this.$store)
    @VModel() classes!: any[]
    @Prop({type:Boolean}) multiple!: Boolean
    @Prop({type:Array}) rules!:[]

    /*
    get items(){
        return this.classModule.classes
    }
    */

    get loading(){
        return this.classModule.loading
    }

    set loading(status: Boolean){
        this.classModule.setLoading(status)
    }

    /*
    created(){
        this.loading = true
        this.classModule.findAll().then(()=>{}).catch(error=>{
            console.log(error)
        }).finally(()=>{
            this.loading = false
        })
    }
    */
}
</script>

<style>
</style>