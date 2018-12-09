<template>
  <transition name="filtrar-acomods-animation">
    <div class="filtrar-acomods-modal" v-show="$store.state.showFiltrarAcomods">
      <div class="filtrar-acomods-body">


        <div class="topbar">
          <img src="../assets/img/close-mobile.svg" class="close-btn" @click="closeBtn">
          <button class="limpar-btn" @click="$store.commit('m_resetFilters')">Limpar</button>
        </div>
        


        <h1 class="__title">Filtrar por:</h1>






        <!-- ________________________________________ DATAS ________________________________________ -->
        <div class="filter-box">

          <h2 class="__filter-title">Datas</h2>


          <h3 style="padding: .8rem 0">Chegada / Partida</h3>

        </div><!-- ________________________________________ DATAS ________________________________________ -->







        <!-- ________________________________________ HÓSPEDES ________________________________________ -->
        <div class="filter-box">

          <h2 class="__filter-title">Capacidade hóspedes</h2>


          <div class="number-select">

            <h3>Adultos e crianças</h3>

            <div class="input-number">
              <div class="__btn" :class="$store.state.filters.hospedes === 0 ? '__btn-disabled' : ''" @click="$store.commit('m_decrementHospedes')"><div class="minus"></div></div>

              <h3>Acima de {{ $store.state.filters.hospedes }}</h3>

              <div class="__btn" :class="$store.state.filters.hospedes === 25 ? '__btn-disabled' : ''" @click="$store.commit('m_incrementHospedes')"><div class="plus-horiz"></div><div class="plus-vert"></div></div>
            </div>

          </div>

        </div><!-- ________________________________________ HÓSPEDES ________________________________________ -->







        <!-- ________________________________________ TIPO ACOMOD ________________________________________ -->
        <div class="filter-box">

          <h2 class="__filter-title">Tipo de acomodação</h2>


          <div class="option" v-for="(tipoAcomod, index) in tiposAcomods" :key="tipoAcomod.name" @click="$store.state.filters.tipoAcomod = tipoAcomod.name">
            
            <h3 class="__text" >{{ tipoAcomod.name }}</h3>

            <div class="radio"><div :class="[ $store.state.filters.tipoAcomod === tipoAcomod.name ? 'radio-checkmark' : '' ]"></div></div>

          </div>

        </div><!-- ________________________________________ TIPO ACOMOD ________________________________________ -->






        <!-- ________________________________________ PREÇO ________________________________________ -->
        <div class="filter-box">

          <h2 class="__filter-title">Preço por noite</h2>


          <div class="option" v-for="(preco, index) in precos" :key="preco.name" @click="$store.state.filters.preco = preco.value">
            
            <h3 class="__text" >{{ preco.name }}</h3>

            <div class="radio"><div :class="[ $store.state.filters.preco === preco.value ? 'radio-checkmark' : '' ]"></div></div>

          </div>

        </div><!-- ________________________________________ PREÇO ________________________________________ -->







        <!-- ________________________________________ AVALIAÇÃO ________________________________________ -->
        <div class="filter-box">

          <h2 class="__filter-title">Avaliação</h2>


        </div><!-- ________________________________________ AVALIAÇÃO ________________________________________ -->
        





        <div class="filter-btn" v-if="$store.state.allAcomods !== null">
          <button class="__btn" @click="$store.state.showFiltrarAcomods = false">
            Mostrar 
            {{ $store.state.filteredAcomods !== null ? $store.state.filteredAcomods.length : $store.state.allAcomods.length }}
            acomodações
          </button>
        </div>
        



      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      tiposAcomods: [
        { 'name': 'Casa' },
        { 'name': 'Apartamento' },
        { 'name': 'Rancho' },
        { 'name': 'Chácara' },
        { 'name': 'Sítio' },
        { 'name': 'Fazenda' },
        { 'name': 'Pousada' },
        { 'name': 'Suítes' },
        { 'name': 'Camping' },
        { 'name': 'Hostel' }
      ],
      precos: [
        { 'name': 'Até R$199', 'value': 'low' },
        { 'name': 'R$200 - R$399', 'value': 'mid' },
        { 'name': 'R$400+', 'value': 'high' }
      ],
    }
  },
  methods: {
    closeBtn () {
      this.$store.commit('m_showFiltrarAcomods', false)
      window.history.back(1)
    },
    filterByHospedes (acomod) {
      return this.filters.hospedes > 0 ? acomod.totalHospedes >= this.filters.hospedes : []
    },
    filterByTipoAcomod (acomod) {
      return this.filters.tipoAcomod !== null ? acomod.tipoAcomod === this.filters.tipoAcomod : []
    },
    filterByPreco (acomod) {
      if (this.filters.preco !== null) {
        if (this.filters.preco === 'low') {
          return acomod.valorNoite <= 199
        } 
        else if (this.filters.preco === 'mid') {
          return acomod.valorNoite >= 200 && acomod.valorNoite <= 399
        } 
        else if (this.filters.preco === 'high') {
          return acomod.valorNoite >= 400
        }
      } else {
        return []
      }
    }
  },
  computed: {
    hash () { return this.$route.hash },
    filters () { return this.$store.state.filters },
    selectedSomeFilter () {
      if (this.filters.date !== null || this.filters.hospedes > 0 || this.filters.tipoAcomod !== null || this.filters.preco !== null || this.filters.avaliacao !== null) {
        return true
      } else {
        return false
      }
    }
  }, 
  watch: {
    hash (value) {
      if (value === '') {
        this.$store.commit('m_showFiltrarAcomods', false)
      }
    },
    filters: {
      handler (filter) {
        if (this.$store.state.isMobile) {
          if (this.selectedSomeFilter) {
            const filteredAcomods = this.$store.state.allAcomods.filter(acomod => {
              return this.filterByHospedes(acomod) && 
                      this.filterByTipoAcomod(acomod) && 
                      this.filterByPreco(acomod)
            })
            this.$store.commit('m_filteredAcomods', filteredAcomods)
          }
          if (!this.selectedSomeFilter) {
            this.$store.state.filteredAcomods = null
          }
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
@import url('~/assets/css/radio-mobile.css');

h3 {
  font-size: 17px;
}

.filtrar-acomods-modal {
  position: fixed;
  z-index: 9999;
  overflow-y: auto;
  width:  100%;
  height: 100%;
  top: 0;
  left: 0;
  background: white;
  transition: var(--main-transition) !important;
  & .filtrar-acomods-body {
    display: flex;
    flex-flow: column;
    padding: 5.3rem 7%;
    & .topbar {
      z-index: 99999;
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 7%;
      height: 3.3rem;
      width: 100%;
      background: #fff;
      & .close-btn {
        cursor: pointer;
        width: 1.1rem;
        height: auto;
      }
      & .limpar-btn {
        padding: 0;
        background: #fff;
        font-size: 16px;
        font-weight: 600;
      }
    }
    & .__title {
      line-height: 35px;
      font-size: 30px;
      padding-bottom: 1.2rem;
    }
    & .filter-btn {
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 4.7rem;
      background: #fff;
      box-shadow: 0px -1px 1px 0px rgba(0,0,0,0.1);
      & .__btn {
        height: 3.2rem;
        width: 86%;
        background: var(--colorAcomod);
        color: white;
        font-weight: 700;
        border-radius: 100px;
        transition: var(--main-transition);
      }
    }
    & .filter-box {
      padding: 2.3rem 0 1.5rem;
      border-bottom: 1px solid #dedede;
      & .__filter-title {
        font-size: 18px;
        font-weight: 600;
        padding-bottom: .8rem;
      }
      & .option {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: .8rem 0;
      }
      & .number-select {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: .8rem 0;
        & .input-number {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 14rem;
          margin-left: 1rem;
          & .__btn {
            position: relative;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border: 1px solid var(--color01);
            border-radius: 50%;
            & .minus {
              width: 8px;
              height: 1px;
              background: var(--color01);
            }
            & .plus-horiz {
              width: 10px;
              height: 1px;
              background: var(--color01);
            }
            & .plus-vert {
              position: absolute;
              transform: rotate(90deg);
              width: 10px;
              height: 1px;
              background: var(--color01);
            }
          }
          & .__btn-disabled {
            opacity: .2;
          }
        }
      }
    }
  }
}

/* TRANSITIONS */
.filtrar-acomods-animation-enter, .filtrar-acomods-animation-leave-active {
  transform: translateY(100%);
}

</style>