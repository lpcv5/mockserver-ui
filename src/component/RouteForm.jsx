import { Save } from "lucide-react";
import { JsonEditor } from "json-edit-react";

const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];

function RouteForm({
  formData,
  setFormData,
  isAddingRoute,
  jsonError,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="form">
      <h1 className="page-title">
        {isAddingRoute ? "Add New Route" : "Edit Route"}
      </h1>

      <div className="form-group">
        <label className="label">Path</label>
        <input
          type="text"
          value={formData.path}
          onChange={(e) => setFormData({ ...formData, path: e.target.value })}
          className="input"
          placeholder="/api/users"
          required
        />
      </div>

      <div className="form-group">
        <label className="label">Description</label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="input"
          placeholder="Describe this endpoint..."
        />
      </div>

      <div className="form-group">
        <label className="label">Method</label>
        <select
          value={formData.method}
          onChange={(e) => setFormData({ ...formData, method: e.target.value })}
          className="select"
        >
          {methods.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="label">Response (JSON)</label>
        <div className="json-editor">
          <JsonEditor
            data={formData.response}
            setData={(jsonData) =>
              setFormData({
                ...formData,
                response: jsonData,
              })
            }
            rootName="response"
          />
        </div>
        {jsonError && <div className="error-message">{jsonError.reason}</div>}
      </div>

      <button
        type="submit"
        className="button button-primary"
        disabled={!!jsonError}
      >
        <Save size={20} />
        {isAddingRoute ? "Add Route" : "Save Changes"}
      </button>
    </form>
  );
}

export default RouteForm;
