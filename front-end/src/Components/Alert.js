import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
export default function AlertMessage(props) {
  const { alertMessage } = props;
  const [forClose, setForClose] = useState(false);
  let history = useHistory();

  useEffect(() => {
    if (forClose) {
      history.push("/");
    }
  }, [forClose]);

  return (
    <Alert variant='danger' onClose={() => setForClose(true)} dismissible>
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>{alertMessage}</p>
    </Alert>
  );
}
