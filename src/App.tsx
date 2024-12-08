import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { ProjectService } from './services/ProjectService';
import { ProjectInfo } from './dto/ProjectInfo';
import Header from './components/Header';

function App() {
  const [projectList, setProjectList] = useState<Array<ProjectInfo>>([]); // プロジェクトリストの状態

  const navigate = useNavigate();

  // 遷移元からメッセージ取得
  const location = useLocation();
  const [message, setMessage] = useState<string | null>(location.state?.message || null);

  // プロジェクトデータを取得
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const service = new ProjectService();
        const response = await service.searchProject();
        setProjectList(response); // データを状態にセット
      } catch (err) {
        console.error("プロジェクトデータの取得に失敗:", err);
      }
    };

    fetchProjects();
  }, []);

  // メッセージを数秒後に消す処理
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null); // メッセージを消す
        navigate("/", { state: null }); // URLのstateもリセット
      }, 5000); // 5秒後に消す

      return () => clearTimeout(timer); // クリーンアップ
    }
  }, [message, navigate]);

  return (
    <div className="container">
      {/* ヘッダー */}
      <header className='project'>
        <h1>募集プロジェクト一覧</h1>
      </header>

      {/* メッセージの表示 */}
      {message && <p className="success-message">{message}</p>}

      {/* プロジェクト一覧 */}
      <table className='project_table'>
        {/* テーブルヘッダー */}
        <thead className='table_header'>
          <tr>
            <th>プロジェクト名</th>
            <th>募集人数</th>
            <th>締切日</th>
            <th>詳細</th>
          </tr>
        </thead>

        {/* テーブルボディ */}
        <tbody>
          {
            projectList.map(project => (
              <tr key={project.ProjectId}>
                {/* プロジェクト名 */}
                <td>{project.ProjectName}</td>
                {/* 募集人数 */}
                <td>{project.RecruiteNumber}</td>
                {/* 募集期限 */}
                <td>{project.DueDate}</td>
                {/* 詳細ボタン */}
                <td>
                  {/* 詳細画面へ遷移 */}
                  <Link to={`/detail`} state={{ project }} className="detail_button">
                    詳細を見る
                  </Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

    </div>
  );
}

export default App;
