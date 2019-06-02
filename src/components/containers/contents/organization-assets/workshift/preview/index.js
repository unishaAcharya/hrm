import React from "react";
import Modal from 'react-bootstrap-modal';

const Preview = (props) => (
    <Modal
        show={props.open}
        onHide={props.hidePreviewModal}
        aria-labelledby="ModalHeader"
    >
        <Modal.Header closeButton>
            <Modal.Title id='ModalHeader'>Workshift details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <label>Workshift Name: {props.data.workshiftType}</label><br />
            <label>Start Time: {props.data.workshiftStartTime}</label><br />
            <label>End Time: {props.data.workshiftEndTime}</label><br />
            <label>Working Minutes: {props.data.workingMinutes} min</label><br />
            <label>Over Time: {props.data.isOvertimeApplicable}</label><br />
            <label>Over Time: {(props.data.isOvertimeApplicable) ? props.data.overtimeMinutes : ''} min</label>
        </Modal.Body>
        <Modal.Footer>
            <Modal.Dismiss className='btn btn-info'>Close</Modal.Dismiss>
        </Modal.Footer>
    </Modal>
);

export default Preview;
