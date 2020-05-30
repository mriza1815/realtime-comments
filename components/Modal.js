import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";

const FormModal = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { handleClose, onSave, show } = props;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Email İle Giriş</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              aria-label="Email"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => onSave(email, password)}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

FormModal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  onSave: PropTypes.func,
};

FormModal.defaultProps = {
  show: false,
};

export default FormModal;
