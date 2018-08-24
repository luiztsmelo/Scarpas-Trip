export const swiperOptions = {
  computed: {
    swiperOptions () {
      if (this.$store.state.isMobile === true) {
        return {
          autoplay: {
            delay: 2300
          }
        }
      } else {
        return {
          slidesPerView: 2.28,
          spaceBetween: 7,
          freeMode: true,
          autoplay: {
            delay: 2300
          },
          speed: 18000
        }
      }
    }
  }
}
