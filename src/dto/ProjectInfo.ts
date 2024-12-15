// プロジェクトオブジェクト
interface Project {
    ProjectName:string,
    RecruiteNumber : string,
    DueDate : string,
    Description : string,
}

export class ProjectInfo implements Project{
    ProjectId : string = "";                           // プロジェクトID
    UserId: String = "";                               // ユーザーID
    ProjectName : string = "";                         // プロジェクト名
    RecruiteNumber : string = "";                      // 募集人数
    DueDate : string  = "";                            // 締切日
    Description : string = "";                         // 説明
    Requirements: Array<string> = new Array<string>(); // 求めるスキル
}