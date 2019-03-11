<template>
  <div class="container home">
    <Calendar />
  </div>
</template>

<script>
// @ is an alias to /src
import Calendar from '@/components/Calendar.vue'

export default {
  name: 'home',
  components: {
    Calendar
  }
}
</script>
