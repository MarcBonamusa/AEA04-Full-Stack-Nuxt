<script setup>
import { z } from 'zod'

definePageMeta({
  middleware: ["auth"],
});

const toast = useToast();

const schema = z.object({
  name: z.string().min(2, "El nom és obligatori (mínim 2 caràcters)"),
  team: z.string().min(2, "L'equip és obligatori"),
  goals: z.number().min(0, "Els gols no poden ser negatius")
});

const state = reactive({
  name: undefined,
  team: undefined,
  goals: 0
});

async function onSubmit(event) {
  try {
    await $fetch('/api/golejadors', {
      method: 'POST',
      body: event.data
    });

    toast.add({ title: 'Golejador afegit correctament!', color: 'green' });

    navigateTo('/admin');

  } catch (error) {
    toast.add({ title: 'Error al crear el registre', color: 'red' });
  }
}
</script>

<template>
  <div class="p-6">
    <UCard class="max-w-md mx-auto my-10">
      
      <template #header>
        <h1 class="text-2xl text-center font-bold">Crear Golejador</h1>
      </template>

      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        
        <UFormField label="Nom" name="name">
          <UInput v-model="state.name" class="w-full" placeholder="Ex: Leo Messi" />
        </UFormField>
        
        <UFormField label="Equip" name="team">
          <UInput v-model="state.team" class="w-full" placeholder="Ex: Inter Miami" />
        </UFormField>

        <UFormField label="Gols totals" name="goals">
          <UInput v-model.number="state.goals" type="number" class="w-full" />
        </UFormField>

        <div class="flex gap-4 mt-8">
          <UButton type="submit" color="primary" class="flex-1 justify-center">
            Guardar
          </UButton>
          
          <UButton as-child color="gray" variant="soft" class="flex-1 justify-center">
            <NuxtLink to="/admin">Cancel·lar</NuxtLink>
          </UButton>
        </div>

      </UForm>
    </UCard>
  </div>
</template>