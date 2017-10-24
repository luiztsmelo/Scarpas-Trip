<template>
  <div class="home">

    <!-- <div class="heading">
      <div class="welcome">
        <h1 class="__title">Visite Escarpas do Lago</h1>
        <h2 class="__subtitle">O maior balneário de água doce da América Latina</h2>
      </div>
    </div> -->

    <div class="home-body">


      <div class="category-container">

        <div class="title-row">
          <h1 class="__title">Próximos Eventos</h1>
          <nuxt-link to="/eventos">
            <div class="see-all">
              <span class="__see-all-text">Ver mais</span>
              <img class="__see-all-arrow" src="../assets/img/see-all-arrow.svg">
            </div>
          </nuxt-link>  
        </div>

        <div class="carousel-container">
          <v-touch @panleft="leftCarousel" @panright="rightCarousel" v-bind:pan-options="{ direction: 'horizontal' }">
            <ul class="carousel-row" :style="'transform: translateX(' + positionCarousel + 'px)'">
              <li class="card" v-for="evento in eventosData">
                
                <progressive-img class="__card-img" :src="evento.img.src" :placeholder="evento.img.placeholder" alt="" no-ratio />
                <h1 class="__card-title">{{ evento.title | snippetTitle }}</h1>
                <h2 class="__card-subtitle">{{ evento.subtitle | snippetSubtitle }}</h2>

              </li>
            </ul>
          </v-touch>  
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
  transition: 'slide-right',
  data () {
    return {
      positionCarousel: '',
      eventosData: [
        {
        title: 'YDE Weekend - ALOK', 
        subtitle: 'Iremos invadir Escarpas do Lago - MG', 
        img: {
          src: "https://s3.amazonaws.com/sh2-img-eventos/site/20171002182709.png",
          placeholder: "https://ibb.co/bYbed6"
          }
        },
        {
        title: 'Orloff Set', 
        subtitle: 'Escarpas Session', 
        img: {
          src: "https://soubh-imagens.s3.amazonaws.com/media/uploaded_images/eventos/194325_festa-orloff.jpg",
          placeholder: "http://i64.tinypic.com/309lo9h.jpg"
          }
        },
        {
        title: 'Show Mr. Catra', 
        subtitle: 'O papai chegou', 
        img: {
          src: "https://rd1.com.br/wp-content/uploads/2016/01/19_56_29_654_file.jpeg",
          placeholder: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          }
        },  
      ]
    }
  },
  methods: {
    leftCarousel (e) {
      this.positionCarousel = e.deltaX 
      console.log(e.deltaX + ' - ' + this.positionCarousel)
    },
    rightCarousel (e) {
      this.positionCarousel = e.deltaX 
      console.log(e.deltaX + ' - ' + this.positionCarousel)
    }
  },
  filters: {
    snippetTitle (value) {
      if (value.length > 27) {
        return value.slice(0, 27) + '...'
      } else {
        return value.slice(0)
      }
    },
    snippetSubtitle (value) {
      if (value.length > 31) {
        return value.slice(0, 31) + '...'
      } else {
        return value.slice(0)
      }
    }
  }
}
</script>

<style scope>
@import url('../assets/css/main.css');

.home {
  margin-top: 3.3rem;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  transition: all .222s ease;
  /* & .heading {
    height: 15rem;
    background: url('../assets/img/bgimg3.jpg') no-repeat fixed; 
    background-size: cover;
    & .welcome {
      display: flex;
      flex-flow: column;
      text-align: center;
      justify-content: center;
      align-items: center;
      background: linear-gradient(rgba(1, 5, 15, .6) 55%, rgba(255, 255, 255, 1)); 
      padding: 0 7%;
      height: 15rem;
      padding-bottom: 2.7rem;
      & .__title {
        font-family: var(--heading-font);
        color: white;
        font-size: 34px;
        font-weight: 400;
        margin-bottom: .6rem;
      }
      & .__subtitle {
        color: white;
        font-size: 17px;
        font-weight: 300;
        line-height: 22px;
      }
    }
  } */

  & .home-body {
    display: flex;
    flex-flow: column;
    padding: 3rem 0;
    margin-bottom: 100rem;
    & .category-container {
      display: flex;
      flex-flow: column;
      overflow-x: hidden;
      & .title-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 7% 1.5rem 7%;
        & .__title {
          font-size: 25px;
          font-weight: 600;
        }
        & .see-all {
          cursor: pointer;
          & .__see-all-text {
            font-size: 13px;
            font-weight: 500;
            color: rgb(122, 122, 122);
            padding-right: 2px;
          }
          & .__see-all-arrow {
            opacity: .5;
            width: .5rem;
            height: auto;
          }
        }
      }
      & .carousel-container {
        overflow-x: hidden;
        & .carousel-row {
          display: flex;
          flex-flow: row nowrap;
          height: 14rem;
          padding: 0;
          transition: all ease .1s;
          transform: translateX(7%);
          & .card {
            max-width: 145px;
            min-width: 145px;
            cursor: pointer;
            list-style-type: none;
            margin-right: .8rem;
            -webkit-tap-highlight-color: rgba(255, 255, 45, 0);
            & .__card-img {
              width: 100%;
              min-height: 90px;
            
              border-radius: 3px;
            }
            & .__card-title {
              margin: .6rem 0 .3rem 0;
              font-size: 16px;
              font-weight: 600;
            }
            & .__card-subtitle {
              font-size: 15px;
              font-weight: 300;
            }
          }
        }
      }
    }
  }
}
</style>
