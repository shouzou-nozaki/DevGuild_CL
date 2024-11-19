import { isAnyArrayBuffer } from "util/types";
import { ProjectInfo } from "../dto/ProjectInfo";
import React, { useState, useEffect } from "react";
import { ProjectConv } from "../util/ProjectConv";

// プロジェクト検索DBA
export class SearchProject {

    /**
     * プロジェクト検索処理
     * @returns 
     */
    public async searchProject(): Promise<Array<ProjectInfo>> {
        // 戻り値
        let rtn = new Array<ProjectInfo>;

        try {

            // APIリクエスト
            const response = await fetch("http://localhost:8080/api");

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
            // APIリクエスト
            const response = await fetch("http://localhost:8080/api/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: projectInfo.Id,
                    name: projectInfo.ProjectName,
                    recruiteNumber: parseInt(projectInfo.RecruiteNumber, 10),
                    dueDate: projectInfo.DueDate,
                    description: projectInfo.Description,
                    // requirements: projectInfo.Requirements,
                }),
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