<script setup lang="ts">
import SidebarComp from './SidebarComp.vue'
import HeaderComp from './HeaderComp.vue'
</script>

<template>
  <div class="flex h-screen w-screen bg-gray-200 font-roboto">
    <SidebarComp />

    <div class="flex-1 flex flex-col overflow-hidden">
      <HeaderComp />

      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="container mx-auto px-6 py-8">
          <slot />
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>
