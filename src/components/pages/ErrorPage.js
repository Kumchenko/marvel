import { Link } from "react-router-dom"
import ErrorMessage from "../errorMessage/ErrorMessage";

const ErrorPage = () => {
    return (
        <div>
            <ErrorMessage/>
            <p>You entered the page that doesn't exist</p>
            <Link to="/">Return to HomePage</Link>
        </div>
    )
}

export default ErrorPage;