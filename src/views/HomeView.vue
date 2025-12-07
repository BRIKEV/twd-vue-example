<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const increment = () => {
  count.value += 1
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50 text-gray-900">
    <div class="text-center space-y-8 max-w-2xl">
      <div class="space-y-4">
        <h1 class="text-6xl font-bold" data-testid="welcome-title">Welcome to TWD</h1>
        <p class="text-xl text-gray-600">
          Test Web Dev - A powerful testing framework for web applications
        </p>
      </div>

      <div class="space-y-4">
        <p class="text-lg text-gray-800">
          Get started by reading the
          <a
            href="https://brikev.github.io/twd/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-600 underline font-medium"
          >
            documentation
          </a>
          .
        </p>
      </div>

      <div class="flex flex-col items-center gap-4 pt-8">
        <button
          @click="increment"
          class="min-w-[200px] bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          data-testid="counter-button"
        >
          Count is {{ count }}
        </button>
        <p class="text-sm text-gray-600">Click the button to test TWD features</p>
      </div>
    </div>
  </div>
</template>
