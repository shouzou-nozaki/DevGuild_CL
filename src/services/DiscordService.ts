import { ProjectInfo } from "../dto/ProjectInfo";
import { HttpClient, Perform } from "../util/HttpClient";
import { ResponseConv } from "../util/ResponseConv";

export const DiscordPerform = {
    APPLY: "/api/auth/apply",
} as const;

export type ProjectPerform = (typeof DiscordPerform)[keyof typeof DiscordPerform];

/**
 * プロジェクト情報用サービスクラス
 * TODO：それぞれでtry-catchが冗長なので見直し
 */
export class DiscordService {
    private client: HttpClient;

    constructor(baseURL?: string) {
        this.client = new HttpClient(baseURL);
    }

    /**
     * プロジェクト申請処理
     * @param projectId プロジェクトID
     * @param userId ユーザーID
     */
    public async applyProject(applyUserName: string, applyProjectInfo: ProjectInfo): Promise<void> {
        try {
            this.client.postApi({ applyUserName, applyProjectInfo }, DiscordPerform.APPLY);
        } catch (error) {
            throw error;
        }
    }

}


