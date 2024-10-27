import React from "react";
import { Link } from "react-router-dom";

class EditContact extends React.Component {
    constructor(props) {
        super(props);
        const location = window.location;
        const _id = location.pathname.substring(
            location.pathname.lastIndexOf("/") + 1
        );

        const { name, phoneNumber, photo, department, tableData } = props.contacts.find(
            (contact) => contact._id === _id
        );

        this.state = {
            _id: _id,
            name: name || "",
            phoneNumber: phoneNumber || "",
            photo: photo || "",
            department: department || "",
            tableData: tableData || Array.from({ length: 8 }, () => Array(6).fill("")), // 8 rows, 6 columns pre-filled with data or empty
        };
    }

    // Function to handle changes in each cell
    handleTableChange = (rowIndex, colIndex, value) => {
        const newTableData = [...this.state.tableData];
        newTableData[rowIndex][colIndex] = value;
        this.setState({ tableData: newTableData });
    };

    update = (e) => {
        e.preventDefault();

        const { name, phoneNumber, department, photo, tableData } = this.state;

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

        // Pass updated contact data including tableData to parent handler
        this.props.updateContactHandler(this.state);

        // Clear the form fields
        this.setState({
            _id: "",
            name: "",
            phoneNumber: "",
            photo: "",
            department: "",
            tableData: Array.from({ length: 8 }, () => Array(6).fill("")),
        });
    };

    render() {
        const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const periods = Array.from({ length: 8 }, (_, i) => i + 1);

        return (
            <div className="container-contact2">
                <Link to="/">
                    <button className="btn3">{"<"}</button>
                </Link>
                <div className="wrap-contact2">
                    <form className="contact2-form" onSubmit={this.update}>
                        <span className="contact2-form-title">Edit Contact</span>

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

                        {/* Editable 7x9 Table */}
                        <table className="contact-table">
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

                        <button className="btn" >Update</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default EditContact;
