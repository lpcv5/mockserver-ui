function RouteList({ routes, selectedRoute, onRouteClick }) {
  return (
    <div className="route-list">
      {routes.map((route) => (
        <div
          key={route.id}
          className={`route-list-item ${
            selectedRoute?.id === route.id ? "active" : ""
          }`}
          onClick={() => onRouteClick(route)}
        >
          <span className="method-badge">{route.method}</span>
          <span className="route-path">{route.path}</span>
          {route.description && (
            <div className="route-description">{route.description}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default RouteList;
