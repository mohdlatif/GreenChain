import AOS from 'aos'

export function aosInit() {
  AOS.init({
    duration: 800,
    disable: 'phone',
    easing: 'ease-out-cubic',
    once: true,
    offset: 50,
  })
}
