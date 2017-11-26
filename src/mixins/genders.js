const genders = [
  { id: 0, description: 'Male', icon: 'fa-mars' },
  { id: 1, description: 'Female', icon: 'fa-venus' },
  { id: 2, description: 'Unisex', icon: 'fa-venus-mars' }
]

export default {
  methods: {
    getGender (id) {
      return genders[id]
    }
  }
}
