import { classicNameResolver } from "typescript"
import './CreateProject.css';
import { useLocation } from 'react-router-dom';
import { SearchProject } from "../services/SearchProject";
import { ProjectInfo} from "../dto/ProjectInfo";
import { useState } from "react";

// プロジェクトの作成・編集画面
function CreateProject() {
    const [projectName, setProjectName] = useState('');       // プロジェクト名
    const [recruiteNumber, setRecruiteNumber] = useState(''); // 募集人数
    const [dueDate, setDueDate] = useState('');               // 締切日
    const [description, setDescription] = useState('');       // 説明
    const [requirement, setRequirement] = useState('');       // 求めるスキル
    const requirementList = new Array<string>();              // 求めるスキルリスト   

    // プロジェクト募集登録
    const CreateProject = () => {
        // 登録データ作成
        const projectInfo = new ProjectInfo();
        projectInfo.ProjectName = projectName;       // プロジェクト名
        projectInfo.RecruiteNumber = recruiteNumber; // 募集人数
        projectInfo.DueDate = dueDate;               // 締切日
        projectInfo.Description = description;       // 説明
        projectInfo.Requirements = requirementList;  // 求めるスキル

        // データ登録
        const dao = new SearchProject();
        dao.regProject(projectInfo);
    }

    /**
     * 求めるスキルリストを作成
     * @param event 
     */
    const MakeRequirement = (event:any) => {
        
    }

    return (
        <div className="container">
            <h1>応募作成</h1>
            <div >
                {/* <!-- プロジェクト名 --> */}
                <div>
                    <label htmlFor="projectName">プロジェクト名<span className="requiredInput">*</span></label>
                    <input type="text" id="projectName" name="projectName" placeholder="プロジェクト名を入力してください" required 
                        onChange={(event) => setProjectName(event.target.value)}/>
                </div>

                {/* <!-- 募集人数 --> */}
                <div>
                    <label htmlFor="recruiteNumber">募集人数<span className="requiredInput">*</span></label>
                    <input type="number" id="recruiteNumber" name="recruiteNumber" placeholder="例: 5" required 
                        onChange={(event) => setRecruiteNumber(event.target.value)}/>
                </div>

                {/* <!-- 締切日 --> */}
                <div>
                    <label htmlFor="dueDate">締切日<span className="requiredInput">*</span></label>
                    <input type="date" id="dueDate" name="dueDate" required 
                    onChange={(event) => setDueDate(event.target.value)}/>
                </div>

                {/* <!-- プロジェクトの説明 --> */}
                <div>
                    <label htmlFor="description">プロジェクトの説明<span className="requiredInput">*</span></label>
                    <textarea id="description" name="description" placeholder="プロジェクトの詳細を記入してください" required
                    onChange={(event) => setDescription(event.target.value)}></textarea>
                </div>

                {/* <!-- 求めるスキル --> */}
                <div>
                    <label htmlFor="requirement">求めるスキル</label>
                    <textarea id="requirement" name="requirement" placeholder="スキル⓵" onChange={(event) => MakeRequirement(event)}></textarea>
                </div>

                {/* <!-- 提出ボタン --> */}
                <button onClick={CreateProject}>作成する</button>
            </div>
        </div>
    );
}

export default CreateProject;