<template>
  <div class="home">

    <div class="heading">
      <div class="welcome">
        <h1 class="__title">Visite Escarpas do Lago</h1>
        <h2 class="__subtitle">O maior balneário de água doce da América do Sul</h2>
      </div>
    </div>

    <div class="home-body">
      <h1 class="__title">Próximos Eventos</h1>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
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
    height: 13rem;
    background: url('../assets/img/bgimg.jpg') no-repeat fixed; 
    background-size: cover;
    & .welcome {
      display: flex;
      flex-flow: column;
      text-align: center;
      justify-content: center;
      align-items: center;
      background: linear-gradient(rgba(1, 5, 15, .8) 37%, rgba(255, 255, 255, 1));
      padding: 0 6%;
      height: 13rem;
      padding-bottom: 2rem;
      & .__title {
        font-family: var(--heading-font);
        color: white;
        font-size: 31px;
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
  & .home-body {
    display: flex;
    flex-flow: column;
    padding: 1rem 6%;
    & .__title {
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 1rem;
    }
  }
}
</style>
