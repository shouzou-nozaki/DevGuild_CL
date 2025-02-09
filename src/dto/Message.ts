export class Message {
    id = 0;         // ID
    userId = "";    // 通知を受け取るユーザーのID
    projectId = ""; // プロジェクトID
    message="";     // 通知の詳細メッセージ
    isRead=false;   // 既読状態
    createdAt="";   // 通知作成日時
    updatedAt ="";  // 通知更新日時
};
