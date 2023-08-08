import React, {Component, Fragment} from 'react';
import axios from "../../axios";

class ProgressCircle extends Component {
    render() {
        const hours = this.props.hours
        const beforeDeg = (hours % 100 > 50) ? 180 + (360 * (hours % 100) / 100) : 0
        const afterDeg = (hours % 100 > 50) ? 0 : 180 + (360 * (hours % 100) / 100)
        return (
            <div
                className="grid row-span-1 sm:row-span-6 sm:col-span-1 md:row-span-1 md:col-span-1 xl:row-span-6 xl:col-span-1 select-none clickable">
                <div className="grid grid-rows-1 grid-cols-1 h-full w-full">
                    <div
                        className="rounded-full h-auto w-auto aspect-square self-center overflow-hidden">
                        <div className="grid grid-cols-2 grid-rows-1 w-full h-full">
                            <div className="overflow-hidden">
                                <div
                                    className="grid grid-cols-2 grid-rows-1 w-[200%] h-full"
                                    style={{rotate: beforeDeg + 'deg'}}>
                                    <div></div>
                                    <div className="bg-black"></div>
                                </div>
                            </div>
                            <div className="overflow-hidden">
                                <div
                                    className="grid grid-cols-2 grid-rows-1 w-[200%] h-full"
                                    style={{transform: "translateX(-50%) rotate(" + afterDeg + "deg)"}}>
                                    <div></div>
                                    <div className="bg-black"></div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="grid grid-rows-1 grid-cols-1 rounded-full border-normal aspect-square h-full w-full -translate-y-[100%] p-[3%]">
                            <div className="bg-white rounded-full border-normal">
                                <div className="grid h-full w-full p-[3%]">
                                    <div className="self-center">
                                        <p className="text-[16vw] sm:text-[10vw] md:text-[7.5vw] xl:text-[5vw] text-center self-end leading-none row-span-3">{hours}</p>
                                        <p className="text-cmd text-center self-center leading-none">
                                            Hours</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class FormPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formHours: 0,
            formType: 0,
            formActivity: 0,
            formActivities:
                [<option key="0" value="0"
                         className="text-cmd leading-none">Select an
                    activity type
                </option>],
            formPosition: 0,
            formPositions:
                [<option key="0" value="0"
                         className="text-cmd leading-none">Select an
                    activity
                </option>],
            formReflection: ""
        };
    }

    decHours = () => {
        if (this.state.formHours === 0) return
        this.setState({formHours: this.state.formHours - 1})
    }

    incHours = () => {
        this.setState({formHours: this.state.formHours + 1})
    }

    onFormTypeChange = (event) => {
        if (event.target.value == 0) return;
        this.setState({
            formType: event.target.value,
            formActivities:
                [<option key="0" value="0"
                         className="text-cmd leading-none">Loading...
                </option>]
        })
        let endpoint
        if (event.target.value === "event") endpoint = '/api/data/get-recent-events';
        else if (event.target.value === "team") endpoint = '/api/user/get-teams-of-user';
        axios
            .get(endpoint, {})
            .then(res => {
                const data = JSON.parse(res.data)
                const formActivities = []
                for (let key in data) {
                    formActivities.push(
                        <option value={key} className="text-cmd leading-none">
                            {data[key]}
                        </option>
                    )
                }
                this.setState({formActivities: formActivities, formActivity: 0})
            })
    }

    onFormActivityChange = (event) => {
        if (event.target.value == 0) return;
        this.setState({
            formActivity: event.target.value,
            formPositions:
                [<option key="0" value="0"
                         className="text-cmd leading-none">Loading...
                </option>]
        })
        let endpoint;
        if (this.state.formType === "event") endpoint = "/api/data/get-roles-of-event?event_id=" + event.target.value;
        else if (this.state.formType === "team") endpoint = '/api/data/get-roles-of-team?team_id=' + event.target.value;
        axios
            .get(endpoint, {})
            .then(res => {
                const data = JSON.parse(res.data)
                const formPositions = []
                for (let key in data) {
                    formPositions.push(
                        <option value={key} className="text-cmd leading-none">
                            {data[key]}
                        </option>
                    )
                }
                this.setState({formPositions: formPositions})
            })
    }

    onFormPositionChange = (event) => {
        this.setState({formPosition: event.target.value})
    }

    onFormReflectionChange = (event) => {
        this.setState({formReflection: event.target.value})
    }

    submitForm = () => {
        console.table(this.state.formType, this.state.formActivity, this.state.formPosition, this.state.formReflection)
        const formData = {
            "date": new Date() * 1000,
            "hours": parseInt(this.state.formHours),
            "reflection": this.state.formReflection,
            [this.state.formType + "_id"]: parseInt(this.state.formActivity),
            "role_id": parseInt(this.state.formPosition)
        }
        axios
            .post('/api/user/log-volunteer-record', formData)
            .then(res => {
                this.handleFormSubmit()
                console.log('submitted!')
                this.setState({
                    formHours: 0,
                    formType: 0,
                    formActivity: 0,
                    formActivities:
                        [<option key="0" value="0"
                                 className="text-cmd leading-none">Select an
                            activity type
                        </option>],
                    formPosition: 0,
                    formPositions:
                        [<option key="0" value="0"
                                 className="text-cmd leading-none">Select an
                            activity
                        </option>],
                    formReflection: ""
                })
            })
    }

