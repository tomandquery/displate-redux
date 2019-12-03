import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadPlates, savePlate } from "../../redux/actions/plateActions";
import PropTypes from "prop-types";
import PlateForm from "./PlateForm";
import { plate } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export function ManagePlatePage({
  plates,
  loadPlates,
  savePlate,
  history,
  ...props
}) {
  const [plate, setPlate] = useState({ ...props.plate });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (plates.length === 0) {
      loadPlates().catch(error => {
        alert("Loading plates failed" + error);
      });
    } else {
      setPlate({ ...props.plate });
    }


  }, [props.plate]);

  function handleChange(event) {
    const { name, value } = event.target;
    setPlate(prevPlate => ({
      ...prevPlate
    }));
    console.log('val: ', value, name);

  }

  function formIsValid() {
    const { title, content } = plate;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!content) errors.content = "Content is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    savePlate(plate)
      .then(() => {
        toast.success("Plate saved.");
        history.push("/plates");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return plates.length === 0 ? (
    <Spinner />
  ) : (
    <PlateForm
      plate={plate}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManagePlatePage.propTypes = {
  plate: PropTypes.object.isRequired,
  plates: PropTypes.array.isRequired,
  loadPlates: PropTypes.func.isRequired,
  savePlate: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getPlateBySlug(plates, slug) {
  return plates.find(plate => plate.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const plate =
    slug && state.plates.length > 0
      ? getPlateBySlug(state.plates, slug)
      : plate;
  return {
    plate,
    plates: state.plates
  };
}

const mapDispatchToProps = {
  loadPlates,
  savePlate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagePlatePage);
