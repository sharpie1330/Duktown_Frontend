import {Client} from "@stomp/stompjs";
import React, {useEffect, useRef} from "react";

function WsTest(){
    const clientRef = useRef(null);

    const connect = () => {
        clientRef.current = new Client({
            brokerURL: 'ws://localhost:8080/websocket',
            onConnect: () => {
                console.log("ws connected");
            },
        });
        clientRef.current.activate();
    }

    const disconnect = () => {
        clientRef.current.deactivate();
    };

    useEffect(() => {
        connect();

        return () => disconnect();
    }, [])

    return (
        <></>
    );
}

export default WsTest;