import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import apiClient from '../../api/apiClient';

function EditFoodItemModal({ show, onHide, onSuccess, foodItem }) {
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    moreDetails: '',
    price: '',
    currencyId: 1,
    categoryId: '',
    subcategoryId: '',
    imageUrl1: '',
    imageUrl2: '',
    imageUrl3: '',
    imageUrl4: '',
    videoLink: '',
    blogLink: ''
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show && foodItem) {
      setFormData({
        itemName: foodItem.itemName || '',
        description: foodItem.description || '',
        moreDetails: foodItem.moreDetails || '',
        price: foodItem.price || '',
        currencyId: foodItem.currencyId || 1,
        categoryId: foodItem.categoryId || '',
        subcategoryId: foodItem.subcategoryId || '',
        imageUrl1: foodItem.imageUrl1 || '',
        imageUrl2: foodItem.imageUrl2 || '',
        imageUrl3: foodItem.imageUrl3 || '',
        imageUrl4: foodItem.imageUrl4 || '',
        videoLink: foodItem.videoLink || '',
        blogLink: foodItem.blogLink || ''
      });
      fetchCategories();
    }
  }, [show, foodItem]);

  useEffect(() => {
    if (formData.categoryId) {
      fetchSubcategories(formData.categoryId);
    } else {
      setSubcategories([]);
    }
  }, [formData.categoryId]);

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get('/categories');
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.itemName.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Item name is required'
      });
      return;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Price must be greater than 0'
      });
      return;
    }

    if (!formData.categoryId) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please select a category'
      });
      return;
    }

    setLoading(true);

    try {
      const submitData = {
        itemName: formData.itemName.trim(),
        description: formData.description.trim() || undefined,
        moreDetails: formData.moreDetails.trim() || undefined,
        price: parseFloat(formData.price),
        currencyId: parseInt(formData.currencyId),
        categoryId: parseInt(formData.categoryId),
        subcategoryId: formData.subcategoryId ? parseInt(formData.subcategoryId) : undefined,
        imageUrl1: formData.imageUrl1.trim() || undefined,
        imageUrl2: formData.imageUrl2.trim() || undefined,
        imageUrl3: formData.imageUrl3.trim() || undefined,
        imageUrl4: formData.imageUrl4.trim() || undefined,
        videoLink: formData.videoLink.trim() || undefined,
        blogLink: formData.blogLink.trim() || undefined
      };

      await apiClient.patch(`/food-items/${foodItem.foodItemId}`, submitData);

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Food item updated successfully',
        timer: 2000,
        showConfirmButton: false
      });

      onSuccess();
      onHide();
    } catch (error) {
      console.error('Error updating food item:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to update food item'
      });
    } finally {
      setLoading(false);
    }
  };

  if (!foodItem) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="fas fa-edit me-2"></i>
          Edit Food Item
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="row">
            {/* Basic Information */}
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>
                  Item Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  placeholder="Enter item name"
                  required
                  maxLength={100}
                />
              </Form.Group>
            </div>

            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>
                  Price <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  required
                  min="0"
                  step="0.01"
                />
              </Form.Group>
            </div>

            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>
                  Category <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.categoryId} value={category.categoryId}>
                      {category.categoryName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>

            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Subcategory (Optional)</Form.Label>
                <Form.Select
                  name="subcategoryId"
                  value={formData.subcategoryId}
                  onChange={handleChange}
                  disabled={!formData.categoryId}
                >
                  <option value="">Select Subcategory</option>
                  {subcategories.map((subcategory) => (
                    <option key={subcategory.subcategoryId} value={subcategory.subcategoryId}>
                      {subcategory.subcategoryName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>

            <div className="col-12 mb-3">
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  rows={2}
                />
              </Form.Group>
            </div>

            <div className="col-12 mb-3">
              <Form.Group>
                <Form.Label>More Details</Form.Label>
                <Form.Control
                  as="textarea"
                  name="moreDetails"
                  value={formData.moreDetails}
                  onChange={handleChange}
                  placeholder="Enter additional details"
                  rows={2}
                />
              </Form.Group>
            </div>

            {/* Image URLs */}
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Image URL 1</Form.Label>
                <Form.Control
                  type="text"
                  name="imageUrl1"
                  value={formData.imageUrl1}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                  maxLength={255}
                />
              </Form.Group>
            </div>

            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Image URL 2</Form.Label>
                <Form.Control
                  type="text"
                  name="imageUrl2"
                  value={formData.imageUrl2}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                  maxLength={255}
                />
              </Form.Group>
            </div>

            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Image URL 3</Form.Label>
                <Form.Control
                  type="text"
                  name="imageUrl3"
                  value={formData.imageUrl3}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                  maxLength={255}
                />
              </Form.Group>
            </div>

            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Image URL 4</Form.Label>
                <Form.Control
                  type="text"
                  name="imageUrl4"
                  value={formData.imageUrl4}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                  maxLength={255}
                />
              </Form.Group>
            </div>

            {/* Video and Blog Links */}
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Video Link</Form.Label>
                <Form.Control
                  type="text"
                  name="videoLink"
                  value={formData.videoLink}
                  onChange={handleChange}
                  placeholder="Enter video URL"
                  maxLength={255}
                />
              </Form.Group>
            </div>

            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Blog Link</Form.Label>
                <Form.Control
                  type="text"
                  name="blogLink"
                  value={formData.blogLink}
                  onChange={handleChange}
                  placeholder="Enter blog URL"
                  maxLength={255}
                />
              </Form.Group>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="secondary" onClick={onHide} disabled={loading}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Updating...
                </>
              ) : (
                <>
                  <i className="fas fa-save me-2"></i>
                  Update Food Item
                </>
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditFoodItemModal;
