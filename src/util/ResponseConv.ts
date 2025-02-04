import { Message } from "../dto/Message";
import { ProjectInfo } from "../dto/ProjectInfo"


/**
 * レスポンスデータ変換クラス
 */
export class ResponseConv {

    /**
     * プロジェクト情報型への変換処理
     * @param response サーバーからのレスポンスデータ
     * @returns プロジェクト情報
     */
    public static async toProjectInfo(response: Response): Promise<Array<ProjectInfo>> {
        try {
            const rtn: Array<ProjectInfo> = [];
            const responseData = await response.json();

            responseData.forEach((data: any) => {
                const projectInfo = new ProjectInfo();
                projectInfo.ProjectId = data.projectId;             // プロジェクトID
                projectInfo.ProjectName = data.projectName;         // プロジェクト名
                projectInfo.RecruiteNumber = data.recruiteNumber;   // 募集人数
                projectInfo.DueDate = data.dueDate;                 // 締切日
                projectInfo.Description = data.description;         // 説明
                projectInfo.Requirements = data.requirements;       // 必要スキル
                projectInfo.UserId = data.userId;                   // ユーザーID  
                projectInfo.Status = data.status;                   // プロジェクト状態
                projectInfo.DiscordServerId = data.discordServerId; // DiscordServerID
                rtn.push(projectInfo);
            });
            return rtn;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Notifications型への変換処理
     * @param response サーバーからのレスポンスデータ
     * @returns Noitifications型
     */
    public static async toMessageInfo(response: Response): Promise<Array<Message>> {
        try {
            const rtn: Array<Message> = [];
            const responseData = await response.json();

            responseData.forEach((data: any) => {
                const message = new Message();
                message.id = data.id;               // ID
                message.userId = data.userId;       // 通知を受け取るユーザーのID
                message.message = data.message;     // 通知の詳細メッセージ
                message.isRead = data.isRead;       // 既読状態
                message.createdAt = data.createdAt; // 通知作成日時
                message.updatedAt = data.updatedAt; // 通知更新日時
                rtn.push(message);
            });
            
            return rtn;
        } catch (error) {
            throw error;
        }
    }
}