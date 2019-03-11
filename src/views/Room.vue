<template>
  <div class="container room">
    <table>
      <thead>
        <tr>
          <th
            v-for="(room, index) of locations"
            :key="index">{{ room }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            v-for="(events, index) of eventsByRooms"
            :key="index">
            <ul
              v-for="(eventDetails, id) of events"
              :key="id"
            >
              <li>{{ eventDetails.subject }}</li>
              <li>{{ eventDetails.start }}</li>
              <li>{{ eventDetails.end }}</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'Room',
  data () {
    return {
      eventsByRooms: [],
      locations: [ 'Marina Bay Sands', 'London Bridge', 'Burj Khalifa', 'Golden Gate Bridge', 'Las Ramblas', 'Miami Beach', 'Mount Kenya', 'Laguna de Guatape', 'Executive Meeting Room' ]
    }
  },
  methods: {
    loadEventsByRoom () {
      let savedEvents = JSON.parse(localStorage.getItem('events'))
      if (savedEvents) {
        this.locations.forEach((loc) => {
          this.eventsByRooms.push(savedEvents.filter(event => event.location === loc))
        })
      }
    }
  },
  created () {
    this.loadEventsByRoom()
  }
}
</script>
