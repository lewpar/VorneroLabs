<script setup lang="ts">
import { getMetadatas, type LabMetadata } from '~/lib/LabData';

const metadatas = ref<LabMetadata[] | null | undefined>(undefined);

onMounted(async () => {
    metadatas.value = await getMetadatas();
});
</script>

<template>
    <div class="page">
        <h1>Vornero Labs</h1>

        <h2>Labs</h2>
        <div class="labs">
            <template v-if="metadatas == undefined">
                Loading labs..
            </template>
            <template v-else>
                <template v-if="metadatas == null">
                    No labs were found.
                </template>
                <template v-else>
                    <LabCard v-for="labMeta in metadatas" :lab="labMeta"></LabCard>
                </template>
            </template>
        </div>
    </div>
</template>

<style scoped>
.labs {
    display: flex;
    flex-direction: column;

    gap: 1rem;
}

.lab {
    border: 1px solid white;
    padding: 1rem;
}
</style>