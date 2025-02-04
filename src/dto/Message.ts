export class Message {
    id = 0;        // ID
    userId = "0";  // 通知を受け取るユーザーのID
    title = "";    // 通知のタイトル
    message="";    // 通知の詳細メッセージ
    isRead=false;  // 既読状態
    createdAt="";  // 通知作成日時 (ISOフォーマット推奨)
    updatedAt =""; // 通知更新日時 (ISOフォーマット推奨)
};
