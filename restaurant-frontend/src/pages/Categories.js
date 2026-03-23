import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import EditCategoryModal from '../components/categories/EditCategoryModal';
import Swal from 'sweetalert2';
import apiClient from '../api/apiClient';
import './Categories.css';

function Categories() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuName, setMenuName] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const menuId = queryParams.get('menuId');

  useEffect(() => {
    fetchCategories();
    if (menuId) {
      fetchMenuName();
    }
  }, [menuId]);

  const fetchMenuName = async () => {
    try {
      const response = await apiClient.get(`/menus/${menuId}`);
      if (response.data) {
        setMenuName(response.data.menuName);
      }
    } catch (error) {
      console.error('Error fetching menu name:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const url = menuId ? `/categories?menuId=${menuId}` : '/categories';
      const response = await apiClient.get(url);
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

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <EditCategoryModal
          show={showEditModal}
          onHide={handleEditModalClose}
          onSuccess={handleEditSuccess}
          category={selectedCategory}
        />
        <div className="dashboard-content">
          <div className="container-fluid">
            {/* Back Button and Header */}
            <div className="mb-4">
              <button
                className="btn btn-secondary mb-3"
                onClick={() => navigate(-1)}
              >
                <i className="fas fa-arrow-left me-2"></i>
                Back
              </button>
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="page-title text-dark">
                  {menuName ? `${menuName} Categories` : 'All Categories'}
                </h2>
                <button className="btn btn-primary" onClick={() => navigate('/menus/categories/add')}>
                  <i className="fas fa-plus me-2"></i>
                  Add New Category
                </button>
              </div>
            </div>

            {/* Categories Grid */}
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
              <div className="row g-4">
                {categories.map((category) => (
                  <div className="col-lg-4 col-md-6" key={category.categoryId}>
                    <div className="category-card card h-100 border-0 shadow-sm">
                      <div className="category-card-image">
                        <img
                          src={category.imageUrl || '/assets/imgs/special-offer.png'}
                          alt={category.categoryName}
                          onError={(e) => {
                            e.target.src = '/assets/imgs/special-offer.png';
                          }}
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="category-title">{category.categoryName}</h5>
                        <p className="category-text text-muted mb-4">{category.description}</p>

                        <div className="category-actions-vertical">
                          <button
                            className="btn btn-explore-items w-100 mb-3"
                            onClick={() => navigate(`/menus/food-items?categoryId=${category.categoryId}`)}
                          >
                            Explore Items
                          </button>

                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-edit-category flex-grow-1"
                              onClick={() => handleEdit(category.categoryId)}
                            >
                              <i className="fas fa-edit me-1"></i>
                              Edit
                            </button>
                            <button
                              className="btn btn-delete-category flex-grow-1"
                              onClick={() => handleDelete(category.categoryId, category.categoryName)}
                            >
                              <i className="fas fa-trash me-1"></i>
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
