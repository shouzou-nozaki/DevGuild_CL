
// Perform 型の改善
export type Perform = string;

// サーバー通信処理の共通基盤クラス
export class HttpClient {
    private baseURL: string; // インスタンスごとに異なるURLを設定可能

    constructor(baseURL: string = "http://localhost:8080") {
        this.baseURL = baseURL;
    }

    /**
     * API コール処理
     * @param param API に渡すパラメータ
     * @param perform エンドポイント (Perform型)
     * @returns APIからのレスポンス
     */
    public async callApi(param: any, perform: Perform): Promise<Response> {
        const url = `${this.baseURL}${perform}`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({param: param}),
                mode: "cors",
            });

            if (!response.ok) {
                // カスタマイズされたエラーハンドリング
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            return response;
        } catch (error) {
            console.error(`HTTP通信エラー: ${error}`);
            throw error; // 必要に応じてエラーを再スロー
        }
    }
}
