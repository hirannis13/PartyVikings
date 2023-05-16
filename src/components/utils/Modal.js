import styled from "@emotion/styled";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import Iconify from "./Iconify";
import useModal from "../../hooks/useModal";

const Modal = ({ title, content }) => {
  const { openModal, updateModalState } = useModal();

  const handleClose = () => {
    updateModalState(false);
  };

  return (
    <ModalStyle>
      <Dialog onClose={handleClose} maxWidth="md" fullWidth open={openModal}>
        <DialogTitle
          sx={{
            textAlign: "center",
          }}
        >
          {title}

          <IconButton
            sx={{ position: "absolute", right: "3%", top: "5%" }}
            onClick={handleClose}
          >
            <Iconify icon={"majesticons:close"} />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            marginTop: 3,
          }}
        >
          {content}
        </DialogContent>
      </Dialog>
    </ModalStyle>
  );
};

const ModalStyle = styled("div")`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Modal;
