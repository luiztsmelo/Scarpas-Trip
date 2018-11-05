import supportsWebP from 'supports-webp'

export const pontosTuristicos = {
  data () {
    return {
      pontos: [
        'Canyons de Furnas',
        'Mirante dos Canyons',
        'Cachoeira do Filó',
        'Morro do Chapéu',
        'Cachoeira Cascatinha',
        'Vale dos Tucanos',
        'Porto Escarpas',
        'Cachoeira Lagoa Azul',
        'Kanto da Ilha',
        'Cascata Eco Parque',
        'Cachoeira Fecho da Serra',
        'Cachoeira dos Vikings',
        'Cachoeira da Capivara',
        'Cachoeira do Lobo',
        `Cachoeira Casca D'Anta`,
        'Pedreira Lagoa Azul',
        'Cachoeira Coca-cola',
        'Cachoeira Dicadinha'
      ],
      canyons_JPG: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fcanyons.jpg?alt=media&token=43a23418-4caf-417f-8ccf-bcdfd87f285a',
      canyons_WEBP: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fcanyons.webp?alt=media&token=da6667f2-c506-4053-8241-4af63e2915b3',
      miranteCanyons_JPG: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fmirante-canyons.jpg?alt=media&token=17d32952-ab5d-4192-9ef3-3707b6ca1787',
      miranteCanyons_WEBP: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fmirante-canyons.webp?alt=media&token=a6bfc4a8-01cb-4153-8e19-fae2a59169a8',
      morroChapeu_JPG: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fmorro-chapeu.jpg?alt=media&token=1a7d9806-7ad9-4eaa-8cb9-e353b1081a77',
      morroChapeu_WEBP: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fmorro-chapeu.webp?alt=media&token=e8007552-6850-4f82-803e-f92d371c2335',
      cachoeiraFilo_JPG: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fcachoeira-filo.jpg?alt=media&token=c53755f5-a696-4188-9520-5347a3e69356',
      cachoeiraFilo_WEBP: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fcachoeira-filo.webp?alt=media&token=fb7a96fb-aea0-4f14-8455-939d930ca765',
      cachoeiraFecho_JPG: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fcachoeira-fecho.jpg?alt=media&token=38bec546-421d-4075-af30-b91ac0803bce',
      cachoeiraFecho_WEBP: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fcachoeira-fecho.webp?alt=media&token=477776ec-3fea-4d58-a169-16a3a055c436',
      cachoeiraCascatinha_JPG: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fcachoeira-cascatinha.jpg?alt=media&token=7d6df087-97dd-449b-b711-798dfd3afb96',
      cachoeiraCascatinha_WEBP: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fcachoeira-cascatinha.webp?alt=media&token=a9f88187-82e8-42f7-88f1-50bc4912ea39',
      valeTucanos_JPG: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fvale-tucanos.jpg?alt=media&token=cfce28dc-30a3-4aea-a58e-a39085e41033',
      valeTucanos_WEBP: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fvale-tucanos.webp?alt=media&token=7ea7fb99-eade-490d-a0da-461d86f046a1',
      portoEscarpas_JPG: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fporto-escarpas.jpg?alt=media&token=241eaff2-588b-416c-94f4-877b6847185b',
      portoEscarpas_WEBP: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fporto-escarpas.webp?alt=media&token=6449d412-a480-47a6-aa9e-36b10ec29d2f',
      cachoeiraLagoaAzul_JPG: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fcachoeira-lagoa-azul.jpg?alt=media&token=671db17c-f457-4c2f-83a9-de2d9d952ab2',
      cachoeiraLagoaAzul_WEBP: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fcachoeira-lagoa-azul.webp?alt=media&token=62874555-7a24-4479-aada-9d2719faa584',
      kantoDaIlha_JPG: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fkanto-da-ilha.jpg?alt=media&token=d4156cd9-b761-400f-b903-18f94ed2bb3a',
      kantoDaIlha_WEBP: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fkanto-da-ilha.webp?alt=media&token=822c5c92-8cca-444e-bc67-5fcce19441a2',
      cascataEcoParque_JPG: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fcascata-eco-parque.jpg?alt=media&token=9bde3bf2-da45-4232-9bba-f86f8c516451',
      cascataEcoParque_WEBP: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fcascata-eco-parque.webp?alt=media&token=b2c63791-2a1d-4efd-b66f-a61a0be44830',
      cachoeiraVikings_JPG: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fcachoeira-vikings.jpg?alt=media&token=b92efa63-18f4-4b9e-81cb-3c5f1c905876',
      cachoeiraVikings_WEBP: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fcachoeira-vikings.webp?alt=media&token=a2682046-f1d2-4ff1-a5bc-c66880a3e51f',
      cachoeiraCapivara_JPG: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fcachoeira-capivara.jpg?alt=media&token=1c4aab07-4a67-43c1-9dff-55d0cab14d11',
      cachoeiraCapivara_WEBP: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fcachoeira-capivara.webp?alt=media&token=d79c3bbc-ce0f-44a1-aa03-67ea2c6b8a17',
      cachoeiraLobo_JPG: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fcachoeira-lobo.jpg?alt=media&token=ce31374f-67b1-448f-af8b-57cecb8e71a2',
      cachoeiraLobo_WEBP: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fcachoeira-lobo.webp?alt=media&token=b28ad76b-6c95-494c-be1e-9fdc6ba9dc70',
      cachoeiraCascaDanta_JPG: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fcachoeira-casca-danta.jpg?alt=media&token=e66f5e1c-d78b-4f98-b177-8a8dcf192a7f',
      cachoeiraCascaDanta_WEBP: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fcachoeira-casca-danta.webp?alt=media&token=330ef396-2878-42fc-b7f8-bbdb79b33aac',
      pedreiraLagoaAzul_JPG: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fpedreira-lagoa-azul.jpg?alt=media&token=3ef51501-6e20-4e5b-871d-5e74114d7c5e',
      pedreiraLagoaAzul_WEBP: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fpedreira-lagoa-azul.webp?alt=media&token=8a378f47-7438-4e88-ae22-4c51808c78a0',
      cachoeiraColacola_JPG: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fcachoeira-coca-cola.jpg?alt=media&token=6dacb7c5-d782-4475-81f9-1d941a50d9e6',
      cachoeiraColacola_WEBP: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fcachoeira-coca-cola.webp?alt=media&token=796e700d-3932-47d6-868b-70cf97f2b0f0',
      cachoeiraDicadinha_JPG: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fcachoeira-dicadinha.jpg?alt=media&token=ce4eccbd-b615-4e1b-b1ff-7fd2064ee675',
      cachoeiraDicadinha_WEBP: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fcachoeira-dicadinha.webp?alt=media&token=253db927-ba1e-4168-ae74-ad1c63841398'
    }
  },
  methods: {
    pontoImgSrc (ponto) {
      return ponto === 'Canyons de Furnas' ? this.canyons
           : ponto === 'Mirante dos Canyons' ? this.miranteCanyons
           : ponto === 'Morro do Chapéu' ? this.morroChapeu
           : ponto === 'Cachoeira do Filó' ? this.cachoeiraFilo
           : ponto === 'Cachoeira Fecho da Serra' ? this.cachoeiraFecho
           : ponto === 'Cachoeira Cascatinha' ? this.cachoeiraCascatinha
           : ponto === 'Vale dos Tucanos' ? this.valeTucanos
           : ponto === 'Porto Escarpas' ? this.portoEscarpas
           : ponto === 'Cachoeira Lagoa Azul' ? this.cachoeiraLagoaAzul
           : ponto === 'Kanto da Ilha' ? this.kantoDaIlha
           : ponto === 'Cascata Eco Parque' ? this.cascataEcoParque
           : ponto === 'Cachoeira dos Vikings' ? this.cachoeiraVikings
           : ponto === 'Cachoeira da Capivara' ? this.cachoeiraCapivara
           : ponto === 'Cachoeira do Lobo' ? this.cachoeiraLobo
           : ponto === `Cachoeira Casca D'Anta` ? this.cachoeiraCascaDanta
           : ponto === 'Pedreira Lagoa Azul' ? this.pedreiraLagoaAzul
           : ponto === 'Cachoeira Coca-cola' ? this.cachoeiraColacola
           : ponto === 'Cachoeira Dicadinha' ? this.cachoeiraDicadinha
           : ''
    }
  },
  computed: {
    canyons () { return supportsWebP ? this.canyons_WEBP : this.canyons_JPG },
    miranteCanyons () { return supportsWebP ? this.miranteCanyons_WEBP : this.miranteCanyons_JPG },
    morroChapeu () { return supportsWebP ? this.morroChapeu_WEBP : this.morroChapeu_JPG },
    cachoeiraFilo () { return supportsWebP ? this.cachoeiraFilo_WEBP : this.cachoeiraFilo_JPG },
    cachoeiraFecho () { return supportsWebP ? this.cachoeiraFecho_WEBP : this.cachoeiraFecho_JPG },
    cachoeiraCascatinha () { return supportsWebP ? this.cachoeiraCascatinha_WEBP : this.cachoeiraCascatinha_JPG },
    valeTucanos () { return supportsWebP ? this.valeTucanos_WEBP : this.valeTucanos_JPG },
    portoEscarpas () { return supportsWebP ? this.portoEscarpas_WEBP : this.portoEscarpas_JPG },
    cachoeiraLagoaAzul () { return supportsWebP ? this.cachoeiraLagoaAzul_WEBP : this.cachoeiraLagoaAzul_JPG },
    kantoDaIlha () { return supportsWebP ? this.kantoDaIlha_WEBP : this.kantoDaIlha_JPG },
    cascataEcoParque () { return supportsWebP ? this.cascataEcoParque_WEBP : this.cascataEcoParque_JPG },
    cachoeiraVikings () { return supportsWebP ? this.cachoeiraVikings_WEBP : this.cachoeiraVikings_JPG },
    cachoeiraCapivara () { return supportsWebP ? this.cachoeiraCapivara_WEBP : this.cachoeiraCapivara_JPG },
    cachoeiraLobo () { return supportsWebP ? this.cachoeiraLobo_WEBP : this.cachoeiraLobo_JPG },
    cachoeiraCascaDanta () { return supportsWebP ? this.cachoeiraCascaDanta_WEBP : this.cachoeiraCascaDanta_JPG },
    pedreiraLagoaAzul () { return supportsWebP ? this.pedreiraLagoaAzul_WEBP : this.pedreiraLagoaAzul_JPG },
    cachoeiraColacola () { return supportsWebP ? this.cachoeiraColacola_WEBP : this.cachoeiraColacola_JPG },
    cachoeiraDicadinha () { return supportsWebP ? this.cachoeiraDicadinha_WEBP : this.cachoeiraDicadinha_JPG }
  }
}
