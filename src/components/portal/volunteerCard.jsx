import React, {Component} from 'react';
import axios from '../../axios'


class RecordTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: [],
        }
        for (let key in this.props.userRecords) {
            let entry = JSON.parse(this.props.userRecords[key]);
            let date = new Date(entry['date']).toLocaleDateString()
            this.state.entries.push(
                <tr key={key}>
                    <td className="border-b-2 px-[3%] whitespace-nowrap overflow-hidden">{date}</td>
                    <td className="border-b-2 px-[3%] whitespace-nowrap overflow-hidden">{entry['activity']}</td>
                    <td className="border-b-2 px-[3%] whitespace-nowrap overflow-hidden">{entry['position']}</td>
                    <td className="border-b-2 px-[3%] whitespace-nowrap overflow-hidden">{entry['hours']}</td>
                </tr>
            )
        }
    }

    componentDidMount() {
        this.setState({entries: this.state.entries})
    }

    render() {
        return (
            <div className="overflow-y-scroll overflow-x-hidden border-normal clickable">
                <table className="relative table-fixed text-csm border-separate border-spacing-0 h-full w-full">
                    <thead className="text-left text-cxs">
                    <tr>
                        <th className="border-b-2 px-[3%] text-bold sticky top-0 bg-white w-[20%]">Date</th>
                        <th className="border-b-2 px-[3%] text-bold sticky top-0 bg-white w-[40%]">Activity</th>
                        <th className="border-b-2 px-[3%] text-bold sticky top-0 bg-white w-[25%]">Position</th>
                        <th className="border-b-2 px-[3%] text-bold sticky top-0 bg-white w-[15%]">Hours</th>
                    </tr>
                    </thead>
                    <tbody id="recent-entries" className="overflow-y-scroll">
                    {this.state.entries}
                    </tbody>
                </table>
            </div>
        )
    }
}

class NavigationPanel extends Component {
    render() {
        return (
            <div
                className="grid grid-rows-5 grid-cols-2 h-full w-full gap-[5%]">
                <div
                    className="row-span-4 grid grid-cols-6 sm:grid-cols-5 grid-rows-5 gap-[3%] xl:grid-cols-6">
                    <div className="border-normal rounded-full aspect-square interactive self-center"></div>
                    <div className="grid col-span-5 sm:col-span-4 xl:col-span-5 clickable px-[5%]">
                        <a className="text-csm md:text-cmd leading-none self-center" href="/internship-work">Alumni</a>
                    </div>
                    <div className="border-normal rounded-full aspect-square interactive self-center"></div>
                    <div className="grid col-span-5 sm:col-span-4 xl:col-span-5 clickable px-[5%]">
                        <a className="text-csm md:text-cmd leading-none self-center"
                           href="/internship-work">Internship</a>
                    </div>
                    <div className="border-normal rounded-full aspect-square interactive self-center"></div>
                    <div className="grid col-span-5 sm:col-span-4 xl:col-span-5 clickable px-[5%]">
                        <a className="text-csm md:text-cmd leading-none self-center" href="/internship-work">Youth
                            Executive</a>
                    </div>
                    <div className="border-normal rounded-full aspect-square interactive self-center"></div>
                    <div className="grid col-span-5 sm:col-span-4 xl:col-span-5 clickable px-[5%]">
                        <a className="text-csm md:text-cmd leading-none self-center" href="/internship-work">Team
                            Member</a>
                    </div>
                    <div className="border-normal rounded-full aspect-square interactive self-center"></div>
                    <div className="grid col-span-5 sm:col-span-4 xl:col-span-5 clickable px-[5%]">
                        <a className="text-csm md:text-cmd leading-none self-center" href="/training">Social Good</a>
                    </div>
                </div>
                <div className="row-span-4 grid grid-rows-4 gap-[5%]">
                    <div className="grid border-normal clickable">
                        <a className="text-cmd sm:text-csm md:text-cmd leading-none place-self-center"
                           href="/request-internship">Internship</a>
                    </div>
                    <div className="grid border-normal clickable">
                        <a className="text-cmd sm:text-csm md:text-cmd leading-none place-self-center"
                           href="/request-recommendation">Recommendation</a>
                    </div>
                    <div className="grid border-normal clickable">
                        <a className="text-cmd sm:text-csm md:text-cmd leading-none place-self-center"
                           href="/more-opportunities">What next?</a>
                    </div>
                    <div className="grid border-normal clickable">
                        <a className="text-cmd sm:text-csm md:text-cmd leading-none place-self-center"
                           href="/request-certificate">Certificate</a>
                    </div>
                </div>
                <div className="col-span-2 bg-black">

                </div>
            </div>
        )
    }
}

export default class VolunteerCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            userRecords: undefined,
        }
        this.getUserRecords();
    }

    getUserRecords = () => {
        axios
            .get(`/api/user/get-recent-records-of-user`, {})
            .then(res => {
                const data = JSON.parse(res.data)
                this.setState({userRecords: data})
                this.setState({isLoading: false})
            })
    }

    render() {
        const {isLoading} = this.state;

        if (isLoading) {
            return (
                <div
                    className="h-auto w-auto aspect-[3/4] sm:aspect-[2/1] md:col-span-2 xl:col-span-1 xl:row-span-2 xl:aspect-[3/4] xl:col-span-3 border-normal
                    grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 overflow-hidden order-3 xl:order-2 xl:grid-cols-1 xl:grid-rows-2 p-[3%] gap-[3%] md:p-[1.5%] xl:p-[4%]">
                </div>
            )
        }

        return (
            <div
                className="h-auto w-auto aspect-[3/4] sm:aspect-[2/1] md:col-span-2 xl:col-span-1 xl:row-span-2 xl:aspect-[3/4] xl:col-span-3 border-normal
                grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 overflow-hidden order-3 xl:order-2 xl:grid-cols-1 xl:grid-rows-2 p-[3%] gap-[3%] md:p-[1.5%] xl:p-[4.5%]">
                <RecordTable userRecords={this.state.userRecords}/>
                <NavigationPanel/>
            </div>
        )
    }
}