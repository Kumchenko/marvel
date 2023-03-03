import { useNavigate } from "react-router-dom"
import ErrorMessage from "../errorMessage/ErrorMessage";

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <div style={{textAlign: 'right', margin: '0 auto'}}>
            <p style={{fontSize: 25}}>You entered the page that doesn't exist</p>
            <button
                className="button button__main button__long"
                onClick={() => navigate("/")}
            >
                <div className="inner">Homepage</div>
            </button>
            </div>
            <ErrorMessage/>
            
        </div>
    )
}

export default ErrorPage;