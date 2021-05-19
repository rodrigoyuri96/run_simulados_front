<template>
  <v-row class="mt-3 ml-4 mr-4 col-sm-12 col-md-12" >
    <v-col cols="4" v-for="(card,i) in cards" :key="i" >
      <v-card>
        <v-card-title>
          <v-icon color="teal">
            {{card.icon}}
          </v-icon>
          {{card.title}}
        </v-card-title>
        <v-card-text class="text-justify justify-center mt-1">
          {{card.description? card.description : ''}}
        </v-card-text>
        <v-card-actions class="mb-0">
          <v-spacer />
          <v-btn color="pink" text>Saiba mais</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";

@Component({
  name:'Home'
})
export default class Home extends Vue{

  get cards(): Array<any>{
    return  [
      {
        title: 'Simulados',
        description: 'Realize simulados personalizados de acordo com seus conhecimentos e sua rotina de estudos',
        icon: 'mdi-alpha-s-box'
      },
      {
        title: 'Comunidades',
        description: 'Participe de comunidades, de acordo com o curso, concurso ou instituição de interesse' +
          ' Fique por dentro dos rankings com os melhroes candidatos aos cursos que você escolheu e prepare-se de acordo ',
        icon: 'mdi-alpha-c-box'
      },
      {
        title: 'Eventos',
        description: 'Participe de eventos, dispute com candidatos que possuem os mesmos interesses que você ' +
          'em tempo real e descubra como vai seu desempenho',
        icon: 'mdi-alpha-e-box'
      },
      {
        title: 'Aulas Online',
        description: 'Planeje sua rotina de estudos com aulas online com os melhores professores ',
        icon: 'mdi-alpha-a-box'
      },
      {
        title: 'Monitorias',
        description: 'Tire dúvidas com monitores que já obtiveram sucesso no mesmo vestibular que você.',
        icon: 'mdi-alpha-m-box'
      }
    ]
  }

}
</script>

<style scoped>

</style>
