import { isAnyArrayBuffer } from "util/types";
import { ProjectInfo } from "../dto/ProjectInfo";
import React, { useState, useEffect } from "react";
import { ProjectConv } from "../util/ProjectConv";
import { Navigate } from "react-router-dom";
import { SearchCondition } from "../dto/SearchCondition";
import { promises } from "dns";
import { throws } from "assert";

// APIエンドポイントEnum
export const Perform = {
    CREATE   : "/project/create",
    Search   : "/project/search",
    UPDATE   : "/project/update",
    DELETE   : "/project/delete",
    MYPROJECT: "/project/myproject",
} as const;

type Perform = (typeof Perform)[keyof typeof Perform];

/**
 * プロジェクト情報用サービスクラス
 */
export class ProjectService {

    /**
     * プロジェクト情報取得処理
     * @returns プロジェクト一覧    
     */
    public async getAllProject(): Promise<Array<ProjectInfo>> {
        // 戻り値
        let rtn = new Array<ProjectInfo>;
        try {
            // APIリクエスト
            const response = await this.transactionWithSV(null, Perform.Search);

            // プロジェクトリストを取得
            const responseToJson = await response.json();
            // プロジェクト型に詰め替え
            rtn = ProjectConv.ToProjectInfo(responseToJson);

        } catch (error) {
            console.error("プロジェクトの取得に失敗しました:", error);
        }
        return rtn;
    }


    /**
     * プロジェクト情報登録
     * @param projectInfo プロジェクト情報
     */
    public async regProject(projectInfo: ProjectInfo): Promise<void> {
        try {
            this.transactionWithSV(projectInfo, Perform.CREATE);
        } catch (error) {
            console.error("プロジェクトの登録に失敗しました:", error);
        }
    }

    /**
     * プロジェクト情報更新
     * @param projectInfo プロジェクト情報
     */
    public async updateProject(projectInfo: ProjectInfo): Promise<void> {
        try {
            this.transactionWithSV(projectInfo, Perform.UPDATE);
        } catch (error) {
            console.error("プロジェクトの更新に失敗しました:", error);
        }
    }

    /**
     * プロジェクト情報削除
     * @param projectInfo プロジェクト情報
     */
    public async deleteProject(projectId: string): Promise<void> {
        try {
            this.transactionWithSV(projectId, Perform.DELETE);
        } catch (error) {
            console.error("プロジェクトの登録に失敗しました:", error);
        }
    }

    /**
     * 作成プロジェクト情報取得
     * @param searchCond 検索条件
     * @returns プロジェクト情報
     */
    public async getMyProjects(searchCond: SearchCondition): Promise<Array<ProjectInfo>> {
        // 戻り値
        let rtn = new Array<ProjectInfo>;
        try {
            const response = await this.transactionWithSV(searchCond, Perform.MYPROJECT);

            // プロジェクトリストを取得
            const responseToJson = await response.json();
            // プロジェクト型に詰め替え
            rtn = ProjectConv.ToProjectInfo(responseToJson);

        } catch (error) {
            console.error("プロジェクトの取得に失敗しました:", error);
        }
        return rtn;
    }

    /**
     * 共通SV通信処理
     * @param param サーバー連携情報
     */
    private async transactionWithSV(param: any, perform: Perform): Promise<Response> {
        // APIエンドポイントURL
        let base = "http://localhost:8080";
        let url = `${base}${perform}`;

        // API通信
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ param: param }),
            mode: "cors", // CORSモードを指定
        });

        return response;
    }
}