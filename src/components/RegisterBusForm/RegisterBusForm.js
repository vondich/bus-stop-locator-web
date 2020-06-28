import React, { useState } from 'react';
import {Modal, Button} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { registerNewBus } from '../../services/Api/Api'
import _has from 'lodash/has';

function RegisterBusForm(props) {
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmitClick = values => {
        const payload = {
            "code": values.code,
            "first_arrival_time": values.firstArrivalTime,
            "last_arrival_time": values.lastArrivalTime,
        }

        registerNewBus(props.busStopId, payload)
            .then(response => {
                props.onSuccess(response)
                // reset form to clear form values
                formik.handleReset();
                setErrorMessage(null);
                handleClose();
            })
            .catch(error => {
                // handle validation errors
                if (_has(error, 'validationErrors.code')) {
                    formik.errors.code = error.validationErrors.code
                }
                if (_has(error, 'validationErrors.first_arrival_time')) {
                    formik.errors.firstArrivalTime = error.validationErrors.first_arrival_time
                }
                if (_has(error, 'validationErrors.last_arrival_time')) {
                    formik.errors.lastArrivalTime = error.validationErrors.last_arrival_time
                }
                setErrorMessage(error.errorMessage);
                console.log(error);
            });
    }

    const busSchema = yup.object({
        code: yup.string()
            .matches('^[a-zA-Z0-9]*$', 'Bus code must be alphanumeric.')
            .max(10)
            .required(),
        firstArrivalTime: yup.string()
            .max(5, 'First arrival time must be in HH:mm format')
            .required(),
        lastArrivalTime: yup.string()
            .max(5, 'Last arrival time must be in HH:mm format')
            .required(),
      });

    const formik = useFormik({
        initialValues: { code: '', firstArrivalTime: '', lastArrivalTime: '' },
        validationSchema: busSchema,
        onSubmit: handleSubmitClick,
    });

    return (
      <>
        <Button disabled={props.disabled} variant="primary" onClick={handleShow} >
          Register new bus
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title>Register bus for bus stop {props.code}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { errorMessage && <div className="alert alert-danger" role="alert"> { errorMessage } </div> }
            <form>
                <div className="form-group text-left">
                    <label>Bus Code</label>
                    <input type="text" 
                       className="form-control" 
                       id="code" 
                       placeholder="Enter Bus Code" 
                       value={formik.values.code}
                       onChange={formik.handleChange}
                    />
                    {formik.errors.code ? <small className="form-text text-muted">{formik.errors.code}</small> : null}
                </div>
                <div className="form-group text-left">
                    <label>First Arrival Time</label>
                    <input type="text" 
                       className="form-control" 
                       id="firstArrivalTime" 
                       placeholder="Enter First Arrival Time" 
                       value={formik.values.firstArrivalTime}
                       onChange={formik.handleChange}
                    />
                    {formik.errors.firstArrivalTime ? <small className="form-text text-muted">{formik.errors.firstArrivalTime}</small> : null}
                </div>
                <div className="form-group text-left">
                    <label>Last Arrival Time</label>
                    <input type="text" 
                       className="form-control" 
                       id="lastArrivalTime" 
                       placeholder="Enter Last Arrival Time" 
                       value={formik.values.lastArrivalTime}
                       onChange={formik.handleChange}
                    />
                    {formik.errors.lastArrivalTime ? <small className="form-text text-muted">{formik.errors.lastArrivalTime}</small> : null}
                </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={formik.handleSubmit}>
              Register
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  export default RegisterBusForm;