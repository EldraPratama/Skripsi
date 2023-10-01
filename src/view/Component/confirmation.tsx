// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactNode } from "react";
import { Box, Stack, Button } from "@mui/material";
import Modal from "@mui/material/Modal";

interface Props {
  open: boolean;
  handleClose?: () => void;
  description?: string;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  titleStyle?: React.CSSProperties;
  descriptionStyle?: React.CSSProperties;
  handleConfirm: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const ConfirmationModal = ({
  open,
  handleClose,
  title,
  description,
  confirmText,
  cancelText,
  titleStyle,
  descriptionStyle,
  handleConfirm,
}: Props) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-description"
      aria-describedby="modal-modal-description"
      sx={{ zIndex: "100000" }}
    >
      <Box sx={style}>
        {title && (
          <h4 style={titleStyle}>{title ?? "Konfirmasi"}</h4>
        )}
        {description && (
          <h5 style={descriptionStyle}>{description}</h5>
        )}
        <Stack
          direction={"row"}
          spacing={1}
          margin={"10px 0 0 0"}
          justifyContent={"center"}
        >
          <Button 
            variant="contained" 
            color="success" 
            style={{ fontWeight: "bold", borderRadius:"25px", marginTop:"20px", width:"100px" }}
            onClick={handleConfirm}
          >
            {confirmText ?? "Iya"}
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            style={{ fontWeight: "bold", borderRadius:"25px", marginTop:"20px", width:"100px" }}
            onClick={handleClose}
          >
            {cancelText ?? "Tidak"}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
