import React, { Component } from "react";
import Aux from "../Aux/Aux";
import Modal from "../../components/UI/Modal/Modal";
const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    // This state is required only for the error which is used to show the modal below
    state = {
      error: null
    };
    // Note that this method will be executed after the Wrapped component (BurgerBuilder in this case)is executed.
    // That means the axios instance written in BurgerBuilder is executed and then reaches the interceptors written
    // inside this below componentDidMount()
    componentWillMount() {
      console.log("CWM withErrorHandler"); // Testing which one is executed first. This one vs BurgerBuilder CDM
      // Changing this from cdm to cwm. Because this must be loaded before child comps loaded. Constructor also can be used instead of cwm
      //used to clear error if any occured in response interceptors below
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req; // We need to return request in the interceptor request so that it proceeds
      });
      //The below method is the method we are interested in but we are writing the interceptors.requests just to
      // clear the errors if any occured during the response interceptors below
      this.resInterceptor = axios.interceptors.response.use(
        (res) => res, // We need to return response in the interceptor response so that it proceeds
        (error) => {
          this.setState({ error: error });
        }
      );
    }
    // cwum is used to unmount this component once some other component is rendered. Else it will create a problem.
    componentWillUnmount() {
      // Here we clear the interceptors created during cwm
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }
    // We use this errrorConfirmedHandler to clear any errors (setting back to null) once the backdrop is clicked which is in the modal
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
