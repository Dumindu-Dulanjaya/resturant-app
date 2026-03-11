import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import Swal from 'sweetalert2';

function EditCategoryModal({ show, onHide, onSuccess, category }) {
  const [formData, setFormData] = useState({
    categoryName: '',
    description: '',
    menuId: '',
    imageUrl: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [menus, setMenus] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (show) {
      fetchMenus();
    }
  }, [show]);

  // Populate form when category prop changes
  useEffect(() => {
    if (category) {
      setFormData({
        categoryName: category.categoryName || '',
        description: category.description || '',
        menuId: category.menuId || '',
        imageUrl: category.imageUrl || ''
      });
      setImagePreview(category.imageUrl || null);
      setSelectedFile(null);
      setErrors({});
    }
  }, [category]);

  const fetchMenus = async () => {
    try {
      const response = await apiClient.get('/menus');
      setMenus(response.data);
    } catch (error) {
      console.error('Error fetching menus:', error);
    }
  };

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          imageFile: 'Please select a valid image file (JPG, JPEG, PNG, GIF)'
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          imageFile: 'File size must not exceed 5MB'
        }));
        return;
      }

      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Clear error
      if (errors.imageFile) {
        setErrors(prev => ({
          ...prev,
          imageFile: ''
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.categoryName.trim()) {
      newErrors.categoryName = 'Category name is required';
    } else if (formData.categoryName.length > 20) {
      newErrors.categoryName = 'Category name must not exceed 20 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length > 100) {
      newErrors.description = 'Description must not exceed 100 characters';
    }

    if (!formData.menuId) {
      newErrors.menuId = 'Please select a menu';
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
        categoryName: formData.categoryName.trim(),
        description: formData.description.trim(),
        menuId: parseInt(formData.menuId),
      };

      // Only include imageUrl if provided
      if (formData.imageUrl.trim()) {
        payload.imageUrl = formData.imageUrl.trim();
      }

      const response = await apiClient.patch(`/categories/${category.categoryId}`, payload);

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Category updated successfully',
        timer: 2000,
        showConfirmButton: false
      });

      // Close modal and refresh list
      onHide();
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      console.error('Error updating category:', error);
      
      let errorMessage = 'Failed to update category';
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
      setErrors({});
      onHide();
    }
  };

  if (!show || !category) return null;

  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="fas fa-edit me-2"></i>
              Edit Category
            </h5>
            <button type="button" className="btn-close" onClick={handleClose} disabled={submitting}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {/* Category Name */}
              <div className="mb-3">
                <label htmlFor="editCategoryName" className="form-label">
                  Category Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.categoryName ? 'is-invalid' : ''}`}
                  id="editCategoryName"
                  name="categoryName"
                  value={formData.categoryName}
                  onChange={handleChange}
                  maxLength={20}
                  placeholder="e.g., Appetizers"
                  disabled={submitting}
                />
                {errors.categoryName && (
                  <div className="invalid-feedback">{errors.categoryName}</div>
                )}
              </div>

              {/* Menu Selection */}
              <div className="mb-3">
                <label htmlFor="editMenuId" className="form-label">
                  Menu <span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select ${errors.menuId ? 'is-invalid' : ''}`}
                  id="editMenuId"
                  name="menuId"
                  value={formData.menuId}
                  onChange={handleChange}
                  disabled={submitting}
                >
                  <option value="">Select a menu</option>
                  {menus.map(menu => (
                    <option key={menu.menuId} value={menu.menuId}>
                      {menu.menuName}
                    </option>
                  ))}
                </select>
                {errors.menuId && (
                  <div className="invalid-feedback">{errors.menuId}</div>
                )}
              </div>

              {/* Description */}
              <div className="mb-3">
                <label htmlFor="editDescription" className="form-label">
                  Description <span className="text-danger">*</span>
                </label>
                <textarea
                  className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  id="editDescription"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  maxLength={100}
                  rows="3"
                  placeholder="Brief description of the category"
                  disabled={submitting}
                ></textarea>
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>

              {/* Image Upload */}
              <div className="mb-3">
                <label htmlFor="editImageFile" className="form-label">
                  Category Image <span className="text-muted">(Optional)</span>
                </label>
                <input
                  type="file"
                  className={`form-control ${errors.imageFile ? 'is-invalid' : ''}`}
                  id="editImageFile"
                  name="imageFile"
                  onChange={handleFileChange}
                  accept="image/jpeg,image/jpg,image/png,image/gif"
                  disabled={submitting}
                />
                {errors.imageFile && (
                  <div className="invalid-feedback">{errors.imageFile}</div>
                )}
                <small className="form-text text-muted">
                  Allowed formats: JPG, JPEG, PNG, GIF (Max 5MB)
                </small>
                
                {/* Image Preview */}
                {imagePreview && (
                  <div className="mt-3">
                    <p className="mb-2"><strong>Current Image:</strong></p>
                    <img 
                      src={imagePreview.startsWith('data:') ? imagePreview : `../${imagePreview}`}
                      alt="Category preview" 
                      style={{
                        maxWidth: '200px',
                        maxHeight: '200px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        padding: '5px'
                      }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                )}
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
                    Updating...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save me-2"></i>
                    Update Category
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

export default EditCategoryModal;
