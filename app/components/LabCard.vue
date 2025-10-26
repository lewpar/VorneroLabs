<script setup lang="ts">
import { type LabMetadata } from '~/lib/LabData';

const props = defineProps<{
    lab: LabMetadata
}>();
</script>

<template>
    <Card>
        <!-- <template #header>
            <img :src="lab.image" style="width: 100%; height: 200px; object-fit: cover; object-position: center; border-top-left-radius: 10px; border-top-right-radius: 10px;" />
        </template> -->
        <template #title>{{ lab.title }}</template>
        <template #subtitle>{{ lab.subtitle }}</template>
        <template #content>{{ lab.content }}</template>
        <template #footer>
            <NuxtLink :to="`/lab/${lab.slug}`">
                <Button>Read More</Button>
            </NuxtLink>
        </template>
    </Card>
</template>