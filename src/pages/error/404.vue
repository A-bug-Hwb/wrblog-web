<script setup lang="ts"></script>

<template>
    <div class="d-flex flex-column align-center justify-center" style="height: 100%;">
      <div class="CardMediaWrapper">
        <img src="@/assets/images/error/img-error-bg.svg" alt="grid" class="w-100"/>
        <img src="@/assets/images/error/img-error-blue.svg" alt="grid" class="CardMediaParts"/>
        <img src="@/assets/images/error/img-error-text.svg" alt="build" class="CardMediaBuild"/>
        <img src="@/assets/images/error/img-error-purple.svg" alt="build" class="CardMediaBuild"/>
      </div>
      <h2 class="text-h2">Something is wrong</h2>
      <p>
        <small>The page you are looking was moved, removed, <br/>renamed, or might never exist! </small>
      </p>
      <v-btn variant="flat" color="primary" class="mt-4" to="/" prepend-icon="mdi-home"> Home</v-btn>
    </div>
</template>
<style lang="scss">
.CardMediaWrapper {
  max-width: 720px;
  margin: 0 auto;
  position: relative;
}

.CardMediaBuild {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  animation: 5s bounce ease-in-out infinite;
}

.CardMediaParts {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  animation: 10s blink ease-in-out infinite;
}
</style>
