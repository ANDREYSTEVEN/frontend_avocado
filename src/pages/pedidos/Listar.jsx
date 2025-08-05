import { useEffect, useState } from "react";
import { Container, Table, Alert } from "react-bootstrap";

export default function Listar() {
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://your-backend-url.onrender.com/api/pedidos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar pedidos");
        return res.json();
      })
      .then(setPedidos)
      .catch(() => setError("No se pudieron obtener los pedidos"));
  }, []);

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Pedidos Registrados</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {pedidos.length === 0 && !error && (
        <Alert variant="info">No hay pedidos registrados.</Alert>
      )}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Productos</th>
            <th>Total</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.fecha}</td>
              <td>{p.cliente?.nombre || "—"}</td>
              <td>
                <ul>
                  {p.productos.map((prod, i) => (
                    <li key={i}>{prod.nombre}</li>
                  ))}
                </ul>
              </td>
              <td>${p.total.toFixed(2)}</td>
              <td>{p.estado}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
