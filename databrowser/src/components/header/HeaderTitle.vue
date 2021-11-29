<template>
  <h1 class="max-w-lg text-2xl font-bold title">
    <slot></slot>
  </h1>
</template>

<style>
.title {
  font-size: 1.5rem;
  line-height: 1.2;
}

@screen lg {
  .title {
    font-size: 2.5rem;
    line-height: 1.15;
  }
}
</style>
