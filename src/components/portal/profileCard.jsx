import axios from "../../axios";
import {useEffect, useState} from "react";

function ProfileCard() {
    const [user, setUser] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`/api/user/current-user`, {})
            .then(res => {
                const data = JSON.parse(res.data)
                setUser(data);
                setIsLoading(false);
            })
        console.log(user);
    }, [])

    if (isLoading) return;

    return (
        <div className="">
            <img
                className="w-[50%] aspect-square overflow-hidden object-cover border-2 border-black rounded-full"
                src={process.env.PUBLIC_URL + "/img/pfp/" + user.id + ".jpg"}/>
            <div className="grid p-6 gap-2">
                <p className="font-bold text-3xl">{user.first_name + " " + user.last_name}</p>
                <p className="text-xl">{user.school}<br/>{user.email}<br/>Volunteer
                    Since: {new Date(user.start_date).toLocaleDateString()}<br/>{user.org_abbr +
                        " " + user.country}<br/>Grade {user.grade}</p>
            </div>
        </div>
    );
}

export default ProfileCard;