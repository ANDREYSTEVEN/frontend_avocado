import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Crear() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/productos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre,
          precio: parseFloat(precio),
          imagen_url: imagenUrl,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Error al crear producto");
      }

      alert("Producto creado correctamente");
      navigate("/panel/productos");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="my-4" style={{ maxWidth: "600px" }}>
      <h2>Crear nuevo producto</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>URL de imagen</Form.Label>
          <Form.Control
            type="text"
            value={imagenUrl}
            onChange={(e) => setImagenUrl(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="success">
          Guardar producto
        </Button>
      </Form>
    </Container>
  );
}
