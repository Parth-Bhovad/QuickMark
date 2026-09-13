import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query';
import { getStudentsAPI } from '../api/student.api';

const studentsQueryOptions = (page) => queryOptions({
    queryKey: ['students', page],
    queryFn: () => getStudentsAPI(page),
    placeholderData: keepPreviousData,
});

function useStudents(page) {
    const studentsQuery = useQuery(studentsQueryOptions(page));

    return {
        students: studentsQuery.data?.students || [],
        currentPage: studentsQuery.data?.page || page,
        totalPages: studentsQuery.data?.totalPages || 0,
        totalStudents: studentsQuery.data?.totalStudents || 0,
        isLoadingStudents: studentsQuery.isPending,
        isFetchingStudents: studentsQuery.isFetching,
        isStudentsError: studentsQuery.isError,
        studentsError: studentsQuery.error,
    };
}

export default useStudents;