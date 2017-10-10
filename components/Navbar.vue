<template>
  <div class="navbar">
    <div class="navbar-body">

      <nuxt-link to="/" class="__brand-name">Escarpas Trip</nuxt-link>

      <nav class="nav">
        <div class="__menu">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
      </nav>

    </div>
  </div>
</template>

<script>
export default {
 
}
</script>

<style scoped>
@import url('../assets/css/main.css');

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  height: 3.5rem;
  width:  100%;
  background: rgb(0, 10, 23);
  transition: all .3s ease;
  padding: 0 6%;
  & .navbar-body {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    & .__brand-name {
      font-family: var(--brand-font);
      font-size: 29px;
      line-height: 0;
      user-select: none;
      font-weight: 400;
      color: white;
      transition: all ease .3s;
    }
    & .nav {
      display: flex;
      align-items: center;
      & .__menu {
        margin: .7rem 0 .7rem .7rem; /* Aumentar área de contato ao pressionar */
        display: inline-block;
        cursor: pointer;
        -webkit-tap-highlight-color: rgba(255, 255, 45, 0);
        & .bar {
          transition: all .3s ease;
          width: 23px;
          height: 2px;
          background-color: white;
          margin: 5px 0;
        }
      }
    }
  }
  
}

/* TRANSITIONS */

/* .fadeBrandSidebar {
  transform: translateY(-3.1rem) scale(.5);
} */

.menuIconAnime1 {
  transform: rotate(-45deg) translate(-4px, 4px);
}
.menuIconAnime2 {
  opacity: 0;
  transform: scale(0);
}
.menuIconAnime3 {
  transform: rotate(45deg) translate(-4px, -4px);
}
</style>