import { create } from 'zustand';
import { toast } from 'react-toastify';
import axios from '../service/axios';

export const useItemStore = create((set, get) => ({
  items: [],
  isLoading: true,
  
  fetchItems: async () => {
    try {
      if (localStorage.getItem('token')) {
        const items = await axios.get('/get/items');
        set({ items: items.data, isLoading: false });
      } else {
        set({ items: [], isLoading: false });
      }
    } catch (e) {
      set({ items: [], isLoading: false });
      toast.error(e.message);
    }
  },

  addItem: async (data) => {
    try {
      const newItems = [...get().items, data];
      set({ items: newItems });
    } catch (e) {
      toast.error(e.message);
    }
  },

  editItem: async (data) => {
    try {
      set((state) => ({ items: state.items.map(ele => 
        ele._id === data._id ? { ...data } : ele
      ) }));
    } catch (e) {
      toast.error(e.message);
    }
  },

  deleteItem: async (id) => {
    try {
        set((state) => ({ items: state.items.filter(ele =>ele._id !== id)}));
    } catch (e) {
      toast.error(e.message);
    }
  }
}));
