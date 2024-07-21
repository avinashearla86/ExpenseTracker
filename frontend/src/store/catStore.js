import { create } from 'zustand';
import { toast } from 'react-toastify';
import axios from '../service/axios';

export const useCatStore = create((set, get) => ({
    category: [],
    isLoading: true,
    fetchCategory: async () => {
        try {
            if (localStorage.getItem('token')) {
                const response = await axios.get('/get/cat');
                set({ category: response.data, isLoading: false });
            } else {
                set({ category: [], isLoading: false });
            }
        } catch (e) {
            set({ category: [], isLoading: false });
            toast.error(e.message);
        }
    },
    addCategory: async (data) => {
        try {
          set((state) => ({
            category: [...state.category, data],
          }));
          toast.success('Category Added Successfully');
        } catch (e) {
          toast.error(e.response?.data?.msg || e.message);
        }
    },
    deleteItem: async(id)=>{
        try{
            set((state) => ({ category: state.category.filter(ele =>ele._id !== id)}));
            toast.success('Category deleted Successfully');
        }catch(e){
            toast.error(e.response?.data?.msg || e.message);
        }
    }
}));