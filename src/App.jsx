import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Tienda
import Home from "./pages/tienda/Home";
import Carrito from "./pages/tienda/Carrito";
import Confirmar from "./pages/tienda/Confirmar";
import PedidoConfirmado from "./pages/tienda/PedidoConfirmado";

// Clientes
import LoginCliente from "./pages/clientes/Login";
import RegistroCliente from "./pages/clientes/Registro";
import Dashboard from "./pages/clientes/Listar";

// Productos (Admin)
import CrearProducto from "./pages/productos/Crear";
import ListarProductos from "./pages/productos/Listar";
import EditarProducto from "./pages/productos/Editar";

// Pedidos
import CrearPedido from "./pages/pedidos/Crear";
import ListarPedidos from "./pages/pedidos/Listar";
import EditarPedido from "./pages/pedidos/Editar";
import AsignarRepartidor from "./pages/pedidos/AsignarRepartidor";
import CambiarEstado from "./pages/pedidos/CambiarEstado";

// Repartidores
import ListarRepartidores from "./pages/repartidores/Listar";
import NuevoRepartidor from "./pages/repartidores/Nuevo";

// Reportes
import ResumenReportes from "./pages/reportes/Resumen";

// Protección de rutas
import RutaProtegida from "./components/RutaProtegida";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/confirmar" element={<Confirmar />} />
        <Route path="/pedido-confirmado" element={<PedidoConfirmado />} />
        <Route path="/login" element={<LoginCliente />} />
        <Route path="/registro" element={<RegistroCliente />} />

        {/* Cliente autenticado */}
        <Route
          path="/panel/dashboard"
          element={
            <RutaProtegida>
              <Dashboard />
            </RutaProtegida>
          }
        />

        {/* Rutas protegidas solo para admin */}
        <Route
          path="/panel/productos"
          element={
            <RutaProtegida soloAdmin>
              <ListarProductos />
            </RutaProtegida>
          }
        />
        <Route
          path="/panel/productos/crear"
          element={
            <RutaProtegida soloAdmin>
              <CrearProducto />
            </RutaProtegida>
          }
        />
        <Route
          path="/panel/productos/editar"
          element={
            <RutaProtegida soloAdmin>
              <EditarProducto />
            </RutaProtegida>
          }
        />

        <Route
          path="/panel/pedidos"
          element={
            <RutaProtegida soloAdmin>
              <ListarPedidos />
            </RutaProtegida>
          }
        />
        <Route
          path="/panel/pedidos/crear"
          element={
            <RutaProtegida soloAdmin>
              <CrearPedido />
            </RutaProtegida>
          }
        />
        <Route
          path="/panel/pedidos/editar"
          element={
            <RutaProtegida soloAdmin>
              <EditarPedido />
            </RutaProtegida>
          }
        />
        <Route
          path="/panel/pedidos/asignar-repartidor"
          element={
            <RutaProtegida soloAdmin>
              <AsignarRepartidor />
            </RutaProtegida>
          }
        />
        <Route
          path="/panel/pedidos/cambiar-estado"
          element={
            <RutaProtegida soloAdmin>
              <CambiarEstado />
            </RutaProtegida>
          }
        />

        <Route
          path="/panel/repartidores"
          element={
            <RutaProtegida soloAdmin>
              <ListarRepartidores />
            </RutaProtegida>
          }
        />
        <Route
          path="/panel/repartidores/nuevo"
          element={
            <RutaProtegida soloAdmin>
              <NuevoRepartidor />
            </RutaProtegida>
          }
        />

        <Route
          path="/panel/reportes/resumen"
          element={
            <RutaProtegida soloAdmin>
              <ResumenReportes />
            </RutaProtegida>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
