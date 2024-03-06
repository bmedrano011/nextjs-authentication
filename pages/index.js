import * as React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import Link from "next/link"; // Assuming use of Next.js's Link for navigation
import { useEffect, useState } from "react";

export default function Index() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to My Next.js Application
        </Typography>
        <Typography variant="body1" gutterBottom>
          Get started by either logging in or registering a new account.
        </Typography>
        <Box mt={2} display="flex" gap={2}>
          <Link href="/login" passHref>
            <Button variant="contained" color="primary">
              Login
            </Button>
          </Link>
          <Link href="/register" passHref>
            <Button variant="contained" color="secondary">
              Register
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
