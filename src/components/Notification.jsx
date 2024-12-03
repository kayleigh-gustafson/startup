import React from 'react';

export default function Notification({ user, action }) {
    let msg;
    if (action === "finish") {
        msg = `${user} just finished an assignment!`;
    }
    return(
        <div>
            <p>Message: {msg}</p>
        </div>
    )
}