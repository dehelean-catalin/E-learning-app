import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAxios } from "../config/axiosInstance";

const useFetchQuery = (key, fetcher, { initialData, onSuccess, onError }) => {
	const {
		data,
		isError,
		isFetching: isLoading,
	} = useQuery(key, fetcher, {
		initialData: initialData,
		retry: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		onSuccess: onSuccess,
		onError: onError,
	});

	return {
		data,
		isError,
		isLoading,
	};
};

export const useAddComment = (id) => {
	const queryClient = useQueryClient();
	const axiosInstance = useAxios();
	useMutation(
		() => axiosInstance.delete(`user/save-lecture/${id}`),

		{
			onSuccess: () => {
				queryClient.invalidateQueries(["posts", id, "comments"]);
			},
		}
	);
};
export default useFetchQuery;
