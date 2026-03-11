import React, { useState } from 'react';
import apiClient from '../../api/apiClient';
import Swal from 'sweetalert2';

function AddMenuModal({ show, onHide, onSuccess }) {
  const [formData, setFormData] = useState({
    menuName: '',
    description: '',
    imageUrl: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.menuName.trim()) {
      newErrors.menuName = 'Menu name is required';
    } else if (formData.menuName.length > 20) {
      newErrors.menuName = 'Menu name must not exceed 20 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length > 100) {
      newErrors.description = 'Description must not exceed 100 characters';
    }

    if (formData.imageUrl && formData.imageUrl.length > 255) {
      newErrors.imageUrl = 'Image URL must not exceed 255 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        menuName: formData.menuName.trim(),
        description: formData.description.trim(),
      };

      // Only include imageUrl if provided
      if (formData.imageUrl.trim()) {
        payload.imageUrl = formData.imageUrl.trim();
      }

      const response = await apiClient.post('/menus', payload);

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Menu created successfully',
        timer: 2000,
        showConfirmButton: false
      });

      // Reset form
      setFormData({
        menuName: '',
        description: '',
        imageUrl: ''
      });
      setErrors({});

      // Close modal and refresh list
      onHide();
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      console.error('Error creating menu:', error);
      
      let errorMessage = 'Failed to create menu';
      if (error.response?.data?.message) {
        if (Array.isArray(error.response.data.message)) {
          errorMessage = error.response.data.message.join(', ');
        } else {
          errorMessage = error.response.data.message;
        }
      }

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!submitting) {
      setFormData({
        menuName: '',
        description: '',
        imageUrl: ''
      });
      setErrors({});
      onHide();
    }
  };

  if (!show) return null;

  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="fas fa-plus-circle me-2"></i>
              Add New Menu
            </h5>
            <button type="button" className="btn-close" onClick={handleClose} disabled={submitting}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {/* Menu Name */}
              <div className="mb-3">
                <label htmlFor="menuName" className="form-label">
                  Menu Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.menuName ? 'is-invalid' : ''}`}
                  id="menuName"
                  name="menuName"
                  value={formData.menuName}
                  onChange={handleChange}
                  maxLength={20}
                  placeholder="e.g., Breakfast Menu"
                  disabled={submitting}
                />
                {errors.menuName && (
                  <div className="invalid-feedback">{errors.menuName}</div>
                )}
              </div>

              {/* Description */}
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description <span className="text-danger">*</span>
                </label>
                <textarea
                  className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  maxLength={100}
                  rows="3"
                  placeholder="Brief description of the menu"
                  disabled={submitting}
                ></textarea>
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>

              {/* Image URL */}
              <div className="mb-3">
                <label htmlFor="imageUrl" className="form-label">
                  Image URL <span className="text-muted">(Optional)</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.imageUrl ? 'is-invalid' : ''}`}
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  maxLength={255}
                  placeholder="assets/imgs/menu-img/menu.jpg"
                  disabled={submitting}
                />
                {errors.imageUrl && (
                  <div className="invalid-feedback">{errors.imageUrl}</div>
                )}
                <small className="form-text text-muted">
                  Relative path to the image file
                </small>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={handleClose}
                disabled={submitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Creating...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save me-2"></i>
                    Create Menu
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMenuModal;
