import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import Swal from 'sweetalert2';

function EditMenuModal({ show, onHide, onSuccess, menu }) {
  const [formData, setFormData] = useState({
    menuName: '',
    description: '',
    imageUrl: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Populate form when menu prop changes
  useEffect(() => {
    if (menu) {
      setFormData({
        menuName: menu.menuName || '',
        description: menu.description || '',
        imageUrl: menu.imageUrl || ''
      });
      setImagePreview(menu.imageUrl || null);
      setSelectedFile(null);
      setErrors({});
    }
  }, [menu]);

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
      let uploadedImageUrl = '';

      // Upload image first if a new file is selected
      if (selectedFile) {
        const formDataToUpload = new FormData();
        formDataToUpload.append('image', selectedFile);

        try {
          const uploadResponse = await apiClient.post('/menus/upload-image', formDataToUpload, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          uploadedImageUrl = uploadResponse.data.imageUrl;
        } catch (uploadError) {
          console.error('Error uploading image:', uploadError);
          Swal.fire({
            icon: 'error',
            title: 'Upload Error',
            text: 'Failed to upload image. Please try again.',
          });
          setSubmitting(false);
          return;
        }
      }

      const payload = {
        menuName: formData.menuName.trim(),
        description: formData.description.trim(),
      };

      // Use uploaded image URL, or keep existing one
      if (uploadedImageUrl) {
        payload.imageUrl = uploadedImageUrl;
      } else if (formData.imageUrl.trim()) {
        payload.imageUrl = formData.imageUrl.trim();
      }

      const response = await apiClient.patch(`/menus/${menu.menuId}`, payload);

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Menu updated successfully',
        timer: 2000,
        showConfirmButton: false
      });

      // Close modal and refresh list
      onHide();
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      console.error('Error updating menu:', error);
      
      let errorMessage = 'Failed to update menu';
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
      setSelectedFile(null);
      setImagePreview(null);
      onHide();
    }
  };

  if (!show || !menu) return null;

  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="fas fa-edit me-2"></i>
              Edit Menu
            </h5>
            <button type="button" className="btn-close" onClick={handleClose} disabled={submitting}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {/* Menu Name */}
              <div className="mb-3">
                <label htmlFor="editMenuName" className="form-label">
                  Menu Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.menuName ? 'is-invalid' : ''}`}
                  id="editMenuName"
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
                  placeholder="Brief description of the menu"
                  disabled={submitting}
                ></textarea>
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>

              {/* Image Upload */}
              <div className="mb-3">
                <label htmlFor="editMenuImage" className="form-label">
                  Menu Image <span className="text-muted">(Optional)</span>
                </label>
                <input
                  type="file"
                  className={`form-control ${errors.imageFile ? 'is-invalid' : ''}`}
                  id="editMenuImage"
                  accept="image/jpeg,image/jpg,image/png,image/gif"
                  onChange={handleFileChange}
                  disabled={submitting}
                />
                {errors.imageFile && (
                  <div className="invalid-feedback">{errors.imageFile}</div>
                )}
                <small className="form-text text-muted">
                  Accepted formats: JPG, JPEG, PNG, GIF (max 5MB)
                </small>
                
                {/* Image Preview */}
                {imagePreview && (
                  <div className="mt-2">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      style={{
                        maxWidth: '200px',
                        maxHeight: '200px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        border: '1px solid #ddd'
                      }}
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
                    Update Menu
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

export default EditMenuModal;
