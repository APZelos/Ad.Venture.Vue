const types = [
  { id: 0, description: 'Casual', icon: 'fa-user' },
  { id: 1, description: 'Sportive', icon: 'fa-futbol-o' },
  { id: 2, description: 'Formal', icon: 'fa-gavel' }
]

export default {
  methods: {
    getType (id) {
      return types[id]
    }
  }
}
