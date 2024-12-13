import React from "react";
import { useNavigate } from "react-router-dom";
import { useStored } from "../../Context/StoredContext";
import "./Order.css";

const Order = () => {
    const { pdfPath } = useStored(); 
    const navigate = useNavigate();

    const handleDownload = async (filePath) => {
        if (!filePath) {
            alert("No file available to download");
            return;
        }

        const fileUrl = `http://localhost:4000${filePath}`; 
        console.log("Attempting to download from:", fileUrl);

        try {
            const response = await fetch(fileUrl);
            console.log("Response status:", response.status);
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server error response:", errorText);
                throw new Error("Failed to download the file");
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = filePath.includes("instructions") ? "instructions.pdf" : "mailing-slip.pdf";
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Error downloading the file:", error);
            alert("Could not download the file. Please try again.");
        }
    };

    return (
        <div className="order-page">
            <h1>Order Created Successfully</h1>
            <p>Thank you for your order! Please follow the instructions below to complete the process:</p>

            <div className="order-instructions">
                <h2>Instructions</h2>
                <p>1. Download the mailing slip and include it with your samples.</p>
                {/* Use pdfPath for the mailing slip if that's the PDF generated for the order. */}
                {pdfPath && (
                    <button onClick={() => handleDownload(pdfPath)} className="download-button">
                        Download Mailing Slip
                    </button>
                )}
                <p>2. Download the instruction guide for packing and shipping your samples.</p>
                {/* Assuming instructions are served from /assets/instructions.pdf */}
                <button onClick={() => handleDownload("/assets/instructions.pdf")} className="download-button">
                    Download Instructions
                </button>
            </div>

            <div className="order-contact">
                <h2>Contact and Payment Information</h2>
                <p>
                    Please send your check to the following address:
                    <br />
                    <strong>Environmental Sciences Analytical Center</strong>
                    <br />
                    Brooklyn College
                    <br />
                    2900 Bedford Avenue, Brooklyn, NY
                </p>
                <p>Make checks payable to: <strong>BC Member Organization - ESAC</strong></p>
                <p><strong>Note:</strong> Orders will remain pending until payment is received.</p>
            </div>

            <button onClick={() => navigate("/my-samples")} className="home-button">
                Go to Home
            </button>
        </div>
    );
};

export default Order;
