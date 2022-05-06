<script setup lang="ts">
import type { TransactionType } from '../../interfaces/transaction.interface';
defineProps<{
  transaction: TransactionType;
}>()
</script>

<template>
  <tr>
    <td>
      {{ transaction.id}}
    </td>
    <td>
      {{ transaction.date}}
    </td>
    <td>
      {{ transaction.description}}
    </td>
    <td>
      {{ transaction.value}}
    </td>
    <td>
      {{ transaction.categoryName}}
    </td>
    <td>
      {{ transaction.organizationName}}
    </td>
  </tr>
</template>

<style scoped>
</style>
