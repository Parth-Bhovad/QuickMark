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
    const { mutateAsync, isPending: mutationPending, isError: isMutationError, error:mutationError } = useMutation({
        mutationFn: editStudentSubjectAPI,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: studentProfileQueryOptions(currentUser?.id, authChecked).queryKey })
        }
    });

    const { enrolledSubjects, setEnrolledSubjects } = useStudentContext();

    const handleAddSubject = async () => {
        await mutateAsync({ studentId: currentUser?.id, subjectName: enrolledSubjects });
    };

    const onSubjectChange = (subject) => {
        setEnrolledSubjects((prevSelected) => {
            return prevSelected.includes(subject)
                ? prevSelected.filter((sub) => sub !== subject)
                : [...prevSelected, subject];
        });
    };

    const availableSubjectsOptions = queryOptions({ queryKey: ['availableSubjects'], queryFn: getAvailableSubjectsAPI, staleTime: 5 * 60 * 1000, });

    const { data, isPending: queryPending, isError: isQueryError, error:queryError } = useQuery(availableSubjectsOptions);

    return ({
        availableSubjects: data?.availableSubjects || [],
        enrolledSubjects,
        setEnrolledSubjects,
        handleAddSubject,
        onSubjectChange,
        mutationPending,
        mutationError,
        queryPending,
        queryError,
        isQueryError,
        isMutationError
    });
}

export default useStudentSubjectEdit;