import { useMutation, useQuery, useQueryClient } from "react-query";
import { Axios } from "../resources/routes";

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

	useMutation(
		() => Axios.delete(`user/save-lecture/${id}`),

		{
			onSuccess: () => {
				// ✅ refetch the comments list for our blog post

				queryClient.invalidateQueries(["posts", id, "comments"]);
			},
		}
	);
};
export default useFetchQuery;
