export const swiperOptions = {
  computed: {
    swiperOptions () {
      if (this.$store.state.isMobile === true) {
        return {
          autoplay: 2300
        }
      } else {
        return {
          slidesPerView: 2.28,
          spaceBetween: 7,
          freeMode: true,
          autoplay: 2300,
          speed: 18000
        }
      }
    }
  }
}
