<template>
  <div class="atracoes">
    <h1 class="__title">Em breve.</h1>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Atrações em Capitólio ‒ Escarpas Trip'
    }
  },
  transition: 'opacity'
}
</script>

<style>

.atracoes {
  margin-top: var(--navbarHeightMobile);
  display: flex;
  flex-flow: column;
  padding: 4rem 7%;
  transition: var(--pages-transition);
  & .__title {
    font-size: 27px;
    text-align: center;
  }
}

@media (min-width: 1024px) {
  .atracoes {
    margin-top: var(--navbarHeightDesktop);
    & .__title {
      padding: 0 24%;
      font-size: 35px;
    }
  }
}

</style>
