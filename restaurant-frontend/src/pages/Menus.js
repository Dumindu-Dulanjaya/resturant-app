import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import EditMenuModal from '../components/menus/EditMenuModal';
import Swal from 'sweetalert2';
import apiClient from '../api/apiClient';
import './Menus.css';

function Menus() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/menus');
      setMenus(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching menus:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load menus'
      });
      setLoading(false);
    }
  };

  const handleDelete = (menuId, menuName) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete "${menuName}"? This will also delete all categories, subcategories, and food items associated with this menu.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiClient.delete(`/menus/${menuId}`);

          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Menu has been deleted successfully.',
            timer: 2000,
            showConfirmButton: false
          });

          fetchMenus();
        } catch (error) {
          console.error('Error deleting menu:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to delete menu'
          });
        }
      }
    });
  };

  const handleEdit = (menuId) => {
    const menu = menus.find(m => m.menuId === menuId);
    if (menu) {
      setSelectedMenu(menu);
      setShowEditModal(true);
    }
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setSelectedMenu(null);
  };

  const handleEditSuccess = () => {
    fetchMenus();
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <EditMenuModal
          show={showEditModal}
          onHide={handleEditModalClose}
          onSuccess={handleEditSuccess}
          menu={selectedMenu}
        />
        <div className="dashboard-content">
          <div className="container-fluid">
            {/* Page Header */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="page-header">
                  <h2>
                    <i className="fas fa-utensils me-2"></i>
                    All Menus
                  </h2>
                  <button className="btn btn-primary" onClick={() => navigate('/menus/add')}>
                    <i className="fas fa-plus me-2"></i>
                    Add New Menu
                  </button>
                </div>
              </div>
            </div>

            {/* Menus Grid */}
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : menus.length === 0 ? (
              <div className="alert alert-info text-center">
                <i className="fas fa-info-circle me-2"></i>
                No menus found. Click "Add New Menu" to create one.
              </div>
            ) : (
              <div className="row g-4">
                {menus.map((menu) => (
                  <div className="col-lg-4 col-md-6" key={menu.menuId}>
                    <div className="menu-card card">
                      <div className="menu-card-image">
                        <img
                          src={menu.imageUrl}
                          alt={menu.menuName}
                          onError={(e) => {
                            e.target.src = '/assets/imgs/special-offer.png';
                          }}
                        />
                      </div>
                      <div className="card-body">
                        <button
                          className="btn btn-explore w-100 mb-3"
                          onClick={() => navigate(`/menus/categories?menuId=${menu.menuId}`)}
                        >
                          Explore
                        </button>
                        <h5 className="card-title">{menu.menuName}</h5>
                        <p className="card-text text-muted">{menu.description}</p>
                        <div className="card-actions-vertical">
                          <button
                            className="btn btn-edit mb-2 w-100"
                            onClick={() => handleEdit(menu.menuId)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-delete w-100"
                            onClick={() => handleDelete(menu.menuId, menu.menuName)}
                          >
                            Delete
                          </button>
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

export default Menus;
