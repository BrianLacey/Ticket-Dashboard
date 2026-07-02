import { useEffect, useContext } from "react";
import { Alert, Zoom, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AlertContext } from "../contexts";

export const PopAlert = () => {
  // @ts-ignore
  const { alertProps, setAlertProps } = useContext(AlertContext);

  useEffect(() => {
    if (alertProps.isOpen) {
      setTimeout(() => {
        // @ts-ignore
        setAlertProps((prevData) => ({ ...prevData, isOpen: false }));
      }, 5000);
    }
  }, [alertProps.isOpen]);

  return (
    <Zoom in={alertProps.isOpen}>
      <Alert
        severity={alertProps.type}
        action={
          <IconButton
            onClick={() =>
              // @ts-ignore
              setAlertProps((prevData) => ({ ...prevData, isOpen: false }))
            }
          >
            <CloseIcon />
          </IconButton>
        }
      >
        {alertProps.message}
      </Alert>
    </Zoom>
  );
};
