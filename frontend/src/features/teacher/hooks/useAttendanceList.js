import * as XLSX from "xlsx";
import { useState } from "react";
//importing APIs
import {getAttendanceDataAPI} from "../api/attendance.api.js"

function useAttendanceList(selectedSubject) {
  //loading states
  const [gettingAttendance, setGettingAttendance] = useState(false);

  const fetchAttendanceData = async () => {
    console.log(selectedSubject);

    try {
      setGettingAttendance(true);
      const response = await getAttendanceDataAPI(selectedSubject);

      const attendance = response.data.attendance;
      console.log(attendance);

      const worksheet = XLSX.utils.json_to_sheet(attendance);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

      XLSX.writeFile(workbook, "attendance-data.xlsx");
    } catch (err) {
      console.error("Error exporting attendance:", err);
    } finally {
      setGettingAttendance(false);
    }
  };

  return { gettingAttendance, fetchAttendanceData };
}

export default useAttendanceList;
