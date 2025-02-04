import React, { useEffect, useState } from "react";
import "./NotificationList.css";
import { Message } from "../dto/Message";

interface MessageInfoPros {
    message: Message[];
}

const NotificationList: React.FC<MessageInfoPros> = ({ message }) => {
    const [messageList, setMessageList] = useState<Array<Message>>([]); // メッセージリストの状態

    useEffect(() => {
        setMessageList(message);
    }, [message]);

    // プロジェクトへの参加許可処理
    const permitJoin = () => {
        // 許可処理を実装
    };

    // プロジェクトへの参加拒否処理
    const denyJoin = () => {
        // 拒否処理を実装
    };

    return (
        <div className="notification-list">
            <h2>通知一覧</h2>
            <ul>
                {messageList.map((message) => (
                    <li key={message.id}>
                        {message.message}
                        <button className="permit-button" onClick={permitJoin}>許可</button>
                        <button className="deny-button" onClick={denyJoin}>拒否</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationList;
