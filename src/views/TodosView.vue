<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchTodos, createTodo, deleteTodo, type Todo } from '../api/todos'

const todos = ref<Todo[]>([])
const isLoading = ref(false)

const newTodo = ref({
  title: '',
  description: '',
  date: '',
})

onMounted(async () => {
  await loadTodos()
})

const loadTodos = async () => {
  isLoading.value = true
  try {
    todos.value = await fetchTodos()
  } catch (error) {
    console.error('Failed to load todos:', error)
  } finally {
    isLoading.value = false
  }
}

const handleCreateTodo = async () => {
  if (!newTodo.value.title || !newTodo.value.description || !newTodo.value.date) {
    return
  }

  try {
    await createTodo({
      title: newTodo.value.title,
      description: newTodo.value.description,
      date: newTodo.value.date,
    })
    newTodo.value = {
      title: '',
      description: '',
      date: '',
    }
    await loadTodos()
  } catch (error) {
    console.error('Failed to create todo:', error)
  }
}

const handleDeleteTodo = async (id: string) => {
  try {
    await deleteTodo(id)
    await loadTodos()
  } catch (error) {
    console.error('Failed to delete todo:', error)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">My Todos</h1>

      <!-- Create Todo Form -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Create a New Todo</h2>
        <form @submit.prevent="handleCreateTodo" class="space-y-4">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              v-model="newTodo.title"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Enter todo title"
            />
          </div>

          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              v-model="newTodo.description"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Enter todo description"
              rows="3"
            ></textarea>
          </div>

          <div>
            <label for="date" class="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              id="date"
              v-model="newTodo.date"
              type="date"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Create Todo
          </button>
        </form>
      </div>

      <!-- Todo List -->
      <div class="space-y-4">
        <h2 class="text-xl font-semibold text-gray-900">Todo Items</h2>

        <div v-if="isLoading" class="text-center text-gray-500">
          Loading todos...
        </div>

        <div v-else-if="todos.length === 0" class="bg-white rounded-lg shadow-md p-6 text-center">
          <p class="text-gray-500">No todos yet. Create one above!</p>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="todo in todos"
            :key="todo.id"
            class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200"
          >
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-lg font-semibold text-gray-900">{{ todo.title }}</h3>
              <button
                @click="handleDeleteTodo(todo.id)"
                class="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded transition duration-200"
              >
                Delete
              </button>
            </div>
            <p class="text-gray-600 mb-3">{{ todo.description }}</p>
            <p class="text-sm text-gray-500">Date: {{ todo.date }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
