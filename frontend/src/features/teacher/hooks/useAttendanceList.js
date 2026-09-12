import * as XLSX from "xlsx";
//importing APIs
import { getAttendanceDataAPI } from "../api/attendance.api.js"

import { useMutation } from "@tanstack/react-query";

function useAttendanceList(selectedSubject) {
  const { isPending, isError, error, mutate } = useMutation({
    mutationFn: () => getAttendanceDataAPI(selectedSubject),
    onSuccess: (data) => {
      const worksheet = XLSX.utils.json_to_sheet(data.data.attendance);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

      XLSX.writeFile(workbook, "attendance-data.xlsx");
    },
  });

  return { isLoadingAttendance: isPending, fetchAttendance: mutate, isAttendanceError: isError, attendanceError: error };
}

export default useAttendanceList;
