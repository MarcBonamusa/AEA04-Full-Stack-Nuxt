<script setup>
definePageMeta({
  middleware: ["auth"],
});

const toast = useToast();

const { data: jugadors, refresh } = await useFetch("/api/golejadors");

async function eliminarGolejador(id) {
  try {
    await $fetch(`/api/golejadors?id=${id}`, { method: 'DELETE' });
    toast.add({ title: 'Golejador eliminat', color: 'success' });
    refresh();
  } catch (error) {
    toast.add({ title: 'Error al eliminar', color: 'error' });
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 space-y-6">
    <UCard>
      <div class="flex gap-4">
        <UButton as-child>
          <NuxtLink to="/crear">Crear Golejador</NuxtLink>
        </UButton>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-xl font-bold">Els meus Golejadors</h2>
      </template>

      <div v-if="jugadors && jugadors.length > 0" class="space-y-4">
        <div v-for="jugador in jugadors" :key="jugador.id"
          class="flex justify-between items-center border-b pb-4 dark:border-gray-800">

          <div>
            <p class="font-bold text-lg">{{ jugador.name }}</p>
            <p class="text-gray-500">{{ jugador.team }} - {{ jugador.goals }} gols</p>
          </div>

          <div class="flex gap-2">
            <UButton as-child>
              <NuxtLink :to="`/modificar?id=${jugador.id}`">Modificar</NuxtLink>
            </UButton>

            <UButton icon="i-heroicons-trash" style="cursor: pointer; background-color: red;"
              @click="eliminarGolejador(jugador.id)" />
          </div>

        </div>
      </div>

      <div v-else class="text-center text-gray-500 py-6">
        No hi ha golejadors
      </div>
    </UCard>
  </div>
</template>