<template>
  <div class="roteiro">
    

    <div class="roteiro-container">



      <h1 class="headline">Acomodações, Passeios, Eventos e Restaurantes em Capitólio e Região</h1>



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
          <option :value="n" v-for="n in 25">{{ n }} {{ n === 1 ? 'pessoa' : 'pessoas' }}</option>
        </select>


        <button class="buscar-btn" type="button">Criar Roteiro</button>


      </form>
  


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
        startDate ? formattedDates = format(startDate, 'D [de] MMM', { locale: pt }) : ''
        endDate ? formattedDates += ' - ' + format(endDate, 'D [de] MMM', { locale: pt }) : ''
        return formattedDates
      }
    }
  },
  computed: {
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
  background-image: url('../assets/img/bgimg2.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  & .roteiro-container {
    background: rgba(0,0,0,.2);
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
      background: rgba(0,0,0, 0);
      & .headline {
        padding: 2rem 20% 0;
        width: 100%;
        font-size: 37px;
        font-weight: 600;
        line-height: 48px;
        text-align: center;
      }
      & .roteiro-form {
        display: flex;
        margin: 4rem 0 2.8rem;
        align-items: center;
        justify-content: center;
        background: transparent;
        height: 3.4rem;
        width: 40rem;
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
    }
  }  
}
</style>