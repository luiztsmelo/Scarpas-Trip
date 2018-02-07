<template>
  <div class="profile">
    <h1>{{ user.username }}</h1>
    <h1>{{ user.username }}</h1>
    <h1>{{ user.username }}</h1>
    <h1>{{ user.username }}</h1>
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
    }
  }
}
</script>

<style>

</style>