<script setup lang="ts">
  import { ref, onMounted, onBeforeMount } from 'vue'
  import { storeToRefs } from 'pinia'
  import moment from 'moment'

  import type { TransactionType } from '../../interfaces/transaction.interface'
  import { useTransactionStore } from '../../stores/transactionStore'
  import { useCategoryStore } from '../../stores/categoryStore'

  /* const { getReviewTransactions, transactions, loading: transactionLoading, error: transacationError } = storeToRefs(transactionStore()); */
  /* const { categories, loading: categoryLoading, error: categoryError } = storeToRefs(categoryStore()); */

  /* const { fetchTransactions, assignCategory, setReview, setDelete} = transactionStore(); */
  let transactionStore = useTransactionStore();
  let categoryStore = useCategoryStore();
  /* const { fetchCategories } = categoryStore(); */

  const saveCategory = async (event: Event, transaction: TransactionType) => {
    console.log('event', event);
    console.log('transaction', transaction.categoryId);
    const body = {
      id: transaction.id,
      categoryId: transaction.categoryId
    }
    assignCategory(body);
  };

  const reviewTransaction = async (event: Event, transaction: TransactionType) => {
    setReview(transaction.id);
  };

  const deleteTransaction = async (event: Event, transaction: TransactionType) => {
    setDelete(transaction.id);
  };

  const transactionTable= ref<InstanceType<typeof ElTable>>()
  const toggleSelection = (rows?: TransactionType[]) => {
    if(rows) {
      rows.forEach((row) => {
        transactionTable.value!.toggleRowSelection(row, undefined); 
      });

    }
  }

  categoryStore.fetchCategories();
  transactionStore.fetchTransactions();

  onMounted(() => {
    console.log('transactionStoreObj', this.transactionStore);
    console.log('value', this.transactionStore.getReviewTransactions);
    console.log('value2', this.transactionStore.getReviewTransactions.value);
    /* toggleSelection(getReviewTransactions().filter((x) => x.categoryId)); */
    /* getReviewTransactions.value.forEach((row) => { */
    /*   console.log('row', row); */
    /* }); */
    /* for (let i = 0; i < getReviewTransactions.length; i++) { */
    /*   console.log(getReviewTransactions[i]); */
    /*   if(getReviewTransactions[i].categoryId) { */
    /*     transactionTable.value!.toggleRowSelection(getReviewTransactions[i], undefined); */ 
    /*   } */
    /* } */
  });


</script>
<template>
  <div class="transactions card">
    <div>
      
    </div>
    <el-table
      ref="transactionTable"
      height="90%"
      :data="transactionStore.getReviewTransactions"
    >
      <el-table-column 
        type="selection"
        width="55"
      />
      <el-table-column prop="date" :label="$t('transactions.headers.date')">
        <template #default="scope">
          {{ moment(scope.row.date).format('l') }}
        </template>
      </el-table-column>
      <el-table-column prop="description" :label="$t('transactions.headers.description')" />
      <el-table-column prop="value" :label="$t('transactions.headers.value')" />
      <el-table-column prop="category" :label="$t('transactions.headers.category')">
        <template #default="scope">
          <el-select
            v-model="scope.row.categoryId"
            @change="saveCategory($event, scope.row)"
          >
            <el-option
              v-for="category in categories"
              :key="category.id"
              :label="category.name"
              :value="category.id"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="organizationName" :label="$t('transactions.headers.organization')" />
      <el-table-column>
        <template #default="scope">
          <div class="action-buttons">
            <el-button type="primary" class="review-button" @click="reviewTransaction($event, scope.row)">
              <font-awesome-icon icon="check"/>
            </el-button>
            <el-button type="danger" @click="deleteTransaction($event, scope.row)">
              <font-awesome-icon icon="xmark"/>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
  .transactions {
    width: 50%;
    height: 100%;
    flex-grow: 1;
    box-sizing: border-box;
  }

  .action-buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .review-button {
    padding: 0 30px;
  }

</style>
