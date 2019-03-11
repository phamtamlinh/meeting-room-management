<template>
  <form @submit.prevent="onSubmit">
    <div class="event-form" :style="{ top: topPosition, left: leftPosition }">
    <!-- <div class="event-form" :style="{ top: '50px', left: '50px', width: '200px' }"> -->
      <div class="row">
        <span class="close u-pull-right" @click="$emit('form-closed')">X</span>
      </div>
      <div class="event-body">
        <div class="input-holder">
          <input type="text" placeholder="Event subject" v-model="event.subject"/>
        </div>
        <div class="input-holder">
          <date-pick
            :placeholder="'Start date'"
            :format="format"
            :parseDate="parseDate"
            :formatDate="formatDate"
            :pickTime="true"
            :inputAttributes="{readonly: true}"
            @input="changeEndDate"
            v-model="event.start"></date-pick>
        </div>
        <div class="input-holder">
          <date-pick
            :placeholder="'End date'"
            :format="format"
            :parseDate="parseDate"
            :formatDate="formatDate"
            :pickTime="true"
            :inputAttributes="{readonly: true}"
            v-model="event.end"></date-pick>
        </div>
        <div class="input-holder">
          <location-picker v-model="event.location" :booked-locations="bookedLocations" />
        </div>
        <div class="input-holder">
          <textarea placeholder="Event description" rows="4" v-model="event.data.description" ></textarea>
        </div>
        <div class="input-holder">
          <button type="submit">Schedule</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import LocationPicker from '@/components/LocationPicker'
import DatePick from 'vue-date-pick'
import moment from 'moment'

export default {
  name: 'EventForm',
  props: {
    storeKey: String,
    coordinates: Array,
    startDate: Date,
    sameDayEvents: Array
  },
  data () {
    return {
      format: 'YYYY-MM-DD HH:mm',
      event: {
        title: null,
        subject: null,
        location: null,
        start: null,
        end: null,
        data: {
          description: null
        }
      }
    }
  },
  components: {
    LocationPicker,
    DatePick
  },
  computed: {
    topPosition () {
      return this.coordinates[0] + 'px'
    },
    leftPosition () {
      return this.coordinates[1] + 'px'
    },
    bookedLocations () {
      let arr = this.sameDayEvents.filter(e => !((moment(this.event.start).isSameOrBefore(e.start) && moment(this.event.end).isSameOrBefore(e.start)) || (moment(this.event.start).isSameOrAfter(e.end) && moment(this.event.end).isSameOrAfter(e.end)))).map(l => l.location)
      return arr
    }
  },
  watch: {
    startDate: function (newDate, oldDate) {
      this.event.start = moment(newDate).format(this.format)
      this.event.end = moment(newDate).add(1, 'hour').format(this.format)
    }
  },
  methods: {
    changeEndDate () {
      this.event.end = moment(this.event.start).add(1, 'hour').format(this.format)
    },
    parseDate (dateString, format) {
      return moment(dateString, format).toDate()
    },
    formatDate (dateObj, format) {
      return moment(dateObj).format(format)
    },
    onSubmit () {
      let startTime = this.formatDate(this.parseDate(this.event.start, this.format), 'HH:mm')
      this.event.title = this.event.subject + ' ' + startTime
      let meeting = JSON.parse(localStorage.getItem(this.storeKey))
      if (meeting) {
        meeting.push(this.event)
      } else {
        meeting = [ this.event ]
      }
      let json = JSON.stringify(meeting)
      localStorage.setItem(this.storeKey, json)
      this.$emit('my-event', this.event)
      this.$emit('form-closed')
      this.resetValues()
    },
    resetValues () {
      this.event = {
        title: null,
        subject: null,
        start: this.event.start,
        end: this.event.end,
        location: null,
        data: {
          description: null
        }
      }
    }
  }
}
</script>
