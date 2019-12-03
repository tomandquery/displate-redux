import React from "react";
import { connect } from "react-redux";
import * as plateActions from "../../redux/actions/plateActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import PlatesList from "./PlatesList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class PlatesPage extends React.Component {
  state = {
    redirectToAddPlatePage: false
  };

  componentDidMount() {
    const { plates, actions } = this.props;

    if (plates.length === 0) {
      actions.loadPlates().catch(error => {
        alert("Loading plates failed" + error);
      });
    }
  }

  handleDeletePlate = async plate => {
    toast.success("Plate deleted");
    try {
      await this.props.actions.deletePlate(plate);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddPlatePage && <Redirect to="/plate" />}
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20, marginTop: 20 }}
              className="btn btn-outline-primary btn-sm add-plate"
              onClick={() => this.setState({ redirectToAddPlatePage: true })}
            >
              Add Plate
            </button>

            <PlatesList
              onDeleteClick={this.handleDeletePlate}
              plates={this.props.plates}
            />
          </>
        )}
      </>
    );
  }
}

PlatesPage.propTypes = {
  plates: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  console.log('state: ', state);
  return {
    plates: state.plates
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadPlates: bindActionCreators(plateActions.loadPlates, dispatch),
      deletePlate: bindActionCreators(plateActions.deletePlate, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlatesPage);
