<script setup>
const props = defineProps({
    text: String
});
</script>

<template>
    <div class="d-flex align-items-center my-4">
        <hr class="flex-grow-1">
        <span class="px-3 text-muted">{{ props.text }}</span>
        <hr class="flex-grow-1">
    </div>
</template>

<style scoped></style>
