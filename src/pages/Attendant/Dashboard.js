import React, { Component } from "react";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
  stateKeys,
} from "../../redux/actions";
import { Modal } from "react-bootstrap";
import hairm from "../../assets/images/home/hairm.png";
import Endpoint from "../../utils/endpoint";
import { user_storage, currencyFormat } from "../../utils/helpers";
import ClipLoader from "react-spinners/ClipLoader";

class AttendantDash extends Component {
  state = {
    addToCart: false,
    toastAdded: false,
    confirmAppointment: false,
    toastConfirmed: false,
  };

  toggleAddToCart = () => {
    this.setState({ addToCart: !this.state.addToCart });
  };
  toggleToastAdded = () => {
    this.setState({ toastAdded: !this.state.toastAdded });
    let currentState = this;
    setTimeout(function () {
      currentState.setState({ toastAdded: false });
    }, 5000);
  };
  toggleConfirmAppointment = () => {
    this.setState({ confirmAppointment: !this.state.confirmAppointment });
  };
  toggleToastConfirmed = () => {
    this.setState({ toastConfirmed: !this.state.toastConfirmed });
    let currentState = this;
    setTimeout(function () {
      currentState.setState({ toastConfirmed: false });
    }, 5000);
  };

  getSessions = () => {
    this.setState({ loading: true });

    Endpoint.getAttendantSessionsDefault(user_storage.worker_profile.id).then(
      (res) => {
        this.setState({
          attendantSessions: res.data.data.data,
          loading: false,
        });
        // console.log("Sessions", res.data.data.data);
      }
    );
  };
  getEarnings = () => {
    var todayDate = new Date();
    var day = todayDate.getDate();
    var endDay = todayDate.getDate() + 1;
    var month = todayDate.getMonth() + 1;
    var year = todayDate.getFullYear();
    var start = year + "-" + month + "-" + day;
    var end = year + "-" + month + "-" + endDay;
    this.setState({ attendantEarnings: false });
    Endpoint.getAttendantEarnings(
      start,
      end,
      user_storage.worker_profile?.id
    ).then((res) => {
      this.setState({ attendantEarnings: res.data.data });
      console.log("Earnings", this.state.attendantEarnings);
    });
  };
  componentDidMount() {
    this.getSessions();
    this.getEarnings();
    this.props.setState("home", stateKeys.PAGE_CLASS);

    this.props.setState("Sample content for dialog", stateKeys.DIALOG_CONTENT);
  }

  render() {
    const override = {
      display: "block",
      margin: "0 auto",
      // borderColor: 'red',
    };
    return (
      <>
        <div className="border-bottom mt-lg-2 mt-5 pt-5 pb-2 mb-2">
          <nav className="mb-4 mt-5" aria-label="breadcrumb">
            <ol className="breadcrumb flex-lg-nowrap">
              <li className="breadcrumb-item">
                <a className="text-nowrap" href="">
                  <i className="czi-home" />
                  Home.
                </a>
              </li>

              <li
                className="breadcrumb-item text-nowrap active"
                aria-current="page"
              >
                My Dashboard
              </li>
            </ol>
          </nav>

          <h2 className="mt-lg-1 pt-lg-1">Attendant Dashboard</h2>
        </div>

        <div className="pt-1 pb-5">
          {/* <h1 className="h4 text-dark mb-0">My Upcoming Appointments</h1> */}

          <section className="border-bottom pb-4">
            <div className="row">
              {this.state.attendantSessions &&
                this.state.attendantSessions.map((a) => {
                  return (
                    <div className="col-md-6 col-lg-3">
                      <div className="card product-card mt-3 box-shadow">
                        {/*<img src={hairm} className="card-img-top" alt="Card image"/>*/}

                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <h6 className="card-title">{a.service_name}</h6>

                            <div className="product-price">
                              <span className="text-accent">
                                $25.<small>99</small>
                              </span>
                            </div>
                          </div>
                          <p className="card-text font-size-sm text-muted mb-1">
                            <span className="text-primary mr-2">
                              {" "}
                              <i className="czi-user" />{" "}
                            </span>
                            {a.order?.buyer_name}
                          </p>

                          <p className="card-text font-size-sm text-muted mb-1">
                            <span className="text-primary mr-2">
                              {" "}
                              <i className="czi-bell" />{" "}
                            </span>
                            {/* 29/10/2020 11:30 */}
                          </p>

                          <p className="card-text font-size-sm text-muted mb-1">
                            <span className="text-primary mr-2">
                              {" "}
                              <i className="czi-time" />{" "}
                            </span>
                            {/* 45 mins */}
                          </p>

                          <button className="btn btn-custom btn-sm mt-2">
                            <i className="czi-check mr-2" /> Confirm Appointment
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

              {!this.state.attendantSessions ? (
                <div className="sweet-loading" style={{ paddingLeft: "200px" }}>
                  <ClipLoader
                    css={override}
                    size={60}
                    color={"#3C96B3"}
                    loading={this.state.spinner}
                  />
                </div>
              ) : null}
            </div>
          </section>

          <section>
            <div className="box-shadow rounded-lg overflow-hidden p-3 bg-white">
              <div className="pt-1 pb-5">
                <h1 className="h4 text-dark mb-0 mt-4 mr-3 d-inline">
                  Today's Earnings
                </h1>{" "}
                <h5 className="text-accent d-inline">
                  {currencyFormat(
                    this.state.attendantEarnings == null
                      ? "-"
                      : parseInt(this.state.attendantEarnings?.earning)
                  )}
                </h5>
                <section className="mb-3">
                  <div className="mt-3">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead className="thead-light">
                          <tr className="font-weight-bold">
                            <td>S/No</td>
                            <td>Service</td>
                            <td>Cost</td>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.attendantEarnings?.sessions?.data &&
                            this.state.attendantEarnings?.sessions?.data.map(
                              (a, i) => {
                                return (
                                  <tr>
                                    <td>{i + 1}</td>
                                    <td>{a.service_name}</td>
                                    <td>{currencyFormat(a.cost / 100)}</td>
                                   
                                  </tr>
                                );
                              }
                            )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendantDash);
