import { ProjectInfo } from "../dto/ProjectInfo";
import { HttpClient, Perform } from "../util/HttpClient";
import { ResponseConv } from "../util/ResponseConv";
import { Message } from "../dto/Message";

export const MessagePerform = {
    SEND: "/message/send",
    RECEIVE: "/message/receive",
} as const;

export type MessagePerform = (typeof MessagePerform)[keyof typeof MessagePerform];

/**
 * メッセージ用サービスクラス
 */
export class MessageService {
    private client: HttpClient;

    constructor(baseURL?: string) {
        this.client = new HttpClient(baseURL);
    }

    /**
     * プロジェクト申請処理
     * @param projectId プロジェクトID
     * @param userId ユーザーID
     */
    public async sendMessage(applyUserName: string, applyProjectInfo: ProjectInfo): Promise<Response> {
        try {
            return this.client.postApi({ applyUserName, applyProjectInfo }, MessagePerform.SEND);
        } catch (error) {
            console.error(error);
            alert("メッセージ送信に失敗しました。");
            return new Response();
        }
    }

    /**
     * メッセージ取得処理
     * @returns 
     */
    public async receiveNotification(userId:string): Promise<Array<Message>> {
        try {
            const param = { userId: userId };
            // メッセージ受信処理
            const response = this.client.getApi(param, MessagePerform.RECEIVE);
            // レスポンスをメッセージ型に変換
            const notifications = await ResponseConv.toMessageInfo(await response);

            return notifications;
        } catch (error) {
            console.error(error);
            alert("メッセージ受信に失敗しました。");
            return [];
        }
    }

}


