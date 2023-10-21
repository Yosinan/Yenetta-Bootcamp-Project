import React, { useEffect, useState } from 'react'
import './addprod.css'
import Status from '../../components/Status/Status';
import axios from 'axios';
import { Form, Button } from "react-bootstrap";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddProd = () => {


  const [currentStep, setCurrentStep] = useState(0);
  const [stepStatuses, setStepStatuses] = useState([false, false, false]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [validated, setValidated] = useState(false);
  const [available, setAvailable] = useState(true);


  useEffect(() => {
    if (name && price && description && quantity) {
      setValidated(true);
    }
  }, [name, price, description, quantity]);



  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  }

  const handleAvailableChange = (event) => {
    setAvailable(event.target.checked);
  };

  const handleKeyPress = (event) => {
    if (event.key === '-' || event.key === '+' || event.key === 'e') {
      event.preventDefault();
    }
  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    try {

      await axios.post("http://localhost:5000/api/products/add", {
        name,
        price,
        quantity,
        dateAdded: new Date().toLocaleDateString(),
        description,
        available,
      });

      setName("");
      setPrice("");
      setDescription("");
      setQuantity("");
      handleSuccess();

      window.location = "/";
    } catch (error) {

      console.error("Error posting item:", error.message);
      handleError();
    }

    setValidated(true);
  };

  const handleSuccess = () => {
    setSuccessMessage('Item posted successfully.');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleError = (text = 'Something went wrong. Please try again.') => {
    setErrorMessage(text);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  const handleNextClick = () => {

    const updatedStepStatuses = [...stepStatuses];
    updatedStepStatuses[currentStep] = true;
    setStepStatuses(updatedStepStatuses);

    setCurrentStep(currentStep + 1);



  };

  const handlePreviousClick = () => {
    const updatedStepStatuses = [...stepStatuses];
    updatedStepStatuses[currentStep] = false;
    setStepStatuses(updatedStepStatuses);

    setCurrentStep(currentStep - 1);
  };

  const handleStepClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };



  return (
    <>
      {successMessage && <Status message={successMessage} type="success" />}
      {errorMessage && <Status message={errorMessage} type="error" />}
      <button className='btn btn-outline-grey' onClick={() => window.location = "/"}><FontAwesomeIcon icon={faArrowLeft} /> Go back</button>
      <div>
        <div class="wrapper">
          <Form noValidate validated={validated} id="order-form" onSubmit={handleSubmit}>
            <Form.Group className="ordershadow" id="wizard" controlId="formName">
              <h3>Post Item</h3>
              <ul className="steps">
                {["", ""].map((step, index) => (
                  <li key={index} className={`${stepStatuses[index] ? "completed" : ""
                    } ${currentStep === index ? "checked" : ""}`}>
                    <a className='' onClick={() => handleStepClick(index)}>{step}</a>
                  </li>
                ))}
              </ul>
              <h4></h4>
              {currentStep === 0 && (
                <section>
                  <span class="required-indicator">*</span>
                  <div class="form-row">
                    <input
                      required
                      type="text"
                      class="form-control-lg"
                      placeholder="Product Name"
                      value={name}
                      onChange={handleNameChange} />
                  </div>
                  <span class="required-indicator">*</span>
                  <div class="form-row">
                    <input
                      required
                      type="number"
                      class="form-control-lg"
                      value={price}
                      min={1}
                      onKeyDown={handleKeyPress}
                      onChange={handlePriceChange}
                      placeholder="Price" />
                  </div>
                  <span class="required-indicator">*</span>
                  <div class="form-row">
                    <input
                      required
                      type="number"
                      class="form-control-lg"
                      value={quantity}
                      min={1}
                      onKeyDown={handleKeyPress}
                      onChange={handleQuantityChange}
                      placeholder="Quantity" />
                  </div>
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={available}
                      onChange={handleAvailableChange} />
                    <label className="form-check-label">Available</label>
                  </div>
                  <span class="required-indicator">*</span>
                  <div class="form-row" style={{ marginBottom: "18px" }}>
                    <textarea
                      class="form-control-lg"
                      placeholder="Description"
                      value={description}
                      onChange={handleDescriptionChange}
                      style={{ Height: "108px" }}>
                    </textarea>
                  </div>
                  <button className='btn btn-primary' onClick={handleNextClick}><FontAwesomeIcon icon={faArrowRight} /></button>
                </section>
              )}



              <h4></h4>
              {currentStep === 1 && (
                <>
                  {validated ? (
                    <section className='svg'>
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                        <circle class="path circle" fill="none" stroke="#73AF55" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                        <polyline class="path check" fill="none" stroke="#73AF55" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
                      </svg>
                      <p>Ready to Post </p>
                      <button type="submit" className='btn-lg btn-success'>Post</button>
                    </section>
                  ) : (
                    <section>
                      <p className="error-message">Please fill in all required fields.</p>
                      <button className='btn btn-outline-danger' onClick={handlePreviousClick}>Go Back</button>
                    </section>
                  )}

                </>
              )}
            </Form.Group>
          </Form>
        </div>
      </div>

    </>
  )
}


export default AddProd;
