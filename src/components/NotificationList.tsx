import React, { useEffect, useState } from "react";
import "./NotificationList.css";
import { Message } from "../dto/Message";
import { DiscordService } from "../services/DiscordService";
import { useUser } from "../util/UserContext";

interface MessageInfoPros {
    message: Message[];
}

const NotificationList: React.FC<MessageInfoPros> = ({ message }) => {
    const [messageList, setMessageList] = useState<Array<Message>>([]); // メッセージリストの状態
    const service = new DiscordService();
    const { user } = useUser(); // ユーザー情報とセット関数を取得

    useEffect(() => {
        setMessageList(message);
    }, [message]);

    /**
     * 許可ボタン押下処理
     * プロジェクト参加許可処理
     * @param projecetId 
     * @returns 
     */
    const permitToJoin = (projecetId: string) => {
        if (!user || !user.id || projecetId == "") return;
        // プロジェクトへ招待
        service.inviteProject(user.id, projecetId);
    };

    /**
     * 拒否ボタン押下処理
     * プロジェクト参加拒否処理
     * @param projecetId 
     */
    const rejectToJoin = (projecetId: string) => {
        if (!user || !user.id || projecetId == "") return;
        // プロジェクトへの参加拒否
        service.rejectProject(user.id, projecetId);
    };

    return (
        <div className="notification-list">
            <h2>通知一覧</h2>
            <ul>
                {messageList.map((message) => (
                    <li key={message.id}>
                        <div className="create-time">{message.createdAt}</div>
                        {message.message}
                        <button className="permit-button" onClick={() => permitToJoin(message.projectId)}>許可</button>
                        <button className="reject-button" onClick={() => rejectToJoin(message.projectId)}>拒否</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationList;
