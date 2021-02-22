import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
export default function AlertMessage({ alertMessage, setAlertMessage }) {
  let history = useHistory();

  useEffect(() => {
    return () => {
      history.push("/");
    };
  }, []);

  return (
    <div style={{ padding: "15px" }}>
      <Alert variant='danger' onClose={() => setAlertMessage(null)} dismissible>
        <Alert.Heading>Oh snap! You got an error {alertMessage}!</Alert.Heading>
      </Alert>
    </div>
  );
}
