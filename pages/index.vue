<template>
  <div class="home">

    <div class="heading">
      <div class="welcome">
        <h1 class="__title">Visite Escarpas do Lago</h1>
        <h2 class="__subtitle">O maior balneário de água doce da América do Sul</h2>
      </div>
    </div>

    <div class="home-body">
      <div class="title-row">
        <h1 class="__title">Próximos Eventos</h1>
        <div class="see-all">
          <span class="__see-all-text">Veja mais</span>
          <img class="__see-all-arrow" src="../assets/img/see-all-arrow.svg">
        </div>
        
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
    height: 20rem;
    background: url('../assets/img/bgimg2.jpg') no-repeat fixed; 
    background-size: cover;
    & .welcome {
      display: flex;
      flex-flow: column;
      text-align: center;
      justify-content: center;
      align-items: center;
      background: linear-gradient(rgba(4, 12, 31, .94) 20%, rgba(255, 255, 255, 1));
      padding: 0 6%;
      height: 20rem;
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
    padding: .5rem 6%;
    margin-bottom: 100rem;
    & .title-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      & .__title {
        font-size: 22px;
        font-weight: 700;
      }
      & .see-all {
         & .__see-all-text {
          font-size: 13px;
          font-weight: 500;
          color: rgb(122, 122, 122);
          padding-right: 2px;
        }
        & .__see-all-arrow {
          transform: translateY(2px);
          filter: invert(60%);
          width: .6rem;
          height: auto;
        }
      }
    }
  }
}
</style>
