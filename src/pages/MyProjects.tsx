import React, { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import "./MyProjects.css";
import { useUser } from "../util/UserContext";
import { ProjectService } from "../services/ProjectService";
import { ProjectInfo } from "../dto/ProjectInfo";
import { Const } from "../util/Const";


const MyProjects = () => {
    const [projectList, setProjectList] = useState<Array<ProjectInfo>>([]); // プロジェクトリストの状態
    const { user } = useUser(); // ユーザー情報とセット関数を取得
    const navigate = useNavigate(); // 遷移用フック

    useEffect(() => {
        if (user && user.id) {
            fetchProjects();
        }
    }, [user]);

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

    /**
     * プロジェクト編集画面への遷移メソッド
     * @param project 編集対象のプロジェクト情報
     */
    const toEditWindow = (project: ProjectInfo) => {
        navigate(`/create?projectId=${project.ProjectId}`, {
            state: { projectInfo: project, mode: Const.MODE_UPDATE_PROJECT },
        });
    }

    /**
     * DiscordServerID保持判定する関数
     * @param project 
     * @returns 
     */
    const hasDiscordServerID = (project: ProjectInfo): boolean => {
        return project.DiscordServerId !== undefined && project.DiscordServerId !== null && project.DiscordServerId.trim() !== "";
    }

    /**
     * プロジェクト状態変更メソッド
     * @param projectInfo 
     */
    const publishProject = (projectInfo: ProjectInfo) => {
        // プロジェクト状態を反転させる
        if (projectInfo.Status === Const.STATUS_OPEN) {
            projectInfo.Status = Const.STATUS_CLOSE;
        } else {
            projectInfo.Status = Const.STATUS_OPEN;
        }
        const service = new ProjectService;
        service.updateProject(projectInfo);

        window.location.reload();
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
                            {project.Status === Const.STATUS_OPEN ? <td className="status_public">公開</td> : <td className="status_private">非公開</td>}
                            <td>
                                <button onClick={() => toEditWindow(project)} className="edit-button">
                                    編集
                                </button>
                                {project.Status === Const.STATUS_OPEN ?
                                    <button className="suppress_button" disabled={!hasDiscordServerID(project)} onClick={() => publishProject(project)}>
                                        非公開
                                    </button>
                                    :
                                    <button className="publish_button" disabled={!hasDiscordServerID(project)} onClick={() => publishProject(project)}>
                                        公開
                                    </button>
                                }
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyProjects;
