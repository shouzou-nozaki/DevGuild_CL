import { isAnyArrayBuffer } from "util/types";
import { ProjectInfo } from "../dto/ProjectInfo";
import React, { useState, useEffect } from "react";
import { ProjectConv } from "../util/ProjectConv";
import { Navigate } from "react-router-dom";

/**
 * プロジェクト情報用サービスクラス
 */
export class SearchProject {
    // API通信URI
    private readonly baseUrl = "http://localhost:8080";
    
    /**
     * プロジェクト検索処理
     * @returns 
     */
    public async searchProject(): Promise<Array<ProjectInfo>> {
        // 戻り値
        let rtn = new Array<ProjectInfo>;

        try {

            // APIリクエスト
            const response = await fetch(`${this.baseUrl}/api`);

            console.log("リクエスト送信完了");

            // レスポンスの確認
            if (!response.ok) {
                throw new Error(`HTTPエラー! ステータス: ${response.status}`);
            }

            // プロジェクトリストを取得
            const responseData = await response.json();
            // プロジェクト型に詰め替え
            const util = new ProjectConv();
            rtn = util.ToProjectInfo(responseData);
 
        } catch (error) {
            console.error("プロジェクトの登録に失敗しました:", error);
        }

        return rtn;
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