import { PlusCircle, Search } from "lucide-react";
import { useState, useMemo } from "react";
import RouteList from "./RouteList";

function Sidebar({ mockRoutes, selectedRoute, onAddClick, onRouteClick }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRoutes = useMemo(() => {
    if (!searchTerm.trim()) return mockRoutes;

    const searchLower = searchTerm.toLowerCase();
    return mockRoutes.filter(
      (route) =>
        route.path.toLowerCase().includes(searchLower) ||
        route.method.toLowerCase().includes(searchLower) ||
        (route.description &&
          route.description.toLowerCase().includes(searchLower))
    );
  }, [mockRoutes, searchTerm]);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button className="add-button" onClick={onAddClick}>
          <PlusCircle size={20} />
          Add New Route
        </button>

        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search routes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredRoutes.length > 0 ? (
        <RouteList
          routes={filteredRoutes}
          selectedRoute={selectedRoute}
          onRouteClick={onRouteClick}
        />
      ) : (
        <div className="no-results">No routes found matching {searchTerm}</div>
      )}
    </div>
  );
}

export default Sidebar;
