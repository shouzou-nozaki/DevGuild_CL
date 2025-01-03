import { ProjectInfo } from "../dto/ProjectInfo";
import { HttpClient, Perform } from "../util/HttpClient";
import { ResponseConv } from "../util/ResponseConv";

export const ProjectPerform = {
    CREATE: "/project/create",
    SEARCH: "/project/search",
    UPDATE: "/project/update",
    DELETE: "/project/delete",
    MYPROJECT: "/project/myproject",
} as const;

export type ProjectPerform = (typeof ProjectPerform)[keyof typeof ProjectPerform];

/**
 * プロジェクト情報用サービスクラス
 * TODO：それぞれでtry-catchが冗長なので見直し
 */
export class ProjectService {
    private client: HttpClient;

    constructor(baseURL?: string) {
        this.client = new HttpClient(baseURL);
    }

    public async getAllProject(): Promise<Array<ProjectInfo>> {
        try {
            const response = await this.client.postApi(null, ProjectPerform.SEARCH);
            let projectInfo = ResponseConv.toProjectInfo(response);

            return projectInfo;
        } catch (error) {
            throw error;
        }

    }

    public async getMyProjects(userid: string): Promise<Array<ProjectInfo>> {
        try {
            const response = await this.client.postApi(userid.toString(), ProjectPerform.MYPROJECT);
            let fetchedProjects = ResponseConv.toProjectInfo(response);
            return fetchedProjects;
        } catch (error) {
            throw error;
        }

    }

    public async regProject(projectInfo: ProjectInfo): Promise<void> {
        try {
            this.client.postApi(projectInfo, ProjectPerform.CREATE);
        } catch (error) {
            throw error;
        }
    }

    public async updateProject(projectInfo: ProjectInfo): Promise<void> {
        try {
            this.client.postApi(projectInfo, ProjectPerform.UPDATE);
        } catch (error) {
            throw error;
        }

    }

    public async deleteProject(projectId: string): Promise<void> {
        try {
            this.client.postApi(projectId, ProjectPerform.DELETE);
        } catch (error) {
            throw error;
        }
    }
}


