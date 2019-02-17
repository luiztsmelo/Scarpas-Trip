<template>
  <div class="roteiro">
    

    
    <div class="slideshow">
      <figure class="img-1"></figure>
      <figure class="img-2"></figure>
      <figure class="img-3"></figure>
      <figure class="img-4"></figure>
    </div>



    <div class="roteiro-container">

      

      <h1 class="headline">Encontre tudo para sua viagem a Capitólio</h1>



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


        <button class="buscar-btn" type="button" @click="criarRoteiro">Criar Roteiro</button>


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
  data () {
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
    },
    criarRoteiro () {
      this.$router.push('/roteiro')
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
  height: 15rem;
  position: relative;
  & .slideshow {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    & figure {
      all: initial;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      animation: slideShow 30s linear infinite 0s;
    }
    & .img-1 {
      opacity: 1;
      background: url('https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/utils%2Fbgimg.jpg?alt=media&token=45249ced-7096-40f5-a782-c7f449f0fd00') no-repeat center center;
      background-size: cover;
    }
    & .img-2 {
      animation-delay: 8s;
      background: url('https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/utils%2Fbgimg7.jpg?alt=media&token=f026c866-597a-4314-98f5-70aa1290c988') no-repeat center center;
      background-size: cover;
    }
    & .img-3 {
      animation-delay: 16s;
      background: url('https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/utils%2Fbgimg6.jpg?alt=media&token=9e15b839-0619-45a7-a553-b26bd5da1dcf') no-repeat center center;
      background-size: cover;
    }
    & .img-4 {
      animation-delay: 24s;
      background: url('https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/utils%2Fbgimg5.jpg?alt=media&token=8cb7fe4c-a657-4864-8bf6-7f1975806a59') no-repeat center center;
      background-size: cover;
    }
  }
  & .roteiro-container {
    background: rgba(0,0,0,.3);
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
      font-size: 22px;
      font-weight: 700;
      line-height: 32px;
      user-select: none;
    }
    & .roteiro-form {
      display: none;
    }
  }
}



@media (min-width: 1024px) {
  .roteiro {
    height: calc(100vh - var(--navbarHeightDesktop) * 2);
    background-attachment: fixed;
    background-position: center;
    & .roteiro-container {
      display: flex;
      flex-flow: column;
      align-items: center;
      background: rgba(0,0,0, .2);
      & .headline {
        padding: 2rem 30% 0;
        width: 100%;
        font-size: 41px;
        font-weight: 700;
        line-height: 55px;
        text-align: center;
      }
      & .roteiro-form {
        display: flex;
        margin: 4rem 0 2.8rem;
        align-items: center;
        justify-content: center;
        background: transparent;
        height: 3.2rem;
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

@keyframes slideShow {
  0% {
    opacity: 0;
    transform: scale(1);
  }
  5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  30% {
    opacity: 0;
    transform: scale(1.1);
  }
  100% {
    opacity: 0;
    transform: scale(1.1);
  }
}

</style>