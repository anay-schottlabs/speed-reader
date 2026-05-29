<script setup></script>

<template>
  <div class="d-flex flex-column vh-100 p-3">
    <div class="row">
      <h1>Speed Reader</h1>
    </div>
    <div class="row flex-grow-1">
      <div class="col border border-2 border-black">
        <p>reading text</p>
      </div>
      <div class="col border border-2 border-black p-1">
        <textarea class="form-control h-100"></textarea>
      </div>
    </div>
  </div>
</template>

<style scoped>
  textarea {
    resize: none;
  }
</style>
