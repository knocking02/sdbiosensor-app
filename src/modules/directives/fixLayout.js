export const fixLayout = {
   mounted(el, binding) {
      const value = binding.value
      const top = value ? value.top : 0
      const bottom = value ? value.bottom : 0
      el.style.position = 'fixed'
      el.style.width = '100%'
      el.style.top = `${top}px`
      el.style.bottom = `${bottom}px`
      el.style.height = 'auto'
      el.style.overflow = 'auto'
   },
}

export default fixLayout
