<template>
  <div class="overflow-hidden rounded-xl border border-gray-400">
    <table>
      <thead class="bg-gray-200">
        <tr class="text-left divide-x divide-white">
          <slot name="tableHeader" />
        </tr>
      </thead>
      <tbody>
        <slot name="tableBody" />
      </tbody>
    </table>
  </div>
</template>
