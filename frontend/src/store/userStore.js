import {create} from 'zustand'
import { toast } from 'react-toastify'
import axios from '../service/axios'
export const useUserStore = create((set)=>({
    currentUser: null,
    isLoading: true,
    fetchUserInfo: async() => {
        try{
            if(localStorage.getItem('token')){
                const user = await axios.get('/get/user')
                set({currentUser: user.data, isLoading: false})
            }else{
                set({currentUser: null, isLoading: false})
            }
        }catch(e){
            set({currentUser: null, isLoading: false})
            toast.error(e.message)
        }
    },
    logOut: ()=>{
        set({currentUser: null, isLoading: false})
        localStorage.removeItem('token')
    }
}))