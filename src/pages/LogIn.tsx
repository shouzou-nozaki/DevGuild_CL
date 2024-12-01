import React, { useState, useEffect } from 'react';
import App from '../App';  // 認証後に表示されるメインのAppコンポーネント
import { Link, Router, useLocation, useNavigate } from 'react-router-dom';
import { AppRouter } from '../routes/AppRouter';

import './Login.css';
import { Errors } from '../dto/Errors';
import Messages from '../util/Message';
import { UserService } from '../services/UserService';
import Mode from '../util/Mode';
import { useUser } from '../util/UserContext';
import { UserConv } from '../util/UserConv';

const Login = () => {
  const { setUser } = useUser();

  const [username, setUsername] = useState("");   // ユーザー名の状態
  const [email, setEmail] = useState("");   // メールアドレスの状態
  const [password, setPassword] = useState("");   // パスワードの状態
  const [errorMessage, setErrorMessage] = useState<Errors>({}); // エラーメッセージの状態

  // 初期化処理(初回レンダリング時のみ)
  useEffect(() => {
    setUsername("");
    setEmail("");
    setPassword("");
  }, []);

  // 遷移元からの表示モード取得
  const location = useLocation();
  const mode = location.state?.mode;

  // 遷移用フック
  const navigate = useNavigate();

  /**
   * ログインボタン押下処理
   * @returns 
   */
  const handleLogin = async () => {

    // 入力値を見てエラーメッセージをセット
    const errors = new Errors();
    if (mode == Mode.MODE_CREATE && !username) errors.UserNameError = Messages.REQUIRED_USERNAME;
    if (!email) errors.AddressError = Messages.REQIRED_EMAIL;
    if (!password) errors.PasswordError = Messages.REQUIRED_PASSWORD;
    setErrorMessage(errors);

    // エラーメッセージが１件でもあれば処理を抜ける
    if (errors.UserNameError || errors.AddressError || errors.PasswordError) return;

    try {
      // ログイン処理実行
      const service = new UserService();
      const responseData = await service.userLogin(username, email, password);

      // ここでユーザーの値を入れる
      const util = new UserConv();
      const userInfo = util.ToUserInfo(responseData);

      if (!userInfo.UserId || !userInfo.Name) return;

      // プロジェクト一覧へ移動
      setUser({ id: userInfo.UserId, name: userInfo.Name });
      navigate("/");
    } catch (error) {
      console.error("ログイン中にエラー:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">{mode}</h1>

        {/* ユーザー名 */}
        {mode == Mode.MODE_CREATE && (
          <div className="form-group">
            <label htmlFor="username">ユーザー名</label>
            {/* エラーメッセージ */}
            {errorMessage.UserNameError && <div className="error_message">{errorMessage.UserNameError}</div>}
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value.trim())}
              placeholder="ユーザー名を入力"
            />
          </div>
        )}

        {/* メールアドレス */}
        <div className="form-group">
          <label htmlFor="username">メールアドレス</label>
          {/* エラーメッセージ */}
          {errorMessage.AddressError && <div className="error_message">{errorMessage.AddressError}</div>}
          <input
            type="text"
            id="address"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            placeholder="ユーザー名を入力"
          />
        </div>

        {/* パスワード */}
        <div className="form-group">
          <label htmlFor="password">パスワード</label>
          {/* エラーメッセージ */}
          {errorMessage.PasswordError && <div className="error_message">{errorMessage.PasswordError}</div>}
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            placeholder="パスワードを入力"
          />
        </div>

        {/* ログインボタン */}
        <button className="login-button" onClick={handleLogin}>
          ログイン
        </button>

        {/* リンク */}
        <div className="login-links">
          <a href="#">パスワードを忘れた方はこちら</a>
          <Link to={`/login`} state={{ mode: Mode.MODE_CREATE }} className="login-link">
            新規登録
          </Link>
        </div>
      </div>
    </div>
  );
};



export default Login;
