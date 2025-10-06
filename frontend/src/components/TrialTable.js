import { Table, Button } from "react-bootstrap";

export default function TrialTable({ trials, onEdit, onDelete }) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Start</th>
          <th>End</th>
          <th>Status</th>
          <th style={{ width: "150px" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {trials.length > 0 ? (
          trials.map((trial) => (
            <tr key={trial._id}>
              <td>{trial.name}</td>
              <td>{trial.description}</td>
              <td>{trial.startDate ? new Date(trial.startDate).toLocaleDateString() : "-"}</td>
              <td>{trial.endDate ? new Date(trial.endDate).toLocaleDateString() : "-"}</td>
              <td>{trial.status}</td>
              <td>
                <Button size="sm" variant="warning" className="me-2" onClick={() => onEdit(trial)}>
                  Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => onDelete(trial._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center">
              No trials found
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
