import Navbar from "./navbar/navbar"
import './index.css'
import Login from "./login/Login"
import Notify from "./notification/Notify"
import { useUserStore } from "./store/userStore"
import { useItemStore } from "./store/itemStore"
import { useEffect } from "react"
import Expense from "./pages/myExpense/Expense"
import { useCatStore } from "./store/catStore"
import Report from "./pages/expenseReports/Report"
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  const {currentUser, isLoading, fetchUserInfo} = useUserStore()
  const {fetchItems} = useItemStore()
  const {fetchCategory} = useCatStore()
  useEffect(()=>{
    fetchUserInfo()
    fetchItems()
    fetchCategory()
  }, [])
  if(isLoading){
    return <div className="container">
      <div className="loading">Loading...</div>
    </div>
  }
  return (
    <div className='container'>
      <BrowserRouter>
      {(currentUser ? <>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Expense/>} />
          <Route path="/reports" element={<Report/>} />
        </Routes>
      </> : <Login/>)}
      <Notify />
      </BrowserRouter>
    </div>
  )
}

export default App
