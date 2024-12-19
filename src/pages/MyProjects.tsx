import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyProjects.css";
import { useUser } from "../util/UserContext";
import { ProjectService } from "../services/ProjectService";
import { ProjectInfo } from "../dto/ProjectInfo";
import Mode from "../util/Mode";

const MyProjects: React.FC = () => {
    const [projectList, setProjectList] = useState<Array<ProjectInfo>>([]); // プロジェクトリストの状態
    const { user } = useUser(); // ユーザー情報とセット関数を取得

    // 初期処理
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            // 検索情報を設定
            const searchCond = {
                userid: user?.id ?? "", // ユーザーID
            };
            // API通信を行い、プロジェクトを取得
            const service = new ProjectService();
            const response = await service.getMyProjects(searchCond);
            // 取得したプロジェクトをセット
            setProjectList(response);
        } catch (err) {
            console.error("プロジェクトデータの取得に失敗:", err);
        }
    }

    return (
        <div className="project-list-container">
            <h1>{user?.name}さんのプロジェクト</h1>
            <table className="project-table">
                <thead>
                    <tr>
                        <th>プロジェクト名</th>
                        <th>説明</th>
                        <th>期限日</th>
                        <th>アクション</th>
                    </tr>
                </thead>
                <tbody>
                    {projectList.map((project) => (
                        <tr key={project.ProjectId}>
                            <td>{project.ProjectName}</td>
                            <td>{project.Description}</td>
                            <td>{project.DueDate}</td>
                            <td>
                                <Link to={`/create?projectId=${project.ProjectId}`} state={{ projectInfo: project, mode: Mode.MODE_UPDATEPROJECT }} className="edit-button">
                                    編集
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyProjects;
