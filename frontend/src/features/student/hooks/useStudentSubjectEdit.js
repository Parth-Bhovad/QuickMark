import { useState } from "react";
//importing auth context
import { useAuthContext } from "../../../context/AuthContext";
//Student Context
import { useStudentContext } from "../context/StudentContext";
//importing APIs
import { editStudentSubjectAPI } from "../api/student.api.js";
import { getAvailableSubjectsAPI } from "../../../api/getAvailableSubjects.api.js";

import { useQueryClient, useMutation, useQuery, queryOptions } from "@tanstack/react-query";

import { studentProfileQueryOptions } from "../queries/studentProfile.query.js";

function useStudentSubjectEdit() {

    const queryClient = useQueryClient();

    const { currentUser, authChecked } = useAuthContext();
    const { mutateAsync } = useMutation({
        mutationFn: editStudentSubjectAPI,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: studentProfileQueryOptions(currentUser?.id, authChecked).queryKey })
        }
    });

    const { enrolledSubjects, setEnrolledSubjects } = useStudentContext();

    const [error, setError] = useState("");
    //Adding loading state
    const [addingSubject, setAddingSubject] = useState(false);

    const handleAddSubject = async () => {
        setAddingSubject(true);
        try {
            await mutateAsync({ studentId: currentUser?.id, subjectName: enrolledSubjects });
        } catch (error) {
            console.error("Failed to add subject:", error);
            setError("Failed to add subject:", error);
        } finally {
            setAddingSubject(false);
        }
    };

    const onSubjectChange = (subject) => {
        setEnrolledSubjects((prevSelected) => {
            return prevSelected.includes(subject)
                ? prevSelected.filter((sub) => sub !== subject)
                : [...prevSelected, subject];
        });
    };

    const availableSubjectsOptions = queryOptions({ queryKey: ['availableSubjects'], queryFn: getAvailableSubjectsAPI });

    const { data, isPending, isError } = useQuery(availableSubjectsOptions);

    return ({
        availableSubjects: data?.availableSubjects || [],
        enrolledSubjects,
        setEnrolledSubjects,
        handleAddSubject,
        onSubjectChange,
        addingSubject,
        error
    });
}

export default useStudentSubjectEdit;