import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Modal, Button, InputGroup, FormControl } from "react-bootstrap";

const FormModal = (props) => {
  const [isLogin, setLogin] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { handleClose, onSave, show } = props;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{`${isLogin ? 'Login' : 'Register'} with Email`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
        <Form.Check checked={isLogin} type="checkbox" className="mb-3" id="default-checkbox" label="I already have an account" onChange={e => setLogin(s => !s)} />
          {!isLogin && <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Full Name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={name}
              type="text"
              onChange={e => setName(e.target.value)}
              placeholder="Full Name"
              aria-label="Full Name"
              aria-describedby="basic-addon1"
            />
          </InputGroup> || null}
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={email}
              type="email"
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
              type="password"
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
        <Button variant="primary" onClick={() => onSave(isLogin, name, email, password)}>
          {isLogin ? "Login" : "Register"}
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
