import { useState } from 'react';
import { Alert, Container, Pagination, Spinner, Table } from 'react-bootstrap';
import useStudents from '../hooks/useStudents';

function StudentsList() {
    const [page, setPage] = useState(1);
    const {
        students,
        currentPage,
        totalPages,
        totalStudents,
        isLoadingStudents,
        isFetchingStudents,
        isStudentsError,
        studentsError,
    } = useStudents(page);

    if (isLoadingStudents) {
        return <div className="d-flex justify-content-center mt-5"><Spinner animation="border" /></div>;
    }

    if (isStudentsError) {
        return <Alert variant="danger" className="m-4">{studentsError.message}</Alert>;
    }

    return (
        <Container className="pt-4 mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h2 className="mb-1">Students</h2>
                    <p className="text-muted mb-0">{totalStudents} students</p>
                </div>
                {isFetchingStudents && <Spinner animation="border" size="sm" />}
            </div>

            {students.length === 0 ? (
                <Alert variant="info">No students found.</Alert>
            ) : (
                <Table responsive bordered hover>
                    <thead>
                        <tr>
                            <th>Roll number</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student._id}>
                                <td>{student.rollNo}</td>
                                <td>{student.studentName}</td>
                                <td>{student.studentEmail}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {totalPages > 1 && (
                <div className="d-flex justify-content-center">
                    <Pagination>
                        <Pagination.Prev
                            disabled={currentPage === 1}
                            onClick={() => setPage((currentPageValue) => currentPageValue - 1)}
                        />
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                            <Pagination.Item
                                key={pageNumber}
                                active={pageNumber === currentPage}
                                onClick={() => setPage(pageNumber)}
                            >
                                {pageNumber}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            disabled={currentPage === totalPages}
                            onClick={() => setPage((currentPageValue) => currentPageValue + 1)}
                        />
                    </Pagination>
                </div>
            )}
        </Container>
    );
}

export default StudentsList;