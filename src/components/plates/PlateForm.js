import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import TextArea from "../common/TextArea";
import {Link} from "react-router-dom";

const PlateForm = ({
                      plate,
                      onSave,
                      onChange,
                      saving = false,
                      errors = {}
                  }) => {
    return (
        <form onSubmit={onSave}>
            <h2 className="alert alert-success">{plate.id ? "Edit" : "Add"} Plate</h2>
            {errors.onSave && (
                <div className="alert alert-danger" role="alert">
                    {errors.onSave}
                </div>
            )}
            <TextInput
                name="title"
                label="Title"
                placeholder={'Write title...'}
                value={plate.title}
                onChange={onChange}
                error={errors.title}
            />

            <TextArea
                name="content"
                label="Content"
                value={plate.content}
                onChange={onChange}
                error={errors.content}
                placeholder={'Write something...'}
            />

            <button type="submit" disabled={saving} className="btn btn-primary mr-2">
                {saving ? "Saving..." : "Save"}
            </button>
            <Link className="btn btn-outline-danger" to={"/plates"}>Cancel</Link>
        </form>
    );
};

PlateForm.propTypes = {
    plate: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default PlateForm;
