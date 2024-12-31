import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useUser } from "../util/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  // Discordログイン処理
  const handleDiscordLogin = () => {
    const clientId = process.env.REACT_APP_DISCORD_CLIENT_ID;       // クライアントID
    const redirectUri = process.env.REACT_APP_DISCORD_REDIRECT_URI; // リダイレクトURI
    const responseType = "code";    // レスポンスタイプ
    const scope = "identify email"; // スコープ

    if (!clientId || !redirectUri) {
      console.error("DiscordのクライアントIDまたはリダイレクトURIが設定されていません");
      return;
    }

    // Discordの認証URLへリダイレクト
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?&client_id=${clientId}&response_type=${responseType}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scope)}`;

    window.location.href = discordAuthUrl;
  };

  // サーバーからのレスポンスをチェック
  useEffect(() => {
    // URLパラメータからDiscordユーザー情報を取得
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username"); // ユーザー名
    const userId = urlParams.get("userId");     // ユーザーID

    if (!username || !userId) return;

    cacheDiscordUser(username, userId);

    navigate("/"); // リダイレクト
  }, [navigate]);

  /**
   * Discordユーザー情報をキャッシュに保存
   * @param username 
   * @param userId 
   */
  const cacheDiscordUser = (username: string, userId: string) => {
    // ログイン情報をキャッシュに保存
    const userCache = {
      id: userId,
      name: username,
    };
    localStorage.setItem("userInfo", JSON.stringify(userCache));
    setUser(userCache);
  }

  return (
    <div className="login-container">
      <h1>Discordログイン</h1>
      <button onClick={handleDiscordLogin} className="discord-login-button">
        Discordでログイン
      </button>
    </div>
  );
};

export default Login;

