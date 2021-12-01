<template>
  <div className="overflow-x-auto">
    <div class="overflow-hidden min-w-full rounded-xl border border-gray-400">
      <table class="min-w-full">
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
  </div>
</template>
