import { ProjectInfo } from "../dto/ProjectInfo";
import { HttpClient, Perform } from "../util/HttpClient";
import { ResponseConv } from "../util/ResponseConv";

export const ProjectPerform = {
    CREATE: "/project/create",
    SEARCH: "/project/search",
    UPDATE: "/project/update",
    DELETE: "/project/delete",
    MYPROJECT: "/project/myproject",
    APPLY: "/project/apply",
    JOINING: "/project/joining",
    LEAVE: "/project/leave",
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

    public async getAllProject(userId:string): Promise<Array<ProjectInfo>> {
        try {
            const response = await this.client.postApi(userId, ProjectPerform.SEARCH);
            let projectInfo = ResponseConv.toProjectInfo(response);

            return projectInfo;
        } catch (error) {
            alert("プロジェクト情報の取得に失敗しました。");
            return [];
        }
    }

    public async getMyProjects(userid: string): Promise<Array<ProjectInfo>> {
        try {
            const response = await this.client.postApi(userid.toString(), ProjectPerform.MYPROJECT);
            let fetchedProjects = ResponseConv.toProjectInfo(response);
            return fetchedProjects;
        } catch (error) {
            alert("プロジェクト情報の取得に失敗しました。");
            return [];
        }
    }

    public async getJoiningProjects(userId:string): Promise<Array<ProjectInfo>> {
        try {
            const response = await this.client.getApi({userId:userId}, ProjectPerform.JOINING);
            let projectInfo = ResponseConv.toProjectInfo(response);

            return projectInfo;
        } catch (error) {
            alert("プロジェクト情報の取得に失敗しました。");
            return [];
        }
    }

    public async regProject(param:any): Promise<void> {
        try {
            this.client.postApi(param, ProjectPerform.CREATE);
        } catch (error) {
            alert("プロジェクトの登録に失敗しました。");
        }
    }

    public async updateProject(projectInfo: ProjectInfo): Promise<void> {
        try {
            this.client.postApi(projectInfo, ProjectPerform.UPDATE);
        } catch (error) {
            alert("プロジェクトの更新に失敗しました。");
        }
    }

    public async deleteProject(projectId: string): Promise<void> {
        try {
            this.client.postApi(projectId, ProjectPerform.DELETE);
        } catch (error) {
            alert("プロジェクトの削除削除に失敗しました。");
        }
    }

    public async leaveProject(userId:string, projectId:string): Promise<void> {
        try {
            this.client.getApi({userId:userId, projectId:projectId}, ProjectPerform.LEAVE);
        } catch (error) {
            alert("プロジェクトからの抜けるに失敗しました。");
        }
    }

}


