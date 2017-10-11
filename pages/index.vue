<template>
  <div class="home">

    <div class="heading">
      <div class="welcome">
        <h1 class="__title">Visite Escarpas do Lago</h1>
        <h2 class="__subtitle">O maior balneário de água doce da América Latina</h2>
      </div>
    </div>

    <div class="home-body">

      <div class="category-container">
        <div class="title-row">
          <h1 class="__title">Próximos Eventos</h1>
          <div class="see-all">
            <span class="__see-all-text">Veja mais</span>
            <img class="__see-all-arrow" src="../assets/img/see-all-arrow.svg">
          </div>
        </div>

        <div class="carousel-row">
          <div class="__img"></div>
          <div class="__img"></div>
          <div class="__img"></div>
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
    height: 17rem;
    background: url('../assets/img/bgimg2.jpg') no-repeat fixed; 
    background-size: cover;
    & .welcome {
      display: flex;
      flex-flow: column;
      text-align: center;
      justify-content: center;
      align-items: center;
      background: linear-gradient(rgba(4, 12, 31, .9), rgba(107, 183, 185, 1));
      padding: 0 6%;
      height: 17rem;
      padding-bottom: 2rem;
      & .__title {
        font-family: var(--heading-font);
        color: white;
        font-size: 33px;
        font-weight: 400;
        margin-bottom: 1rem;
      }
      & .__subtitle {
        color: white;
        font-size: 18px;
        font-weight: 200;
        line-height: 22px;
      }
    }
  }

  & .home-body {
    display: flex;
    flex-flow: column;
    padding: 1rem 6%;
    margin-bottom: 100rem;
    & .category-container {
      display: flex;
      flex-flow: column;
      overflow-x: hidden;
      & .title-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 1.5rem;
        & .__title {
          font-size: 22px;
          font-weight: 700;
        }
        & .see-all {
          cursor: pointer;
          & .__see-all-text {
            font-size: 13px;
            font-weight: 500;
            color: rgb(122, 122, 122);
            padding-right: 3px;
          }
          & .__see-all-arrow {
            transform: translateY(1px);
            opacity: .5;
            width: .6rem;
            height: auto;
          }
        }
      }
      & .carousel-row {
        display: flex;
        flex-flow: row nowrap;
        overflow-x: hidden;
          & .__img {
          min-width: 145px;
          height: 100px;
          margin-right: .8rem;
          background: url('../assets/img/evento.jpg') no-repeat; 
          background-size: cover;
          border-radius: 4px;
        }
      }
    }
  }

  
}
</style>
