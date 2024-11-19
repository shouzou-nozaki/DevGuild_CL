import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { SearchProject } from './services/SearchProject';
import { ProjectInfo } from './dto/ProjectInfo';

function App() {
  const [projectList, setProjectList] = useState<ProjectInfo[]>([]); // プロジェクトリストの状態
  // const [error, setError] = useState<string | null>(null); // エラー状態

  // プロジェクトデータを取得
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const dao = new SearchProject();
        const response = await dao.searchProject();
        setProjectList(response); // データを状態にセット
      } catch (err) {
        console.error("プロジェクトデータの取得に失敗:", err);
        // setError("プロジェクトデータの取得に失敗しました");
      }
    };

    fetchProjects();
  }, []); // 初回レンダリング時に実行

  return (
    <div className="container">
      {/* ヘッダー */}
      <header className='project'>
        <h1>募集プロジェクト一覧</h1>
      </header>

      {/* エラーメッセージの表示 */}
      {/* {error && <p className="error">エラー: {error}</p>} */}

      {/* プロジェクト一覧 */}
      <table>
        {/* テーブルヘッダー */}
        <thead>
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
              <tr key={project.Id}>
                {/* プロジェクト名 */}
                <td>{project.ProjectName}</td>
                {/* 募集人数 */}
                <td>{project.RecruiteNumber}</td>
                {/* 募集期限 */}
                <td>{project.DueDate}</td>
                {/* 詳細ボタン */}
                <td>
                  {/* 詳細画面へ遷移 */}
                  <Link to={`/detail`} state={{ project }} className="button">
                    詳細を見る
                  </Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      {/* フッター */}
      <footer className="footer">
        <Link to="/create" className="create-project">プロジェクト作成</Link>
        <Link to="/myprojects" className="edit-project">プロジェクト編集</Link>
        <Link to="/joining" className="joined-project">参画中プロジェクト</Link>
      </footer>
    </div>
  );
}

export default App;
