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
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        setMessageList(message);
    }, [message]);

    /**
     * 許可ボタン押下処理
     * プロジェクト参加許可処理
     * @param projecetId 
     * @returns 
     */
    const permitToJoin = (message:Message) => {
        if (!user || !user.id) return;

        if (isProcessing) return; // すでに処理中なら何もしない
        setIsProcessing(true);

        // プロジェクトへ招待
        service.inviteProject(user.id, message);

        // 1.5秒後にページをリロード
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    };

    /**
     * 拒否ボタン押下処理
     * プロジェクト参加拒否処理
     * @param projecetId 
     */
    const rejectToJoin = (message:Message) => {
        if (!user || !user.id) return;

        if (isProcessing) return; // すでに処理中なら何もしない
        setIsProcessing(true);

        // プロジェクトへの参加拒否
        service.rejectProject(user.id, message);

        // 1秒後にページをリロード
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    return (
        <div className="notification-list">
            <h2>通知一覧</h2>
            <ul>
                {messageList.map((message) => (
                    <li key={message.messageId}>
                        <div className="create-time">{message.createdAt}</div>
                        {message.message}
                        <button className="permit-button" onClick={() => permitToJoin(message)} disabled={isProcessing}>許可</button>
                        <button className="reject-button" onClick={() => rejectToJoin(message)} disabled={isProcessing}>拒否</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationList;
