import { useState } from "react";
//importing auth context
import { useAuthContext } from "../../../context/AuthContext";
//importing APIs
import { addSubjectAPI, getTeacherProfileAPI, removeSubjectAPI } from "../api/teacher.api";
import { useQuery, queryOptions, useMutation, useQueryClient } from "@tanstack/react-query"

function useTeacherProfile() {

    const queryClient = useQueryClient();

    const { currentUser, authChecked } = useAuthContext();

    const [showAddSubjectInput, setShowAddSubjectInput] = useState(false);
    const [showRemoveSubjectInput, setShowRemoveSubjectInput] = useState(false);
    const [subjectName, setSubjectName] = useState("");

    const teacherProfileOptions = queryOptions({ queryKey: ['teacherProfile', currentUser?.id], queryFn: () => getTeacherProfileAPI(currentUser?.id), enabled: !!currentUser?.id && authChecked });
    const { mutateAsync, isPending: isAddSubjectPending, isError: isAddSubjectError, error: subjectError } = useMutation({
        mutationFn: () => addSubjectAPI(currentUser?.id, subjectName),
        onSuccess: () => {
            queryClient.invalidateQueries(teacherProfileOptions.queryKey);
        }
    });

    const { mutateAsync: removeSubject, isPending: isRemoveSubjectPending, isError: isRemoveSubjectError, error: removeSubjectError } = useMutation({
        mutationFn: () => removeSubjectAPI(currentUser?.id, subjectName),
        onSuccess: () => {
            queryClient.invalidateQueries(teacherProfileOptions.queryKey);
        }
    });

    const { data, isPending: isQueryPending, error: queryError, isError: isQueryError } = useQuery(teacherProfileOptions);

    return ({
        teacherName: data?.teacherName,
        subjects: data?.subjects || [],
        showAddSubjectInput,
        setShowAddSubjectInput,
        showRemoveSubjectInput,
        setShowRemoveSubjectInput,
        subjectName,
        setSubjectName,
        handleSubmit: mutateAsync,
        isAddSubjectError,
        subjectError,
        isAddSubjectPending,
        isQueryPending,
        queryError,
        isQueryError,
        removeSubject,
        isRemoveSubjectPending,
        isRemoveSubjectError,
        removeSubjectError
    });
}

export default useTeacherProfile;