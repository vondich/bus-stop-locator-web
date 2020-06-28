import React, { Component } from 'react';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { withRouter } from "react-router-dom";
import RegisterBusForm from '../RegisterBusForm/RegisterBusForm';
import { fetchNearestBusStop } from '../../services/Api/Api';

import './BusStopComponent.css'

class BusStopComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            busStopId: '',
            name: '',
            code: '',
            lat: '',
            long: '',
            buses: [],
            disabled: true
        }
    }

    componentDidMount() {
        this.props.updateTitle('Bus Stop Locator')
        const currentLat = 1.2819753000000000;
        const currentLong = 103.84655110000000;
        fetchNearestBusStop(currentLat, currentLong)
            .then(result => {
                this.setNearestBusStop(result)
            })
            .catch(error => {
                this.props.showError(error.errorMessage)
            });
    }

    redirectToLogin = () => {
        this.props.updateTitle('Login')
        this.props.history.push('/login');
    }

    busPopover = bus => {
        return (
            <Popover id="popover-basic">
            <Popover.Title as="h3">Arrival Information</Popover.Title>
            <Popover.Content>
                First: {bus.firstArrivalTime} <br />
                Last: {bus.lastArrivalTime}
            </Popover.Content>
            </Popover>
        )
    }

    busButton = bus => {
        return (
            <OverlayTrigger trigger="click" placement="right" overlay={this.busPopover(bus)} key={bus.code} rootClose="true">
                <Button variant="success" className="btn-bus">{bus.code}</Button>
            </OverlayTrigger>
      );
    }

    transformBuses = buses => {
        return buses.map(bus => {
            return {
                ...bus,
                firstArrivalTime: bus.first_arrival_time,
                lastArrivalTime: bus.last_arrival_time,
            }
        })
    }

    setNearestBusStop = (response) => {
        console.log(response)
        this.setState(prevState => ({
            ...prevState,
            busStopId: response.id,
            name: response.name,
            code: response.code,
            lat: response.lat,
            long: response.long,
            buses: this.transformBuses(response.buses),
            disabled: false
        }))
    }

    renderBuses = () => {
        if (this.state.buses.length > 0) {
            return (
                <div>
                    <h6>Available Buses</h6>
                    <p className="small">Click on the bus code to see arrival information.</p>
                    <p>
                       {
                           this.state.buses.map(bus => {
                                return this.busButton(bus)
                            })
                       }     
                    </p>
                </div>
            )
        }
        
        return (
            <div>
                <h6>No Available Buses</h6>
            </div>
        )
    }

    onSuccess = bus => {
        this.setState(prevState => ({
            buses: [...prevState.buses, bus]
        }))
    }

    render() {
        return (
            <div className="container col-12 col-lg-4 bus-stop-container mt-2 hv-center">
                The nearest bus stop from your current location is

                <div className="card col bus-stop-detail-card hv-center">
                    <div className="card-body">
                        <h5 className="card-title">{this.state.name} ({this.state.code})</h5>
                        {this.renderBuses()}
                        <RegisterBusForm disabled={this.state.disabled} code={this.state.code} busStopId={this.state.busStopId} onSuccess={this.onSuccess} showError={this.props.showError} />
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(BusStopComponent);
