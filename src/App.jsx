import { useState, useEffect } from "react";
import RouteForm from "./component/RouteForm";
import Sidebar from "./component/Sidebar";
import "./App.css";

function App() {
  const [mockRoutes, setMockRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [isAddingRoute, setIsAddingRoute] = useState(false);
  const [formData, setFormData] = useState({
    path: "",
    method: "GET",
    response: {},
    description: "",
  });
  const [jsonError, setJsonError] = useState(null);

  useEffect(() => {
    fetchMockRoutes();
  }, []);

  const fetchMockRoutes = async () => {
    try {
      const res = await fetch("http://localhost:3000/admin/mock");
      const data = await res.json();
      // 确保从服务器获取的数据中的 response 是对象
      const processedData = data.map((route) => ({
        ...route,
        response:
          typeof route.response === "string"
            ? JSON.parse(route.response)
            : route.response,
      }));
      setMockRoutes(processedData);
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  };

  const handleAddClick = () => {
    setSelectedRoute(null);
    setIsAddingRoute(true);
    setFormData({
      path: "",
      method: "GET",
      response: {},
      description: "",
    });
    setJsonError(null);
  };

  const handleRouteClick = (route) => {
    setSelectedRoute(route);
    setIsAddingRoute(false);
    setFormData(route);
    setJsonError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (jsonError) {
      alert("Please fix the JSON errors before submitting");
      return;
    }

    try {
      const url = selectedRoute
        ? `http://localhost:3000/admin/mock/${selectedRoute.id}`
        : "http://localhost:3000/admin/mock";

      const method = selectedRoute ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      await fetchMockRoutes();
      if (!selectedRoute) {
        setFormData({
          path: "",
          method: "GET",
          response: {},
          description: "",
        });
      }
    } catch (error) {
      alert("Error saving route");
    }
  };

  return (
    <div className="container">
      <Sidebar
        mockRoutes={mockRoutes}
        selectedRoute={selectedRoute}
        onAddClick={handleAddClick}
        onRouteClick={handleRouteClick}
      />
      <div className="main-content">
        {(isAddingRoute || selectedRoute) && (
          <RouteForm
            formData={formData}
            setFormData={setFormData}
            isAddingRoute={isAddingRoute}
            jsonError={jsonError}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default App;
