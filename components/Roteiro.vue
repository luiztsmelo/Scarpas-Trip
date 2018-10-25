<template>
  <div class="roteiro" :style="{ backgroundImage: 'url(' + bgimg + ')'}">
    
    <div class="roteiro-container">
      



      <h1 class="headline">Encontre Acomodações, Passeios, Eventos e Restaurantes em Capitólio e Região</h1>




      <form class="roteiro-form">


        <div class="datepicker-trigger">
          <button
            type="button"
            id="datepicker-trigger">
            {{ formatDates(startDate, endDate) }}
          </button>

          <AirbnbStyleDatepicker
            :trigger-element-id="'datepicker-trigger'"
            :fullscreen-mobile="true"
            :showShortcutsMenuTrigger="false"
            :offset-y="7"
            :min-date="minDate"
            :date-one="startDate"
            :date-two="endDate"
            @date-one-selected="val => { startDate = val }"
            @date-two-selected="val => { endDate = val }"
          />
        </div>


        <select class="hospedes-select" v-model="$store.state.reservaAcomod.totalHospedes">
          <option :value="n" v-for="n in 25">{{ n }} {{ n === 1 ? 'hóspede' : 'hóspedes' }}</option>
        </select>


        <button class="buscar-btn" type="button">Criar Roteiro</button>


      </form>
  


      <!-- <star-rating
        class="rating"
        :rating="5"
        :read-only="true"
        :show-rating="false"
        active-color="#fff"
        :star-size="15"
        :padding="10">
      </star-rating>



      <p class="testimonial">"Incrível a maneira como a Escarpas Trip facilita a organização de sua viagem para Capitólio. Fechamos uma casa e um passeio em poucos minutos, diretamente com os proprietários!"</p>

      <p class="testimonial-name">Roberta e Conrado, Belo Horizonte</p> -->




    </div>

  </div>     
</template>

<script>
import supportsWebP from 'supports-webp'
import format from 'date-fns/format'
import subDays from 'date-fns/sub_days'
import pt from 'date-fns/locale/pt'

export default {
  data() {
    return {
      startDate: '',
      endDate: ''
    }
  },
  methods: {
    formatDates (startDate, endDate) {
      let formattedDates = ''
      if (startDate === '') {
        return 'Chegada / Partida'
      } else {
        startDate ? formattedDates = format(startDate, 'D MMM', { locale: pt }) : ''
        endDate ? formattedDates += ' - ' + format(endDate, 'D MMM', { locale: pt }) : ''
        return formattedDates
      }
    }
  },
  computed: {
    bgimg () {
      return supportsWebP ? require('@/assets/img/bgimg.webp') : require('@/assets/img/bgimg.jpg')
    },
    minDate() {
      return subDays(Date(), 1)
    }
  }
}
</script>

<style>

.roteiro {
  width: 100%;
  height: 17rem;
  background-repeat: no-repeat;
  background-size: cover;
  & .roteiro-container {
    background: rgba(0,0,0,.4);
    padding: 1rem 0;
    position: relative;
    display: flex;
    flex-flow: column;
    z-index: 2;
    height: 100%;
    width: 100%;
    justify-content: center;
    & .headline {
      display: flex;
      flex-flow: column;
      padding: 0 7%;
      color: white;
      font-size: 20px;
      font-weight: 600;
      line-height: 30px;
      user-select: none;
    }
    & .rating {
      display: none;
    }
    & .testimonial {
      display: none;
    }
    & .testimonial-name {
      display: none;
    }
  }
}




@media (min-width: 1024px) {
  .roteiro {
    height: 29.5rem;
    background-attachment: fixed;
    background-position: center;
    & .roteiro-container {
      display: flex;
      flex-flow: column;
      align-items: center;
      background: rgba(0,0,0, .2);
      & .headline {
        padding: 2rem 20% 0;
        width: 100%;
        font-size: 32px;
        font-weight: 600;
        line-height: 45px;
        text-align: center;
      }
      & .roteiro-form {
        display: flex;
        margin: 3.4rem 0 2.8rem;
        align-items: center;
        justify-content: center;
        background: transparent;
        height: 3.4rem;
        width: 38rem;
        & .datepicker-trigger {
          height: 100%;
          flex: 1;
          background: transparent;
          & #datepicker-trigger {
            height: 100%;
            width: 100%;
            background: white;
            text-align: center;
            border: none;
            border-radius: 200px 0 0 200px;
            outline: none;
          }
        }
        & .hospedes-select {
          height: 100%;
          flex: 1;
          background: white;
          border: none;
          border-left: 1px solid #dedede;
          border-right: 1px solid #dedede;
          text-align-last:center;
          outline: none;
        }
        & .buscar-btn {
          height: 100%;
          flex: 1;
          background: var(--colorAcomod);
          color: white;
          font-weight: 700;
          border-radius: 0 200px 200px 0;
        }
      }
      & .rating {
        display: inline-flex;
        margin: .6rem 0;
      }
      & .testimonial {
        display: inline-flex;
        padding: 0 26%;
        color: white;
        font-size: 14px;
        line-height: 1.45;
        font-weight: 500;
        font-style: italic;
        text-align: center;
      }
      & .testimonial-name {
        display: inline-flex;
        padding-top: .6rem;
        color: white;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
      }
    }
  }  
}
</style>