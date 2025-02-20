import React, { useEffect, useState } from 'react';
import './JoiningProjects.css';
import { useNavigate } from 'react-router-dom';
import { ProjectService } from '../services/ProjectService';
import { useUser } from '../util/UserContext';
import { ProjectInfo } from '../dto/ProjectInfo';

const JoiningProjects = () => {
    const [projectList, setProjectList] = useState<Array<ProjectInfo>>([]); // プロジェクトリストの状態
    const navigate = useNavigate();
    const { user } = useUser(); // ユーザー情報とセット関数を取得
    const projectService = new ProjectService();

    // コンポーネントマウント時に参画プロジェクト一覧を取得（ここではサンプルデータ）
    useEffect(() => {
        if (user && user.id) {
            fetchProjects();
        }
    }, [user]);

    const fetchProjects = async () => {
        try {
            if (user === null || user.id === "") {
                throw new Error("ユーザー情報が取得できませんでした。");
            }

            const joiningProjects = await projectService.getJoiningProjects(user.id);
            setProjectList(joiningProjects);
        } catch (err) {
            console.error(err);
        }
    };

    // プロジェクトから抜ける処理（実際のAPI呼び出しに置き換え可能）
    const leaveProject = async (projectId: string) => {
        if (user === null || user.id === "") return;
        // プロジェクトから抜ける処理
        await projectService.leaveProject(user.id, projectId);
        alert("プロジェクトから抜けました。");
    };

    return (
        <div className="container">
            <h2>参画プロジェクト一覧</h2>
            {projectList.length === 0 ? (
                <p>参画中のプロジェクトはありません。</p>
            ) : (
                <ul className="project-list">
                    {projectList.map(project => (
                        <li key={project.ProjectId} className="project-item">
                            <div className="project-info">
                                <h3>{project.ProjectName}</h3>
                                <p>{project.Description}</p>
                            </div>
                            <button
                                className="leave-button"
                                onClick={() => leaveProject(project.ProjectId)}
                            >
                                プロジェクトから抜ける
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default JoiningProjects;
