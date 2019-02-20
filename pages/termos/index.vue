<template>
  <div class="termos">


    <div class="sidenav">

      <nuxt-link to="/termos">
        <h1 class="__item" :class="[ this.isTermos ? '__item-selected' : '' ]">Termos de Serviço</h1>
      </nuxt-link>

      <nuxt-link to="/termos#politica_privacidade">
        <h1 class="__item" :class="[ this.isPrivacidade ? '__item-selected' : '' ]">Política de Privacidade</h1>
      </nuxt-link>

    </div>


    <div class="content">

      <div class="politica_privacidade" v-if="isTermos">

        <h1>Termos de Serviço</h1>

        <p>Vigente a partir de 19 de Fevereiro de 2019</p>




        <!-- ________________________________________ 1 - SERVIÇOS PRESTADOS ________________________________________ -->
        <h2>1. Serviços prestados</h2>

        <h3>1.1. Sobre a Escarpas Trip</h3>

        <p>O site denominado Escarpas Trip (Domínio: www.escarpastrip.com, CNPJ: 32.673.211/0001-81) é uma plataforma para anúncio e divulgação de acomodações para temporada, passeios turísticos, eventos e restaurantes no município de Capitólio/MG. A Escarpas Trip não é responsável e não administra nenhum dos imóveis, passeios, eventos e restaurantes anunciados neste site. Este site faz somente uma classificação e divulgação desses itens.</p>


        <h3>1.2. Verificação da confiabilidade dos anúncios</h3>

        <p>Todo anúncio passa por um processo de verificação de informação para atestar sua confiabilidade.</p>

        <h4>1.2.1. Acomodações</h4>

        <p>Para cada imóvel anunciado será feita uma visita no local, juntamente com o proprietário ou cuidador responsável, para analisarmos se todas as informações prestadas estão de acordo com o anunciado. Também pediremos um comprovante de endereço, como uma conta de luz ou água, por exemplo.</p>

        <h4>1.2.2. Passeios</h4>

        <p>Quanto aos passeios turísticos anunciados, serão verificadas as documentações referentes que autorizem legalmente o anunciante a prestar o serviço de guia turístico no município de Capitólio/MG e no Parque Nacional da Serra da Canastra.</p>

        <h4>1.2.3. Eventos</h4>

        <p>Para cada evento anunciado, será verificado com a Prefeitura de Capitólio se ela autorizou a realização de tal evento na cidade.</p>

        <h4>1.2.4. Restaurantes</h4>

        <p>Para cada restaurante anunciado será feita uma visita no local, para analisarmos se todas as informações prestadas estão de acordo com o anunciado.</p>

        <p>Caso encontremos alguma irregularidade, será retirada a exibição do anúncio da plataforma até que todas as mudanças necessárias sejam realizadas.</p>


        <h3>1.3. Reservas</h3>

        <p>As negociações referentes às reservas de um imóvel para temporada, passeio turístico, restaurante ou aquisição de ingressos para eventos é feita exclusivamente entre o responsável pelo anúncio e o hóspede/viajante. A Escarpas Trip não realiza qualquer espécie de intermediação em relação às reservas. A Escarpas Trip não se responsabiliza por eventuais falhas de comunicação entre as duas partes anteriormente citadas.</p>


        

        <!-- ________________________________________ 2 - PAGAMENTOS E CANCELAMENTOS ________________________________________ -->
        <h2>2. Pagamentos e cancelamentos</h2>

        <h3>2.1. Pagamento</h3>

        <p>Para a pessoa que deseje anunciar nesta plataforma, será realizada uma cobrança recorrente no valor de R$29,90. O período de cobrança iniciará no momento da publicação do anúncio nesta plataforma, e renovará automaticamente de 30 em 30 dias. Os primeiros 30 dias serão gratuitos, para o anunciante testar esta plataforma. A Escarpas Trip poderá, de tempos em tempos, alterar o valor da mensalidade, sendo certo que comunicará antecipadamente qualquer alteração de preço para o anunciante. Alterações de preço surtirão efeitos no início do próximo período de cobrança, após a data da alteração do preço. Se o anunciante não concordar com uma alteração de preço, ele terá o direito de rejeitar a alteração por meio do cancelamento de seu anúncio antes que a alteração de preço entre em efeito.</p>

        <h3>2.2. Cancelamento</h3>

        <p>O anunciante tem o direito de cancelar seu anúncio a qualquer momento entrando em contato pelo e-mail: contato@escarpastrip.com ou WhatsApp: (37) 99932-5598. Caso efetue o pedido de cancelamento dentro dos 30 dias gratuitos de avaliação, não será realizada cobrança alguma nos períodos futuros. Já se o pedido de cancelamento for feito dentro de um período de cobrança, somente serão canceladas as cobranças dos períodos futuros. A Escarpas Trip não irá reembolsar os valores já pagos dos períodos anteriores e do atual. O cancelamento será processado em no máximo 48 horas após o pedido. Caso haja a efetuação do cancelamento, o anúncio continuará no banco de dados, porém ele não mais será exibido na plataforma.</p>




        <!-- ________________________________________ 3 - DIREITOS DE PROPRIEDADE ________________________________________ -->
        <h2>3. Direitos de propriedade</h2>

        <p>Todo material presente neste site, como textos e imagens, tem seus direitos autorais protegidos, sendo proibida sua cópia, divulgação, e reprodução em qualquer meio que a Escarpas Trip não autorize previamente.</p>


      </div>


      <div class="politica_privacidade" v-if="isPrivacidade">

        <h1>Política de Privacidade</h1>

        <p>Vigente a partir de 11 de Fevereiro de 2019</p>

        <p>Obrigado por utilizar a plataforma Escarpas Trip!</p>

        <p>Esta Política de Privacidade descreve como coletamos, usamos, processamos e divulgamos seus dados, incluindo informações pessoais, em conjunto com o seu acesso e uso da plataforma Escarpas Trip.</p>

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
  flex-flow: column;
  transition: var(--pages-transition);
  padding: 0;
  & .sidenav {
    display: flex;
    flex-flow: column;
    padding: 1.2rem 7%;
    margin-bottom: 1.2rem;
    background: var(--color01);
    & .__item {
      padding: .5rem 0;
      font-size: 17px;
      line-height: 22px;
      transition: .15s ease color;
      color: rgb(172,172,172);
    }
    & .__item:hover {
      color: rgb(162, 162, 162);
    }
    & .__item-selected {
      font-weight: 700;
      color: #fff !important;
    }
  }
  & .content {
    padding: 0 7%;
    margin-bottom: 6rem;
    & h1 {
      padding-bottom: .5rem;
      font-weight: 300;
      font-size: 40px;
    }
    & h2 {
      padding-top: 2.3rem;
      font-size: 24px;
      font-weight: 700;
    }
    & h3 {
      padding-top: 1.2rem;
      font-size: 18px;
      font-weight: 600;
    }
    & h4 {
      padding-top: 1.2rem;
      font-size: 16px;
      font-weight: 500;
    }
    & p {
      padding-top: 1rem;
    }
    & ul {

    }
    & li {
      list-style-type: square;
      padding-top: 1rem;
      font-size: 15px;
      line-height: 24px;
    }
    & strong {
      font-weight: 600;
    }
  }
}


@media (min-width: 1024px) {
  .termos {
    margin: calc(var(--navbarHeightDesktop) + 3.5rem) 0 5rem;
    padding: 0 12%;
    display: flex;
    flex-flow: row;
    & .sidenav {
      display: flex;
      flex-flow: column;
      flex: 15%;
      background: #fff;
      padding: 0;
      margin-bottom: 0;
      & .__item {
        padding: .5rem 0;
        font-size: 17px;
        line-height: 22px;
        transition: .15s ease color;
        font-weight: 400;
        color: var(--color01);
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
      padding: 0 0 0 1.5rem;
      margin-bottom: 0;
    }
  }
}
  
</style>
