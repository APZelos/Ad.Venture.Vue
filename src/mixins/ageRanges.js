const ageRanges = [
  { id: 0, description: '1-12', icon: 'fa-child' },
  { id: 1, description: '13-40', icon: 'fa-male' },
  { id: 2, description: '41-100', icon: 'fa-blind' }
]

export default {
  methods: {
    getAgeRange (id) {
      return ageRanges[id]
    }
  }
}
