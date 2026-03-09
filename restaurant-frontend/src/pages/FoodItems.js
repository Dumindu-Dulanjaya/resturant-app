import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import AddFoodItemModal from '../components/food-items/AddFoodItemModal';
import EditFoodItemModal from '../components/food-items/EditFoodItemModal';
import Swal from 'sweetalert2';
import apiClient from '../api/apiClient';
import './FoodItems.css';

function FoodItems() {
  const [foodItems, setFoodItems] = useState([]);
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);

  // Filter states
  const [filters, setFilters] = useState({
    menuId: '',
    categoryId: '',
    subcategoryId: '',
    search: ''
  });

  useEffect(() => {
    fetchMenus();
  }, []);

  // Fetch categories when menu changes
  useEffect(() => {
    if (filters.menuId) {
      fetchCategories(filters.menuId);
    } else {
      setCategories([]);
      setSubcategories([]);
    }
  }, [filters.menuId]);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (filters.categoryId) {
      fetchSubcategories(filters.categoryId);
    } else {
      setSubcategories([]);
    }
  }, [filters.categoryId]);

  const fetchMenus = async () => {
    try {
      const response = await apiClient.get('/menus');
      setMenus(response.data);
    } catch (error) {
      console.error('Error fetching menus:', error);
    }
  };

  const fetchCategories = async (menuId) => {
    try {
      const response = await apiClient.get(`/categories?menuId=${menuId}`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await apiClient.get(`/subcategories?categoryId=${categoryId}`);
      setSubcategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const fetchFoodItems = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (filters.menuId) params.append('menuId', filters.menuId);
      if (filters.categoryId) params.append('categoryId', filters.categoryId);
      if (filters.subcategoryId) params.append('subcategoryId', filters.subcategoryId);
      if (filters.search) params.append('search', filters.search);

      const queryString = params.toString();
      const url = queryString ? `/food-items?${queryString}` : '/food-items';
      
      const response = await apiClient.get(url);
      setFoodItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching food items:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load food items'
      });
      setLoading(false);
    }
  }, [filters.menuId, filters.categoryId, filters.subcategoryId, filters.search]);

  // Fetch food items whenever filters change (except search which is debounced)
  useEffect(() => {
    fetchFoodItems();
  }, [filters.menuId, filters.categoryId, filters.subcategoryId, fetchFoodItems]);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchFoodItems();
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [filters.search, fetchFoodItems]);

  const handleMenuChange = (e) => {
    setFilters({
      ...filters,
      menuId: e.target.value,
      categoryId: '',
      subcategoryId: ''
    });
  };

  const handleCategoryChange = (e) => {
    setFilters({
      ...filters,
      categoryId: e.target.value,
      subcategoryId: ''
    });
  };

  const handleSubcategoryChange = (e) => {
    setFilters({
      ...filters,
      subcategoryId: e.target.value
    });
  };

  const handleSearchChange = (e) => {
    setFilters({
      ...filters,
      search: e.target.value
    });
  };

  const handleClearFilters = () => {
    setFilters({
      menuId: '',
      categoryId: '',
      subcategoryId: '',
      search: ''
    });
  };

  const handleDelete = (foodItemId, itemName) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete "${itemName}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiClient.delete(`/food-items/${foodItemId}`);
          
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Food item has been deleted successfully.',
            timer: 2000,
            showConfirmButton: false
          });
          
          fetchFoodItems();
        } catch (error) {
          console.error('Error deleting food item:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to delete food item'
          });
        }
      }
    });
  };

  const handleEdit = (foodItemId) => {
    const foodItem = foodItems.find(f => f.foodItemId === foodItemId);
    if (foodItem) {
      setSelectedFoodItem(foodItem);
      setShowEditModal(true);
    }
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setSelectedFoodItem(null);
  };

  const handleEditSuccess = () => {
    fetchFoodItems();
  };

  const handleAddFoodItem = () => {
    setShowAddModal(true);
  };

  const handleAddModalClose = () => {
    setShowAddModal(false);
  };

  const handleAddSuccess = () => {
    fetchFoodItems();
  };

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <AddFoodItemModal 
          show={showAddModal} 
          onHide={handleAddModalClose} 
          onSuccess={handleAddSuccess}
        />
        <EditFoodItemModal 
          show={showEditModal} 
          onHide={handleEditModalClose} 
          onSuccess={handleEditSuccess}
          foodItem={selectedFoodItem}
        />
        <div className="dashboard-content">
          <div className="container-fluid">
            {/* Page Header */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="page-header">
                  <h2>
                    <i className="fas fa-hamburger me-2"></i>
                    All Food Items
                  </h2>
                  <button className="btn btn-primary" onClick={handleAddFoodItem}>
                    <i className="fas fa-plus me-2"></i>
                    Add New Food Item
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Section */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title mb-3">
                      <i className="fas fa-filter me-2"></i>
                      Filters
                    </h5>
                    <div className="row g-3">
                      {/* Menu Filter */}
                      <div className="col-md-3">
                        <label htmlFor="menuFilter" className="form-label">Menu</label>
                        <select
                          id="menuFilter"
                          className="form-select"
                          value={filters.menuId}
                          onChange={handleMenuChange}
                        >
                          <option value="">All Menus</option>
                          {menus.map((menu) => (
                            <option key={menu.menuId} value={menu.menuId}>
                              {menu.menuName}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Category Filter */}
                      <div className="col-md-3">
                        <label htmlFor="categoryFilter" className="form-label">Category</label>
                        <select
                          id="categoryFilter"
                          className="form-select"
                          value={filters.categoryId}
                          onChange={handleCategoryChange}
                          disabled={!filters.menuId}
                        >
                          <option value="">All Categories</option>
                          {categories.map((category) => (
                            <option key={category.categoryId} value={category.categoryId}>
                              {category.categoryName}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Subcategory Filter */}
                      <div className="col-md-3">
                        <label htmlFor="subcategoryFilter" className="form-label">Subcategory</label>
                        <select
                          id="subcategoryFilter"
                          className="form-select"
                          value={filters.subcategoryId}
                          onChange={handleSubcategoryChange}
                          disabled={!filters.categoryId}
                        >
                          <option value="">All Subcategories</option>
                          {subcategories.map((subcategory) => (
                            <option key={subcategory.subcategoryId} value={subcategory.subcategoryId}>
                              {subcategory.subcategoryName}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Search Filter */}
                      <div className="col-md-3">
                        <label htmlFor="searchFilter" className="form-label">Search</label>
                        <div className="input-group">
                          <input
                            type="text"
                            id="searchFilter"
                            className="form-control"
                            placeholder="Search by name..."
                            value={filters.search}
                            onChange={handleSearchChange}
                          />
                          <button 
                            className="btn btn-outline-secondary" 
                            type="button"
                            onClick={handleClearFilters}
                            title="Clear all filters"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Food Items Table */}
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : foodItems.length === 0 ? (
              <div className="alert alert-info text-center">
                <i className="fas fa-info-circle me-2"></i>
                No food items found. Click "Add New Food Item" to create one.
              </div>
            ) : (
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Item Name</th>
                          <th>Menu</th>
                          <th>Category</th>
                          <th>Subcategory</th>
                          <th>Price</th>
                          <th>Description</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {foodItems.map((foodItem) => (
                          <tr key={foodItem.foodItemId}>
                            <td>{foodItem.foodItemId}</td>
                            <td>
                              <strong>{foodItem.itemName}</strong>
                            </td>
                            <td>
                              {foodItem.category?.menu ? (
                                <span className="badge bg-primary">
                                  {foodItem.category.menu.menuName}
                                </span>
                              ) : (
                                <span className="text-muted">N/A</span>
                              )}
                            </td>
                            <td>
                              {foodItem.category ? (
                                <span className="badge bg-info">
                                  {foodItem.category.categoryName}
                                </span>
                              ) : (
                                <span className="text-muted">N/A</span>
                              )}
                            </td>
                            <td>
                              {foodItem.subcategory ? (
                                <span className="badge bg-secondary">
                                  {foodItem.subcategory.subcategoryName}
                                </span>
                              ) : (
                                <span className="text-muted">-</span>
                              )}
                            </td>
                            <td>
                              <strong>${formatPrice(foodItem.price)}</strong>
                            </td>
                            <td>
                              {foodItem.description ? (
                                <span className="text-truncate" title={foodItem.description}>
                                  {foodItem.description.substring(0, 50)}
                                  {foodItem.description.length > 50 ? '...' : ''}
                                </span>
                              ) : (
                                <span className="text-muted">-</span>
                              )}
                            </td>
                            <td>
                              <div className="btn-group" role="group">
                                <button 
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => handleEdit(foodItem.foodItemId)}
                                  title="Edit"
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDelete(foodItem.foodItemId, foodItem.itemName)}
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

export default FoodItems;
