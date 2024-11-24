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
            projectId: string; 
            projectName: string; 
            recruiteNumber: string; 
            dueDate: string; 
            description: string;
            requirements: Array<string>;
         }) => {
            const project = new ProjectInfo();
            project.ProjectId = data.projectId;           // プロジェクトID
            project.ProjectName = data.projectName;       // プロジェクト名
            project.RecruiteNumber = data.recruiteNumber; // 募集人数
            project.DueDate = data.dueDate;               // 締切日
            project.Description = data.description;       // 説明
            project.Requirements = data.requirements;      // 求めるスキル
            
            rtn.push(project);
        });

        return rtn;
    }
}