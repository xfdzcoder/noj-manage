<template>

</template>

<script setup>
import { definePage } from 'unplugin-vue-router/runtime'

defineOptions({
  name: 'CommunityPost'
})
definePage({
  meta: {
    title: '帖子管理',
    name: 'CommunityPost',
    sort: 2
  }
})
</script>

<style scoped>

</style>
