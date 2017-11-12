<template>
  <div class="roteiro-home">
    
    <progressive-background class="__img"
    no-ratio
    src="https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/utils%2FescarpasH.jpg?alt=media&token=2ea18e03-653a-43b6-ae07-6597a58585ab" placeholder="https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/utils%2FescarpasL.jpg?alt=media&token=e3b6b83a-4ad9-4da9-8f61-09c18d14ed76" />
    
    <div class="chegada-partida-container">
      
      <h1 class="__title">Planeje sua viagem a Capitólio e região gratuitamente!</h1>

      <div class="chegada-partida-box">

        <img src="../assets/img/roteiro-calendar.svg">

        <div class="chegada-partida-input">
          <h3 v-if="!chegadaDate">Chegada</h3>
          <h3 v-else>{{ chegadaDateFormatted }}</h3>
          <input type="date" ref="inputChegada" v-model="chegadaDate" :min="today">
        </div>
        
        <img src="../assets/img/roteiro-arrow.svg">

        <div class="chegada-partida-input">
          <h3 v-if="!partidaDate">Partida</h3>
          <h3 v-else>{{ partidaDateFormatted }}</h3>
          <input type="date" ref="inputChegada" v-model="partidaDate" :min="today">
        </div>

        <nuxt-link :to="roteiroRoute">
          <img class="__roteiro-confirm" :style="onRoteiro" src="../assets/img/roteiro-confirm.svg">
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

<style scoped>
@import url('../assets/css/main.css');
.roteiro-home {
  position: relative;
  width: 100%;
  background: var(--color01);
  & .__img {
    min-height: 14rem;
  }
  & .chegada-partida-container {
    position: absolute;
    top: 0; bottom: 0;
    z-index: 2;
    background: rgba(0, 0, 0, .15);
    height: 100%;
    width: 100%;
    & .__title {
      padding: 2rem 7% 0 7%;
      color: white;
      font-size: 25px;
      font-weight: 600;
      line-height: 29px;
    }
    & .chegada-partida-box {
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: space-around;
      margin: 2rem 7%;
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
      }
      & img {
        width: 1.1rem;
        height: auto;
      }
      & .__roteiro-confirm {
        transform: scale(1.11);
        transition: all .3s ease-in-out;
      }
    }
  }
}

input {  
  cursor: pointer;
  opacity: 0;
  width: 100%;
}
[type="date"]::-webkit-calendar-picker-indicator {
  width: 100%;
}


@media (min-width: 1281px) {
  .roteiro {
    & .__img {
      height: 23rem;
    }
    & .chegada-partida-container {
      height: 23rem;
      background: rgba(0, 0, 0, .1);
      & .__title {
        font-size: 36px;
        padding: 7rem 13% 0 13%;
      }
      & .chegada-partida-box {
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: space-around;
        margin: 4rem 13% 4rem 13%;
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