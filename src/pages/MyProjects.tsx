import { classicNameResolver } from "typescript"
import './ProjectDetail.css';
import { useLocation } from 'react-router-dom';

// 自分で作成したプロジェクトの一覧表示画面
function MyProjects() {
    return (
        <div className="contailner">
            <label>自分が作成したプロジェクトの一覧を表示します。</label>
        </div>
    );
}

export default MyProjects;