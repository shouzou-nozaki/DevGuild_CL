
// Perform 型の改善
export type Perform = string;

// サーバー通信処理の共通基盤クラス
export class HttpClient {
    private baseURL: string; // インスタンスごとに異なるURLを設定可能

    constructor(baseURL: string = process.env.REACT_APP_BACKEND_URL ?? "") {
        this.baseURL = baseURL;
    }

    /**
     * API通信処理(POSTメソッド)
     * @param param API に渡すパラメータ
     * @param perform エンドポイント (Perform型)
     * @returns APIからのレスポンス
     */
    public async postApi(param: any, perform: Perform): Promise<Response> {
        try {
            if (this.baseURL === "") throw new Error("バックエンドURLが設定されていません");

            // API通信
            const url = `${this.baseURL}${perform}`;
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({param: param}),
                mode: "cors",
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            return response;
        } catch (error) {
            throw error; // 必要に応じてエラーを再スロー
        }
    }
}
