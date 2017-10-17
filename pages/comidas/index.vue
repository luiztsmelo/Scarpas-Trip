<template>
  <div class="comidas">
    <h1>Comidas</h1>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Comidas ‒ Escarpas Trip'
    }
  },
  transition: 'slide-left'
}
</script>

<style scope>
@import url('../../assets/css/main.css');

.comidas {
  margin-top: 3.5rem;
  display: flex;
  flex-flow: column;
  padding: 7%;
  transition: all ease .25s;
}
</style>
