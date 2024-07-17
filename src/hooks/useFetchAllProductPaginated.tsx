import { useInfiniteQuery } from '@tanstack/react-query';

const fetchProjects = async (pageParam: any, limit: any, url = '/routes/fetchAllProducts?cursor=') => {
    console.log(pageParam, url)
    const res = await fetch(url + pageParam)
    return res.json()
}

const useFetchAllProductPaginated = (pageParam: any, limit: any, url: string) => {
    return useInfiniteQuery({
        queryKey: ['projects'],
        queryFn: () => fetchProjects(pageParam, limit),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });
};





export default useFetchAllProductPaginated;
