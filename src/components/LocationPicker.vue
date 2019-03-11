<template>
  <div>
    <input :placeholder="'Meeting room'" type="text" list="locations" :value="value" @input="$emit('input', $event.target.value)" />
    <datalist id="locations">
      <option
        v-for="(location, index) of locations"
        :value="index"
        :key="location.id"
        :disabled="!location.isAvailable"
      />
    </datalist>
  </div>
</template>

<script>
export default {
  name: 'location-picker',
  data () {
    return {
      locations: {
        'Marina Bay Sands': { id: 1, isAvailable: true },
        'London Bridge': { id: 2, isAvailable: true },
        'Burj Khalifa': { id: 3, isAvailable: true },
        'Golden Gate Bridge': { id: 4, isAvailable: true },
        'Las Ramblas': { id: 5, isAvailable: true },
        'Miami Beach': { id: 6, isAvailable: true },
        'Mount Kenya': { id: 7, isAvailable: true },
        'Laguna de Guatape': { id: 8, isAvailable: true },
        'Executive Meeting Room': { id: 9, isAvailable: true }
      }
    }
  },
  watch: {
    bookedLocations: function (newLocations, oldLocations) {
      if (newLocations) {
        newLocations.forEach((loc) => {
          this.locations[loc].isAvailable = false
        })
      }
    }
  },
  props: ['value', 'bookedLocations']
}
</script>
