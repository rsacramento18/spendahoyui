<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
</script>

<template>
  <header>
    <div class="logo">
      <h1>Spendahoy</h1>
    </div>
    <div class="menu">
      <nav>
        <RouterLink to="/">{{ $t('router.dashboard') }}</RouterLink>
        <RouterLink to="/budget">{{ $t('router.budget') }}</RouterLink>
        <RouterLink to="/categories">{{ $t('router.categories') }}</RouterLink>
        <RouterLink to="/import">{{ $t('router.import') }}</RouterLink>
      </nav>
    </div>
  </header>

  <div class="router-view">
    <RouterView />
  </div>
</template>

<style>
@import 'assets/base.css';
</style>
