import React, { useState, useEffect } from "react";
import axios from "axios";
import dash from './P.module.css'
import { Modal, Button } from "react-bootstrap";
import Footer from '../../components/Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faList,
  faExclamationCircle,
  faSort,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import Status from "../Status/Status";


function Dashboard() {


  const [sortOption, setSortOption] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [filterOption, setFilterOption] = useState([]);
  const [items, setItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showSort, setShowSort] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Default");
  const [currenPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newQuantity, setNewQuantity] = useState("");


  const itemsToDisplay = items.slice(
    (currenPage - 1) * itemsPerPage,
    currenPage * itemsPerPage
  );


  function handlePageChange() {
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
      <div className={dash.pagination_container}>
        <button
          className={dash.pagination_button}
          class={currenPage === 1 ? 'btn-sm btn-light' : 'btn-sm btn-grey'}
          onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          disabled={currenPage === 1}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className={dash.page_numbers}>
          {pageNumbers.map((pageNumber) => (
            <button
              class='btn btn-primary'
              key={pageNumber}
              className={dash.pagination_button}
              disabled={pageNumber === currenPage}
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <button
          class={currenPage === totalPages ? 'btn-sm btn-light' : 'btn-sm btn-grey'}
          className={dash.pagination_button} onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          disabled={currenPage === totalPages}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    );
  }



  useEffect(() => {
    const fetchitems = async () => {
      try {


        const url = 'http://localhost:5000/api/products/';
        const response = await axios.get(url);

        if (response.status === 200) {
          console.log('Success')
          console.log(response.data)
          setItems(response.data);
        }
        else {
          console.log(response.message)
          handleError('Failed Fetching products');
        }

      } catch (error) {
        console.error("Error fetching items:", error.message);
        handleError();

      }
    };
    fetchitems();
  }, [sortOption, sortOrder, filterOption]);


  const sortingOptions = [
    { label: 'All', icon: faList },
    { label: 'Out-of-Stock', icon: faExclamationCircle },
    { label: 'Avaialable', icon: faCheckCircle }
  ];




  const handleSuccess = () => {
    setSuccessMessage('Success');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleError = () => {
    setErrorMessage('Something went wrong. Please try again.');
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };


  const handleAdd = () => {
    window.location = "/sell";
  }


  const handleEdit = async (item) => {
    setSelectedItem(item);
    setNewName(item.name);
    setNewDescription(item.description);
    setNewPrice(item.price);
    setNewQuantity(item.quantity);

    setShowEditModal(true);
  };

  const handleSave = async () => {
    try {
      const url = `http://localhost:5000/api/products/edit/${selectedItem.id}`;
      const updatedItem = {
        name: newName.toUpperCase(),
        description: newDescription,
        unitPrice: newPrice,
        quantity: newQuantity,

      };
      const response = await axios.put(url, updatedItem);

      if (response.status === 200) {
        setItems(
          items.map((item) =>
            item.id === selectedItem.id ? { ...item, ...updatedItem } : item
          )
        );
        setShowEditModal(false);
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.error("Error editing item:", error.message);
    }
  };


  const handleDelete = (id) => {
    setSelectedItemId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const url = `http://localhost:5000/api/products/delete/${selectedItemId}`;
      const response = await axios.delete(url);

      if (response.status === 200) {
        setItems(items.filter((item) => item.id !== selectedItemId));
        setShowModal(false)
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.error("Error deleting item:", error.message);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const openSort = () => {
    setShowSort(!showSort);
  };

  const filteredOptions = sortingOptions.filter((option) => option.label !== selectedOption);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);

    if (option === "All") {
      setSortOption("");
      setSortOrder("");
    }
    if (option === "Available") {
      setSortOption("name");
      setSortOrder("asc");
    }
    if (option === "Out-of-Stock") {
      setSortOption("unitPrice");
      setSortOrder("desc");
    }
    setShowSort(false);
  };


  const openProductDetails = (productId) => {
    const product = items.find((p) => p.id === productId);
    setSelectedProduct(product);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };



  return (
    <>
      {successMessage && <Status message={successMessage} type="success" />}
      {errorMessage && <Status message={errorMessage} type="error" />}
      <div className={dash.mainContainer}>
        <h2>Products</h2>
        <p>Showing {items.length} items</p>
        <br />
        <div className={dash.top}>

          <div className={dash.toggleDropdown}>
            <p> Show :
              <span onClick={() => { openSort() }}> <FontAwesomeIcon icon={faSort} style={{ marginLeft: '10px' }} />   {selectedOption}</span>
            </p>
          </div>
        </div>
        <br />
        <div >
          <button
            onClick={() => handleAdd()}
            class='btn btn-outline-grey'
          >Add New Product</button>
        </div>
        {showSort && (
          <div className={dash.sortOptions}>
            <div className={dash.inSortOptions}>
              <ul>
                {filteredOptions.map((option) => (
                  <li key={option.label} onClick={(e) => handleOptionSelect(option.label)}>
                    <FontAwesomeIcon icon={option.icon} style={{ marginRight: '10px' }} />
                    {option.label}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        )}
        <br />
        {items.length === 0 && <p className={dash.noItem}>No items found.</p>}
        <div className={dash.container}>
          

          {/* Main content */}
          {/* <div className={dash.content}>
            {items.length === 0 && <p className={dash.noItem}>No items found.</p>}
            {itemsToDisplay.map((item) => (
              <div key={item.id} className={dash.productItem} onClick={() => openProductDetails(item.id)}>
                <h2>{item.name}</h2>
                <b>ETB: {item.price}</b>

                <p>Quantity: {item.quantity}</p>
              </div>
            ))}

            {selectedProduct && (

              <div className={dash.productDetailsModal}>
                <div className={dash.productDetails}>
                  <button className={dash.closeButton} onClick={closeProductDetails}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                  <p className="description">
                    Description:{" "}
                    {selectedProduct.description.length > 10
                      ? `${selectedProduct.description.slice(0, 10)}...`
                      : selectedProduct.description}{" "}
                    {selectedProduct.description.length < 100 && (
                      <button className="btn btn-link" onClick={handleShowFullDescription}>
                        See More
                      </button>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div> */}
      
         
          <table className="table table-striped">
            <thead>
              <tr>
                {/* <th scope="col">ID</th> */}
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Description</th>
                <th scope="col ">Actions</th>

              </tr>
            </thead>
            <tbody>
              {itemsToDisplay.map((item) => (
                <tr key={item.id}>
                  {/* <th scope="row">{item.id}</th> */}
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.description}</td>
                  <td>
                    <button className="btn-sm btn-outline-primary" onClick={() => handleEdit(item)}>Edit</button>
                    <button className="btn-sm btn-outline-danger ml-2" onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
            
          </table>
          
          <Modal show={showModal} onHide={handleCancelDelete}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete?</Modal.Body>
            <Modal.Footer>
              <Button variant="light" onClick={handleCancelDelete}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleConfirmDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showEditModal}
            onHide={() => setShowEditModal(false)}
            dialogClassName='custom-modal'
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <label htmlFor="title">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  min={1}
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="light" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        {handlePageChange()}
      </div>
        
      <Footer />
    </>
  );
}

export default Dashboard;
