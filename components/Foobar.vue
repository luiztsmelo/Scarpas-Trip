<template>
  <transition name="foobar-animation">  
    <div class="foobar" v-if="showFoobar">
      <div class="foobar-body">



        <nuxt-link to="/acomodacoes">

          <div class="foobar-box" @click="$store.state.foobar1=true, $store.state.foobar2=false, $store.state.foobar3=false, $store.state.foobar4=false">

            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" class="__img"><g><g><g><polygon points="256,152.96 79.894,288.469 79.894,470.018 221.401,470.018 221.401,336.973 296.576,336.973 296.576,470.018     432.107,470.018 432.107,288.469   " data-original="#000000" class="active-path" data-old_color="#501818" :fill="$store.state.foobar1 ? '#FF7E65' : '#161616'"/></g></g><g><g><polygon points="439.482,183.132 439.482,90.307 365.316,90.307 365.316,126.077 256,41.982 0,238.919 35.339,284.855     256,115.062 476.662,284.856 512,238.92   " data-original="#000000" class="active-path" data-old_color="#501818" :fill="$store.state.foobar1 ? '#FFA04F' : '#161616'"/></g></g></g></svg>

            <h2 class="__foobar-title" :style="`color: ${$store.state.foobar1 ? '#FF7E65' : '#161616'}`">Acomodações</h2>

          </div>

        </nuxt-link>



        <nuxt-link to="/passeios">

          <div class="foobar-box" @click="$store.state.foobar1=false, $store.state.foobar2=true, $store.state.foobar3=false, $store.state.foobar4=false">

            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" class="__img"><g><g><g><polygon points="0,401.034 45.579,507.133 454.741,507.133 500.32,401.034   " data-original="#000000" class="active-path" data-old_color="#560A0A" :fill="$store.state.foobar2 ? '#198CFE' : '#161616'"/></g></g><g><g><path d="M287.148,4.867v348.472H512C512,353.338,512.973,205.384,287.148,4.867z" data-original="#000000" class="active-path" data-old_color="#560A0A" :fill="$store.state.foobar2 ? '#198CFE' : '#161616'"/></g></g><g><g><path d="M4.605,353.429h224.851V96.455C229.456,96.455,138.931,244.41,4.605,353.429z" data-original="#000000" class="active-path" data-old_color="#560A0A" :fill="$store.state.foobar2 ? '#198CFE' : '#161616'"/></g></g></g></svg>

            <h2 class="__foobar-title" :style="`color: ${$store.state.foobar2 ? '#198CFE' : '#161616'}`">Passeios</h2>

          </div>

        </nuxt-link>



        <nuxt-link to="/eventos">

          <div class="foobar-box" @click="$store.state.foobar1=false, $store.state.foobar2=false, $store.state.foobar3=true, $store.state.foobar4=false">

            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 203.118 203.118" style="enable-background:new 0 0 203.118 203.118;" xml:space="preserve" class="__img"><g><path d="M201.572,15.411L187.627,1.464c-1.823-1.823-4.732-1.96-6.72-0.32L157.931,20.12c-1.086,0.898-1.743,2.211-1.81,3.618  c-0.067,1.407,0.462,2.776,1.459,3.773l0.964,0.964l-55.744,55.744l-6.689-6.689c-3.932-3.933-9.165-6.099-14.734-6.099  c-5.109,0-9.989,1.88-13.743,5.295c-0.438,0.398-0.868,0.809-1.293,1.233c-2.641,2.642-4.866,5.646-6.614,8.929  c-2.271,4.268-6.495,6.979-11.297,7.253c-13.375,0.765-25.691,6.459-34.68,16.035c-19.356,20.622-17.987,54.623,3.052,75.794  c10.829,10.898,25.614,17.148,40.565,17.148c0.002,0,0.002,0,0.003,0c13.992,0,27.013-5.314,36.662-14.962  c8.861-8.861,14.141-20.784,14.867-33.57c0.274-4.845,2.852-8.989,6.894-11.087c3.856-1.999,7.317-4.638,10.288-7.842  c0.005-0.006,0.122-0.132,0.127-0.139c7.485-8.154,7.177-20.714-0.702-28.593l-6.687-6.687l55.744-55.744l0.962,0.962  c0.94,0.941,2.212,1.465,3.535,1.465c0.079,0,0.159-0.002,0.238-0.006c1.407-0.066,2.72-0.724,3.617-1.811l18.976-22.976  C203.533,20.142,203.395,17.233,201.572,15.411z M91.436,127.605c0,4.275-1.664,8.294-4.688,11.317  c-3.023,3.022-7.042,4.688-11.317,4.688c-4.275,0-8.294-1.665-11.317-4.688c-3.023-3.023-4.688-7.041-4.688-11.316  c0-4.274,1.665-8.294,4.688-11.316c3.023-3.023,7.042-4.688,11.317-4.688c4.275,0,8.294,1.664,11.317,4.687  C89.771,119.311,91.436,123.331,91.436,127.605z M62.985,176.992c-0.977,0.977-2.256,1.465-3.536,1.465  c-1.28,0-2.559-0.488-3.536-1.465l-29.869-29.869c-1.953-1.952-1.953-5.118,0-7.07c1.953-1.953,5.118-1.953,7.071,0l29.869,29.869  C64.937,171.874,64.937,175.04,62.985,176.992z" data-original="#000000" class="active-path" data-old_color="#481A1A" :fill="$store.state.foobar3 ? '#FF7E65' : '#161616'"/></g></svg>

            <h2 class="__foobar-title" :style="`color: ${$store.state.foobar3 ? '#FF7E65' : '#161616'}`">Eventos</h2>

          </div>

        </nuxt-link>



        <nuxt-link to="/restaurantes">

          <div class="foobar-box" @click="$store.state.foobar1=false, $store.state.foobar2=false, $store.state.foobar3=false, $store.state.foobar4=true">

            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 489.773 489.773" style="enable-background:new 0 0 489.773 489.773;" xml:space="preserve" class="__img"><g><g id="XMLID_95_"><path id="XMLID_98_" d="M155.183,305.646c-2.081,0.175-4.157,0.265-6.238,0.265c-5.693,0-11.23-0.826-16.652-2.081L6.834,429.293   c-6.158,6.149-6.158,16.137,0,22.287l32.47,32.478c6.158,6.15,16.135,6.15,22.276,0l150.785-150.757l-27.944-30.15L155.183,305.646   z" data-original="#000000" class="active-path" data-old_color="#AE2020" :fill="$store.state.foobar4 ? '#722F37' : '#161616'"/><path id="XMLID_97_" d="M485.345,104.649c-5.888-5.885-15.417-5.885-21.304,0l-81.303,81.301c-7.693,7.685-20.154,7.685-27.847,0   c-7.659-7.679-7.659-20.13,0-27.807l80.901-80.884c6.112-6.118,6.112-16.036,0-22.168c-6.141-6.11-16.055-6.11-22.167,0   l-80.868,80.876c-7.693,7.693-20.14,7.693-27.833,0c-7.677-7.676-7.677-20.136,0-27.806l81.286-81.293   c5.904-5.894,5.904-15.441,0-21.343c-5.888-5.895-15.434-5.895-21.338,0l-91.458,91.463   c-21.989,22.003-28.935,52.888-21.816,80.991l61.31,61.314c28.101,7.093,59.001,0.144,80.965-21.841l91.471-91.458   C491.249,120.1,491.249,110.543,485.345,104.649z" data-original="#000000" class="active-path" data-old_color="#AE2020" :fill="$store.state.foobar4 ? '#722F37' : '#161616'"/><path id="XMLID_96_" d="M41.093,13.791c-3.134-3.135-7.372-4.854-11.724-4.854c-0.926,0-1.857,0.079-2.766,0.231   c-5.295,0.896-9.838,4.295-12.172,9.133c-26.79,55.373-15.594,121.631,27.894,165.121l77.801,77.791   c7.676,7.685,18.055,11.939,28.819,11.939c1.151,0,2.305-0.048,3.456-0.143l45.171-3.855l196.971,212.489   c3.058,3.303,7.342,5.221,11.855,5.31c0.093,0,0.19,0,0.288,0c4.412,0,8.636-1.743,11.771-4.855l33.734-33.741   c3.117-3.11,4.859-7.331,4.859-11.73c0-4.398-1.742-8.622-4.846-11.732L41.093,13.791z" data-original="#000000" class="active-path" data-old_color="#AE2020" :fill="$store.state.foobar4 ? '#722F37' : '#161616'"/></g></g></svg>

            <h2 class="__foobar-title" :style="`color: ${$store.state.foobar4 ? '#722F37' : '#161616'}`">Restaurantes</h2>

          </div>

        </nuxt-link>
        


      </div>
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    showFoobar () {
      return this.$store.state.showFoobar
    }
  }
}
</script>

<style>

.foobar {
  position: fixed;
  z-index: 9997;
  bottom: 0;
  left: 0;
  height: 3.7rem;
  width: 100%;
  background: white;
  transition: var(--main-transition);
  border-top: 1px solid #dedede;
  & .foobar-body {
    padding: 0 .7rem;
    height: 100%;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-around;
    align-items: center;
    & a {
      height: 100%;
      width: 45%;
    }
    & .foobar-box {
      margin-top: 4px;
      height: 100%;
      display: flex;
      flex-flow: column;
      text-align: center;
      justify-content: center;
      align-items: center;
      & .__img {
        margin-bottom: 6px;
        width: 1.34rem !important;
        height: auto !important;
      }
      & .__foobar-title {
        font-size: 10px;
        font-weight: 500;
        color: var(--color01);
      }
    }
  }
}

@media (min-width: 1024px) {
  .foobar {
    display: none;
  }
}

/* TRANSITIONS */
.foobar-animation-enter,
.foobar-animation-leave-active {
  transform: translateY(100%);
}
</style>