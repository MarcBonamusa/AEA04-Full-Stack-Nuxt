<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { FetchError } from 'ofetch'

const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession();

const schema = z.object({
    name: z.string(),
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
    name: undefined,
    email: undefined,
    password: undefined
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
    console.log(event.data)
    try {
        await $fetch('/auth/register', {
            method: 'POST',
            body: event.data
        })
        toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
        fetch()
    } catch (error) {
        if (error instanceof FetchError) {
            toast.add({ title: 'Error', description: error.data.message, color: 'error' })
        } else {
            toast.add({ title: 'Error', description: "Error a l'aplicació", color: 'error' })
        }
    }
}

watch(loggedIn, () => {
    if (loggedIn.value) {
        navigateTo('/admin')
    }
})

</script>

<template>
    <UCard class="max-w-md m-auto my-10">
        <template>
            <h1 class="text-2xl text-center">Registre</h1>
        </template>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
            <UFormField label="Nom" name="name">
                <UInput v-model="state.name" class="w-full" />
            </UFormField>

            <UFormField label="Email" name="email">
                <UInput v-model="state.email" class="w-full" />
            </UFormField>

            <UFormField label="Password" name="password">
                <UInput v-model="state.password" type="password" class="w-full" />
            </UFormField>

            <UButton type="submit">
                Submit
            </UButton>
        </UForm>
        <UButton type="submit" class="mt-4" @click="openInPopup('/auth/github')">
            Register with Github
        </UButton>

        <p class="mt-6 text-sm text-center text-gray-500 dark:text-gray-400">
            Si ja tens compte, 
            <NuxtLink to="/login" class="text-primary-500 font-medium hover:underline">
                entra aquí
            </NuxtLink>
        </p>

    </UCard>
</template>