    handleFormSubmit() {
        this.props.onFormSubmit(this.state.formHours);
    }

    render() {
        return (
            <Fragment>
                <div className="select-none leading-none text-center self-stretch sm:col-span-2 sm:row-span-1 md:col-span-1 md:row-span-1
                    grid grid-rows-2 grid-cols-3 w-full h-full gap-[10%] sm:grid-cols-6 sm:grid-rows-1 md:grid-rows-2 md:grid-cols-3
                    xl:grid-cols-6 xl:grid-rows-1 xl:col-span-2 xl:row-span-1">
                    <button type="submit"
                            className="text-cmd text-bold leading-none w-full h-full col-span-3 border-normal clickable sm:order-last xl:order-last"
                            onClick={this.submitForm}
                    >
                        Add
                    </button>
                    <button
                        className="clickable select-none border-normal text-[10vw] sm:text-[4vw] md:text-[5vw] xl:text-[2vw] leading-none text-center"
                        id="decrement-hours" onClick={this.decHours}>
                        -
                    </button>
                    <div className="place-self-center">
                        <p id="hours-volunteered"
                           className="text-[10vw] sm:text-[5vw] xl:text-[2.5vw] leading-none text-center">{this.state.formHours}</p>
                        <p className="text-csm">Hours</p>
                    </div>
                    <button
                        className="clickable select-none border-normal text-[10vw] sm:text-[4vw] md:text-[5vw] xl:text-[2vw] leading-none text-center"
                        id="decrement-hours" onClick={this.incHours}>
                        +
                    </button>
                </div>
                <div
                    className="col-span-2 row-span-2 grid grid-rows-5 grid-cols-3 w-full h-full gap-[5%] sm:row-span-5 md:row-span-2 xl:row-span-5">
                    <div className="text-left self-center">
                        <label htmlFor="volunteer-record-type"
                               className="text-cmd">Type:</label>
                    </div>
                    <div className="col-span-2">
                        <select id="volunteer-record-type" name="volunteer-record-type"
                                onChange={this.onFormTypeChange}
                                value={this.state.formType}
                                className="w-full h-full text-cmd leading-none border-normal">
                            <option value="0"
                                    className="text-cmd leading-none">Select a
                                type
                            </option>
                            <option value="team"
                                    className="text-cmd leading-none">Team
                            </option>
                            <option value="event"
                                    className="text-cmd leading-none">Event
                            </option>
                        </select>
                    </div>
                    <div className="col-span-1 self-center">
                        <label htmlFor="activity-choice"
                               className="text-cmd leading-none">Activity:</label>
                    </div>
                    <div className="col-span-2">
                        <select id="activity-choice" name="activity-choice"
                                onChange={this.onFormActivityChange}
                                value={this.state.formActivity}
                                className="w-full h-full text-cmd leading-none border-normal">
                            {this.state.formActivities}
                        </select>
                    </div>
                    <div className="col-span-1 self-center">
                        <label htmlFor="position-choice"
                               className="text-cmd leading-none">Position:</label>
                    </div>
                    <div className="col-span-2">
                        <select id="position-choice" name="position-choice"
                                onChange={this.onFormPositionChange}
                                value={this.state.formPosition}
                                className=" w-full h-full text-cmd leading-none border-normal">
                            {this.state.formPositions}
                        </select>
                    </div>
                    <div className="col-span-3 row-span-2">
                        <label htmlFor="reflection"></label>
                        <textarea id="reflection"
                                  onChange={this.onFormReflectionChange}
                                  value={this.state.formReflection}
                                  className="h-full w-full border-normal p-[3%] text-cmd"
                                  placeholder="Reflection: 2-3 Sentences"></textarea>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default class OldFormCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            totalHours: undefined,
        };
        this.getHoursData()
    }

    onFormSubmit = (hours) => {
        this.setState({totalHours: this.state.totalHours + hours})
    }

    getHoursData() {
        axios
            .get(`/api/user/total-hours`, {})
            .then(res => {
                const data = res.data
                this.setState({totalHours: data})
                this.setState({isLoading: false})
            })
    }

    render() {
        const {isLoading} = this.state;

        if (isLoading) {
            return (
                <div
                    className="h-auto w-auto aspect-[3/4] sm:aspect-[2/1] md:aspect-[3/4] xl:aspect-[2/1] bg-white border-normal group xl:col-span-4
                    grid grid-cols-2 grid-rows-3 sm:grid-rows-6 sm:grid-cols-3 md:grid-cols-2 md:grid-rows-3 xl:grid-rows-6 xl:grid-cols-3 order-2 xl:order-3 p-[3%] gap-[5%]">
                </div>
            )
        }

        return (
            <div className="h-auto w-auto aspect-[3/4] sm:aspect-[2/1] md:aspect-[3/4] xl:aspect-[2/1] bg-white border-normal group xl:col-span-4
            grid grid-cols-2 grid-rows-3 sm:grid-rows-6 sm:grid-cols-3 md:grid-cols-2 md:grid-rows-3 xl:grid-rows-6 xl:grid-cols-3 order-2 xl:order-3 p-[3%] gap-[5%]">
                <ProgressCircle hours={this.state.totalHours}/>
                <FormPanel onFormSubmit={this.onFormSubmit}/>
            </div>
        );
    }
}