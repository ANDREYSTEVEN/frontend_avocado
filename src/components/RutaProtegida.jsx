import { Navigate } from "react-router-dom";

export default function RutaProtegida({ children, soloAdmin = false }) {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol"); // "cliente" o "admin"

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (soloAdmin && rol !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
