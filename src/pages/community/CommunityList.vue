<template>
  
</template>

<script lang="ts">

import {Component, Vue} from 'vue-property-decorator'
import CommunityRegister from '@/pages/community/CommunityRegister.vue'


@Component({
    name: 'CommunityList',
    components:{CommunityRegister}
})

export default class CommunityList extends Vue {

}
</script>

<style>

</style>