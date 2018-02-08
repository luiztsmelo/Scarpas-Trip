<template>
  <div class="profile" v-if="user.email !== null">

    <div class="user-box">
      <div class="welcome">
        <h1 class="__username">Olá, {{ firstName }}</h1>
        <h3 class="__edit">Editar perfil</h3>
      </div>
      <img class="__img" :src="user.photoURL">
    </div>
    
    <h1 class="__title">Anúncios</h1>

    <div class="anuncios-box">

      <div class="acomod-card" v-for="acomod in acomods">
        <img class="__card-img" :src="image1H(acomod)">
        <h3 class="__card-title">{{ acomod.title }}</h3>
      </div>

    </div>

    <h1 class="__title">Roteiros</h1>
    
    

  </div>
</template>

<script>
import supportsWebP from 'supports-webp'

export default {
  head () {
    return {
      title: this.user.username + ' ‒ ' + 'Escarpas Trip',
    }
  },
  methods: {
    image1H (acomod) {
      if (supportsWebP) {
        return acomod.imageH1W
      } else {
        return acomod.imageH1J
      }
    },
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    firstName () {
      let fullName = this.user.username.split(' ')
      let firstName = fullName[0]
      return firstName
    },
    acomods () {
      let acomods = this.$store.state.acomods
      let acomodsValues = Object.values(acomods)
      let findAcomod = acomodsValues.filter(acomod => acomod.email === this.user.email)
      return findAcomod
    }
  }
}
</script>

<style>
@import url('../assets/css/main.css');

.profile {
  margin-top: 4.2rem;
  display: flex;
  flex-flow: column;

  /* ******* USER BOX ******* */
  & .user-box {
    display: flex;
    align-items: center;
    padding: 2rem 7% 1rem 7%;
    justify-content: space-between;
    & .welcome {
      display: flex;
      flex-flow: column;
      & .__username {
        font-size: 27px;
      }
      & .__edit {
        color: #00BAAC;
      }
    }
    & .__img {
      border-radius: 50%;
      width: 3.7rem;
      height: auto;
    }
  }

  & .__title {
    padding: 2rem 7% 1rem 7%;
    font-size: 24px;
  }

  /* ******* ANÚNCIOS BOX ******* */
  & .anuncios-box {
    padding: 0 7%;
    & .acomod-card {
      display: inline-flex;
      align-items: center;
      margin: .5rem 0;
      & .__card-img {
        width: auto;
        height: 4rem;
        border-radius: 2px;
      }
      & .__card-title {
        padding-left: 1rem;
        line-height: 21px;
      }
    }
  }
}

</style>