import image from "layout/images/no-results.png";
import NotFound from "../NotFound";

const NotFoundError = () => {
	return (
		<NotFound>
			<img src={image} alt="not found" />
			<strong>Oops, something went wrong</strong>
			<div>
				Looks like something went wrong
				<br />
				Please try to refresh your page or check the internet connection
			</div>
			<button onClick={() => window.location.reload()}>Refresh</button>
		</NotFound>
	);
};

export default NotFoundError;
