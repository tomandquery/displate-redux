import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";


const PlatesList = ({plates, onDeleteClick}) => (
    <table className="table">
        <thead>
        <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Content</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
        {plates.map(plate => {
            return (
                <tr key={plate.id}>
                    <td>
                        <Link className="btn btn-outline-dark btn-sm" to={"/plate/" + plate.id}>{plate.title.slice(0,10)}...</Link>
                    </td>
                    <td>{plate.id}</td>
                    <td>{plate.title.slice(0,9)}...</td>
                    <td>
                        <Link className="btn btn-outline-primary btn-sm mr-2" to={"/plate/" + plate.id}>Edit</Link>
                        <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => onDeleteClick(plate)}
                        >Delete
                        </button>
                    </td>
                </tr>
            );
        })}
        </tbody>
    </table>
);

PlatesList.propTypes = {
    plates: PropTypes.array.isRequired,
    onDeleteClick: PropTypes.func.isRequired
};

export default PlatesList;
