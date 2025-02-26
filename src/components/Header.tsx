import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useUser } from "../util/UserContext";
import React, { useEffect, useRef, useState } from "react";
import NotificationList from "./NotificationList";
import { toast } from "react-toastify";
import { MessageService } from "../services/MessageService";
import { Message } from "../dto/Message";

/**
 * ヘッダー部コンポネントクラス
 */
const Header = () => {
    const { user, setUser } = useUser(); // ユーザー情報とセット関数を取得
    const navigate = useNavigate();      // 遷移用フック
    const [isNotificationOpen, setIsNotificationOpen] = React.useState(false); // 通知ウィンドウの表示状態
    const notificationRef = useRef(null); // 通知ウィンドウを参照
    const eventSourceRef = useRef<EventSource | null>(null);
    const messageService = new MessageService();
    const [messageList, setMessageList] = useState<Array<Message>>([]); // メッセージリストの状態

    /** 
     * ログアウト処理
     */
    const logOut = () => {
        // Contextとキャッシュをクリア
        setUser(null);
        localStorage.removeItem("userInfo");
        navigate("/login");
    };

    /**
     * 通知ウィンドウを開く
     */
    const openNotifyWindow = () => {
        setIsNotificationOpen(!isNotificationOpen); // 表示状態をトグル切り替え
    }

    /**
     * クリックイベントでリストを閉じる処理
     */
    const clickOutOfNotificationWindow = (event: { target: any; }) => {
        if (notificationRef.current && !(notificationRef.current as HTMLElement).contains(event.target)) {
            setIsNotificationOpen(false);
        }
    };

    useEffect(() => {
        if (isNotificationOpen) {
            document.addEventListener("mousedown", clickOutOfNotificationWindow);
        } else {
            document.removeEventListener("mousedown", clickOutOfNotificationWindow);
        }
        return () => {
            document.removeEventListener("mousedown", clickOutOfNotificationWindow);
        };
    }, [isNotificationOpen]);

    /**
     * 通知受信処理(SSE)
     */
    useEffect(() => {
        if (eventSourceRef.current) return;

        // EventSource のインスタンスがまだない場合のみ作成
        eventSourceRef.current = new EventSource("https://dev-guild.onrender.com/notifications/stream");

        // 通知表示
        eventSourceRef.current.onmessage = (event) => {
            toast.success(event.data, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        };

        return () => {
            eventSourceRef.current?.close();
            eventSourceRef.current = null;
        };
    }, []);

    /**
     * 通知取得処理
     */
    useEffect(() => {
        if (user && user.id) {
            // メッセージ情報を取得
            messageService.receiveNotification(user.id).then(message => setMessageList(message));
        }
    }, [user]);

    return (
        <header className="header">

            <div className="logo">
                <Link to="/" >Dev.Guild</Link>
            </div>

            <nav className="nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/" className="project-list">プロジェクト一覧</Link>
                    </li>
                    {user && (
                        <li className="nav-item">
                            <Link to="/create" className="create-project">プロジェクト作成</Link>
                        </li>
                    )}
                    {user && (
                        <li className="nav-item">
                            <Link to="/myprojects" className="edit-project">プロジェクト編集</Link>
                        </li>
                    )}
                    {user && (
                        <li className="nav-item">
                            <Link to="/joining" className="joining-project">参画中プロジェクト</Link>
                        </li>
                    )}
                    {user && (
                        <div className="nav-item">
                            {messageList.length > 0 && (
                                <label className="notify-number">{messageList.length}</label>
                            )}
                            <button className="notify-button" onClick={openNotifyWindow}>通知</button>
                        </div>
                    )}
                </ul>
                {user ? (
                    <div className="user-menu">
                        <span className="welcome-message">
                            ようこそ、<strong>{user.name}</strong> さん
                        </span>
                        <button className="logout-button" onClick={logOut}>
                            ログアウト
                        </button>
                    </div>
                ) : (
                    <Link to={`/login`} className="login-link">
                        ログイン
                    </Link>
                )}
            </nav>

            {/* 通知一覧ウィンドウ */}
            {isNotificationOpen && (
                <div ref={notificationRef}>
                    <NotificationList message={messageList}/>
                </div>
            )}
        </header>
    );
};

export default Header;
