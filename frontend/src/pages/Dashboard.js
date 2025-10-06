// import { useEffect, useState } from "react";
// import API from "../services/api";

// export default function Dashboard() {
//   const [trials, setTrials] = useState([]);
//   const [name, setName] = useState("");

//   useEffect(() => {
//     fetchTrials();
//   }, []);

//   const fetchTrials = async () => {
//     const { data } = await API.get("/trials");
//     setTrials(data);
//   };

//   const createTrial = async (e) => {
//     e.preventDefault();
//     await API.post("/trials", { name, status: "ongoing" });
//     setName("");
//     fetchTrials();
//   };

//   const deleteTrial = async (id) => {
//     await API.delete(`/trials/${id}`);
//     fetchTrials();
//   };

//   return (
//     <div>
//       <h2>Clinical Trials</h2>
//       <form onSubmit={createTrial}>
//         <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Trial name" />
//         <button type="submit">Add Trial</button>
//       </form>
//       <ul>
//         {trials.map((t) => (
//           <li key={t._id}>
//             {t.name} - {t.status}
//             <button onClick={() => deleteTrial(t._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import API from "../services/api";
import TrialTable from "../components/TrialTable";
import TrialModal from "../components/TrialModal";

export default function Dashboard() {
  const [trials, setTrials] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTrial, setEditingTrial] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", startDate: "", endDate: "", status: "ongoing" });

  useEffect(() => {
    fetchTrials();
  }, []);

  const fetchTrials = async () => {
    const { data } = await API.get("/trials");
    setTrials(data);
  };

  const handleShowModal = (trial = null) => {
    if (trial) {
      setEditingTrial(trial._id);
      setFormData({
        name: trial.name,
        description: trial.description,
        startDate: trial.startDate?.slice(0, 10) || "",
        endDate: trial.endDate?.slice(0, 10) || "",
        status: trial.status,
      });
    } else {
      setEditingTrial(null);
      setFormData({ name: "", description: "", startDate: "", endDate: "", status: "ongoing" });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingTrial) {
      await API.put(`/trials/${editingTrial}`, formData);
    } else {
      await API.post("/trials", formData);
    }
    fetchTrials();
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this trial?")) {
      await API.delete(`/trials/${id}`);
      fetchTrials();
    }
  };

  return (
    <Container className="mt-5">
      <Row className="mb-3">
        <Col>
          <h2>Clinical Trials</h2>
        </Col>
        <Col className="text-end">
          <Button onClick={() => handleShowModal()} variant="primary">
            + Add Trial
          </Button>
        </Col>
      </Row>

      <TrialTable trials={trials} onEdit={handleShowModal} onDelete={handleDelete} />

      <TrialModal
        show={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        editingTrial={editingTrial}
      />
    </Container>
  );
}
