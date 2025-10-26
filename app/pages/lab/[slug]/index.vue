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
        <template v-if="lab == undefined">
            Loading..
        </template>
        <template v-else>
            <template v-if="lab == null">
                No lab found.
            </template>
            <template v-else>
                <Card class="lab">
                    <template #header>
                        <div class="header" :style="`background-image: url('${lab.metadata.cover}')`">
                            <div class="title">
                                {{ lab.metadata.title }}
                            </div>
                            <div class="subtitle">
                                {{ lab.metadata.subtitle }}
                            </div>
                            <div class="content">
                                {{ lab.metadata.content }}
                            </div>
                        </div>  
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

    position: relative;
}
.lab .image {
    position: absolute;

    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    width: 100%; 
    max-height: 200px; 
    object-fit: cover;

    user-select: none;
    pointer-events: none;
}
.lab .header {
    display: flex;
    flex-direction: column;

    gap: 1rem;

    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    padding: 1rem;
}
.lab .header .subtitle {
    color: rgb(179, 179, 179);
}
.lab .header .title {
    margin: 0;
    font-size: 2rem;
}
</style>