<script setup>
definePageMeta({
  middleware: ["auth"],
});

const { data } = useFetch("/api/admin", {
  lazy: true,
});
</script>

<template>
  <div>
    <UCard>
      <UButton as-child>
        <NuxtLink to="/crear">Crear Golejador</NuxtLink>
      </UButton>
      <UButton as-child>
        <NuxtLink to="/modificar">Modificar Golejador</NuxtLink>
      </UButton>
    </UCard>
  </div>
  <div v-if="data">
    {{ data.sensitive }}
  </div>
</template>
