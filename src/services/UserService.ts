import { isAnyArrayBuffer } from "util/types";
import { ProjectInfo } from "../dto/ProjectInfo";
import React, { useState, useEffect } from "react";
import { ProjectConv } from "../util/ProjectConv";
import { Navigate } from "react-router-dom";

/**
 * プロジェクト情報用サービスクラス
 */
export class UserService {
    // API通信URI
    private readonly baseUrl = "http://localhost:8080";
    
    /**
     * プロジェクト検索処理
     * @returns レスポンスコード
     */
    public async userLogin(username:string, email:string, password:string) : Promise<string> {
        // 戻り値
        let responseCd = "";
        try {
            // return "200";
            // API通信
            const response = await fetch(`${this.baseUrl}/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username, // ユーザー名
                    email,    // メールアドレス
                    password, // パスワード
                }),
                mode: "cors", // CORSモードを指定
            });

            if(response.ok) responseCd = "200";
            
        } catch (error) {
            console.error("プロジェクトの登録に失敗しました:", error);
        }

        return responseCd;
    }


    /**
     * プロジェクト情報登録
     * @param projectInfo 
     */
    public async regProject(projectInfo: ProjectInfo): Promise<void> {
        try {
            // API通信
            const response = await fetch(`${this.baseUrl}/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    projectName: projectInfo.ProjectName,                     // プロジェクト名
                    recruiteNumber: parseInt(projectInfo.RecruiteNumber, 10), // 募集人数
                    dueDate: projectInfo.DueDate,                             // 期限日
                    description: projectInfo.Description,                     // 説明
                    requirements: projectInfo.Requirements,                   // 求めるスキル
                }),
                mode: "cors", // CORSモードを指定
            });

            console.log("リクエスト送信完了");

            // レスポンスの確認
            if (!response.ok) {
                throw new Error(`HTTPエラー! ステータス: ${response.status}`);
            }

            const result = await response.json();
            console.log("プロジェクトが正常に登録されました");

        } catch (error) {
            console.error("プロジェクトの登録に失敗しました:", error);
        }
    }
}