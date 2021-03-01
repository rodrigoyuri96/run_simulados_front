<template>
  <v-container id="pricing" class="pt-4 pt-md-8 pb-10">
    <v-responsive max-width="1200" class="mx-auto text-center">
      <h2 class="text-h3 mb-2">Nossos Planos</h2>
      <div class="text-h6 text-lg-h5">Escolha o plano que mais se adeque as suas necessidades e ao seu bolso</div>
    </v-responsive>

    <v-row class="mt-10">
      <v-col
        v-for="(plan, i) in plans"
        :key="i"
        cols="12"
        lg="4"
      >
        <v-card
          class="text-body-1 pa-4"
          outlined
          elevation="2"
        >
          <div class="d-flex justify-space-between">
            <div class="mr-2">
              <div class="d-flex align-center">
                <div class="text-h4 font-weight-black">{{ plan.title }}</div>
                <div v-if="plan.featured" class="ml-2">
                  <v-chip small color="primary" class="font-weight-black">Popular</v-chip>
                </div>
              </div>
              <div class="mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
            </div>
            <div class="text-right">
              <div class="d-flex align-center">
                <div class="text-h5 font-weight-light mr-1">R$</div>
                <div class="text-h3 text-number font-weight-black">{{ plan.price }}</div>
              </div>
              <div class="justify-end overline">/mês</div>
            </div>
          </div>

          <v-divider class="my-4"></v-divider>

          <div class="text-h6">
            <div v-for="(feat, j) in plan.features" :key="j" class="d-flex align-center justify-space-between my-1">
              <div>
                <span class="text-truncate font-weight-regular">{{ feat.label }}</span>
                <span v-if="feat.value" class="font-weight-black mr-1"> {{ feat.value }}</span>
              </div>
              <v-icon color="primary">mdi-check</v-icon>
            </div>
          </div>
          <v-divider class="my-4"></v-divider>
          <v-btn
            x-large
            block
            :outlined="!plan.featured"
            :color="plan.featured ? 'primary' : ''"
            to="/auth/signup"
          >
            Inscreva-se
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      plans: [{
        title: 'Sossegado',
        price: '0',
        features: [{
          value: '1',
          label: 'Simulado ao mês - '
        }]
      }, {
        title: 'Nerd',
        price: '10',
        featured: true,
        features: [{
          value: 'ilimitados',
          label: 'Simulados'
        }, {
          value: 'ilimitadas',
          label: 'Provas real-time'
        }, {
          value: 'ilimitadas',
          label: 'Comunidades'
        }, {
          value: 'ilimitados',
          label: 'Fóruns'
        }
        ]
      }, {
        title: 'Sábio',
        price: '12',
        features: [{
          value: 'Nerd',
          label: 'Inclui tudo do plano'
        }, {
          value: 'resultados',
          label: 'Análise de'
        }, {
          value: 'inteligente',
          label: 'Planejamento'
        }]
      }]
    }
  }
}
</script>
