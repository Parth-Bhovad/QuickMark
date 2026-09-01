//importing auth context
import { useAuthContext } from "../../../context/AuthContext";
import { useStudentContext } from "../context/StudentContext.jsx";
//importing APIs

//react query
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { studentProfileQueryOptions } from "../queries/studentProfile.query.js";

function useStudentProfileDetails() {
    const { currentUser, authChecked } = useAuthContext();
    const { setEnrolledSubjects } = useStudentContext();


    const { isPending, data, error } = useQuery(studentProfileQueryOptions(currentUser?.id, authChecked));
    console.log(data)
    useEffect(() => {
        setEnrolledSubjects(data?.enrolledSubjects || []);
    }, [setEnrolledSubjects, data?.enrolledSubjects]);

    return { studentName: data?.studentName, enrolledSubjects: data?.subjects, rollNo: data?.rollNo, error, isPending }
}

export default useStudentProfileDetails;