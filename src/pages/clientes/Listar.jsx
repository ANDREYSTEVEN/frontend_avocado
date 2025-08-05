import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Alert, Badge } from "react-bootstrap";

export default function Listar() {
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Debes iniciar sesión para ver tus pedidos");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/productos`, {
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
      <h2 className="text-center mb-4">Mis Pedidos</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {pedidos.length === 0 && !error && (
        <Alert variant="info">Aún no has realizado pedidos.</Alert>
      )}

      <Row xs={1} md={2} className="g-4">
        {pedidos.map((pedido) => (
          <Col key={pedido.id}>
            <Card>
              <Card.Body>
                <Card.Title>
                  Pedido #{pedido.id}{" "}
                  <Badge bg="secondary">{pedido.estado}</Badge>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Fecha: {pedido.fecha}
                </Card.Subtitle>
                <ul>
                  {pedido.productos.map((prod, idx) => (
                    <li key={idx}>
                      {prod.nombre} – ${prod.precio.toFixed(2)}
                    </li>
                  ))}
                </ul>
                <strong>Total: ${pedido.total.toFixed(2)}</strong>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
