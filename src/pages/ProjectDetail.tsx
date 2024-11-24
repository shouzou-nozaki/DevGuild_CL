import { classicNameResolver } from "typescript"
import './ProjectDetail.css';
import { useLocation } from 'react-router-dom';

// プロジェクトの詳細
function ProjectDetail() {
    // 一覧画面からのプロジェクト情報取得
    const location = useLocation();
    const project = location.state?.project;

    return (
        <div className="container">
            {/* ヘッダー */}
            <header>
                <h1>プロジェクト詳細</h1>
            </header>

            <div className="container">
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
                        {
                            project.Requirements?.map((req: any) => {
                                return (
                                    <li>{req}</li>
                                );
                            })
                        }
                    </ul>
                </div>
                <a href="/apply.html" className="button">参加申請</a>
            </div>
        </div>
    );
}

export default ProjectDetail;