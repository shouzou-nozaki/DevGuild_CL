import { EmitFlags } from "typescript";
import { ProjectInfo } from "../dto/ProjectInfo"
import { UserInfo } from "../dto/UserInfo";

export class UserConv{

    /**
     * レスポンスデータからユーザー情報型への変換
     * @param responseData 
     * @returns 
     */
    public ToUserInfo(responseData:any):UserInfo{
        const userInfo = new UserInfo();
        // プロジェクト情報に変換
        userInfo.UserId = responseData.userId;
        userInfo.Name = responseData.userName;

        return userInfo;
    }
}