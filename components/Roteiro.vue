<template>
  <div class="roteiro-home">
    
    <div class="chegada-partida-container">
      
      <h1 class="__title">Tudo para sua viagem a Capitólio e região</h1>
  
    </div>

  </div>     
</template>

<script>
export default {
}
</script>

<style>
@import url('~/assets/css/main.css');

.roteiro-home {
  width: 100%;
  height: 12rem;
  background-image: url('~/assets/img/bgimg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  & .chegada-partida-container {
    background: rgba(0,0,0,.5);
    padding: 1rem 0;
    position: relative;
    display: flex;
    flex-flow: column;
    z-index: 2;
    height: 100%;
    width: 100%;
    justify-content: center;
    & .__title {
      display: flex;
      flex-flow: column;
      padding: 0 7%;
      color: white;
      font-size: 20px;
      font-weight: 600;
      line-height: 26px;
      user-select: none;
    }
  }
}




@media (min-width: 1024px) {
  .roteiro-home {
    height: 29rem;
    background-attachment: fixed;
    background-position: center;
    & .chegada-partida-container {
      background: rgba(0,0,0, 0);
      & .__title {
        padding: 0 24% 0 7%;
        width: 100%;
        font-size: 36px;
        font-weight: 600;
      }
    }
  }  
}
</style>