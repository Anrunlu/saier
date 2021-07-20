<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminClassroom from './admin'
import editorClassroom from './editor'

export default {
  name: 'Dashboard',
  components: { adminClassroom, editorClassroom },
  data() {
    return {
      currentRole: 'adminClassroom'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (this.roles.includes('editor')) {
      this.currentRole = 'editorClassroom'
    } else if (this.roles.includes('tea')) {
      this.currentRole = 'adminClassroom'
    }
  }
}
</script>
