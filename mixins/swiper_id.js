export const swiperOptions = {
  computed: {
    swiperOptions () {
      if (this.$store.state.isMobile === true) {
        return {
          autoplay: {
            delay: 2500
          }
        }
      } else {
        return {
          slidesPerView: 2.28,
          spaceBetween: 5,
          freeMode: true,
          autoplay: {
            delay: 3000
          },
          speed: 20000
        }
      }
    }
  }
}
