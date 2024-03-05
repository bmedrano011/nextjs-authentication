import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
} from "firebase/auth"; // Ensure correct import
import { auth } from "../firebase-config";

const Register = () => {
  const [email, setEmail] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleRegister = async () => {
    try {
      // Attempt to create a new user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        "defaultPassword"
      );
      // If successful, send the sign-in link to the email
      const actionCodeSettings = {
        url: "http://localhost:3000/dashboard", // Make sure this is your correct redirect URL
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      setSnackbarMessage(
        "Registration successful. Check your email to complete registration."
      );
      setSnackbarSeverity("success");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setSnackbarMessage("Email is already registered. Please log in.");
        setSnackbarSeverity("error");
      } else {
        console.error("Error during registration:", error);
        setSnackbarMessage("Failed to register. Please try again.");
        setSnackbarSeverity("error");
      }
    } finally {
      setSnackbarOpen(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleRegister}
          >
            Send Sign-in Link
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;
