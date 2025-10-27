import {getAvailableSubjectsAPI} from "../../../api/getAvailableSubjects.api";
import { useEffect, useState } from "react";

function useGetSubjects() {

    const [allSubjects, setAllSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const data = await getAvailableSubjectsAPI();
                console.log(data);
                setAllSubjects(data.availableSubjects);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
    }, []);

    return (
        { allSubjects, loading, error }
    );
}

export default useGetSubjects;