<template>
  <div class="termos">


    <div class="sidenav">

      <nuxt-link to="/termos">
        <h1 class="__item" :class="[ this.isTermos ? '__item-selected' : '' ]">Termos e condições de uso</h1>
      </nuxt-link>

      <nuxt-link to="/termos#politica_privacidade">
        <h1 class="__item" :class="[ this.isPrivacidade ? '__item-selected' : '' ]">Política de Privacidade</h1>
      </nuxt-link>

    </div>


    <div class="content">

      <div class="politica_privacidade" v-if="isTermos">

        <h1>Termos e condições de uso</h1>

        <p>Vigente a partir de 11 de fevereiro de 2019</p>



        <h2>1. Serviços prestados</h2>

        <p>O site www.escarpastrip.com (Escarpas Trip) é uma plataforma para anúncio e divulgação de acomodações para temporada, passeios turísticos, eventos e restaurantes na região de Capitólio/MG.</p>

        <p>A Escarpas Trip não é responsável e não administra nenhum dos imóveis, passeios, eventos e restaurantes anunciados neste site. Este site faz somente uma classificação e divulgação desses itens.</p>

        <p>Todo anúncio passa por um processo de verificação de informação, para atestar sua confiabilidade. Todas as informações contidas nos anúncios são de inteira responsabilidade do anunciante.</p>

        <p>A negociação da reserva de um imóvel, passeio, restaurante ou aquisição de ingressos para eventos é feita exclusivamente entre o responsável pelo anúncio e o hóspede/viajante. A Escarpas Trip não realiza qualquer espécie de intermediação em relação às reservas. A Escarpas Trip não se responsabiliza por eventuais falhas de comunicação entre as duas partes anteriormente citadas.</p>

        

        <h2>2. Pagamentos e cancelamentos</h2>

        <p>Para o proprietário ou guia turístico que deseje anunciar nesta plataforma, é cobrada uma mensalidade no valor de R$29,90 (os primeiros 30 dias são gratuitos para avaliação).</p>

        <p>O anunciante tem o direito de cancelar seu anúncio a qualquer momento. Caso efetue o cancelamento, seu anúncio continuará no banco de dados, porém ele não será mais exibido, e o pagamento recorrente da mensalidade de R$29,90 será cancelado.</p>



        <h2>3. Direitos de propriedade</h2>

        <p>Todo material presente neste site, como informações e imagens, tem seus direitos autorais protegidos, sendo proibida sua cópia, divulgação, e reprodução em qualquer meio que a Escarpas Trip não autorize previamente.</p>

      </div>


      <div class="politica_privacidade" v-if="isPrivacidade">

        <h1>Política de Privacidade</h1>

        <p>Vigente a partir de 11 de fevereiro de 2019</p>

        <p>Obrigado por utilizar a plataforma Escarpas Trip!</p>
        <p>Esta Política de Privacidade descreve como coletamos, usamos, processamos e divulgamos seus dados, incluindo informações pessoais, em conjunto com o seu acesso e uso da plataforma Escarpas Trip e dos Serviços de Pagamento.</p>
        <p>Quando esta Política de Privacidade menciona "Escarpas Trip", "nós", "nós" ou "nosso", refere-se à pessoa jurídica Escarpas Trip, cujo CNPJ é 32.673.211/0001-81. Os termos "usuários" ou "você", referem-se a turistas e viajantes que usam este site para procurarem imóveis, passeios, eventos e restaurantes, bem como a proprietários e anunciantes que listam propriedades para aluguel, passeios, eventos e restaurantes nesta plataforma.</p>



        <h2>1. Dados que coletamos</h2>



        <h2>2. Como usamos os dados</h2>



        <h2>3. Divulgação dos dados</h2>



        <h2>4. Segurança dos dados</h2>

        <p>Tomamos medidas técnicas razoáveis, como a encriptografia de dados, ​​para proteger contra o processamento não autorizado ou ilegal de seus dados pessoais e contra perda, destruição ou danos acidentais em seus dados pessoais. Embora nenhum sistema seja completamente seguro, acreditamos que as medidas implementadas pela Escarpas Trip reduzem nossa vulnerabilidade a problemas de segurança a um nível apropriado ao tipo de dados envolvidos. Temos medidas de segurança em vigor para proteger nosso banco de dados de usuários e o acesso a ele é restrito internamente. No entanto, continua a ser de sua responsabilidade:</p>
          <li>Proteger contra o acesso não autorizado ao seu uso do site;</li>
          <li>Garantir que ninguém mais use o site enquanto seu dispositivo estiver conectado ao site (incluindo o login em seu dispositivo por meio de uma conexão de acesso móvel, Wi-Fi ou compartilhada que você esteja usando);</li>
          <li>Fazer logoff ou sair do site quando não estiver utilizando;</li>
          <li>Manter sua senha ou outras informações de acesso secretas. Sua senha e seus detalhes de login são pessoais e não devem ser dados a ninguém ou usados ​​para fornecer acesso compartilhado, por exemplo, através de uma rede; e</li>
          <li>Manter uma boa segurança na Internet. Por exemplo, se sua conta de e-mail ou sua conta do Facebook estiver comprometida, isso poderá permitir o acesso à sua conta se você nos forneceu esses detalhes e/ou o acesso permitido por meio dessas contas. Se sua conta de e-mail estiver comprometida, ela poderá ser usada para solicitar uma redefinição de senha e acesso à sua conta conosco.</li>
        <p>Você deve manter todos os detalhes da sua conta seguros. Se você acredita que alguma de suas contas foi comprometida, altere as credenciais da sua conta conosco e, em especial, certifique-se de que nenhuma conta comprometida permita o acesso à sua conta conosco. Você também deve nos informar o mais rápido possível, para que possamos tentar ajudá-lo a manter sua conta segura e, se necessário, avisar a qualquer outra pessoa que possa ser afetada.</p>
        <p>Você deve manter todos os detalhes da sua conta seguros. Se você acredita que alguma de suas contas foi comprometida, altere as credenciais da sua conta conosco e, em especial, certifique-se de que nenhuma conta comprometida permita o acesso à sua conta conosco. Você também deve nos informar o mais rápido possível, para que possamos tentar ajudá-lo a manter sua conta segura e, se necessário, avisar a qualquer outra pessoa que possa ser afetada.</p>


        <h2>5. Contato</h2>

        <p>Se você tiver dúvidas ou reclamações sobre esta Política de Privacidade ou as práticas de tratamento de informações da Escarpas Trip, você poderá entrar em contato conosco em:</p>
        <p><strong>E-mail: </strong>contato@escarpastrip.com</p>
        <p><strong>WhatsApp: </strong>(37) 99932-5598</p>

      </div>

      
    </div>

    

  </div>
