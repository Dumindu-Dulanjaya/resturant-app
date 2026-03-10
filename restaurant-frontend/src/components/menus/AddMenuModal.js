import React, { useState } from 'react';
import apiClient from '../../api/apiClient';
import Swal from 'sweetalert2';

function AddMenuModal({ show, onHide, onSuccess }) {
  const [formData, setFormData] = useState({
    menuName: '',
    description: '',
    imageUrl: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
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
      let uploadedImageUrl = '';

      // Upload image first if a file is selected
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

      // Use uploaded image URL or provided URL
      if (uploadedImageUrl) {
        payload.imageUrl = uploadedImageUrl;
      } else if (formData.imageUrl.trim()) {
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
      setSelectedFile(null);
      setImagePreview(null

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preSelectedFile(null);
      setImagePreview(null);
      setventDefault();

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
                  value={pload */}
              <div className="mb-3">
                <label htmlFor="imageFile" className="form-label">
                  Menu Image <span className="text-muted">(Optional)</span>
                </label>
                <input
                  type="file"
                  className={`form-control ${errors.imageFile ? 'is-invalid' : ''}`}
                  id="imageFile"
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
                    <p className="mb-2"><strong>Preview:</strong></p>
                    <img 
                      src={imagePreview}
                      alt="Menu preview" 
                      style={{
                        maxWidth: '200px',
                        maxHeight: '200px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        padding: '5px'
                      }}
                    />
                  </div>
                )}ge={handleChange}
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
