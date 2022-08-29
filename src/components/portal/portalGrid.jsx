import React, {Component} from 'react';
import ProfileCard from "./profileCard";
import FormCard from "./formCard";
import VolunteerCard from "./volunteerCard";

export default class PortalGrid extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-7 px-[5vw] py-[3vw] gap-[3vw] place-items-stretch">
                <ProfileCard/>
                <FormCard/>
                <VolunteerCard/>
            </div>
        )
    }
}