<template>
  <div class="login">

    <img src="../../assets/img/login.svg" class="__img-header">
    <h1 class="__title">Continuar com sua conta:</h1>

    <div class="signin-btns">
      <button type="button" class="facebook-btn" @click="facebookSignIn()">Facebook</button>
      <button type="button" class="google-btn" @click="googleSignIn()">Google</button>
    </div>

  </div>
</template>

<script>
export default {
  transition: 'opacity'
}
</script>

<style>
@import url('../../assets/css/main.css');

.login {
  margin-top: 3.2rem;
  display: flex;
  flex-flow: column;
  align-items: center;
  transition: var(--main-transition);
  & .__img-header {
    margin: 2rem 0;
    width: 6rem;
    height: auto;
  }
  & .__title {
    font-size: 26px;
    font-weight: 700;
    padding: 0 7%;
    text-align: center;
  }
  & .signin-btns {
    display: flex;
    padding: 2rem 7%;
    width: 100%;
  }
}
</style>