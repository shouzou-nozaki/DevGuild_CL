import { useState } from 'react';
import { DiscordService } from '../services/DiscordService';
import { MessageService } from '../services/MessageService';
import { ProjectService } from '../services/ProjectService';
import { Const } from '../util/Const';
import { useUser } from '../util/UserContext';
import './ProjectDetail.css';
import { useLocation, useNavigate } from 'react-router-dom';

// プロジェクトの詳細
function ProjectDetail() {
    // 一覧画面からのプロジェクト情報取得
    const location = useLocation();
    const project = location.state?.project;
    const [isProcessing, setIsProcessing] = useState(false);
    const { user } = useUser(); // ユーザー情報

    // 遷移用フック
    const navigate = useNavigate();

    /**
     * プロジェクト申請処理
     */
    const applyProject = () => {
        if(!user || user.name === "") {
            alert("ユーザー情報が取得できませんでした。");
            return;
        }

        if (isProcessing) return; // 処理中であれば、処理を抜ける
        // 処理中フラグをON
        setIsProcessing(true);

        const service = new DiscordService();
        service.applyProject(user, project);

        setTimeout(() => {
            navigate("/", {state: {message: Const.MESSAGE_SEND_SUCCESS}});
        }, 1500);
    }

    /**
     * プロジェクト一覧へ戻る
     */
    const Back = () => {
        navigate("/");
    }

    return (
        <div className="container">
            {/* ヘッダー */}
            <header>
                <h1>プロジェクト詳細</h1>
            </header>

            {/* プロジェクト名 */}
            <h1>プロジェクト名: {project.ProjectName}</h1>
            {/* 募集人数・締切り日 */}
            <p className="project-meta">募集人数: {project.RecruiteNumber} | 締切日: {project.DueDate}</p>
            {/* プロジェクト説明 */}
            <p className="project-description">{project.Description}</p>
            {/* 必要条件 */}
            <div className="requirements">
                <h2>参加条件:</h2>
                <ul>
                    {project.Requirements?.map((request: string) => { return <li>{request}</li> })}
                </ul>
            </div>
            <button className='apply-button' onClick={applyProject}
                disabled={isProcessing}
            >参加申請</button>
            {/* <!-- 戻るボタン --> */}
            <button className="back" onClick={Back}>戻る</button>
        </div>
    );
}

export default ProjectDetail;