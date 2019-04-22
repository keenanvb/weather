import React, { Component } from 'react'
import LoadingPulse from './LoadingPulse'
import moment from "moment"

export class Status extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            toggle: false
        }
    }

    displayInformation = (data) => {
        let location = data.locationData;
        let status = data.weatherData;
        let err = data.err

        if (err) {
            return (
                < div className="status-container" >
                    <div className="status-text">{err.errorMsg}</div>
                </div>
            )
        } else {
            return (
                < div className="status-container" >
                    <div className="status-location"> {location.place}</div>
                    <a target='_blank' href={`https://www.google.com/maps?q=${location.lat},${location.long}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z" /><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z" /><circle cx="12" cy="9" r="2.5" /></svg>
                    </a>
                    <div className="status-text">{status.status}</div>
                </div>
            )
        }
    }

    displayCurrentInformation = (data) => {
        let current = data.weatherData;

        let date = moment.unix(current.today.time).format("DD-MM-YYYY");
        let sunRise = moment.unix(current.today.sunriseTime).format("HH:mm");
        let sunSet = moment.unix(current.today.sunsetTime).format("HH:mm");

        if (current != undefined) {
            return (
                < div className="current-container">
                    {}
                    <div className="date">
                        <div>{date}</div>
                    </div>
                    <div>{current.today.summary}</div>
                    <div className="temp">
                        <div>{current.today.temperatureMin}min</div>
                        <div>{current.today.temperatureMax}max</div>
                    </div>
                    <div className="sun">
                        <div>Sunrise {sunRise}AM</div>
                        <div>Sunset {sunSet}PM</div>
                    </div>
                </div>
            )
        }
    }

    toggle() {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }

    render() {
        let { result } = this.props;
        let { toggle } = this.state;
        let data = result.weatherData;
        return (
            <div>
                {data.err ?
                    < div className="error-container">
                        API call has been reach for the day.Please try again tomorrow
                    </ div>
                    :
                    < div >
                        {data ? this.displayInformation(data) : null}
                        {data ? <div onClick={() => { this.toggle() }} ><LoadingPulse toggle={toggle} /></div> : null}
                        {toggle ? this.displayCurrentInformation(data) : null}
                    </div>
                }

            </div>
        )
    }
}

export default Status