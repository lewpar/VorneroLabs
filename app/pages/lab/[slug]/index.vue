<script setup lang="ts">
import { type Lab, getLabBySlug } from '~/lib/LabData';

const route = useRoute();
const lab = ref<Lab | null | undefined>(undefined);

onMounted(async () => {
    lab.value = await getLabBySlug(route.params.slug as string);
});
</script>

<template>
    <div class="page">
        <NuxtLink to="/"><Button>Back to Labs</Button></NuxtLink>
        <template v-if="lab == undefined">
            Loading..
        </template>
        <template v-else>
            <template v-if="lab == null">
                No lab found.
            </template>
            <template v-else>
                <div class="lab">
                    <div class="lab-header">
                        <div class="title">{{ lab.metadata.title }}</div>
                        <div class="subtitle"></div>
                    </div>

                    <div class="lab-content">
                        <div v-html="lab.content"></div>
                    </div>
                </div>
            </template>
        </template>
    </div>
</template>

<style scoped>
.lab {
    display: flex;
    flex-direction: column;

    gap: 1rem;
}
.lab-header {
    display: flex;
    flex-direction: column;

    gap: 0.5rem;
}
.lab-header .title {
    font-weight: bold;
    font-size: 2rem;
}
.lab-header .subtitle {
    color: rgb(169, 169, 169);
}
.instructions {
    display: flex;
    flex-direction: column;

    gap: 1rem;
}
</style>