import { Project } from "../dto/project";

// プロジェクト検索DBA
export class SearchProject{

    // プロジェクト検索
    public searchProject():Array<Project>{
        // 戻り値
        let rtn = new Array<Project>;

        // ここでSVへのAPI連携


        // テスト用の戻り値
        const p1 = new Project();
        p1.ProjectName = "プロジェクトA";
        p1.RecruiteNumber = "3人";
        p1.DueDate = "2024年12月1日";

        const p2 = new Project();
        p2.ProjectName = "プロジェクトB";
        p2.RecruiteNumber = "2人";
        p2.DueDate = "2024年12月15日";

        const p3 = new Project();
        p3.ProjectName = "プロジェクトC";
        p3.RecruiteNumber = "5人";
        p3.DueDate = "2024年12月20日";

        rtn.push(p1);
        rtn.push(p2);
        rtn.push(p3);

        return rtn;
    }
}