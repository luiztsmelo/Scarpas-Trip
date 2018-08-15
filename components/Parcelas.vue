<template>
  <transition name="parcelas">

    <div class="parcelas-modal" v-if="$store.state.showParcelas">

      <div class="parcelas-body">

        <img class="back-btn" src="../assets/img/back.svg" @click="backBtn">

        <h1 class="__title">Deseja pagar em quantas parcelas?</h1>


        <div class="parcela" v-for="(parcela, index) in $store.state.creditCard.parcelas" :key="parcela.id" @click="$refs.radioRef[parcela.id-1].click()" @change="backBtn">

          <div style="display: flex; align-items: center">
            <span class="__numero">{{ `${parcela.id}x` }}</span>

            <div>
              <h3 class="__valor">{{ `R$${parcela.valorParcela.toLocaleString('pt-BR', {minimumFractionDigits: 2})}` }}</h3>
              <span class="__juros">Sem juros</span>
            </div>
          </div>

          <input ref="radioRef" class="radio" type="radio" :value="parcela.id.toString()" v-model="$store.state.reservaAcomod.parcelas">

        </div>

      </div>

    </div>

  </transition>
</template>

<script>
export default {
  methods: {
    backBtn () {
      this.$store.commit('m_showParcelas', false)
      window.history.back(1)
    }
  }
}
</script>

<style>
@import url('~/assets/css/main.css');
@import url('~/assets/css/radio.css');

.parcelas-modal {
  position: fixed;
  z-index: 9999999;
  overflow-y: auto;
  width:  100%;
  height: 100%;
  top: 0;
  left: 0;
  background: white;
  transition: var(--main-transition);
  & .parcelas-body {
    display: flex;
    flex-flow: column;
    height: 100%;
    & .back-btn {
      margin: 1rem 7%;
      cursor: pointer;
      width: 1.27rem;
      height: auto;
    }
    & .__title {
      padding: 0 7% 1.9rem;
      line-height: 35px;
      font-size: 29px;
      font-weight: 700;
      user-select: none;
    }
    & .parcela {
      margin: 0 7%;
      padding: 3rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgb(222,222,222);
      & .__numero {
        width: 2.5rem;
        font-size: 17px;
        font-weight: 400;
      }
      & .__valor {
        font-size: 18px;
        font-weight: 600;
      }
      & .__juros {
        font-size: 14px;
      }
    }
  }
}

/* TRANSITIONS */
.parcelas-enter, .parcelas-leave-active {
  transform: translateY(100%);
}
</style>