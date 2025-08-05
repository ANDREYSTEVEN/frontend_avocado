import { useEffect, useState } from "react";
import { Container, Table, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Listar() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/productos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar productos");
        return res.json();
      })
      .then(setProductos)
      .catch(() => setError("No se pudieron cargar los productos"));
  }, []);

  const eliminarProducto = async (id) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/productos${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error al eliminar");

      setProductos(productos.filter((p) => p.id !== id));
      alert("Producto eliminado");
    } catch (err) {
      alert("No se pudo eliminar el producto");
    }
  };

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Gestión de Productos</h2>
        <Button onClick={() => navigate("/panel/productos/crear")}>
          Crear nuevo producto
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>
                <img
                  src={p.imagen_url || "https://img.icons8.com/color/96/avocado.png"}
                  alt={p.nombre}
                  style={{ width: 50 }}
                />
              </td>
              <td>{p.nombre}</td>
              <td>${p.precio.toFixed(2)}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => navigate(`/panel/productos/editar?id=${p.id}`)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => eliminarProducto(p.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
