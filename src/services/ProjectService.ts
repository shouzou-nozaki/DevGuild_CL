import { ProjectInfo } from "../dto/ProjectInfo";
import { HttpClient, Perform } from "../util/HttpClient";
import { ProjectConv } from "../util/ProjectConv";

export const ProjectPerform = {
    CREATE: "/project/create",
    SEARCH: "/project/search",
    UPDATE: "/project/update",
    DELETE: "/project/delete",
    MYPROJECT: "/project/myprojects",
} as const;

export type ProjectPerform = (typeof ProjectPerform)[keyof typeof ProjectPerform];

/**
 * プロジェクト情報用サービスクラス
 */
export class ProjectService {
    private client: HttpClient;

    constructor(baseURL?: string) {
        this.client = new HttpClient(baseURL);
    }

    /**
     * プロジェクト情報取得処理
     * @returns プロジェクト一覧
     */
    public async getAllProject(): Promise<Array<ProjectInfo>> {
        const response = await this.client.callApi(null, ProjectPerform.SEARCH);
        const jsonResponse = await response.json(); // ここで結果を変数に格納
        console.log(jsonResponse);
        let fetchedProjects  = ProjectConv.ToProjectInfo(jsonResponse);

        return fetchedProjects;
    }


    /**
     * プロジェクト情報登録
     * @param projectInfo プロジェクト情報
     */
    public async regProject(projectInfo: ProjectInfo): Promise<void> {
        this.client.callApi(projectInfo, ProjectPerform.CREATE);
    }

    /**
     * プロジェクト情報更新
     * @param projectInfo プロジェクト情報
     */
    public async updateProject(projectInfo: ProjectInfo): Promise<void> {
        this.client.callApi(projectInfo, ProjectPerform.UPDATE);
    }

    /**
     * プロジェクト情報削除
     * @param projectInfo プロジェクト情報
     */
    public async deleteProject(projectId: string): Promise<void> {
        this.client.callApi(projectId, ProjectPerform.DELETE);
    }

    /**
     * 作成プロジェクト情報取得
     * @param searchCond 検索条件
     * @returns プロジェクト情報
     */
    public async getMyProjects(searchCond: any): Promise<Array<ProjectInfo>> {
        const response = await this.client.callApi(null, ProjectPerform.MYPROJECT);
        let fetchedProjects  = ProjectConv.ToProjectInfo(response);

        return fetchedProjects;

    }
}


