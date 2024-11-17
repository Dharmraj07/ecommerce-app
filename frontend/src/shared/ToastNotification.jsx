import React from "react";
import { Toast } from "react-bootstrap";

const ToastNotification = ({ show, message, variant, onClose }) => (
  <Toast
    show={show}
    onClose={onClose}
    bg={variant}
    className="position-fixed bottom-0 end-0 m-3"
    delay={3000}
    autohide
  >
    <Toast.Body>{message}</Toast.Body>
  </Toast>
);

export default ToastNotification;
