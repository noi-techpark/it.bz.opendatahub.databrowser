<template>
  <h1 class="title max-w-2xl text-2xl font-bold lg:text-4xl">
    <slot></slot>
  </h1>
</template>

<style scoped>
.title {
  line-height: 1.2;
}

@screen lg {
  .title {
    line-height: 1.15;
  }
}
</style>
