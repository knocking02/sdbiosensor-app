export const numberEngOnly = {
   mounted(el, binding) {
      el.oninput = (e) => (e.target.value = e.target.value.replace(/[^A-Za-z0-9]/g, ''))
   },
}

export default numberEngOnly