</template>

<script>

export default {
  head () {
    return {
      title: `${this.headTitle} ‒ Escarpas Trip`
    }
  },
  transition: 'opacity',
  computed: {
    headTitle () {
      return this.$route.fullPath === '/termos' ? 'Termos de Serviço'
           : this.$route.fullPath === '/termos#politica_privacidade' ? 'Política de Privacidade'
           : ''
    },
    isTermos () { return this.$route.fullPath === '/termos' },
    isPrivacidade () { return this.$route.fullPath === '/termos#politica_privacidade' }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.commit('m_showNavbar', true)
    })
  },
}
</script>

<style scoped>

.termos {
  margin-top: var(--navbarHeightMobile);
  display: flex;
  transition: var(--pages-transition);
  padding: 0 7%;
}

@media (min-width: 1024px) {
  .termos {
    margin: calc(var(--navbarHeightDesktop) + 3.5rem) 0 5rem;
    padding: 0 12%;
    & .sidenav {
      display: flex;
      flex-flow: column;
      flex: 15%;
      & .__item {
        padding: .5rem 0;
        font-size: 17px;
        line-height: 22px;
        transition: .15s ease color;
      }
      & .__item:hover {
        color: rgb(162, 162, 162);
      }
      & .__item-selected {
        font-weight: 700;
        color: var(--color01) !important;
      }
    }
    & .content {
      flex: 80%;
      padding-left: 1.5rem;
    }
  }
}

h1 {
  padding-bottom: .5rem;
  font-weight: 300;
  font-size: 40px;
}
h2 {
  padding-top: 2.3rem;
  font-size: 19px;
  font-weight: 600;
}
h3 {
  padding-top: 1.2rem;
  font-size: 15px;
  font-weight: 600;
}
p {
  padding-top: 1rem;
  font-size: 15px;
  line-height: 24px;
}
ul {

}
li {
  list-style-type: square;
  padding-top: 1rem;
  font-size: 15px;
  line-height: 24px;
}
strong {
  font-weight: 600;
}
</style>
