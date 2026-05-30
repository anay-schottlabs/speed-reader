<script setup>
import { ref } from 'vue';

const text = ref("");
</script>

<template>
    <!-- .form-control gives textarea the full width -->
    <!-- .h-100 gives textarea the full height -->
    <textarea
        @input="$emit('textUpdate', text)"
        class="form-control h-100"
        placeholder="Paste some text to start reading..."
        v-model="text"
    ></textarea>
</template>

<style scoped>
/* prevents textarea from being rescaled */
textarea {
    resize: none;
}
</style>
