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
    window.open(discordAuthUrl);
  };

  useEffect(() => {
    // URLパラメータからDiscordユーザー情報を取得
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username"); // ユーザー名
    const userId = urlParams.get("userId");     // ユーザーID
    const accessToken = urlParams.get("accessToken"); // アクセストークン

    if (!username || !userId || !accessToken) return;

    // Discordユーザー情報をキャッシュに保存
    cacheDiscordUser(username, userId, accessToken);

    navigate("/");
  }, [navigate]);

  /**
   * Discordユーザー情報をキャッシュに保存
   * @param username Discordユーザー名
   * @param userId DiscordユーザーID
   */
  const cacheDiscordUser = (username: string, userId: string, accessToken: string) => {
    // ログイン情報をキャッシュに保存
    const userCache = {
      id: userId,
      name: username,
      token: accessToken,
    };
    localStorage.setItem("userInfo", JSON.stringify(userCache));
    setUser(userCache);
  }

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

