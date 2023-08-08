import React, {useCallback, useState} from "react";
import axios from "../../axios";

export default function FormCard(callback, deps) {
    const [hours, setHours] = useState(0);
    const [type, setType] = useState(0);
    const [activity, setActivity] = useState(0);
    const [activities, setActivities] = useState(
        [<option key="0" value="0" className="">Select an activity type first</option>]
    );
    const [position, setPosition] = useState(0);
    const [positions, setPositions] = useState(
        [<option key="0" value="0" className="">Select an activity first</option>]
    )
    const [reflection, setReflection] = useState("");

    const onFormDecreaseHours = useCallback(() => {
        if (hours === 0) return;
        setHours(hours - 1);
    }, [hours])

    const onFormIncreaseHours = useCallback(() => {
        setHours(hours + 1);
    }, [hours])

    const onFormTypeChange = useCallback((event) => {
        if (event.target.value == 0) return;
        setType(event.target.value);
        setActivities(
            [<option key="0" value="0"
                     className="text-cmd leading-none">Loading...</option>]
        );
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
                        <option value={key} className="">
                            {data[key]}
                        </option>
                    )
                }
                setActivity(0);
                setActivities(formActivities);
            })
    }, [type, activities])

    const onFormActivityChange = useCallback((event) => {
        if (event.target.value == 0) return;
        setActivity(event.target.value);
        setPositions([<option key="0" value="0"
                              className="text-cmd leading-none">Loading...</option>])
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
                setPositions(formPositions);
            })
    }, [activity, positions])

    const onFormPositionChange = useCallback((event) => {
        setPosition(event.target.value);
    }, [position])

    const onFormReflectionChange = useCallback((event) => {
        setReflection(event.target.value);
    }, [reflection])

    const submitForm = useCallback(() => {
        const formData = {
            "date": new Date() * 1000,
            "hours": hours,
            "reflection": reflection,
            [type + "_id"]: activity,
            "role_id": position
        }
        axios
            .post('/api/user/log-volunteer-record', formData)
            .then(res => {
                console.log('submitted!')
                setHours(0);
                setType(0);
                setActivity(0);
                setActivities([<option key="0" value="0" className="">Select an activity
                    type first</option>])
                setPosition(0);
                setPositions([<option key="0" value="0" className="">Select an activity
                    first</option>])
                setReflection(0);
            })
    }, [hours, type, activity, activities, position, positions, reflection])

    return (
        <div className="">
            <button className="p-4 border-2 border-black"
                    onClick={onFormDecreaseHours}>-
            </button>
            <button className="p-4 border-2 border-black"
                    onClick={onFormIncreaseHours}>+
            </button>
            <p>Hours: {hours}</p>
            <button type="submit" className="p-4 border-2 border-black"
                    onClick={submitForm}>Add
            </button>
        </div>
    )
}