import supportsWebP from 'supports-webp'

export const pontosTuristicos = {
  data () {
    return {
      canyons_JPG: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fcanyons.jpg?alt=media&token=f05cf631-bf3c-43a2-a5f5-403ff8536b2d',
      canyons_WEBP: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fcanyons.webp?alt=media&token=6151ed27-83bd-4f0c-82aa-6476056bfda3',
      miranteCanyons_JPG: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fmirante-canyons.jpg?alt=media&token=5b1fe659-0870-4337-b369-568ede9455b2',
      miranteCanyons_WEBP: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fmirante-canyons.webp?alt=media&token=369446f5-ccca-4b4d-aadf-601307303932',
      morroChapeu_JPG: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fmorro-chapeu.jpg?alt=media&token=4f831f6e-2efe-47d6-b702-a25e7636070a',
      morroChapeu_WEBP: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fmorro-chapeu.webp?alt=media&token=0f4b7d41-1772-455c-bc39-ff05f9f8d406',
      cachoeiraFilo_JPG: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fcachoeira-filo.jpg?alt=media&token=12378003-c543-443e-a812-a395e4f08d25',
      cachoeiraFilo_WEBP: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fcachoeira-filo.webp?alt=media&token=8ae7961b-4c65-4ee8-9c50-c57192c569a8',
      cachoeiraFecho_JPG: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fcachoeira-fecho.jpg?alt=media&token=d018d147-1e65-493a-8b98-808db5caeee8',
      cachoeiraFecho_WEBP: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/pontos-turisticos%2Fcachoeira-fecho.webp?alt=media&token=93ba1f9d-587e-42ae-9109-acacf7d941b6'
    }
  },
  computed: {
    canyons () { return supportsWebP ? this.canyons_WEBP : this.canyons_JPG },
    miranteCanyons () { return supportsWebP ? this.miranteCanyons_WEBP : this.miranteCanyons_JPG },
    morroChapeu () { return supportsWebP ? this.morroChapeu_WEBP : this.morroChapeu_JPG },
    cachoeiraFilo () { return supportsWebP ? this.cachoeiraFilo_WEBP : this.cachoeiraFilo_JPG },
    cachoeiraFecho () { return supportsWebP ? this.cachoeiraFecho_WEBP : this.cachoeiraFecho_JPG }
  }
}
