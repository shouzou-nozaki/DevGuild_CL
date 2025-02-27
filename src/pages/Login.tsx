import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useUser } from "../util/UserContext";

/**
 * ログイン画面
 */
const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  /**
   * Discordログインボタン押下処理
   */
  const loginByDiscord = () => {
    const clientId = process.env.REACT_APP_DISCORD_CLIENT_ID;       // クライアントID
    const redirectUri = process.env.REACT_APP_DISCORD_REDIRECT_URI; // リダイレクトURI
    const responseType = "code";    // レスポンスタイプ
    const scope = "identify+guilds"; // スコープ

    if (!clientId || !redirectUri) {
      console.error("環境変数が不足しています");
      return;
    }

    // Discordの認証URLへリダイレクト
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?&client_id=${clientId}&response_type=${responseType}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scope}`;
    window.open(discordAuthUrl, '_self');
  };

  

  return (
    <div className="login-container">
      <h1>Discordログイン</h1>
      <button onClick={loginByDiscord} className="discord-login-button">
        Discordでログイン
      </button>
    </div>
  );
};

export default Login;

