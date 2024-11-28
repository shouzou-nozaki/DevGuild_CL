import React, { useState, useEffect } from 'react';
import App from '../App';  // 認証後に表示されるメインのAppコンポーネント
import { Router, useNavigate } from 'react-router-dom';
import { AppRouter } from '../routes/AppRouter';

import './Login.css';
import { Errors } from '../dto/Errors';
import Messages from '../util/Message';
import { UserService } from '../services/UserService';

const Login = () => {
  const [username, setUsername] = useState("");   // ユーザー名の状態
  const [address , setAddress ] = useState("");   // メールアドレスの状態
  const [password, setPassword] = useState("");   // パスワードの状態
  const [errorMessage, setErrorMessage] = useState<Errors>({}); // エラーメッセージの状態

  // 遷移用フック
  const navigate = useNavigate();

  /**
   * ログインボタン押下処理
   * @returns 
   */
  const handleLogin = async () => {
    // 入力値を見てエラーメッセージをセット
    const errors = new Errors();
    if (!username) errors.UserNameError = Messages.REQUIRED_USERNAME;
    if (!address ) errors.AddressError  = Messages.REQIRED_ADDRESS;
    if (!password) errors.PasswordError = Messages.REQUIRED_PASSWORD;
    setErrorMessage(errors);

    // エラーメッセージが１件でもあれば処理を抜ける
    if(errors.UserNameError || errors.AddressError || errors.PasswordError) return;

    // ユーザー登録確認
    const service = new UserService();
    const responseCd = service.searchUser(username, password);

    // 失敗時は処理を抜ける
    if(await responseCd != "200") return;
    
    // プロジェクト一覧へ移動
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">ログイン</h1>

        {/* ユーザー名 */}
        <div className="form-group">
          <label htmlFor="username">ユーザー名</label>
          {/* エラーメッセージ */}
          {errorMessage.UserNameError && <div className="error_message">{errorMessage.UserNameError}</div>}
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="ユーザー名を入力"
          />
        </div>

        {/* メールアドレス */}
        <div className="form-group">
          <label htmlFor="username">メールアドレス</label>
          {/* エラーメッセージ */}
          {errorMessage.AddressError && <div className="error_message">{errorMessage.AddressError}</div>}
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
          <a href="#">新規登録</a>
        </div>
      </div>
    </div>
  );
};



export default Login;
