import { defineStore } from 'pinia'
import axios from 'axios'
import type { TransactionType } from '../interfaces/transaction.interface';

export const useTransactionStore = defineStore({
  id: 'transaction',
  state: () => ({
    transactions: [] as TransactionType[],
    loading: false,
    error: null,
  }),
  getters: {
    getTransactions(state) {
      return state.transactions;
    },
    getReviewTransactions(state) {
      return state.transactions.filter((transaction: TransactionType) => !transaction.review && !transaction.isDeleted );
    }
  },
  actions: {
    async fetchTransactions() {
      this.transactions = [] as TransactionType[];
      this.loading = true;

      const config = {
        headers: {
          'Accept': 'application/json'
        }
      };

      try {
        this.transactions = await axios.get(`${import.meta.env.VITE_API}/transactions`, config)
      
        .then((response: any) => response.data);
      } catch (error: any) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async assignCategory(transaction: any) {
      const config = {
        headers: {
          'Accept': 'application/json'
        }
      };

      try {
        axios.post('http://localhost:8000/api/transactions/savecategory', transaction, config)
          .then((response: any) => console.log(response));
      } catch (error: any) {
        console.log(error)
      }
    },
    async setReview(id: number) {
      console.log('id', id);
      const config = {
        headers: {
          'Accept': 'application/json'
        }
      };

      try {
        const status = await axios.post(`${import.meta.env.VITE_API}/transactions/savereview`, { id: id }, config)
          .then((response: any) => response.status);

        if (status === 200) {
          const index = this.transactions.findIndex((x) => x.id === id); 
          this.transactions[index].review = true;
        }
      } catch(error: any) {
        console.log(error)
      }

    },
    async setDelete(id: number) {
      const config = {
        headers: {
          'Accept': 'application/json'
        },
        params: {
          'id': id
        }
      };

      try {
        const status = await axios.delete(`${import.meta.env.VITE_API}/transactions`, config)
          .then((response: any) => response.status);

        if (status === 200) {
          const index = this.transactions.findIndex((x) => x.id === id);
          this.transactions[index].isDeleted = true;
        }
      } catch(error: any) {
        console.log(error)
      }
    }
  }
})
