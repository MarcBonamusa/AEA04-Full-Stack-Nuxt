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
    toast.add({ title: 'Falta l ID', description: 'Selecciona un jugador.', color: 'error' });
    return;
  }

  try {
    await $fetch(`/api/golejadors?id=${id}`, {
      method: 'PUT',
      body: event.data
    });

    toast.add({ title: 'Modificat correctament', color: 'success' });
    navigateTo('/admin');

  } catch (error) {
    toast.add({ title: 'Error al modificar', color: 'error' });
  }
}
</script>

<template>
  <div class="p-6">
    <UCard class="max-w-md mx-auto my-10">

      <template #header>
        <h1 class="text-2xl text-center font-bold">Modificar Golejador</h1>
      </template>

      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">

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
          <UButton type="submit" class="flex-1 justify-center">
            Guardar
          </UButton>

          <UButton as-child class="flex-1 justify-center">
            <NuxtLink to="/admin" style="background-color: red;">Cancel·lar</NuxtLink>
          </UButton>
        </div>

      </UForm>
    </UCard>
  </div>
</template>