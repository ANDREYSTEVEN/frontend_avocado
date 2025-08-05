import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";

export default function Editar() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!id) {
      setError("ID de producto no especificado");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/productos${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar el producto");
        return res.json();
      })
      .then((producto) => {
        setNombre(producto.nombre);
        setPrecio(producto.precio);
        setImagenUrl(producto.imagen_url || "");
      })
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/productos${id}`, {
        method: "PUT",
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
        throw new Error(err.message || "Error al actualizar producto");
      }

      alert("Producto actualizado correctamente");
      navigate("/panel/productos");
    } catch (err) {
      setError(err.message);
    }
  };

  if (cargando) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="my-4" style={{ maxWidth: "600px" }}>
      <h2>Editar producto</h2>
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

        <Button type="submit" variant="primary">
          Guardar cambios
        </Button>
      </Form>
    </Container>
  );
}
