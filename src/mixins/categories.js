const categories = [
  { id: 0, description: 'Tshirt' },
  { id: 1, description: 'Shirt' },
  { id: 2, description: 'Trousers' },
  { id: 3, description: 'Hat' },
  { id: 4, description: 'Shoes' },
  { id: 5, description: 'Dress' }
]

export default {
  methods: {
    getCategory (id) {
      return categories[id]
    }
  }
}
