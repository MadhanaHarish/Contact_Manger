import React from "react";
import { Link } from "react-router-dom";

class AddContact extends React.Component {
    state = {
        name: "",
        phoneNumber: "",
        photo: "",
        department: "",
        tableData: Array.from({ length: 8 }, () => Array(6).fill("")), // 8 rows, 6 columns
    };

    // Function to handle cell updates in the table
    handleTableChange = (rowIndex, colIndex, value) => {
        const newTableData = [...this.state.tableData];
        newTableData[rowIndex][colIndex] = value;
        this.setState({ tableData: newTableData });
    };

    add = (e) => {
        e.preventDefault();

        const { name, phoneNumber, department, photo } = this.state;

        if (name === "") {
            alert("Please provide a name");
            return;
        }

        if (!/^[0-9]{10}$/.test(phoneNumber)) {
            alert("Phone number must be exactly 10 digits");
            return;
        }

        if (department === "") {
            alert("Please provide a department");
            return;
        }

        if (photo === "") {
            alert("Please provide a valid URL for the photo");
            return;
        }

        // Pass the new contact data including tableData to the parent handler
        this.props.addContactHandler(this.state);

        // Clear the form fields
        this.setState({ name: "", phoneNumber: "", photo: "", department: "", tableData: Array.from({ length: 8 }, () => Array(6).fill("")) });
    };

    render() {
        // Days and periods for the table
        const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const periods = Array.from({ length: 8 }, (_, i) => i + 1);

        return (
            <div className="container-contact2">
                <Link to="/">
                    <button className="btn3">{"<"}</button>
                </Link>
                <div className="wrap-contact2">
                    <form className="contact2-form" onSubmit={this.add}>
                        <span className="contact2-form-title">Add Contact</span>

                        <div className="wrap-input2">
                            <input
                                className="input2"
                                placeholder="Name"
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={(e) => this.setState({ name: e.target.value })}
                            />
                            <span className="focus-input2" data-placeholder="NAME"></span>
                        </div>

                        <div className="wrap-input2">
                            <input
                                className="input2"
                                placeholder="Phone Number"
                                type="number"
                                name="phoneNumber"
                                value={this.state.phoneNumber}
                                onChange={(e) => this.setState({ phoneNumber: e.target.value })}
                            />
                            <span className="focus-input2" data-placeholder="PHONE NUMBER"></span>
                        </div>

                        <div className="wrap-input2">
                            <input
                                className="input2"
                                placeholder="Department"
                                type="text"
                                name="department"
                                value={this.state.department}
                                onChange={(e) => this.setState({ department: e.target.value })}
                            />
                            <span className="focus-input2" data-placeholder="DEPARTMENT"></span>
                        </div>

                        <div className="wrap-input2">
                            <input
                                className="input2"
                                placeholder="Photo URL"
                                type="text"
                                name="photo"
                                value={this.state.photo}
                                onChange={(e) => this.setState({ photo: e.target.value })}
                            />
                            <span className="focus-input2" data-placeholder="PHOTO URL"></span>
                        </div>

                        {/* Editable 7x9 table */}
                        <table className="contact-table">
                            <thead>
                            <tr>
                                <th></th> {/* Empty corner cell */}
                                {daysOfWeek.map((day, index) => (
                                    <th key={index}>{day}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {periods.map((period, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td><strong>{period}</strong></td> {/* Period number */}
                                    {daysOfWeek.map((_, colIndex) => (
                                        <td key={colIndex}>
                                            <input
                                                type="text"
                                                value={this.state.tableData[rowIndex][colIndex] || ""}
                                                onChange={(e) =>
                                                    this.handleTableChange(rowIndex, colIndex, e.target.value)
                                                }
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <button className="btn">Add</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddContact;
