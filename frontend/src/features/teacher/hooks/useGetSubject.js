import { getAvailableSubjectsAPI } from "../../../api/getAvailableSubjects.api";
import { useQuery, queryOptions } from "@tanstack/react-query";

function useGetSubjects() {
    const availableSubjectsOptions = queryOptions({ queryKey: ['availableSubjects'], queryFn: getAvailableSubjectsAPI, staleTime: 5 * 60 * 1000, });

    const { data, isPending, isError, error } = useQuery(availableSubjectsOptions);

    return (
        {
            availableSubjects: data?.availableSubjects || [],
            isLoadingAvailableSubjects: isPending,
            isAvailableSubjectsError: error,
            availableSubjectsError: isError
        }
    );
}

export default useGetSubjects;