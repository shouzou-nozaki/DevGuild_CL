import { ProjectInfo } from "../dto/ProjectInfo"
import { UserInfo } from "../dto/UserInfo";


/**
 * レスポンスデータ変換クラス
 */
export class ResponseConv {
    /**
     * プロジェクト情報に変換
     * @param response レスポンス
     * @returns プロジェクト情報
     */
    public static async ToProjectInfo(response: Response): Promise<Array<ProjectInfo>> {
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
            rtn.push(projectInfo);
        });

        return rtn;
    }

    public static async ToUserInfo(response: Response): Promise<UserInfo> {
        const userInfo = new UserInfo();
        const responseData = await response.json();

        responseData.forEach((data: any) => {
            userInfo.UserId = data.userId;  // ユーザーID
            userInfo.Name = data.userName;  // ユーザー名
        });
        return userInfo;
    }
}