<template>
  <v-container class="pt-0 pb-4">
    <v-row justify="center" align="center">
      <v-col
        v-for="(item, i) in stats"
        :key="i"
        cols="12"
        sm="6"
        lg="3"
      >
        <div class="text-center">
          <div class="text-h2 text-number font-weight-light">{{ item.value }}</div>
          <v-responsive max-width="300" class="mx-auto">
            <div class="text-h6 text-lg-h5">{{ item.title }}</div>

            <div class="font-weight-regular my-2">{{item.description}}</div>
          </v-responsive>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      stats: [{
        title: 'Questões',
        value: '7.000',
        description: 'Mais de 7 mil questões para treinar incluindo todas as provas dos maiores vestibulares desde 2009 '
      }, {
        title: 'Comunidades',
        value: '200+',
        description: 'Comunidades para acompanhar eventos, desempenho de outros candidatos, tirar dúvidas em fóruns e muito mais'
      }, {
        title: 'Eventos',
        value: '50+',
        description: 'duranto o ano para realizar provas em tempo real com candidatos com os mesmos interesses que o seu'
      }]
    }
  }
}
</script>
