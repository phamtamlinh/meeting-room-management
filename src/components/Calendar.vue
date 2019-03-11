<template>
  <div class="calendar">
    <vue-calendar
      @show-all="showAll"
      @event-clicked="eventClicked"
      @month-changed="monthChanged"
      :events="events"
      :display-show-more-count="true"
    ></vue-calendar>
    <event-form
      :store-key="storeKey"
      v-show="isFormVisible"
      @form-closed="formClosed"
      @my-event="handleEvent"
      :coordinates="coordinates"
      :start-date="startDate"
      :same-day-events="sameDayEvents"
    ></event-form>
  </div>
</template>

<script>
import EventForm from '@/components/EventForm.vue'
import moment from 'moment'

export default {
  name: 'Calendar',
  components: {
    EventForm
  },
  data () {
    return {
      events: [],
      storeKey: 'events',
      isFormVisible: false,
      coordinates: [],
      startDate: null,
      defaultEvents: [
        {
          title: 'Weekly Meeting 14:00',
          subject: 'Weekly Meeting',
          start: '2019-03-01 14:00',
          end: '2019-03-01 15:00',
          location: 'Marina Bay Sands'
        },
        {
          title: 'Weekly Meeting 14:00',
          subject: 'Weekly Meeting',
          start: '2019-03-08 14:00',
          end: '2019-03-08 15:00',
          location: 'Marina Bay Sands'
        },
        {
          title: 'Weekly Meeting 14:00',
          subject: 'Weekly Meeting',
          start: '2019-03-15 14:00',
          end: '2019-03-15 15:00',
          location: 'Marina Bay Sands'
        },
        {
          title: 'Weekly Meeting 14:00',
          subject: 'Weekly Meeting',
          start: '2019-03-22 14:00',
          end: '2019-03-22 15:00',
          location: 'Marina Bay Sands'
        },
        {
          title: 'Weekly Meeting 14:00',
          subject: 'Weekly Meeting',
          start: '2019-03-29 14:00',
          end: '2019-03-29 15:00',
          location: 'Marina Bay Sands'
        }
      ]
    }
  },
  created () {
    this.loadEvents()
    this.$calendar.eventBus.$on('show-all', events => this.showAll(events))
    this.$calendar.eventBus.$on('day-clicked', day => this.dayClicked(day, event))
  },
  computed: {
    sameDayEvents () {
      if (this.startDate) {
        let nextDay = moment(this.startDate).add(1, 'day')
        if (this.events) {
          return this.events.filter(e => (moment(e.start).isSameOrAfter(this.startDate) && moment(e.end).isBefore(nextDay)))
        }
      }
      return []
    }
  },
  methods: {
    handleEvent (payLoad) {
      this.events.push(payLoad)
    },
    formClosed (form) {
      this.isFormVisible = false
    },
    showAll (events) {
      // Do something
    },
    dayClicked (day, e) {
      this.isFormVisible = true
      this.coordinates = [e.clientY, e.clientX]
      this.startDate = day.date
    },
    eventClicked (event) {
      // Do something...
    },
    monthChanged (start, end) {
      // Do something...
    },
    loadEvents () {
      let savedEvents = JSON.parse(localStorage.getItem(this.storeKey))
      if (savedEvents) {
        this.events = savedEvents
      } else {
        let json = JSON.stringify(this.defaultEvents)
        localStorage.setItem(this.storeKey, json)
        this.events = this.defaultEvents
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
