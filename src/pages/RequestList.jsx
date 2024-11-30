import React from "react";
import { useSelector } from "react-redux";
import RequestCard from "../components/RequestCard";

export default function RequestList() {
    const requests = useSelector((state) => state.user.requests);
    console.log(requests);
    return (
        <>
            {requests.map((request, idx) => (
                <RequestCard request={request} key={idx} />
            ))}
        </>
    );
}
