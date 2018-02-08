<template>
  <div class="profile">

    <div class="user-box">
      <div class="welcome">
        <h1 class="__username">Olá, {{ firstName }}</h1>
        <h3 class="__edit">Editar perfil</h3>
      </div>
      <img class="__img" :src="user.photoURL" alt="">
    </div>
    
    <h1 class="__title">Roteiros</h1>
    <h1 class="__title">Anúncios</h1>
    

  </div>
</template>

<script>
export default {
  head () {
    return {
      title: this.user.username + ' ‒ ' + 'Escarpas Trip',
    }
  }, 
  computed: {
    user () {
      return this.$store.state.user
    },
    firstName () {
      let fullName = this.user.username.split(' ')
      let firstName = fullName[0]
      return firstName
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
  & .user-box {
    display: flex;
    align-items: center;
    padding: 2rem 7%;
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
    padding: 1rem 7%;
    font-size: 24px;
  }
}

</style>