<template>
  <div class="roteiro">
    
    <progressive-img class="__img"
    no-ratio 
    src="https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/utils%2FescarpasH.jpg?alt=media&token=2ea18e03-653a-43b6-ae07-6597a58585ab" placeholder="https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/utils%2FescarpasL.jpg?alt=media&token=e3b6b83a-4ad9-4da9-8f61-09c18d14ed76" />
    
    <div class="chegada-partida-container">
      
      <h1 class="__title">Planeje sua viagem à Escarpas do Lago gratuitamente!</h1>

      <div class="chegada-partida-box">

        <img src="../assets/img/calendar.svg">

        <div class="chegada-partida-input">
          <h3 v-if="!chegadaDate">Chegada</h3>
          <h3 v-else>{{ chegadaDateFormatted }}</h3>
          <input type="date" ref="inputChegada" v-model="chegadaDate" :min="today">
        </div>
        
        <img src="../assets/img/calendar-arrow.svg">

        <div class="chegada-partida-input">
          <h3 v-if="!partidaDate">Partida</h3>
          <h3 v-else>{{ partidaDateFormatted }}</h3>
          <input type="date" ref="inputChegada" v-model="partidaDate" :min="today">
        </div>

        <img class="__calendar-confirm" src="../assets/img/calendar-confirm.svg">

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
.roteiro {
  position: relative;
  width: 100%;
  background-color: black;
  & .__img {
    min-height: 14rem;
    max-height: 17rem;
    
  }
  & .chegada-partida-container {
    position: absolute;
    top: 0; bottom: 0;
    z-index: 2;
    background: rgba(0, 0, 0, .25);
    height: 100%;
    width: 100%;
    & .__title {
      padding: 2rem 7% 0 7%;
      color: white;
      font-size: 26px;
      font-weight: 600;
    }
    & .chegada-partida-box {
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: space-around;
      margin: 2rem 7%;
      background: rgba(0, 0, 0, .3);
      border-radius: 4px;
      height: 2.8rem;
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
        width: 1.25rem;
        height: auto;
      }
      & .__calendar-confirm {
        transform: scale(1.09);
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
    width: 100%;
    & .background-overlay {
      & .__title {
        font-size: 32px;
        padding: 4rem 13% 0 13%;
      }
      & .chegada-partida-container {
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: space-around;
        margin: 3rem 13% 4rem 13%;
        border-radius: 4px;
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
          width: 1.25rem;
          height: auto;
        }
        & .__calendar-confirm {
          transform: scale(1.08);
        }
      }
    }
  }  
}
</style>