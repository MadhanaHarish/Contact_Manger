import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./ContactDetail.css";

const ContactDetail = (props) => {
    const location = useLocation();
    const _id = location.pathname.substring(
        location.pathname.lastIndexOf("/") + 1
    );

    const { name, phoneNumber, photo, department, tableData } = props.contacts.find((contact) => contact._id === _id);

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const periods = Array.from({ length: 8 }, (_, i) => i + 1);

    // Period timings
    const periodTimings = [
        ["08:45", "09:40"],
        ["09:41", "10:25"],
        ["10:45", "11:30"],
        ["11:30", "12:15"],
        ["13:15", "14:00"],
        ["14:00", "14:45"],
        ["15:00", "15:45"],
        ["15:45", "16:30"],
    ];

    const [currentStatus, setCurrentStatus] = useState("");

    // Determine current period based on time
    useEffect(() => {
        const updateStatus = () => {
            const now = new Date();
            const currentDay = daysOfWeek[now.getDay() - 1]; // Map to daysOfWeek (0 = Sunday)
            const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

            let status = "Not in session";
            periodTimings.forEach(([start, end], periodIndex) => {
                if (currentTime >= start && currentTime <= end) {
                    const dayIndex = daysOfWeek.indexOf(currentDay);
                    status = tableData && tableData[periodIndex] && tableData[periodIndex][dayIndex]
                        ? tableData[periodIndex][dayIndex]
                        : "No data";
                }
            });
            setCurrentStatus(status);
        };

        updateStatus();
        const interval = setInterval(updateStatus, 60000); // Update every minute
        return () => clearInterval(interval); // Cleanup on unmount
    }, [tableData, periodTimings, daysOfWeek]);

    return (
        <div className="main">
            <Link to="/">
                <button className="btn3">{"<"}</button>
            </Link>
            <div className="card">
                <div className="card-image">
                    <img src={photo || "https://www.gravatar.com/avatar/?d=mp"} alt="user" />
                </div>
                <div className="card-content">
                    <div className="card-content-header">{name}</div>
                    <div className="card-content-phone">Phone: {phoneNumber}</div>
                    <div className="card-content-department">Department: {department}</div>
                    <div className="card-content-status"><strong>Current Status:</strong> {currentStatus}</div>
                </div>
            </div>

            {/* Formal Table */}
            <table className="contact-detail-table">
                <thead>
                <tr>
                    <th></th>
                    {daysOfWeek.map((day, index) => (
                        <th key={index}>{day}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {periods.map((period, rowIndex) => (
                    <tr key={rowIndex}>
                        <td><strong>{period}</strong></td>
                        {daysOfWeek.map((_, colIndex) => (
                            <td key={colIndex}>
                                {tableData && tableData[rowIndex] && tableData[rowIndex][colIndex]
                                    ? tableData[rowIndex][colIndex]
                                    : ""}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContactDetail;
