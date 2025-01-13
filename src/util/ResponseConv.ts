import { ProjectInfo } from "../dto/ProjectInfo"
import { UserInfo } from "../dto/UserInfo";


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
                projectInfo.DiscordServerId = data.discordServerId;          // DiscordServerID
                rtn.push(projectInfo);
            });

            return rtn;
        } catch (error) {
            throw error;
        }
    }

    /**
     * プロジェクト情報型への変換処理
     * @param response レスポンスデータ
     * @returns ユーザー情報
     */
    public static async toUserInfo(response: Response): Promise<UserInfo> {
        try {
            const userInfo = new UserInfo();
            const responseData = await response.json();

            responseData.forEach((data: any) => {
                userInfo.UserId = data.userId;  // ユーザーID
                userInfo.Name = data.userName;  // ユーザー名
            });
            return userInfo;
        } catch (error) {
            throw error;
        }
    }
}