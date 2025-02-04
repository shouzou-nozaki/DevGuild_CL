// ルーティング設定
import { Routes, Route } from "react-router-dom";
import App from '../App';

import ProjectDetail from '../pages/ProjectDetail';
import MyProjects from "../pages/MyProjects";
import CreateProject from "../pages/CreateProject";
import JoiningProjects from "../pages/JoiningProjects";
import Login from "../pages/Login";
import { toast, ToastContainer } from "react-toastify";

export const AppRouter = () => {
    return (
        <Routes>
            {/* ログイン画面 */}
            <Route path="/login" element={<Login/>}/>
            {/* プロジェクト一覧 */}
            <Route path="/" element={<App />} />
            {/* プロジェクト詳細 */}
            <Route path="/detail" element={<ProjectDetail />}/>
            {/* 新規作成、編集 */}
            <Route path="/create" element={<CreateProject />}/>
            {/* マイプロジェクト一覧 */}
            <Route path="/myprojects" element={<MyProjects />} />
            {/* 参画プロジェクト一覧 */}
            <Route path="/joinning" element={<JoiningProjects/>}/>
        </Routes>
    )
}