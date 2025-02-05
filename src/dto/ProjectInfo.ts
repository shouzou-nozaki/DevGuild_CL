// プロジェクト情報型クラス TODO:小文字に変換 
export class ProjectInfo{ 
    ProjectId : string = "";       // プロジェクトID
    UserId: String = "";           // ユーザーID
    DiscordServerId: string = "";  // DiscordサーバーID
    ProjectName : string = "";     // プロジェクト名
    RecruiteNumber : string = "";  // 募集人数
    DueDate : string  = "";        // 締切日
    Description : string = "";     // 説明
    Requirements: Array<string> = new Array<string>(); // 求めるスキル
    Status:string = "";            // 状態(0:非公開 1:BOT招待済み 2:公開可能 3:公開)
}