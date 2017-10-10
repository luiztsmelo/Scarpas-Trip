<template>
  <div class="home">
    <div class="heading">
      <div class="welcome">
        <h1 class="__title">Visite Escarpas do Lago</h1>
        <h2 class="__subtitle">Maior balneário de água doce da América do Sul</h2>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Escarpas Trip'
    }
  }
}
</script>

<style scope>
@import url('../assets/css/main.css');

.home {
  margin-top: 3.5rem;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  & .heading {
    height: 17rem;
    background-image: url('../assets/img/bgimg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    & .welcome {
      display: flex;
      flex-flow: column;
      text-align: center;
      justify-content: center;
      align-items: center;
      background: linear-gradient(rgba(0, 0, 0, .8), rgba(255, 255, 255, 1));
      padding: 0 6%;
      height: 17rem;
      & .__title {
        font-family: var(--heading-font);
        color: white;
        font-size: 28px;
        font-weight: 400;
        margin-bottom: 1rem;
      }
      & .__subtitle {
        color: white;
        font-size: 18px;
        font-weight: 200;
      }
    }
  }
}
</style>
