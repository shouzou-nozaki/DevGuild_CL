import './CreateProject.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProjectService } from "../services/ProjectService";
import { ProjectInfo } from "../dto/ProjectInfo";
import { useEffect, useState } from "react";
import { useUser } from "../util/UserContext";
import { Const } from '../util/Const';

/**
 * プロジェクト作成/変更画面
 */
const CreateProject = () => {
    const [projectId, setProjectId] = useState('');                      // プロジェクトID
    const [projectName, setProjectName] = useState('');                  // プロジェクト名
    const [recruiteNumber, setRecruiteNumber] = useState('');            // 募集人数
    const [dueDate, setDueDate] = useState('');                          // 締切日
    const [description, setDescription] = useState('');                  // 説明
    const [requirementList, setRequirements] = useState<string[]>([""]); // 要求事項

    const { user } = useUser(); // ユーザー情報
    const [errors, setErrors] = useState<{ [key: string]: string }>({}); // エラーメッセージ

    const navigate = useNavigate(); // 遷移用フック
    // 遷移元からのパラメータ状態取得
    const location = useLocation();
    const projectInfoFromEdit: ProjectInfo = location.state?.projectInfo; // 編集画面からのプロジェクト情報
    const mode = location.state?.mode ?? Const.MODE_CREATE_PROJECT;        // 表示モード

    let projectInfoForService = new ProjectInfo(); // サービスクラス引き渡し用プロジェクト情報

    useEffect(() => {
        setProjectId("");        // プロジェクトID
        setProjectName("");      // プロジェクト名
        setRecruiteNumber("");   // 募集人数
        setDueDate("");          // 期限日
        setDescription("");      // 説明
        setRequirements([""]);   // 要求事項

        // 編集画面からの遷移時、プロジェクト情報をセット
        if (mode == Const.MODE_UPDATE_PROJECT) {
            setProjectId(projectInfoFromEdit.ProjectId);           // プロジェクトID
            setProjectName(projectInfoFromEdit.ProjectName);       // プロジェクト名
            setRecruiteNumber(projectInfoFromEdit.RecruiteNumber); // 募集人数
            setDueDate(projectInfoFromEdit.DueDate);               // 期限日
            setDescription(projectInfoFromEdit.Description);       // 説明
            setRequirements(projectInfoFromEdit.Requirements);     // 要求事項
            return;
        }
    }, [])

    /**
     * プロジェクト作成ボタン押下処理
     */
    const createProject = async () => {
        try {
            // 入力値チェック
            if (!validateForm()) return;
            // 入力値をセット
            makeProjectInfoForService();

            // データ登録
            const service = new ProjectService();
            if (mode == Const.MODE_CREATE_PROJECT) {
                const param = { projectInfo: projectInfoForService, accessToken: user?.token.toString() }
                service.regProject(param);

            } else if (mode == Const.MODE_UPDATE_PROJECT) {
                service.updateProject(projectInfoForService);
            }

            if (process.env.REACT_APP_DISCORD_TEMPLATE_URL) {
                // 新しいタブで指定したURLを開く
                window.open(process.env.REACT_APP_DISCORD_TEMPLATE_URL, '_blank');
            }
            navigate("/", { state: { message: Const.PROJECT_CREATE_SUCCESS } });
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * プロジェクト削除ボタン押下処理
     */
    const deleteProject = () => {
        const service = new ProjectService();
        service.deleteProject(projectId);
        // プロジェクト一覧へ遷移する
        navigate("/", { state: { message: Const.PROJECT_DELETE_SUCCESS } });
    }

    /**
     * 要望スキル変更処理
     * @param index 変更された要望のインデックス
     * @param value 変更された要望の値
     */
    const editRequirement = (index: number, value: string) => {
        // 対象インデックスの値を変更
        const newRequirements = [...requirementList];
        newRequirements[index] = value;
        setRequirements(newRequirements);
    };

    /**
     * 要望追加ボタン押下処理
     */
    const addRequirement = () => {
        setRequirements([...requirementList, ""]);
    };

    /**
     * 要望削除ボタン押下処理
     * @param index 削除する要望のインデックス
     */
    const removeRequirement = (index: number) => {
        // 対象インデックス以外を取得
        const newRequirements = requirementList.filter((_, i) => i !== index);
        setRequirements(newRequirements);
    };

    /**
     * フォーム入力値チェック
     * @returns true: エラーなし false: エラーあり
     */
    const validateForm = () => {
        const errors: { [key: string]: string } = {};
        // プロジェクト名チェック
        if (!projectName.trim()) errors.ProjectNameError = Const.PROJECT_VALIDATION_PROJECTNAME;

        // 募集人数チェック
        if (!recruiteNumber.trim()) errors.RecruiteNumberError = Const.PROJECT_VALIDATION_NUMBER;
        if (parseInt(recruiteNumber) <= 0) errors.RecruiteNumberError = Const.PROJECT_VALIDATION_NUMBER_INVALID;

        // 期限日チェック
        if (!dueDate) errors.DuedateError = Const.PROJECT_VALIDATION_DUEDATE;
        if (new Date(dueDate) < new Date()) errors.DuedateError = Const.PROJECT_VALIDATION_DUEDATE_INVALID;

        // 説明チェック
        if (!description.trim()) errors.DescriptionError = Const.PROJECT_VALIDATION_DESCRIPTION;

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    /**
     * サービスクラス引き渡し用プロジェクト情報作成
     */
    const makeProjectInfoForService = () => {
        projectInfoForService.UserId = user?.id.toString() ?? ""; // ユーザーID
        projectInfoForService.ProjectId = projectId;              // プロジェクトID
        projectInfoForService.ProjectName = projectName;          // プロジェクト名
        projectInfoForService.RecruiteNumber = recruiteNumber;    // 募集人数
        projectInfoForService.DueDate = dueDate;                  // 締切日
        projectInfoForService.Description = description;          // 説明
        projectInfoForService.Requirements = requirementList;     // 求めるスキル
    }

    /**
     * プロジェクト一覧へ戻る
     */
    const Back = () => {
        navigate("/");
    }

    return (
        <div className="container">
            {/* ページタイトル */}
            {mode == Const.MODE_UPDATE_PROJECT ?
                <h1 className="page_title">{Const.MODE_UPDATE_PROJECT}</h1> :
                <h1 className="page_title">{Const.MODE_CREATE_PROJECT}</h1>
            }
            <div className="container_itemlist">
                {/* <!-- プロジェクト名 --> */}
                <div className="container_item">
                    <label className="item_title" htmlFor="projectName">プロジェクト名<span className="requiredInput">*</span></label>
                    {/* エラーメッセージ */}
                    {errors.ProjectNameError && <div className="error_message">{errors.ProjectNameError}</div>}
                    {/* 入力欄 */}
                    <input className="projectName" type="text" id="projectName" name="projectName" placeholder="プロジェクト名を入力してください" required
                        onChange={(event) => setProjectName(event.target.value)}
                        value={projectName} />
                </div>

                {/* <!-- 募集人数 --> */}
                <div className="container_item">
                    <label className="item_title" htmlFor="recruiteNumber" >募集人数<span className="requiredInput">*</span></label>
                    {/* エラーメッセージ */}
                    {errors.RecruiteNumberError && <div className="error_message">{errors.RecruiteNumberError}</div>}
                    {/* 入力欄 */}
                    <input className="reqruiteNumber" type="number" id="recruiteNumber" name="recruiteNumber" placeholder="例: 5" required
                        onChange={(event) => setRecruiteNumber(event.target.value)}
                        value={recruiteNumber} />
                </div>

                {/* <!-- 締切日 --> */}
                <div className="container_item">
                    <label className="item_title" htmlFor="dueDate">締切日<span className="requiredInput">*</span></label>
                    {/* エラーメッセージ */}
                    {errors.DuedateError && <div className="error_message">{errors.DuedateError}</div>}
                    {/* 入力欄 */}
                    <input className="duedate" type="date" id="dueDate" name="dueDate" required
                        onChange={(event) => setDueDate(event.target.value)}
                        value={dueDate} />
                </div>

                {/* <!-- プロジェクトの説明 --> */}
                <div className="container_item">
                    <label className="item_title" htmlFor="description">プロジェクト説明<span className="requiredInput">*</span></label>
                    {/* エラーメッセージ */}
                    {errors.DescriptionError && <div className="error_message">{errors.DescriptionError}</div>}
                    {/* 入力欄 */}
                    <textarea className="description" id="description" name="description" placeholder="プロジェクトの詳細を記入してください" required
                        onChange={(event) => setDescription(event.target.value)}
                        value={description}></textarea>
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
                            onChange={(event) => editRequirement(index, event.target.value)}
                        />
                        {/* 追加ボタン */}
                        <button type="button" className="add_requirement" onClick={addRequirement}>＋</button>
                        {/* 削除ボタン */}
                        <button type="button" className="remove_requirement" onClick={() => removeRequirement(index)}>―</button>
                    </div>
                ))}


                {/* <!-- 作成/更新ボタン --> */}
                {mode == Const.MODE_UPDATE_PROJECT ?
                    <div>
                        <button className="update" onClick={createProject}>更新する</button>
                        <button className="delete" onClick={deleteProject}>削除する</button>
                    </div>
                    :
                    <button className="create" onClick={createProject}>作成する</button>
                }

            </div>
            {/* <!-- 戻るボタン --> */}
            <button className="back" onClick={Back}>戻る</button>
        </div>
    );
}

export default CreateProject;