import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "..\\src\\assets\\logo.jpg";
import Mode from "../util/Mode";
import { useUser } from "../util/UserContext";

const Header = () => {
    // ユーザー情報を管理（簡易的な例）
    // const [user, setUser] = useState(null); // nullなら未ログイン、オブジェクトならログイン中
    const { user, setUser } = useUser(); // ユーザー情報とセット関数を取得

    const handleLogout = () => {
        setUser(null);
        alert("ログアウトしました");
    };

    return (
        <header className="header">
            {/* ロゴ */}
            <div className="logo">
                {/* <img src={logo} alt="logo" className="logo-image"></img> */}
                <Link to="/" >MyProjectApp</Link>
            </div>

            {/* ナビゲーションメニュー */}
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
                </ul>
                {user ? (
                    <div className="user-menu">
                        <span className="welcome-message">
                            ようこそ、<strong>{user.name}</strong> さん
                        </span>
                        <button className="logout-button" onClick={handleLogout}>
                            ログアウト
                        </button>
                    </div>
                ) : (
                    <Link to={`/login`} state={{mode : Mode.MODE_LOGIN}} className="login-link">
                        ログイン
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Header;
