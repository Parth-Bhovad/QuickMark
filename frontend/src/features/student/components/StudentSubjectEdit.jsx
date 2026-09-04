import { Form, Button } from "react-bootstrap";
import LoadingButton from "../../../components/LoadingButton";

//custom hooks
import useStudentSubjectEdit from "../hooks/useStudentSubjectEdit";

function StudentSubjectEdit({ setShowInput }) {
    const {
        availableSubjects,
        enrolledSubjects,
        handleAddSubject,
        onSubjectChange,
        mutationPending,
        mutationError,
        queryPending,
        queryError,
        isQueryError,
        isMutationError
    } = useStudentSubjectEdit();
    return (
        <>
            <Form.Group className="mb-3">
                {queryPending ? (<div>loading</div>) : (availableSubjects
                    .map((sub, idx) => (
                        <Form.Check
                            type="checkbox"
                            label={sub}
                            checked={enrolledSubjects.includes(sub)}
                            onChange={() => onSubjectChange(sub)}
                            key={idx}
                        />
                    )))}
            </Form.Group>

            <div className="d-flex gap-2">
                <LoadingButton
                    loading={mutationPending}
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

            {isMutationError && <div className="text-danger mt-2">{mutationError.response.data.msg}</div>}
            {isQueryError && <div className="text-danger mt-2">{queryError.response.data.msg} </div>}
        </>
    );
}

export default StudentSubjectEdit;