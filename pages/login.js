import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { sendSignInLinkToEmail } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../firebase-config"; // Ensure this points to your Firebase initialization

const Login = () => {
  const [email, setEmail] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const router = useRouter();

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleLogin = async () => {
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: "http://localhost:3000/dashboard", // Adjust this URL as necessary
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      // The link was successfully sent. Inform the user.
      setSnackbarMessage("Check your email for the sign-in link.");
      setSnackbarSeverity("success");
      // Save the email locally to complete the sign-in process when they return.
      window.localStorage.setItem("emailForSignIn", email);
    } catch (error) {
      console.error("Error sending sign-in link:", error);
      if (error.code === "auth/user-not-found") {
        // User not found, prompt to register
        setSnackbarMessage(
          "No account found with that email. Please register."
        );
        setSnackbarSeverity("error");
        // Optionally, redirect to the register page
        // router.push('/register');
      } else {
        // Handle other errors
        setSnackbarMessage("Failed to send sign-in link. Please try again.");
        setSnackbarSeverity("error");
      }
    } finally {
      setSnackbarOpen(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Login
      </Typography>
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
      <Button type="button" fullWidth variant="contained" onClick={handleLogin}>
        Send Sign-in Link
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
