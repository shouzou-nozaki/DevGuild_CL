import { ProjectInfo } from "../dto/ProjectInfo"

export class ProjectConv{

    /**
     * レスポンスデータからプロジェクト情報型への変換
     * @param responseData 
     * @returns 
     */
    public ToProjectInfo(responseData:any):Array<ProjectInfo>{
        const rtn = new Array<ProjectInfo>();
        // プロジェクト情報に変換
        responseData.forEach((data: { 
            id: string; 
            name: string; 
            recruiteNumber: string; 
            dueDate: string; 
            description: string;
         }) => {
            const project = new ProjectInfo();
            project.Id = data.id;                         // プロジェクトID
            project.ProjectName = data.name;              // プロジェクト名
            project.RecruiteNumber = data.recruiteNumber; // 募集人数
            project.DueDate = data.dueDate;               // 締切日
            project.Description = data.description;       // 説明
            

            rtn.push(project);
        });

        return rtn;
    }
}