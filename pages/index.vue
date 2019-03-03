<template>
<div>
  <v-form>
    <v-container pb-0>
      <v-layout>
        <v-flex xs12 md4>
          <v-select 
          label="From" 
          box
          :items="cities"
          item-text="name"
          item-value="value"
          v-model="start"></v-select>
        </v-flex>
        <v-flex xs12 md4>
          <v-select 
          label="To" 
          box
          :items="cities"
          item-text="name"
          item-value="value"
          @change="sendData"
          v-model="end"></v-select>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>

  <p class="title green--text">
    {{ showPath }}
  </p>

  <v-container pa-0>
    <GmapMap
      :center="center"
      :zoom="5"
      style="width: 100%; height: 400px">
      <gmap-marker
        v-if="start && end"
        v-for="(city, index) in markers"
        :key="index"
        :position="city.position"
      ></gmap-marker>
      <!-- @click="clickCity(city)" -->
    </GmapMap>
  </v-container>


</div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import cds from './../assets/ciudades.json'
import axios from 'axios'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data () {
    return {
      center: {lat: 23.39, lng: -100.0},
      cityname: 'cdmx',
      cities: [],
      route: [],
      start: '',
      end: ''
    }
  },
  computed: {
    markers () {
      var vm = this
      return this.cities.filter(elem => 
        vm.route.some(rt => elem.value == rt)
        // elem.value == this.start || elem.value == this.end
      )
    },
    showPath () {
      let path = ''
      this.markers.forEach(elem => {
        path += elem.name + ' > '
      })
      return path
    }
  },

  methods: {
    sendData () {
      var vm = this
      if (this.start && this.end) {
        axios.post(`http://localhost:4000/?start=${this.start}&end=${this.end}`)
        .then(resp => {
          vm.route = resp.data.path
        }).catch(err => {
          console.error(err)
        })
      } else {
        alert('Selecciona dos ciudades')
      }
    }
  },

  beforeMount () {
    cds.forEach(element => {
      this.cities.push(element)
    })
  }
}
</script>
