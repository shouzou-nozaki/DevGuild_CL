import React, { useState, useEffect } from 'react';
import App from '../App';  // 認証後に表示されるメインのAppコンポーネント
import { Router } from 'react-router-dom';
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
    if(Object.keys(errors).length !== 0) return;

    // ユーザー登録確認
    const service = new UserService();
    const responseCd = service.searchUser(username, password);

    // 失敗時は処理を抜ける
    if(await responseCd != "200") return;
    
    // サーバーへのログイン処理（APIリクエストなどをここに記述）
    console.log("ログイン情報:", { username, password });

    // 仮の成功処理
    setErrorMessage(errors);
    alert("ログインに成功しました！");
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

        {/* ユーザー名 */}
        <div className="form-group">
          <label htmlFor="username">メールアドレス</label>
          {/* エラーメッセージ */}
          {errorMessage.AddressError && <div className="error_message">{errorMessage.AddressError}</div>}
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
