<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <header class="border-b border-gray-200 bg-white/80 backdrop-blur sticky top-0 z-10">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div class="text-xl font-semibold">TWD Vue Example</div>
        <nav class="flex items-center gap-4 text-sm font-medium">
          <RouterLink class="hover:text-blue-600 transition" to="/">Home</RouterLink>
          <RouterLink class="hover:text-blue-600 transition" to="/about">About</RouterLink>
          <RouterLink class="hover:text-blue-600 transition" to="/todos">Todos</RouterLink>
        </nav>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-4 py-10">
      <RouterView />
    </main>
  </div>
</template>
