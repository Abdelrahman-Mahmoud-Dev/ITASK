<template>
    <!-- story container -->
    <v-sheet rounded="xl" height="90px">
    <stories-list />
    </v-sheet>
</template>

<script>
import StoriesList from '@/components/stories/StoriesList'

export default {
  components: {
    StoriesList
  }
}
</script>
