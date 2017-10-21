<template>
  <div class="passeios">
    <h1>Passeios</h1>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Passeios ‒ Escarpas Trip'
    }
  },
  transition: 'slide-left'
}
</script>

<style scope>
@import url('../../assets/css/main.css');

.passeios {
  margin-top: 3.5rem;
  display: flex;
  flex-flow: column;
  padding: 3rem 7%;
  transition: all .222s ease;
}
</style>
