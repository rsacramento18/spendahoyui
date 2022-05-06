import { defineStore } from 'pinia'
import axios from 'axios'
import type { CategoryType } from '../interfaces/category.interface';

export const useCategoryStore = defineStore({
  id: 'category',
  state: () => ({
    categories: [] as CategoryType[],
    loading: false,
    error: null,
  }),
  getters: {
    getCategories(state) {
      return state.categories;
    },
    getCategory(state) {
      return (categoryId: number) => {
        return state.categories.find((category) => category.id === categoryId)
      };
    },
  },
  actions: {
    async fetchCategories() {
      this.categories = [] as CategoryType[];

      const config = {
        headers: {
          'Accept': 'application/json'
        }
      };

      try {
        this.categories = await axios.get('http://localhost:8000/api/categories', config)
        .then((response: any) => response.data);
      } catch (error: any) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  }
})
