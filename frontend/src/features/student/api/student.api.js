import api from "../../../axiosInstance/axios.js";

export const markStudentAttendanceAPI = async (otp, isPresent, studentId) => {
    const response = await api.post("attendance/", {
        otp,
        isPresent,
        studentId
    });
    return response.data;
}

export const checkActiveSessionAPI = async () => {
    const response = await api.get("attendance/check-active-session");
    return response;
}

export const editStudentSubjectAPI = async ({studentId, subjectName}) => {
     console.log("studentId: ", studentId, "subjectName: ", subjectName);
    const response = await api.patch(`/students/${studentId}/subjects`, { subjectName });
    return response.data;
}

export const getStudentProfileAPI = async (studentId) => {
    const response = await api.get(`/students/${studentId}`);
    return response.data;
}

export const deleteStudentAtendanceAPI = async (studentId, date, otp) => {
    const response = await api.delete("/attendance", {
        data: {
            studentId,
            date,
            otp,
        },
    });
    return response.data;
}