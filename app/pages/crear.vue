<script setup>

definePageMeta({
  middleware: ["auth"],
});

</script>
<!--
<template>
    <UCard class="max-w-md m-auto my-10">
        <template>
            <h1 class="text-2xl text-center">Crear Golejador</h1>
        </template>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
            <UFormField label="Nom" name="name">
                <UInput v-model="state.name" class="w-full" />
            </UFormField>
            
            <UFormField label="Equip" name="team">
                <UInput v-model="state.team" class="w-full"/>
            </UFormField>

            <UFormField label="Gols" name="goals">
                <UInput v-model="state.goals" type="number" class="w-full" />
            </UFormField>

            <UButton type="submit">
                Submit
            </UButton>
        </UForm>
    </UCard>
</template>-->