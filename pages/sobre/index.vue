<template>
  <div class="sobre">

    <img src="../../assets/img/about.svg" alt="Sobre">

    <h1>Sobre a Escarpas Trip</h1>

    <p>Em 2018, a Escarpas Trip foi fundada com o objetivo de se tornar a maior referência turística de Capitólio e região. Oferecemos informações detalhadas e de qualidade acerca das acomodações da região, passeios turísticos, eventos, restaurantes e atrações. Nosso CNPJ é: 32.673.211/0001-81.</p>

    <h2>Informações para contato</h2>

    <p>WhatsApp: (37) 99932-5598</p>
    <p>E-mail: contato@escarpastrip.com</p>

  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Sobre a Escarpas Trip'
    }
  },
  transition: 'opacity'
}
</script>

<style scoped>

.sobre {
  margin-top: var(--navbarHeightMobile);
  display: flex;
  flex-flow: column;
  align-items: center;
  transition: var(--pages-transition);
  padding: 3rem 7% 6rem;
  & img {
    width: 5rem;
    height: auto;
  }
  & h1 {
    font-size: 28px;
    text-align: center;
    padding: 2rem 0 1.5rem;
  }
  & h2 {
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    padding: 2.5rem 0 1rem;
  }
  & p {
    text-align: center;
  }
}

@media (min-width: 1024px) {
  .sobre {
    margin-top: var(--navbarHeightDesktop);
    padding: 3rem 24%;
    & h1 {
      font-size: 32px;
    }
    & h2 {
      font-size: 21px;
    }
    & p {
    }
  }
}

</style>
