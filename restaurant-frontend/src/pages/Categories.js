import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import AddCategoryModal from '../components/categories/AddCategoryModal';
import EditCategoryModal from '../components/categories/EditCategoryModal';
import Swal from 'sweetalert2';
import apiClient from '../api/apiClient';
import './Categories.css';

function Categories() {
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
    
    // Check if we should open the add modal
    const query = new URLSearchParams(location.search);
    if (query.get('add') === 'true') {
      setShowAddModal(true);
    }
  }, [location.search]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/categories');
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load categories'
      });
      setLoading(false);
    }
  };

  const handleDelete = (categoryId, categoryName) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete "${categoryName}"? This will also delete all subcategories and food items associated with this category.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiClient.delete(`/categories/${categoryId}`);
          
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Category has been deleted successfully.',
            timer: 2000,
            showConfirmButton: false
          });
          
          fetchCategories();
        } catch (error) {
          console.error('Error deleting category:', error);
          
          let errorMessage = 'Failed to delete category';
          
          // Extract the error message from the backend response
          if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
          } else if (error.response?.data?.error) {
            errorMessage = error.response.data.error;
          } else if (error.message) {
            errorMessage = error.message;
          }
          
          Swal.fire({
            icon: 'error',
            title: 'Cannot Delete Category',
            text: errorMessage,
            confirmButtonColor: '#3085d6'
          });
        }
      }
    });
  };

  const handleEdit = (categoryId) => {
    const category = categories.find(c => c.categoryId === categoryId);
    if (category) {
      setSelectedCategory(category);
      setShowEditModal(true);
    }
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setSelectedCategory(null);
  };

  const handleEditSuccess = () => {
    fetchCategories();
  };

  const handleAddCategory = () => {
    setShowAddModal(true);
  };

  const handleAddModalClose = () => {
    setShowAddModal(false);
  };

  const handleAddSuccess = () => {
    fetchCategories();
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <AddCategoryModal 
          show={showAddModal} 
          onHide={handleAddModalClose} 
          onSuccess={handleAddSuccess} 
        />
        <EditCategoryModal 
          show={showEditModal} 
          onHide={handleEditModalClose} 
          onSuccess={handleEditSuccess}
          category={selectedCategory}
        />
        <div className="dashboard-content">
          <div className="container-fluid">
            {/* Page Header */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="page-header">
                  <h2>
                    <i className="fas fa-list me-2"></i>
                    All Categories
                  </h2>
                  <button className="btn btn-primary" onClick={handleAddCategory}>
                    <i className="fas fa-plus me-2"></i>
                    Add New Category
                  </button>
                </div>
              </div>
            </div>

            {/* Categories Table */}
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : categories.length === 0 ? (
              <div className="alert alert-info text-center">
                <i className="fas fa-info-circle me-2"></i>
                No categories found. Click "Add New Category" to create one.
              </div>
            ) : (
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Image</th>
                          <th>Category Name</th>
                          <th>Menu</th>
                          <th>Description</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map((category) => (
                          <tr key={category.categoryId}>
                            <td>{category.categoryId}</td>
                            <td>
                              <img 
                                src={category.imageUrl || '/assets/imgs/special-offer.png'} 
                                alt={category.categoryName}
                                className="category-thumbnail"
                                onError={(e) => {
                                  e.target.src = '/assets/imgs/special-offer.png';
                                }}
                              />
                            </td>
                            <td>
                              <strong>{category.categoryName}</strong>
                            </td>
                            <td>
                              {category.menu ? (
                                <span className="badge bg-info">
                                  {category.menu.menuName}
                                </span>
                              ) : (
                                <span className="text-muted">N/A</span>
                              )}
                            </td>
                            <td>{category.description}</td>
                            <td>
                              <div className="btn-group" role="group">
                                <button 
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => handleEdit(category.categoryId)}
                                  title="Edit"
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDelete(category.categoryId, category.categoryName)}
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

export default Categories;
