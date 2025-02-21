import { Button } from "react-bootstrap";
import { IoMdArrowRoundBack } from "react-icons/io";
import { TbFaceIdError } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const UnauthorisedPage = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div
            id="unauthorised-page"
            className="d-flex justify-content-center align-items-center"
        >
            <div className="unauthorised-content text-center">
                <h1>Unauthorised Access!</h1>
                <p>You do not have permission to view this page.</p>
                <p>Please contact your administrator for assistance.</p>
                <div className="unauthorised-image-container mt-4">
                    <TbFaceIdError className="display-1" />
                </div>

                <Button className="my-4 px-4 py-2" onClick={handleBack}>
                    <IoMdArrowRoundBack />
                    Back
                </Button>
            </div>
        </div>
    );
};

export default UnauthorisedPage;
