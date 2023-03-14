import { QueryFunction, QueryKey, useQuery } from "react-query";

export const useFetchData = <Data>(
	key: QueryKey,
	fetcher: QueryFunction<Data>
) => {
	const {
		data,
		isError,
		isFetching: isLoading,
	} = useQuery<Data>(key, fetcher, {
		retry: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});

	return {
		data,
		isError,
		isLoading,
	};
};
