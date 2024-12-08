import { isAnyArrayBuffer } from "util/types";
import { ProjectInfo } from "../dto/ProjectInfo";
import React, { useState, useEffect } from "react";
import { ProjectConv } from "../util/ProjectConv";
import { Navigate } from "react-router-dom";
import { UserInfo } from "../dto/UserInfo";
import { UserConv } from "../util/UserConv";
import { Config } from "@testing-library/react";

/**
 * プロジェクト情報用サービスクラス
 */
export class UserService {
    // API通信URI
    private readonly baseUrl = "http://localhost:8080";
    
    /**
     * ユーザーログイン処理
     * @returns レスポンスコード
     */
    public async userLogin(username:string, email:string, password:string) : Promise<any> {
        try {
            // API通信
            const response = await fetch(`${this.baseUrl}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    UserName : username, // ユーザー名
                    Email : email,       // メールアドレス
                    Password : password, // パスワード
                }),
                mode: "cors", // CORSモードを指定
            });

            return await response.json();

        } catch (error) {
            console.error("プロジェクトの登録に失敗しました:", error);
        }
    }

}