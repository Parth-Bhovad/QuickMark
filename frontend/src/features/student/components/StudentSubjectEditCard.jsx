import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import StudentSubjectEdit from "./StudentSubjectEdit";

function StudentSubjectEditCard() {
    const [showInput, setShowInput] = useState(false);
    return (
        <Card className="shadow-sm border-0 rounded-4 mb-4">
            <Card.Body>
                {!showInput ? (
                    <Button
                        variant="primary"
                        className="w-100"
                        onClick={() => setShowInput(true)}
                    >
                        + Add Subject
                    </Button>
                ) : (
                    <StudentSubjectEdit setShowInput={setShowInput} />
                )}
            </Card.Body>
        </Card>
    );
}

export default StudentSubjectEditCard;