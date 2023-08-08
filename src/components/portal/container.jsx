import React, {Component, useState} from 'react';
import OldProfileCard from "./oldProfileCard";
import ProfileCard from "./profileCard"
import OldFormCard from "./oldFormCard";
import VolunteerCard from "./volunteerCard";
import FormCard from "./formCard";

function Container() {
    const [page, setPage] = useState(<ProfileCard/>);

    return (
        <div
            className="grid grid-cols-3 w-[100dvw] h-[100dvh] p-4 align-items-center">
            <div
                className="grid grid-cols-1 grid-rows-5 justify-self-end self-start p-4 gap-4">
                <a className="border-2 border-black p-4 aspect-square h-16"
                   onClick={() => {
                       setPage(<ProfileCard/>)
                   }}>1
                </a>
                <a className="border-2 border-black p-4 aspect-square h-16"
                   onClick={() => {
                       setPage(<VolunteerCard/>)
                   }}>2
                </a>
                <a className="border-2 border-black p-4 aspect-square h-16"
                   onClick={() => {
                       setPage(<FormCard/>)
                   }}>3
                </a>
                <a className="border-2 border-black p-4 aspect-square h-16"
                   onClick={() => {
                       setPage(<OldFormCard/>)
                   }}>4
                </a>
                <a className="border-2 border-black p-4 aspect-square h-16"
                   onClick={() => {
                       setPage(<OldProfileCard/>)
                   }}>5
                </a>
            </div>
            <div
                className="max-w-[98dvw] max-h-[98dvh] overflow-x-hidden
                    grid grid-cols-1 gap-2 py-8 px-4 border-2 border-black">
                {page}
                <div className="w-screen h-0 hidden"></div>
            </div>
        </div>
    )
}

export default Container;