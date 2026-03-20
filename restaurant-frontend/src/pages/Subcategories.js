import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import AddSubcategoryModal from '../components/subcategories/AddSubcategoryModal';
import EditSubcategoryModal from '../components/subcategories/EditSubcategoryModal';
import Swal from 'sweetalert2';
import apiClient from '../api/apiClient';
import './Subcategories.css';

function Subcategories() {
  const location = useLocation();
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  useEffect(() => {
    fetchCategories();
    
    // Check if we should open the add modal
    const query = new URLSearchParams(location.search);
    if (query.get('add') === 'true') {
      setShowAddModal(true);
    }
  }, [location.search]);

  useEffect(() => {
    if (selectedCategoryId) {
      fetchSubcategories(selectedCategoryId);
    } else {
      setSubcategories([]);
    }
  }, [selectedCategoryId]);

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load categories'
      });
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/subcategories?categoryId=${categoryId}`);
      setSubcategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load subcategories'
      });
      setLoading(false);
    }
  };

  const handleDelete = (subcategoryId, subcategoryName) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete "${subcategoryName}"? This will also delete all food items associated with this subcategory.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiClient.delete(`/subcategories/${subcategoryId}`);
          
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Subcategory has been deleted successfully.',
            timer: 2000,
            showConfirmButton: false
          });
          
          if (selectedCategoryId) {
            fetchSubcategories(selectedCategoryId);
          }
        } catch (error) {
          console.error('Error deleting subcategory:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to delete subcategory'
          });
        }
      }
    });
  };

  const handleEdit = (subcategoryId) => {
    const subcategory = subcategories.find(s => s.subcategoryId === subcategoryId);
    if (subcategory) {
      setSelectedSubcategory(subcategory);
      setShowEditModal(true);
    }
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setSelectedSubcategory(null);
  };

  const handleEditSuccess = () => {
    if (selectedCategoryId) {
      fetchSubcategories(selectedCategoryId);
    }
  };

  const handleAddSubcategory = () => {
    if (!selectedCategoryId) {
      Swal.fire({
        icon: 'warning',
        title: 'Select a Category',
        text: 'Please select a category first before adding a subcategory.'
      });
      return;
    }
    setShowAddModal(true);
  };

  const handleAddModalClose = () => {
    setShowAddModal(false);
  };

  const handleAddSuccess = () => {
    if (selectedCategoryId) {
      fetchSubcategories(selectedCategoryId);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategoryId(e.target.value);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.categoryId === categoryId);
    return category ? category.categoryName : 'N/A';
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <AddSubcategoryModal 
          show={showAddModal} 
          onHide={handleAddModalClose} 
          onSuccess={handleAddSuccess}
          defaultCategoryId={selectedCategoryId}
        />
        <EditSubcategoryModal 
          show={showEditModal} 
          onHide={handleEditModalClose} 
          onSuccess={handleEditSuccess}
          subcategory={selectedSubcategory}
        />
        <div className="dashboard-content">
          <div className="container-fluid">
            {/* Page Header */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="page-header">
                  <h2>
                    <i className="fas fa-th me-2"></i>
                    All Subcategories
                  </h2>
                  <button className="btn btn-primary" onClick={handleAddSubcategory}>
                    <i className="fas fa-plus me-2"></i>
                    Add New Subcategory
                  </button>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="row mb-4">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <label htmlFor="categoryFilter" className="form-label fw-bold">
                      <i className="fas fa-filter me-2"></i>
                      Filter by Category
                    </label>
                    <select
                      id="categoryFilter"
                      className="form-select"
                      value={selectedCategoryId}
                      onChange={handleCategoryChange}
                    >
                      <option value="">Select a category...</option>
                      {categories.map((category) => (
                        <option key={category.categoryId} value={category.categoryId}>
                          {category.categoryName} ({category.menu?.menuName})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Subcategories Table */}
            {!selectedCategoryId ? (
              <div className="alert alert-info text-center">
                <i className="fas fa-info-circle me-2"></i>
                Please select a category to view its subcategories.
              </div>
            ) : loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : subcategories.length === 0 ? (
              <div className="alert alert-info text-center">
                <i className="fas fa-info-circle me-2"></i>
                No subcategories found for this category. Click "Add New Subcategory" to create one.
              </div>
            ) : (
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Subcategory Name</th>
                          <th>Category</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subcategories.map((subcategory) => (
                          <tr key={subcategory.subcategoryId}>
                            <td>{subcategory.subcategoryId}</td>
                            <td>
                              <strong>{subcategory.subcategoryName}</strong>
                            </td>
                            <td>
                              {subcategory.category ? (
                                <span className="badge bg-info">
                                  {subcategory.category.categoryName}
                                </span>
                              ) : (
                                <span className="text-muted">
                                  {getCategoryName(subcategory.categoryId)}
                                </span>
                              )}
                            </td>
                            <td>
                              <div className="btn-group" role="group">
                                <button 
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => handleEdit(subcategory.subcategoryId)}
                                  title="Edit"
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDelete(subcategory.subcategoryId, subcategory.subcategoryName)}
                                  title="Delete"
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subcategories;
