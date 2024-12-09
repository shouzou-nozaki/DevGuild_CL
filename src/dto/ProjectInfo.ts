// プロジェクトオブジェクト
export class ProjectInfo{
    UserId: String = "";                               // ユーザーID
    ProjectId : string = "";                           // プロジェクトID
    ProjectName : string = "";                         // プロジェクト名
    RecruiteNumber : string = "";                      // 募集人数
    DueDate : string  = "";                            // 締切日
    Description : string = "";                         // 説明
    Requirements: Array<string> = new Array<string>(); // 求めるスキル
}