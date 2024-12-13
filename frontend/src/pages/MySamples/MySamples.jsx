import React, { useState } from "react";
import jsPDF from "jspdf";
import "./MySamples.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

const MySamplesPage = () => {
    const [selectedSample, setSelectedSample] = useState(null);

    const sampleData = [
        {
            id: '675b337924c215b18d9aeb95',
            date: "08/09/2024",
            status: "In progress",
            tests: ["lead", "Ph"],
            resultDate: null,
        },
        {
            id: '6759de43e5b79d80a27902e3',
            date: "04/10/2024",
            status: "Completed",
            tests: ["Organic Matter", "Nitrogen"],
            resultDate: "04/15/2024",
            results: {
                "Soil Class": "Type A",
                "pH Test": 8,
                "NPK kits": 3,
                "Soluble Salts": "1000 μmhos/cm",
            },
        },
        {
            id: 3,
            date: "02/23/2021",
            status: "Completed",
            tests: ["Heavy Metals", "pH Test"],
            resultDate: "02/25/2021",
            results: {
                "Soil Class": "Type B",
                "pH Test": 7,
                "NPK kits": 2,
                "Soluble Salts": "850 μmhos/cm",
            },
        },
    ];

    const handleSampleClick = (sample) => {
        setSelectedSample(sample);
    };

    const handleExportPDF = () => {
        if (!selectedSample || !selectedSample.results) return;

        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Test Results", 10, 10);

        doc.setFontSize(14);
        doc.text(`Request Date: ${selectedSample.date}`, 10, 30);
        doc.text(`Sample ID: ${selectedSample.id}`, 10, 40);
        doc.text(`Status: ${selectedSample.status}`, 10, 50);

        let yOffset = 70;
        doc.text("Results:", 10, yOffset - 10);

        Object.entries(selectedSample.results).forEach(([key, value]) => {
            doc.text(`${key}: ${value}`, 10, yOffset);
            yOffset += 10;
        });

        doc.save(`Test_Results_Sample_${selectedSample.id}.pdf`);
    };

    return (
        <div> 
            <NavBar />
        <div className="samples-page">
            <div className="samples-sidebar">
                <h2>Soil Test</h2>
                {sampleData.map((sample) => (
                    <div
                        key={sample.id}
                        className={`sample-item ${selectedSample?.id === sample.id ? "selected" : ""}`}
                        onClick={() => handleSampleClick(sample)}
                    >
                        <p>{sample.date}</p>
                        <p>Status: {sample.status}</p>
                    </div>
                ))}
            </div>

            <div className="samples-details">
                {!selectedSample ? (
                    <div className="default-view">
                        <h3>Request New Test</h3>
                        <p>Select a sample from the left to view details or request a new test.</p>
                    </div>
                ) : (
                    <div className="sample-content">
                        <div className="sample-detail">
                            <h3>Request Date: {selectedSample.date}</h3>
                            <h3>Sample ID: {selectedSample.id}</h3>
                            <h3>Status: {selectedSample.status}</h3>
                        </div>

                        <div className="test-info">
                            <div className="test-info-header">
                                <h4>
                                    {selectedSample.status === "Completed"
                                        ? "Test Results"
                                        : "Test Requested"}
                                </h4>
                                {selectedSample.status === "Completed" && (
                                    <button className="print-button" onClick={handleExportPDF}>
                                        Export to PDF
                                    </button>
                                )}
                            </div>
                            {selectedSample.status === "Completed" ? (
                                <ul>
                                    {Object.entries(selectedSample.results).map(
                                        ([key, value], index) => (
                                            <li key={index}>
                                                <strong>{key}</strong>: {value}
                                            </li>
                                        )
                                    )}
                                </ul>
                            ) : (
                                <ul>
                                    {selectedSample.tests.map((test, index) => (
                                        <li key={index}>{test}</li>
                                    ))}
                                </ul>
                            )}
                            {selectedSample.resultDate && (
                                <p className="date-received">
                                    Date Received: {selectedSample.resultDate}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
        <Footer />
    </div>
    );
};

export default MySamplesPage;
