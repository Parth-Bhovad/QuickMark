import { useQuery, queryOptions } from "@tanstack/react-query";
import api from "./axiosInstance/axios";

async function fetchStudents() {
    const response = await api.get("/subjects");
    return response.data
}

const studentQueryOptions = queryOptions({ queryKey: ['students'], queryFn: fetchStudents })

function Demo() {
    const { isPending, data, error } = useQuery(studentQueryOptions);

    if (isPending) {
        return <div>loading...</div>
    }

    console.log(data);
    console.log(error);
    return (
        <div>hi</div>
    );
}

export default Demo;