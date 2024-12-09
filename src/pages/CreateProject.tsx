import { classicNameResolver } from "typescript"
import './CreateProject.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProjectService } from "../services/ProjectService";
import { ProjectInfo } from "../dto/ProjectInfo";
import { useState } from "react";
import { parse } from "path/posix";
import Messages from "../util/Message";
import { Errors } from "../dto/Errors";
import { useUser } from "../util/UserContext";

/**
 * 新規プロジェクト作成画面
 * @returns 
 */
function CreateProject() {
    const [projectName, setProjectName] = useState('');                  // プロジェクト名
    const [recruiteNumber, setRecruiteNumber] = useState('');            // 募集人数
    const [dueDate, setDueDate] = useState('');                          // 締切日
    const [description, setDescription] = useState('');                  // 説明
    const [requirementList, setRequirements] = useState<string[]>([""]); // 求めるスキル
    const { user } = useUser(); // ユーザー情報とセット関数を取得

    // エラーメッセージ
    const [errors, setErrors] = useState<Errors>({});

    // 遷移用フック
    const navigate = useNavigate();

    /**
     * プロジェクト登録処理
     */
    const CreateProject = () => {
        // 入力値チェック
        if (!validateForm()) return;

        // 登録データ作成
        const projectInfo = new ProjectInfo();
        projectInfo.UserId = user?.id.toString() ?? "";         // ユーザーID
        projectInfo.ProjectName = projectName;       // プロジェクト名
        projectInfo.RecruiteNumber = recruiteNumber; // 募集人数
        projectInfo.DueDate = dueDate;               // 締切日
        projectInfo.Description = description;       // 説明
        projectInfo.Requirements = requirementList;  // 求めるスキル

        // データ登録
        const service = new ProjectService();
        service.regProject(projectInfo);

        // プロジェクト一覧へ遷移する
        navigate("/", { state: { message: Messages.CREATE_SUCCESS } });
    }

    /**
     * 求めるスキル変更時処理
     * @param index 変更対象インデックス番号
     * @param value フォーム入力値
     */
    const handleRequirementChange = (index: number, value: string) => {
        // 対象インデックスの値を変更
        const newRequirements = [...requirementList];
        newRequirements[index] = value;
        setRequirements(newRequirements);
    };

    /**
     * スキル追加ボタン押下時処理
     */
    const addRequirement = () => {
        setRequirements([...requirementList, ""]);
    };

    /**
     * スキル削除ボタン押下時処理
     * @param index 
     */
    const removeRequirement = (index: number) => {
        // 対象インデックス以外を取得
        const newRequirements = requirementList.filter((_, i) => i !== index);
        setRequirements(newRequirements);
    };

    /**
     * 入力フォームのバリデーションチェック
     * @returns 
     */
    const validateForm = () => {
        const errors:Errors = {};

        // プロジェクト名チェック
        if (!projectName.trim()) errors.ProjectNameError = Messages.REQUIRED_PROJECT_NAME;

        // 募集人数チェック
        if (!recruiteNumber.trim()) errors.RecruiteNumberError = Messages.REQUIRED_RECRUITE_NUMBER;
        if(parseInt(recruiteNumber) <= 0) errors.RecruiteNumberError = Messages.NOTVALID_RECRUITE_NUMBER;

        // 期限日チェック
        if (!dueDate) errors.DuedateError = Messages.REQUIRED_DUE_DATE;
        if(new Date(dueDate) < new Date()) errors.DuedateError = Messages.NOTVALID_DUE_DATE;

        // 説明チェック
        if (!description.trim()) errors.descriptionError = Messages.REQUIRED_DESCRIPTION

        setErrors(errors); // エラーメッセージを状態として保存
        return Object.keys(errors).length === 0; // エラーがなければtrueを返す
    };

    /**
     * プロジェクト一覧へ戻る
     */
    const Back = () =>{
        navigate("/");
    }


    return (
        <div className="container">
            <h1 className="page_title">応募作成</h1>
            <div className="container_itemlist">
                {/* <!-- プロジェクト名 --> */}
                <div className="container_item">
                    <label className="item_title" htmlFor="projectName">プロジェクト名<span className="requiredInput">*</span></label>
                    {/* エラーメッセージ */}
                    {errors.ProjectNameError && <div className="error_message">{errors.ProjectNameError}</div>}
                    {/* 入力欄 */}
                    <input className="projectName" type="text" id="projectName" name="projectName" placeholder="プロジェクト名を入力してください" required
                        onChange={(event) => setProjectName(event.target.value)} />
                </div>

                {/* <!-- 募集人数 --> */}
                <div className="container_item">
                    <label className="item_title" htmlFor="recruiteNumber">募集人数<span className="requiredInput">*</span></label>
                    {/* エラーメッセージ */}
                    {errors.RecruiteNumberError && <div className="error_message">{errors.RecruiteNumberError}</div>}
                    {/* 入力欄 */}
                    <input className="reqruiteNumber" type="number" id="recruiteNumber" name="recruiteNumber" placeholder="例: 5" required
                        onChange={(event) => setRecruiteNumber(event.target.value)} />
                </div>

                {/* <!-- 締切日 --> */}
                <div className="container_item">
                    <label className="item_title" htmlFor="dueDate">締切日<span className="requiredInput">*</span></label>
                    {/* エラーメッセージ */}
                    {errors.DuedateError && <div className="error_message">{errors.DuedateError}</div>}
                    {/* 入力欄 */}
                    <input className="duedate" type="date" id="dueDate" name="dueDate" required
                        onChange={(event) => setDueDate(event.target.value)} />
                </div>

                {/* <!-- プロジェクトの説明 --> */}
                <div className="container_item">
                    <label className="item_title" htmlFor="description">プロジェクトの説明<span className="requiredInput">*</span></label>
                    {/* エラーメッセージ */}
                    {errors.descriptionError && <div className="error_message">{errors.descriptionError}</div>}
                    {/* 入力欄 */}
                    <textarea className="description" id="description" name="description" placeholder="プロジェクトの詳細を記入してください" required
                        onChange={(event) => setDescription(event.target.value)}></textarea>
                </div>

                {/* <!-- 求めるスキル --> */}
                {requirementList.map((requirement, index) => (
                    <div key={index} className="container_item">
                        <label className="item_title" htmlFor={`requirement_${index}`}>求めるスキル {index + 1}</label>
                        {/* 入力欄 */}
                        <input className="requirement"
                            id={`requirement_${index}`}
                            name={`requirement_${index}`}
                            placeholder="例: 実務でのシステム開発経験が3年以上"
                            value={requirement}
                            onChange={(event) => handleRequirementChange(index, event.target.value)}
                        />
                        {/* 追加ボタン */}
                        <button type="button" className="add_requirement" onClick={addRequirement}>＋</button>
                        {/* 削除ボタン */}
                        <button type="button" className="remove_requirement" onClick={() => removeRequirement(index)}>―</button>
                    </div>
                ))}

                {/* <!-- 作成ボタン --> */}
                <button className="create" onClick={CreateProject}>作成する</button>
            </div>
            {/* <!-- 戻るボタン --> */}
            <button className="back" onClick={Back}>戻る</button>
        </div>
    );
}

export default CreateProject;