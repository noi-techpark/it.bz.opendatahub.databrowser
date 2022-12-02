<template>
  <h1 class="title max-w-2xl text-2xl font-bold">
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
