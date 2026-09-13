import { queryOptions } from "@tanstack/react-query";
import { getStudentProfileAPI } from "../api/student.api";

export const studentProfileQueryOptions = (studentId, authChecked) =>
    queryOptions({
        queryKey: ["studentProfile", studentId],
        queryFn: () => getStudentProfileAPI(studentId),
        enabled: authChecked && !!studentId,
    });