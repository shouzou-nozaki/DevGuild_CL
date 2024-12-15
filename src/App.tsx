import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { ProjectService } from './services/ProjectService';
import { ProjectInfo } from './dto/ProjectInfo';
import Header from './components/Header';

function App() {
  const [projectList, setProjectList] = useState<Array<ProjectInfo>>([]); // プロジェクトリストの状態
  const [currentPage, setCurrentPage] = useState(1); // 現在のページ
  const itemsPerPage = 10; // 1ページあたりの表示件数

  const navigate = useNavigate();

  // 遷移元からメッセージ取得
  const location = useLocation();
  const [message, setMessage] = useState<string | null>(location.state?.message || null);

  // ページごとのデータを抽出
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = projectList.slice(indexOfFirstItem, indexOfLastItem);

  // ページ数の計算
  const totalPages = Math.ceil(projectList.length / itemsPerPage);

  // ページ切り替え処理
  const paginate = (pageNumber: React.SetStateAction<number>) => setCurrentPage(pageNumber);

  // プロジェクトデータを取得
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const service = new ProjectService();
        const response = await service.getAllProject();
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
            currentProjects.map(project => (
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

      <nav className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="page_button"
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
          <button
            key={pageNumber}
            className={`page_button ${pageNumber === currentPage ? 'active' : ''}`}
            onClick={() => paginate(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="page_button"
        >
          &gt;
        </button>
      </nav>

    </div>
  );
}

export default App;
