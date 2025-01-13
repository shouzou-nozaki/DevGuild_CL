import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyProjects.css";
import { useUser } from "../util/UserContext";
import { ProjectService } from "../services/ProjectService";
import { ProjectInfo } from "../dto/ProjectInfo";
import { Const } from "../util/Const";

const MyProjects = () => {
    const [projectList, setProjectList] = useState<Array<ProjectInfo>>([]); // プロジェクトリストの状態
    const { user } = useUser(); // ユーザー情報とセット関数を取得

    useEffect(() => {
        fetchProjects();
    }, []);

    /**
     * プロジェクトデータを取得
     */
    const fetchProjects = async () => {
        try {
            if (user === null || user.id === "") {
                throw new Error("ユーザー情報が取得できませんでした。");
            }
            const service = new ProjectService();
            const response = await service.getMyProjects(user.id);
            setProjectList(response);
        } catch (err) {
            console.error(err);
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
                        <th>状態</th>
                        <th>アクション</th>
                    </tr>
                </thead>
                <tbody>
                    {projectList.map((project) => (
                        <tr key={project.ProjectId}>
                            <td>{project.ProjectName}</td>
                            <td>{project.Description}</td>
                            <td>{project.DueDate}</td>
                            {project.Status === "0" ? <td className="status_private">非公開</td> : <td className="status_public">公開</td>}
                            
                            <td>
                                <Link to={`/create?projectId=${project.ProjectId}`} state={{ projectInfo: project, mode: Const.MODE_UPDATE_PROJECT }} className="edit-button">
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
