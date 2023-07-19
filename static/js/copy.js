function copy(parent, id) {
  navigator.clipboard.writeText(`${location.origin + location.pathname}${id ? '#' + id : ''}`)
    .then(() => {
      parent.innerText = '✅'
      setTimeout(() => {
        parent.innerText = '🔗'
      }, 1500)
    })
    .catch(() => {
      parent.innerText = '❌'
    })
}