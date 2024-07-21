import React, { useState } from 'react';
import { useItemStore } from '../../../store/itemStore';
import ExpenseForm from '../ExpenseForm/ExpenseForm';
import './expenseData.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { toast } from 'react-toastify';
import axios from '../../../service/axios';

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
  paddingTop: '2rem',
  boxSizing: 'border-box',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1.2rem',
};

function ExpenseData() {
  const { items, deleteItem } = useItemStore();
  const [editingItem, setEditingItem] = useState(null);

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleEditClose = () => {
    setEditingItem(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/delete/item/${id}`);
      toast.success('Item deleted');
      deleteItem(id);
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="expenseData">
      <Modal
        keepMounted
        open={editingItem !== null}
        onClose={handleEditClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style} className="modal-content">
          <button style={closeButtonStyle} onClick={handleEditClose}>
            x
          </button>
          <ExpenseForm editingItem={editingItem} setEditingItem={setEditingItem} />
        </Box>
      </Modal>
      {items.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((ele) => (
              <tr key={ele._id}>
                <td>{ele.name}</td>
                <td>{ele.description}</td>
                <td>{ele.amount}</td>
                <td>{ele.date}</td>
                <td>
                  <button className="edit" onClick={() => handleEdit(ele)}>
                    Edit
                  </button>
                  <button className="delete" onClick={() => handleDelete(ele._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="empty">
          <h1>No Items</h1>
        </div>
      )}
    </div>
 

    );
}

export default ExpenseData;
