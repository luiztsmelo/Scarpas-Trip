<template>
  <div class="roteiro">

    <h1 class="__title">Crie um roteiro grátis para sua viagem à Escarpas do Lago!</h1>

    <div class="check-in-out">
      <img src="../assets/img/calendar.svg">
      <h3>Chegada</h3>
      <div class="__slash"></div>
      <h3>Partida</h3>
      <div class="__confirm"></div>
    </div>

  </div>     
</template>

<script>
export default {
  
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
  & .check-in-out {
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: space-around;
    margin: 2rem 7%;
    background: rgba(0, 0, 0, .12);
    border-radius: 4px;
    height: 2.7rem;
    & h3 {
      width: 5rem;
      font-size: 17px;
      font-weight: 400;
      color: white;
    }
    & img {
      width: 1.2rem;
      height: auto;
    }
    & .__slash {
      background: white;
      height: 19px;
      width: 2px;
      transform: rotate(27deg);
      border-radius: 5px;
    }
    & .__confirm {
      background: transparent;
      border-top: 2px solid white;
      border-right: 2px solid white;
      height: 14px;
      width: 14px;
      transform: rotate(45deg);
    }
  }
}

</style>