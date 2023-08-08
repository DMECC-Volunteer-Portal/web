import React, {Component, Fragment} from 'react';
import axios from "../../axios";


class ProfilePicture extends Component {
    render() {
        const user = this.props.user
        return (
            <Fragment>
                <img
                    className="overflow-hidden object-cover h-full w-full sm:rounded-full sm:border-normal md:rounded-none md:border-0 xl:rounded-full xl:border-normal"
                    src={process.env.PUBLIC_URL + "/img/pfp/" + user.id + ".jpg"}/>
            </Fragment>
        );
    }
}

class ProfileNameplate extends Component {
    render() {
        const user = this.props.user
        return (
            <Fragment>
                <p className="text-h1 font-bold">{user.first_name + ' ' + user.last_name}</p>
                <p className="text-h2">{user.rank}</p>
            </Fragment>
        );
    }
}

class ProfileDescription extends Component {
    formatSchool() {
        return (this.props.user.school === undefined) ? 'Enter your school in profile!' : this.props.user.school
    }

    formatDate() {
        return new Date(this.props.user.start_date).toLocaleDateString()
    }

    formatOrg() {
        return (this.props.user.org_abbr === undefined) ? 'Enter your organization in profile!' : this.props.user.org_abbr + ' ' + this.props.user.country
    }

    formatGrade() {
        const now = new Date()
        return (now.getMonth() > 5) ? 13 - parseInt(this.props.user.grade) + now.getFullYear() : 12 - parseInt(this.props.user.grade) + now.getFullYear()
    }

    render() {
        const user = this.props.user
        return (
            <Fragment>
                <p className="text-cmd">
                    {this.formatSchool()}<br/>
                    Email: {user.email}<br/>
                    Volunteer Since: {this.formatDate()}<br/>
                    {this.formatOrg()}<br/>
                    {this.formatGrade()}<br/>
                </p>
            </Fragment>
        );
    }
}

class ProfileProgress extends Component {
    profileToolTip() {
        if (this.props.user.filled_entries < 17) {
            return (
                <div
                    className="col-start-2 row-start-5 sm:row-start-1 md:row-start-5 xl:row-start-1">
                    <p className="animated text-right opacity-0 group-hover:opacity-100 text-csm">
                        Fill in your profile!
                    </p>
                </div>
            )
        }
    }

    profileEditButton() {
        return (
            <div
                className="animated hover:scale-[115%] active:scale-[120%] text-right place-self-end col-start-3 row-start-5 sm:row-start-1 md:row-start-5 xl:row-start-1">
                <a className="text-[20vw] sm:text-[10vw] xl:text-[5vw]"
                   href="/profile">></a>
            </div>
        );
    }

    render() {
        const user = this.props.user
        return (
            <Fragment>
                {this.profileToolTip()}
                {this.profileEditButton()}
                <div
                    className="row-start-6 col-span-full grid w-full h-[2vw] md:h-[1vw] border-normal self-end">
                    <div className="bg-black h-full"
                         style={{width: (100 * parseInt(user.filled_entries) / 17) + "%"}}>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default class OldProfileCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            user: undefined
        };
        this.getUserData();
    }

    getUserData() {

    }


    render() {
        const {isLoading} = this.state;

        if (isLoading) {
            return (
                <div
                    className="h-auto w-auto aspect-[3/4] sm:aspect-[2/1] md:aspect-[3/4] xl:aspect-[2/1] bg-white border-normal group order-1 xl:col-span-4
                    grid grid-cols-1 grid-rows-5 sm:grid-rows-6 sm:grid-cols-3 md:grid-cols-1 md:grid-rows-5 xl:grid-rows-6 xl:grid-cols-3 overflow-hidden">
                </div>
            )
        }

        return (
            <div className="h-auto w-auto aspect-[3/4] sm:aspect-[2/1] md:aspect-[3/4] xl:aspect-[2/1] bg-white border-normal group order-1 xl:col-span-4
            grid grid-cols-1 grid-rows-5 sm:grid-rows-6 sm:grid-cols-3 md:grid-cols-1 md:grid-rows-5 xl:grid-rows-6 xl:grid-cols-3 overflow-hidden">
                <div
                    className="row-span-2 sm:row-span-4 sm:col-span-1 sm:p-[8%] md:p-0 md:row-span-2 md:col-span-1 xl:row-span-4 xl:col-span-1 xl:p-[8%] clickable">
                    <ProfilePicture user={this.state.user}/>
                </div>
                <div
                    className="col-span-1 row-span-1 p-[3%] sm:order-3 sm:text-center md:order-2 md:row-span-1 md:text-left xl:order-3 xl:text-center">
                    <ProfileNameplate user={this.state.user}/>
                </div>
                <div
                    className="row-span-1 p-[3%] sm:order-2 sm:col-span-2 sm:row-span-4 md:order-3 md:col-span-1 md:row-span-1 xl:order-2 xl:col-span-2 xl:row-span-4">
                    <ProfileDescription user={this.state.user}/>
                </div>
                <div
                    className="grid grid-rows-6 sm:grid-rows-2 md:grid-rows-6 xl:grid-rows-2 grid-cols-3 row-span-1 row-start-5 col-span-full sm:row-start-6 px-[3%] md:row-start-5 xl:row-start-6 pb-[2%]">
                    <ProfileProgress user={this.state.user}/>
                </div>
            </div>
        );
    }
}