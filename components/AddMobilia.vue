<template>
  <modal
    name="add-mobilia-modal"
    class="add-mobilia-modal"
    :width="$store.state.isMobile === true ? '100%' : '32%'"
    :height="$store.state.isMobile === true ? '100%' : '90%'">


    <div class="add-mobilia-body">


      <img v-if="$store.state.isMobile" src="../assets/img/close-mobile.svg" class="close-btn" @click="$modal.hide('add-mobilia-modal')">
      <img v-else src="../assets/img/close-modal.svg" class="close-btn" @click="$modal.hide('add-mobilia-modal')">
      

      <h1 class="__title">Selecione uma mobília</h1>
      

      <div class="mobilia" v-for="(mobilia, index) in mobilias" :key="mobilia.id" @click="addMobilia(mobilia)">
        <div class="desc">
          <img :src="mobilia.imgPath">
          <p style="user-select: none">{{ mobilia.nome }}</p>
        </div>
        <button>Adicionar</button>
      </div>


    </div>


  </modal>
</template>

<script>

export default {
  data() {
    return {
      mobilias: [
        { nome: 'Cama solteiro', imgPath: require('@/assets/img/cama_solteiro.svg'), id: 'cama_solteiro'},
        { nome: 'Cama casal', imgPath: require('@/assets/img/cama_casal.svg'), id: 'cama_casal'},
        { nome: 'Cama queen', imgPath: require('@/assets/img/cama_casal.svg'), id: 'cama_queen'},
        { nome: 'Cama king', imgPath: require('@/assets/img/cama_casal.svg'), id: 'cama_king'},
        { nome: 'Bicama', imgPath: require('@/assets/img/bicama.svg'), id: 'bicama'},
        { nome: 'Sofá', imgPath: require('@/assets/img/sofa.svg'), id: 'sofa'}
        
      ]
    }
  },
  methods: {
    addMobilia (mobilia) {
      this.$store.commit('m_addMobilia', mobilia)
      this.$modal.hide('add-mobilia-modal')
    }
  },
  computed: {
  }
}
</script>

<style scoped>

.add-mobilia-modal {
  z-index: 10000;
  
  & .add-mobilia-body {
    position: relative;
    display: flex;
    flex-flow: column;
    height: 100%;
    padding: 3rem 7%;
    overflow: auto;
    & .close-btn {
      cursor: pointer;
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 1rem;
      height: auto;
    }
    & .__title {
      font-size: 29px;
      font-weight: 700;
      padding-bottom: 1.4rem;
    }
    & .mobilia {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      border-bottom: 1px solid #dedede;
      padding: 2.6rem 0;
      & .desc {
        display: flex;
        align-items: center;
        & img {
          width: 1.55rem;
          height: auto;
          margin-right: 1rem;
        }
      }
      & button {
        background: white;
        color: var(--colorAcomod);
        font-weight: 600;
      }
    }
    & .mobilia:last-child {
      border-bottom: none
    }
  }
}

@media (max-width: 425px) {
  .v--modal {
    border-radius: 0 !important;
  }
}

@media (min-width: 1024px) {
  .add-mobilia-modal {
    & .add-mobilia-body {
      padding: 2.5rem;
      & .close-btn {
        cursor: pointer;
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 1rem;
        height: auto;
      }
      & .__title {
        font-size: 32px;
      }
      & .mobilia {
        padding: 2.5rem 0;
        & .desc {
          & img {
            width: 1.5rem;
            margin-right: 1rem;
          }
        }
        & button {
        }
      }
      & .mobilia:hover {
        border-bottom: 1px solid #161616;
      }
      & .mobilia:hover > button {
        text-decoration: underline;
      }
    }
  }
}
</style>