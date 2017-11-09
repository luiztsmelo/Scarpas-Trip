<template>
  <div class="roteiro">

    <h1 class="__title">Crie um roteiro gratuito para sua viagem à Escarpas do Lago!</h1>

    <div class="chegada-partida-container">

      <img src="../assets/img/calendar.svg">

      <div class="chegada-partida-input">
        <h3 v-if="!chegadaDate">Chegada</h3>
        <h3 v-else>{{ chegadaDate }}</h3>
        <input type="date" ref="inputChegada" v-model="chegadaDate">
      </div>
      
      

      <img src="../assets/img/calendar-arrow.svg">

      <div class="chegada-partida-input">
        <h3 v-if="!partidaDate">Partida</h3>
        <h3 v-else>{{ partidaDate }}</h3>
        <input type="date" ref="inputChegada" v-model="partidaDate">
      </div>

      <img class="__calendar-confirm" src="../assets/img/calendar-confirm.svg">

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
  }
}
</script>

<style scoped>
@import url('../assets/css/main.css');


.roteiro {
  width: 100%;
  background: linear-gradient(290deg, #C3F9E2, #00A8A1);
  & .__title {
    padding: 2rem 7% 0 7%;
    color: white;
    font-size: 26px;
    font-weight: 600;
  }
  & .chegada-partida-container {
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: space-around;
    margin: 2rem 7%;
    background: rgba(0, 0, 0, .12);
    border-radius: 4px;
    height: 2.7rem;
    & .chegada-partida-input {
      position: relative;
      width: 5.5rem;
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

input {
  opacity: 0;
  width: 100%;
}
[type="date"]::-webkit-calendar-picker-indicator {
  width: 100%;
}
</style>