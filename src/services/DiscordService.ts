
import { Message } from "../dto/Message";
import { ProjectInfo } from "../dto/ProjectInfo";
import { HttpClient, Perform } from "../util/HttpClient";

export const DiscordPerform = {
    APPLY: "/api/auth/apply",
    INVITE: "/api/auth/invite",
    REJECT: "/api/auth/reject",
} as const;

export type DiscordPerform = (typeof DiscordPerform)[keyof typeof DiscordPerform];

/**
 * プロジェクト情報用サービスクラス
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
    public async applyProject(applyUser: any, applyProjectInfo: ProjectInfo): Promise<void> {
        try {
            this.client.postApi({ applyUser, applyProjectInfo }, DiscordPerform.APPLY);
        } catch (error) {
            throw error;
        }
    }

    /**
     * プロジェクト招待処理
     * @param inviteUser 招待するユーザーID
     * @param projectId プロジェクトID
     */
    public async inviteProject(inviteUserId:string, message:Message): Promise<void> {
        try {
            this.client.getApi({inviteUserId:inviteUserId, messageId:message.messageId, projectId:message.projectId}, DiscordPerform.INVITE);
        } catch (error) {
            throw error;
        }
    }

    /**
     * プロジェクト参加拒否処理
     * @param inviteUser 拒否するユーザーID
     * @param projectId プロジェクトID
     */
    public async rejectProject(rejectUserId:string, message:Message): Promise<void> {
        try {
            this.client.getApi({rejectUserId:rejectUserId,messageId:message.messageId, projectId:message.projectId}, DiscordPerform.REJECT);
        } catch (error) {
            throw error;
        }
    }

}

