<template>
  <div class="roteiro-home">
    
    <div class="chegada-partida-container">
      
      <h1 class="__title">Crie um roteiro personalizado para sua viagem a Capitólio:</h1>

      <div class="chegada-partida-box">

        <img class="__roteiro-calendar" src="../assets/img/roteiro-calendar.svg">

        <div class="chegada-partida-input">
          <h3 v-if="!chegadaDate">Chegada</h3>
          <h3 v-else>{{ chegadaDateFormatted }}</h3>
          <input type="date" ref="inputChegada" v-model="chegadaDate" :min="today">
        </div>
        
        <img class="__roteiro-arrow" src="../assets/img/roteiro-arrow.svg">

        <div class="chegada-partida-input">
          <h3 v-if="!partidaDate">Partida</h3>
          <h3 v-else>{{ partidaDateFormatted }}</h3>
          <input type="date" ref="inputChegada" v-model="partidaDate" :min="today">
        </div>

        <nuxt-link :to="roteiroRoute">
          <img class="__roteiro-confirm" :style="onRoteiro" src="../assets/img/roteiro-confirm.svg" @click="hideFoobar()">
        </nuxt-link>

      </div>

    </div>

  </div>     
</template>

<script>
export default {
  data () {
    return {
      chegadaDate: null,
      partidaDate: null
    }
  },
  methods: {
    hideFoobar () {
      if (this.chegadaDate !== null && this.partidaDate !== null) {
        this.$store.commit('m_showFoobar', false)
      } else {
        this.$store.commit('m_showFoobar', true)
      }
    }
  },
  computed: {
    roteiroRoute () {
      if (this.chegadaDate !== null && this.partidaDate !== null) {
        return '/roteiro'
      } else {
        return '/'
      }
    },
    onRoteiro () {
      if (this.chegadaDate !== null && this.partidaDate !== null) {
        return 'transform: scale(1.45)'
      }
    },
    chegadaDateFormatted () {
      let y = this.chegadaDate.slice(0, 4)
      let m = this.chegadaDate.slice(5, 7)
      let d = this.chegadaDate.slice(8, 10)
      let shortYear = y.slice(2, 4)
      return d + '/' + m + '/' + shortYear
    },
    partidaDateFormatted () {
      let y = this.partidaDate.slice(0, 4)
      let m = this.partidaDate.slice(5, 7)
      let d = this.partidaDate.slice(8, 10)
      let shortYear = y.slice(2, 4)
      return d + '/' + m + '/' + shortYear
    },
    today () {
      let dd = new Date().getDate()
      let mm = new Date().getMonth() + 1
      let yyyy = new Date().getFullYear()
      if (dd < 10) {
        dd = '0' + dd
      } 
      if (mm < 10) {
        mm = '0' + mm
      } 
      return yyyy + '-' + mm + '-' + dd
    }
  }
}
</script>

<style>
@import url('../assets/css/main.css');

.roteiro-home {
  width: 100%;
  height: 12rem;
  & .chegada-partida-container {
    padding: 1rem 0;
    position: relative;
    display: flex;
    flex-flow: column;
    z-index: 2;
    background-image: linear-gradient(to top, #c71d6f 0%, #d09693 100%);
    height: 100%;
    width: 100%;
    justify-content: space-around;
    & .__title {
      display: flex;
      padding: 0 7%;
      color: white;
      font-size: 24px;
      font-weight: 400;
      line-height: 29px;
    }
    & .chegada-partida-box {
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: space-around;
      margin: 0 7%;
      border-bottom: 1px solid white;
      height: 2.7rem;
      & .chegada-partida-input {
        position: relative;
        width: 5.2rem;
        & h3 {
          font-size: 17px;
          font-weight: 400;
          color: white;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: auto;
          height: auto;
        }
        & input {  
          cursor: pointer;
          opacity: 0;
          width: 100%;
        }
        & [type="date"]::-webkit-calendar-picker-indicator {
          width: 100%;
        }
      }
      & img {
        width: 1.1rem;
        height: auto;
        /* filter: invert(80%); */
      }
      & .__roteiro-confirm {
        transform: scale(1.11);
        transition: all .3s ease-in-out;
      }
    }
  }
}




@media (min-width: 1281px) {
  .roteiro-home {
    height: 15rem;
    & .chegada-partida-container {
      & .__title {
        font-size: 31px;
        padding: 2rem 13% 0 13%;
      }
      & .chegada-partida-box {
        margin: 0 13%;
        border-radius: 4px;
        width: 35%;
        height: 3.2rem;
        & .chegada-partida-input {
          position: relative;
          width: 5.2rem;
          & h3 {
            font-size: 17px;
            font-weight: 400;
          }
        }
        & img {
          width: 1.25rem;
          height: auto;
        }
      }
    }
  }  
}
</style>