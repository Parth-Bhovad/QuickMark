import { Form, Button } from "react-bootstrap";
import LoadingButton from "../../../components/LoadingButton";

//custom hooks
import useStudentSubjectEdit from "../hooks/useStudentSubjectEdit";

function StudentSubjectEdit({ setShowInput }) {
    const {
        availableSubjects,
        enrolledSubjects,
        onSubjectChange,
        handleAddSubject,
        addingSubject,
        error
    } = useStudentSubjectEdit();
    return (
        <>
            <Form.Group className="mb-3">
                {availableSubjects
                    .map((sub, idx) => (
                        <Form.Check
                            type="checkbox"
                            label={sub}
                            checked={enrolledSubjects.includes(sub)}
                            onChange={() => onSubjectChange(sub)}
                            key={idx}
                        />
                    ))}
            </Form.Group>

            <div className="d-flex gap-2">
                <LoadingButton
                    loading={addingSubject}
                    variant="primary"
                    className="flex-grow-1"
                    onClick={handleAddSubject}
                >
                    Add Subject
                </LoadingButton>
                <Button
                    variant="outline-secondary"
                    className="flex-grow-1"
                    onClick={() => setShowInput(false)}
                >
                    Cancel
                </Button>
            </div>

            {error && <div className="text-danger mt-2">{error}</div>}
        </>
    );
}

export default StudentSubjectEdit;