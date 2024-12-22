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
 */
export class ProjectService {
    private client: HttpClient;

    constructor(baseURL?: string) {
        this.client = new HttpClient(baseURL);
    }

    public async getAllProject(): Promise<Array<ProjectInfo>> {
        const response = await this.client.callApi(null, ProjectPerform.SEARCH);
        let projectInfo = ResponseConv.ToProjectInfo(response);

        return projectInfo;
    }
    
    public async getMyProjects(userid: string): Promise<Array<ProjectInfo>> {
        const response = await this.client.callApi(userid.toString(), ProjectPerform.MYPROJECT);
        let fetchedProjects = ResponseConv.ToProjectInfo(response);
        return fetchedProjects;
    }

    public async regProject(projectInfo: ProjectInfo): Promise<void> {
        this.client.callApi(projectInfo, ProjectPerform.CREATE);
    }

    public async updateProject(projectInfo: ProjectInfo): Promise<void> {
        this.client.callApi(projectInfo, ProjectPerform.UPDATE);
    }

    public async deleteProject(projectId: string): Promise<void> {
        this.client.callApi(projectId, ProjectPerform.DELETE);
    }


}


