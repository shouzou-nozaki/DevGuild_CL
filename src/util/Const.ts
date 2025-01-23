/**
 * 定数クラス
 * 　命名規則: 大文字でスネークケース
 * 　　　　　  対象_アクション名_(項目名)_(状態)
 */
export class Const {
    public static readonly STATUS_CLOSE = "0";
    public static readonly STATUS_OPEN = "1";

    public static readonly PROJECT_CREATE_SUCCESS = "プロジェクトを作成しました。";
    public static readonly PROJECT_UPDATE_SUCCESS = "プロジェクトを更新しました。";
    public static readonly PROJECT_DELETE_SUCCESS = "プロジェクトを削除しました。";

    public static readonly PROJECT_VALIDATION_USERNAME = "ユーザー名を入力してください。";
    public static readonly PROJECT_VALIDATION_EMAIL = "メールアドレスを入力してください。";
    public static readonly PROJECT_VALIDATION_PASSWORD = "パスワードを入力してください。";
    public static readonly PROJECT_VALIDATION_PROJECTNAME = "プロジェクト名は必須項目です。";
    public static readonly PROJECT_VALIDATION_NUMBER = "募集人数は必須項目です。";
    public static readonly PROJECT_VALIDATION_NUMBER_INVALID = "1以上の数字を入力してください。";
    public static readonly PROJECT_VALIDATION_DUEDATE = "締切日は必須項目です。";
    public static readonly PROJECT_VALIDATION_DUEDATE_INVALID = "今日以降の日付を入力してください。";
    public static readonly PROJECT_VALIDATION_DESCRIPTION = "プロジェクト説明は必須項目です。";

    public static readonly MODE_CREATE_PROJECT = "応募作成";
    public static readonly MODE_UPDATE_PROJECT = "応募変更";
}
