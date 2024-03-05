import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase-config"; // Adjust based on your actual import

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login"); // Redirect to login if not authenticated
      }
    });
  }, [router]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push("/login"); // Redirect to login after logout
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
