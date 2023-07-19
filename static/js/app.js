import { createApp } from './petite-vue.js'

createApp({
  $delimiters: ['{{{', '}}}'],
  menuVisible: false,
  randomNumber: null,
  loading: false,
  async getRandomNumber() {
    this.loading = true
    const response = await fetch('/docs/interactivity/api/random').then(r => r.json())
    this.loading = false
    this.randomNumber = response.randomNumber
  },
}).mount()