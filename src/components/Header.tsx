import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useUser } from "../util/UserContext";
import { Const } from "../util/Const";

/**
 * ヘッダー部コンポネントクラス
 */
const Header = () => {
    const { user, setUser } = useUser(); // ユーザー情報とセット関数を取得
    const navigate = useNavigate();      // 遷移用フック

    /**
     * ログアウト処理
     */
    const logOut = () => {
        // Contextとキャッシュをクリア
        setUser(null);
        localStorage.removeItem("userInfo");
        navigate("/login");
    };

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
        </header>
    );
};

export default Header;
