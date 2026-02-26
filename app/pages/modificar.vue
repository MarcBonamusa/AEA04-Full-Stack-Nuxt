<script setup>
import { z } from 'zod'

definePageMeta({
  middleware: ["auth"],
});

const toast = useToast();
const route = useRoute();
const id = route.query.id;

const schema = z.object({
  name: z.string().min(2, "El nom és obligatori"),
  team: z.string().min(2, "L'equip és obligatori"),
  goals: z.number().min(0, "Els gols no poden ser negatius")
});

const state = reactive({
  name: undefined,
  team: undefined,
  goals: 0
});

const { data: jugadors } = await useFetch('/api/golejadors');

onMounted(() => {
  if (id && jugadors.value) {
    const jugadorActual = jugadors.value.find(j => j.id === Number(id));
    if (jugadorActual) {
      state.name = jugadorActual.name;
      state.team = jugadorActual.team;
      state.goals = jugadorActual.goals;
    }
  }
});

async function onSubmit(event) {
  if (!id) {
    toast.add({ title: 'Falta l\'ID', description: 'Torna a l\'admin i selecciona un jugador.', color: 'red' });
    return;
  }

  try {
    await $fetch(`/api/golejadors?id=${id}`, {
      method: 'PUT',
      body: event.data
    });

    toast.add({ title: 'Modificat correctament!', color: 'green' });
    navigateTo('/admin');

  } catch (error) {
    toast.add({ title: 'Error al modificar', color: 'red' });
  }
}
</script>

<template>
  <div class="p-6">
    <UCard class="max-w-md mx-auto my-10">
      
      <template #header>
        <h1 class="text-2xl text-center font-bold">Modificar Golejador</h1>
      </template>

      <div v-if="!id" class="text-center py-6 text-orange-500 font-medium">
        Si us plau, selecciona un jugador des de la llista d'Administració per poder-lo modificar.
        <UButton as-child color="gray" variant="soft" class="mt-4 block mx-auto w-fit">
          <NuxtLink to="/admin">Tornar a l'Admin</NuxtLink>
        </UButton>
      </div>

      <UForm v-else :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        
        <UFormField label="Nom" name="name">
          <UInput v-model="state.name" class="w-full" />
        </UFormField>
        
        <UFormField label="Equip" name="team">
          <UInput v-model="state.team" class="w-full" />
        </UFormField>

        <UFormField label="Gols totals" name="goals">
          <UInput v-model.number="state.goals" type="number" class="w-full" />
        </UFormField>

        <div class="flex gap-4 mt-8">
          <UButton type="submit" color="primary" class="flex-1 justify-center">
            Actualitzar
          </UButton>
          
          <UButton as-child color="gray" variant="soft" class="flex-1 justify-center">
            <NuxtLink to="/admin">Cancel·lar</NuxtLink>
          </UButton>
        </div>

      </UForm>
    </UCard>
  </div>
</template>