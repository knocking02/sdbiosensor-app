export const numberOnly = {
   mounted(el, binding) {
      el.oninput = (e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))
   },
}

export default numberOnly
