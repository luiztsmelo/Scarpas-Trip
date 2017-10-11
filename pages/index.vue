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
            <span class="__see-all-text">Ver mais</span>
            <img class="__see-all-arrow" src="../assets/img/see-all-arrow.svg">
          </div>
        </div>

        <div class="carousel-container">
          <ul class="carousel-row">
            <li class="card" v-for="evento in eventosData">

              <div class="__card-img"></div>
              <h1 class="__card-title">{{ evento.title}}</h1>
              <h2 class="__card-subtitle">{{ evento.subtitle}}</h2>

            </li>
          </ul>
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
  },
  data () {
    return {
      eventosData: [
        {title: 'Réveillon Kanto da Ilha 2018', subtitle: 'Venha curtir com a gente!'},
        {title: 'Molejão ao Vivo', subtitle: 'Gravação do novo DVD'},
        {title: 'Mc Catra no Kanto da Ilha', subtitle: 'Curtindo com a galera'}
      ]
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
      background: linear-gradient(rgba(4, 12, 31, .91), rgba(255, 255, 255, 1));
      padding: 0 6%;
      height: 17rem;
      padding-bottom: 2rem;
      & .__title {
        font-family: var(--heading-font);
        color: white;
        font-size: 34px;
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
          font-size: 23px;
          font-weight: 600;
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
      & .carousel-container {
        overflow-x: hidden;
        & .carousel-row {
          display: flex;
          flex-flow: row nowrap;
          padding: 0;
          transform: translateX(-0%);
          & .card {
            max-width: 144px;
            min-width: 144px;
            cursor: pointer;
            list-style-type: none;
            margin-right: 1rem;
            & .__card-img {
              min-height: 100px;
              background: url('../assets/img/eventos/evento.jpg') no-repeat; 
              background-size: cover;
              border-radius: 4px;
            }
            & .__card-title {
              margin: .6rem 0 .3rem 0;
              font-size: 16px;
              font-weight: 600;
            }
            & .__card-subtitle {
              font-size: 14px;
              font-weight: 300;
            }
          }
        }
      }
    }
  }
}
</style>
