<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Dashboard</RouterLink>
        <RouterLink to="/budget">Budget</RouterLink>
        <RouterLink to="/categories">Categories</RouterLink>
        <RouterLink to="/import">import</RouterLink>
      </nav>
    </div>
  </header>

  <div>
    <RouterView />
  </div>
</template>

<style>
@import 'assets/base.css';
</style>
