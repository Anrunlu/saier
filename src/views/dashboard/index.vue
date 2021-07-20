<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import teaDashboard from './tea'
import stuDashboard from './stu'
import adminDashboard from './admin'
import otherDashboard from './other'

export default {
  name: 'Dashboard',
  components: { teaDashboard, stuDashboard ,adminDashboard,otherDashboard},
  data() {
    return {
      currentRole: 'teaDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() { 
    if (this.roles.includes('stu')) {
      this.currentRole = 'stuDashboard'
    } else if (this.roles.includes('tea')) {
      this.currentRole = 'teaDashboard'
    }
	else if (this.roles.includes('admin')) {
	  this.currentRole = 'adminDashboard'
	}
	else if (this.roles.includes('other')) {
	  this.currentRole = 'otherDashboard'
	}
  }
}
</script>
