<template>
  <transition name="filtrar-acomods-animation">
    <div class="filtrar-acomods-modal" v-if="$store.state.showFiltrarAcomods">
      <div class="filtrar-acomods-body">

        <img src="../assets/img/close-mobile.svg" style="cursor:pointer;position:absolute;top:1.2rem;left:7%;width:1.1rem;height:auto" @click="closeBtn">

        <button class="limpar-btn" @click="$store.commit('m_resetFilters')">Limpar</button>


        <h1 class="__title">Filtrar por:</h1>


        <div class="filter-box">
          <h2 class="__filter-title">Tipo de acomodação</h2>

          <div class="select">
            <div class="option" v-for="(tipoAcomod, index) in tiposAcomods" :key="tipoAcomod.name" @click="$store.state.filters.tipoAcomod = tipoAcomod.name">
              
              <h3 class="__text" >{{ tipoAcomod.name }}</h3>

              <div class="radio"><div :class="[ $store.state.filters.tipoAcomod === tipoAcomod.name ? 'radio-checkmark' : '' ]"></div></div>

            </div>
          </div>

        </div>


        <div class="filter-box" >
          <h2 class="__filter-title">Preço por noite</h2>
        </div>
        

        <button class="__filtrar-btn">Filtrar</button>

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
        { 'name': 'Pousada' },
        { 'name': 'Camping' },
        { 'name': 'Sítio' },
        { 'name': 'Fazenda' },
        { 'name': 'Hostel' }
      ]
    }
  },
  methods: {
    closeBtn () {
      this.$store.commit('m_showFiltrarAcomods', false)
      window.history.back(1)
    }
  },
  computed: {
    hash () { return this.$route.hash }
  }, 
  watch: {
    hash (value) {
      if (value === '') {
        this.$store.commit('m_showFiltrarAcomods', false)
      }
    }
  }
}
</script>

<style scoped>
@import url('~/assets/css/main.css');
@import url('~/assets/css/radio-mobile.css');

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
    padding: 4.8rem 7%;
    & .limpar-btn {
      position: absolute;
      top: 1.2rem;
      right: 7%;
      padding: 0;
      background: white;
      font-size: 15px;
      font-weight: 600;
    }
    & .__title {
      line-height: 35px;
      font-size: 29px;
      padding-bottom: 1.5rem;
    }
    & .__filtrar-btn {
      position: fixed;
      left: 7%;
      bottom: 1rem;
      height: 3.1rem;
      width: 86%;
      background: var(--colorAcomod);
      color: white;
      font-weight: 700;
      border-radius: 5px;
    }
    & .filter-box {
      padding: 1rem 0;
      border-bottom: 1px solid #dedede;
      & .__filter-title {
        font-size: 18px;
        font-weight: 600;
        padding-bottom: .6rem;
      }
      & .select {
        & .option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: .9rem 0;
          & .__text {
            font-size: 17px;
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