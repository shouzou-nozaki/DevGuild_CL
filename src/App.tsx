import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { SearchProject } from './services/searchProject';

function App() {
  // プロジェクトを取得
  const dao = new SearchProject();
  const projectList = dao.searchProject();

  return (
    <div className="container">
      {/* ヘッダー */}
      <header className='projecct'>
        <h1>募集プロジェクト一覧</h1>
      </header>

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

            {/* プロジェクト一覧 */}
            <tbody>
              {
                 projectList.map(project => {
                  return(
                    <tr>
                    {/* プロジェクト名 */}
                    <td>{project.ProjectName}</td>
                    {/* 募集人数 */}
                    <td>{project.RecruiteNumber}</td>
                    {/* 募集期限 */}
                    <td>{project.DueDate}</td>
                    {/* 詳細ボタン */}
                    <td><a href="/project-a-details.html" className="button">詳細を見る</a></td>
                </tr>
                  );
                })
              }
            </tbody>
        </table>

    </div>
  );
}


export default App;
