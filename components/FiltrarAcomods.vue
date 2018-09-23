<template>
  <transition name="filtrar-acomods-animation">
    <div class="filtrar-acomods-modal" v-show="$store.state.showFiltrarAcomods">
      <div class="filtrar-acomods-body">


        <div class="topbar">
          <img src="../assets/img/close-mobile.svg" class="close-btn" @click="closeBtn">
          <button class="limpar-btn" @click="$store.commit('m_resetFilters')">Limpar</button>
        </div>
        


        <h1 class="__title">Filtrar por:</h1>



        <div class="filter-box">
          <h2 class="__filter-title">Datas</h2>
        </div>




        <div class="filter-box">
          <h2 class="__filter-title">Tipo de acomodação</h2>

          <select v-model="$store.state.filters.tipoAcomod" :class="[ $store.state.filters.tipoAcomod !== null ? 'select-active' : '' ]" >
            <option :value="null" selected>Qualquer</option>
            <option>Casa</option>
            <option>Apartamento</option>
            <option>Rancho</option>
            <option>Chácara</option>
            <option>Pousada</option>
            <option>Camping</option>
            <option>Sítio</option>
            <option>Fazenda</option>
            <option>Hostel</option>
          </select>

        </div>




        <div class="filter-box">
          <h2 class="__filter-title">Preço por noite</h2>
        </div>
        



        <div class="filter-btn">
          <button 
            class="__btn"
            :class="[ $store.state.filters.date !== null || $store.state.filters.hospedes > 0 || $store.state.filters.tipoAcomod !== null || $store.state.filters.preco !== null || $store.state.filters.avaliacao !== null ? '__btn-active' : '' ]" 
            @click="$store.state.showFiltrarAcomods = false">
          Filtrar
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
        font-size: 15px;
        font-weight: 600;
      }
    }
    & .__title {
      line-height: 35px;
      font-size: 29px;
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
        background: #dedede;
        color: white;
        font-weight: 700;
        border-radius: 5px;
        transition: var(--main-transition);
      }
      & .__btn-active {
        background: var(--colorAcomod);
      }
    }
    & .filter-box {
      padding: 1.5rem 0;
      & .__filter-title {
        font-size: 17px;
        font-weight: 600;
        padding-bottom: .4rem;
      }
      & select {
        width: 100%;
        font-size: 18px;
        font-weight: 400;
        background: white;
        color: var(--color01);
        padding: 1rem 0;
        border: none;
        border-bottom: 1px solid #dedede;
        outline: none;
        & option {
          color: var(--color01);
        }
      }
      & .select-active {
        font-weight: 500;
        color: var(--colorAcomod);
      }
    }
  }
}

/* TRANSITIONS */
.filtrar-acomods-animation-enter, .filtrar-acomods-animation-leave-active {
  transform: translateY(100%);
}

</style>