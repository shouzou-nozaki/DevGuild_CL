import { isAnyArrayBuffer } from "util/types";
import { ProjectInfo } from "../dto/ProjectInfo";
import React, { useState, useEffect } from "react";
import { ProjectConv } from "../util/ProjectConv";
import { Navigate } from "react-router-dom";
import { SearchCondition } from "../dto/SearchCondition";
import { promises } from "dns";
import { throws } from "assert";

export const Crud = {
    CREATE   : 0,
    REFARENCE: 1,
    UPDATE   : 2,
    DELETE   : 3,
} as const;

type Crud = (typeof Crud)[keyof typeof Crud];

/**
 * プロジェクト情報用サービスクラス
 */
export class ProjectService {
    // API通信URI
    private readonly baseUrl = "http://localhost:8080";
    
    /**
     * 共通SV通信処理
     * @param param サーバー連携情報
     */
    private async transactionWithSV(param:any, crud:Crud){
        // APIエンドポイントURL
        let url = "";
        let base = "http://localhost:8080";

        switch(crud) {
            case Crud.CREATE:
                url = `${base}/project/create`;
                break;
            case Crud.REFARENCE:
                url = `${base}/project/search`;
                break;
            case Crud.UPDATE:
                url = `${base}/project/update`;
                break;
            case Crud.DELETE:
                url = `${base}/project/delete`;
                break;
            default:
                
        }
        // API通信
        const response = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({param:param}),
            mode: "cors", // CORSモードを指定
        });
    }

    /**
     * プロジェクト検索処理
     * @returns プロジェクト一覧    
     */
    public async searchProject(): Promise<Array<ProjectInfo>> {
        // 戻り値
        let rtn = new Array<ProjectInfo>;
        try {
            // APIリクエスト
            const response = await fetch(`${this.baseUrl}/project/search`);
            
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
     * @param projectInfo プロジェクト情報
     */
    public async regProject(projectInfo: ProjectInfo): Promise<void> {
        try {
            // API通信
            const response = await fetch(`${this.baseUrl}/project/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: projectInfo.UserId,                               // ユーザーID
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

    /**
     * プロジェクト情報更新
     * @param projectInfo プロジェクト情報
     */
    public async updateProject(projectInfo:ProjectInfo):Promise<void> {
        try{
            this.transactionWithSV(projectInfo, Crud.UPDATE);
        }catch(error){
            console.error("プロジェクトの登録に失敗しました:", error);
        }
    }
    
    /**
     * プロジェクト情報登録
     * @param projectInfo プロジェクト情報
     */
    public async deleteProject(projectId: string): Promise<void> {
        try{
            this.transactionWithSV(projectId, Crud.DELETE);
        }catch(error){
            console.error("プロジェクトの登録に失敗しました:", error);
        }
    }

    /**
     * 自作プロジェクト取得
     * @param searchCond 検索条件
     * @returns プロジェクト情報
     */
    public async getMyProjects(searchCond:SearchCondition): Promise<Array<ProjectInfo>> {
        // 戻り値
        let rtn = new Array<ProjectInfo>;
        try {
            // APIリクエスト
            const response = await fetch(`${this.baseUrl}/project/myproject`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    searchCond: searchCond,
                }),
                mode: "cors", // CORSモードを指定
            });

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
            console.error("プロジェクトの取得に失敗しました:", error);
        }

        return rtn;
    }
}