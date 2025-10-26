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
                <Card class="lab">
                    <template #title>
                        <h1 class="title">
                            {{ lab.metadata.title }}
                        </h1>
                    </template>

                    <template #subtitle>
                        {{ lab.metadata.subtitle }}
                    </template>

                    <template #content>
                        <div class="markdown" v-html="lab.content"></div>
                    </template>
                </Card>
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
.lab .title {
    margin: 0;
}
</style>