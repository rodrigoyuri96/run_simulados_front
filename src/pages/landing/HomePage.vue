<template>
  <div>
    <v-sheet>
      <v-container class="py-6 pt-lg-15 text-center">
        <v-row>
          <v-col>
            <img :src="require('@/assets/images/animate1.gif')" width="400px" />
          </v-col>
          <v-col>
            <h4 class="text-h3 text-sm-h2 text-md-h2 text-lg-h2">Aprenda mais com a <span class="primary--text">RUN!</span></h4>
            <h2 class="text-h6 text-sm-h5 mt-4 w-full w-md-8-12 w-xl-half mx-auto">Simulados Personalizados, comunidades, fóruns e muito mais, para ajudar você na fase mais decisiva da sua vida.</h2>
            <div class="mt-8">
              <v-btn x-large class="my-1 mx-sm-1 w-full w-sm-auto" color="primary--text">Comece gratuitamente</v-btn>
              <v-btn x-large class="my-1 mx-sm-1 w-full w-sm-auto">Saiba mais</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <Partners />

    <Stats />

    <v-container>
      <v-divider></v-divider>
    </v-container>

    <Feature2 />

    <Feature1 />

    <Pricing />

    <CallToAction />
  </div>
</template>

<script>
import Partners from '@/components/landing/Partners.vue'
import Stats from '@/components/landing/Stats.vue'
import Pricing from '@/components/landing/Pricing.vue'
import Feature1 from '@/components/landing/Feature1.vue'
import CallToAction from '@/components/landing/CallToAction.vue'
import Feature2 from '@/components/landing/Feature2.vue'

export default {
  components: {
    Partners,
    Stats,
    Pricing,
    Feature1,
    Feature2,
    CallToAction
  }
}
</script>
