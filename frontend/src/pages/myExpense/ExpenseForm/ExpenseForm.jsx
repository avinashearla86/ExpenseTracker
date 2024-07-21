import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import './expenseForm.css';
import { useCatStore } from '../../../store/catStore';
import { toast } from 'react-toastify';
import axios from '../../../service/axios';
import { useItemStore } from '../../../store/itemStore';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
  boxSizing: 'border-box',
};

function ExpenseForm({ editingItem, setEditingItem }) {
  const [cat, setCat] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const { editItem, addItem } = useItemStore();
  const { category, addCategory } = useCatStore();

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setDescription(editingItem.description);
      setAmount(editingItem.amount);
      setCat(editingItem.category);
      setDate(editingItem.date);
    } else {
      setName('');
      setDescription('');
      setAmount('');
      setCat('');
      setDate('');
    }
  }, [editingItem]);

  const handleChange = (event) => {
    setCat(event.target.value);
  };

  const handleCatOpen = () => setOpen(true);
  const handleCatClose = () => setOpen(false);

  const handleCatSubmit = async () => {
    if (newCategory.trim() === '') {
      toast.error('Category name is required');
      return;
    }

    try {
      const res = await axios.post('create/cat', { name: newCategory });
      addCategory(res.data);
      toast.success('Category added successfully');
      setNewCategory('');
      handleCatClose();
    } catch (e) {
      toast.error(e.response?.data?.msg || e.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, description, amount, category: cat, date };

    if (!formData.name || !formData.description || !formData.amount || !formData.category) {
      toast.error('All fields are required');
      return;
    }

    setLoading(true);
    try {
      if (editingItem) {
        const response = await axios.put(`/edit/item/${editingItem._id}`, formData);
        editItem(response.data);
        toast.success('Item Updated Successfully');
        setEditingItem(null);
      } else {
        const res = await axios.post('/create/item', formData);
        addItem(res.data);
        toast.success('Item Added Successfully');
        setName('');
        setDescription('');
        setAmount('');
        setCat('');
        setDate('');
      }
    } catch (e) {
      toast.error(e.response?.data?.msg || e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='expenseForm'>
      <h2>{editingItem ? 'Edit Item' : 'Add Item'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Name'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Box sx={{ minWidth: 300, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={cat}
              label="Category"
              onChange={handleChange}
            >
              {category.map(ele => (
                <MenuItem key={ele._id} value={ele._id}>{ele.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={handleCatOpen} sx={{minWidth: '50px'}}>Add +</Button>
        </Box>
        <input
          type="date"
          placeholder='Date'
          name='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder='Description'
          name='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder='Amount'
          name='amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">{loading ? 'Loading..' : 'Submit'}</button>
      </form>

      <Modal open={open} onClose={handleCatClose}>
        <Box sx={style}>
          <div className="modal-header">
            <h2>Add Category</h2>
            <button onClick={handleCatClose}>&times;</button>
          </div>
          <input
            type="text"
            placeholder='Category Name'
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          /><br/>
          <Button variant="contained" onClick={handleCatSubmit}>Add</Button>
          <Button variant="contained" color='error' onClick={handleCatClose} style={{ marginLeft: '10px' }}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default ExpenseForm;
