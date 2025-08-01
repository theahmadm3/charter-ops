import { useState } from 'react';
import { FaUser } from 'react-icons/fa6';

const LogoutSection = ({ user, handleLogout }) => {
    const [showModal, setShowModal] = useState(false);

    const handleLogoutClick = () => {
        setShowModal(true);
    };

    const handleConfirmLogout = () => {
        handleLogout();
    };

    const handleCancelLogout = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className="tw-absolute tw-bottom-5 tw-left-5 tw-flex tw-items-center tw-gap-3 tw-text-white">
                <span className="tw-font-bold">
                    {`${user?.first_name} ${user?.last_name}` || "Guest"}
                </span>
                <button
                    className="tw-bg-red-600 tw-rounded-full tw-p-2 tw-text-white tw-hover:bg-red-700 tw-transition-colors"
                    onClick={handleLogoutClick}
                >
                    <FaUser />
                </button>
            </div>

            {/* Confirmation Modal */}
            {showModal && (
                <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-items-center tw-justify-center tw-z-50">
                    <div className="tw-bg-white tw-rounded-lg tw-shadow-xl tw-p-6 tw-max-w-md tw-w-full tw-mx-4">
                        <div className="tw-text-center">
                            <div className="tw-mb-4">
                                <div className="tw-w-12 tw-h-12 tw-bg-red-100 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mx-auto">
                                    <FaUser className="tw-text-red-600 tw-text-xl" />
                                </div>
                            </div>

                            <h3 className="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-2">
                                Confirm Logout
                            </h3>

                            <p className="tw-text-gray-600 tw-mb-6">
                                Are you sure you want to logout? You will be redirected to the login page.
                            </p>

                            <div className="tw-flex tw-space-x-4">
                                <button
                                    onClick={handleCancelLogout}
                                    className="tw-flex-1 tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-text-gray-700 tw-rounded-md tw-hover:bg-gray-50 tw-transition-colors tw-font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmLogout}
                                    className="tw-flex-1 tw-px-4 tw-py-2 tw-bg-red-600 tw-text-white tw-rounded-md tw-hover:bg-red-700 tw-transition-colors tw-font-medium"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LogoutSection;