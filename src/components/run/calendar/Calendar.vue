<template>
  <v-row class="fill-height ">
    <v-col>
      <v-card height="64" class="ml-2 mr-2 mt-1">
        <v-toolbar
          flat
        >
          <run-teams v-model="team" class="mt-3" />
          <v-btn
            outlined
            class="ml-1 white--text"
            color="primary"
            @click="changeRegisterFlag()"
          >
            Novo Evento
          </v-btn>


          <v-spacer></v-spacer>

          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>

          <v-btn
            outlined
            class="mr-1"
            color="grey darken-2"
            @click="setToday"
          >
            Hoje

          </v-btn>

          <v-menu
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Diário</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Semanal</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Mensal</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>Próximos 4 dias</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-card>
      <v-card height="600" class="ml-2 mr-2 mb-1">
        <v-calendar
          locale="pt-BR"
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="team.events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              class="white--text"
              :color="selectedEvent.color"
              dark
            >
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-if="scheduleType == 'TEACHER'">{{selectedEvent.team? selectedEvent.team.name : ''}}</v-toolbar-title>
              <v-toolbar-title v-else v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-if="scheduleType == 'TEACHER'">{{teacherDescription}}</span>
              <span v-else>{{teamDescription}}</span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Cancelar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-card>
    </v-col>
  </v-row>

</template>

<script>
import RunTeams from "@/components/run/Teams";


export default {
  components:{
    RunTeams
  },
  data: () => ({
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Mensal',
      week: 'Semanal',
      day: 'Diário',
      '4day': 'Próximos 4 dias',
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    //events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
  }),
  props:[
    'events',
    'profile',
    'value',
    'scheduleType'
  ],
  computed: {
    team:{
      get(){
        return this.$store.state.TeamModule._team
      },
      set(value){
        this.$store.state.TeamModule._team = value
      }
    },

    teacherDescription(){
      return `Disciplina: ${this.selectedEvent.discipline ? this.selectedEvent.discipline.name : '' } <br>
            Programa da aula: ${this.selectedEvent.lessonProgram ? this.selectedEvent.lessonProgram: '(pendente)' }`

    },

    teamDescription(){
      return `Programa da aula: ${this.selectedEvent.lessonProgram ? this.selectedEvent.lessonProgram: '(pendente)' }`
    },

    name: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  mounted () {
    this.$refs.calendar.checkChange()
    console.log("Authorities: ", this.profile)
    console.log("events: ", this.events)
  },
  methods: {
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => {
          this.selectedOpen = true
        }, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange ({ start, end }) {
      console.log("start", start)
      console.log("end", end)

    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    changeRegisterFlag(){
      this.name = true
      console.log(this.name)
    }
  },


}
</script>

<style scoped>

</style>
