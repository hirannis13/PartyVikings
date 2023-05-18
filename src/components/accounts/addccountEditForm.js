import { imageContainer } from "../../pages/signUp";
import { Box, Grid, TextField, Button } from "@mui/material";
import { useState } from "react";
import { editUser } from "../../service/authService";
import useModal from "../../hooks/useModal";

function AccountEditForm() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const { updateModalState } = useModal();

  const validateName = () => {
    if (name.trim() === "") {
      setNameError("Name cannot be empty");
      return false;
    }
    setNameError("");
    return true;
  };

  const handleImageSelect = (imageId) => {
    const selectedImg = imageContainer.find((img) => img.id === imageId);
    setSelectedImage(selectedImg);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isNameValid = validateName();

    if (isNameValid) {
      const data = new FormData(event.currentTarget);
      try {
        editUser(data.get("name"), selectedImage);
        console.log("User edited successfully");
        updateModalState(false);
      } catch (error) {
        console.log("Error editing user", error);
        alert("there was an error");
        updateModalState(false);
      }
    }
  };

  return (
    <>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!nameError}
              helperText={nameError}
            />
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            marginTop: "1rem",
            marginBottom: "1rem",
            justifyContent: "space-evenly",
          }}
        >
          {imageContainer.map((img) => (
            <Grid key={img.id} item>
              <img
                src={img.imgUrl}
                alt={`Viking img ${img.id}`}
                onClick={() => handleImageSelect(img.id)}
                style={{
                  cursor: "pointer",
                  filter:
                    selectedImage?.id === img.id
                      ? "drop-shadow(0 0 5px blue)"
                      : "none",
                }}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Confirm Edit
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                updateModalState(false);
              }}
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default AccountEditForm;
