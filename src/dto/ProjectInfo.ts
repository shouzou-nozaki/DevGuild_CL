// プロジェクトオブジェクト
export class ProjectInfo{
    Id : string = "";                                  // プロジェクトID
    ProjectName : string = "";                         // プロジェクト名
    RecruiteNumber : string = "";                      // 募集人数
    DueDate : string  = "";                            // 締切日
    Description : string = "";                         // 説明
    Requirements: Array<string> = new Array<string>(); // 必要条件
    Owner: string = "";                                // プロジェクトオーナー

}