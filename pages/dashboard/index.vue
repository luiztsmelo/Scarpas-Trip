<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
  </div>
</template>

<script>

export default {
  head () {
    return {
      title: 'Dashboard ‒ Escarpas Trip'
    }
  },
  transition: 'opacity'
}
</script>

<style scoped>

.dashboard {
  margin-top: 7rem;
  display: flex;
  transition: var(--main-transition);
  padding: 0 7%;
}
</style>
