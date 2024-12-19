/**
 * サーバー通信時のリクエストパラメータ
 */
export interface ServerRequest {
    param: any; // サーバーに送信するリクエストデータ
    perform: Perform; // サーバーエンドポイントのパス
}

/**
 * Performタイプ: エンドポイント指定の基本型
 */
export type Perform = string;

/**
 * サーバー通信基盤クラス: 各リクエストオブジェクトの型定義
 */
export class Http implements ServerRequest {
    param: any;
    perform: Perform;

    constructor(param: any, perform: Perform) {
        this.param = param;
        this.perform = perform;
    }
}

/**
 * API通信クライアント: 抽象化されたサーバー通信基盤クラス
 */
export abstract class HttpClient {
    private baseURL: string;

    constructor(baseURL: string = "http://localhost:8080") {
        this.baseURL = baseURL;
    }

    /**
     * サーバー通信の準備を各サブクラスで定義
     */
    public abstract prepareRequest(): Http;

    /**
     * サーバー通信処理
     */
    public async callApi(): Promise<Response> {
        // 具体的なリクエストデータを取得
        const { param, perform } = this.prepareRequest();

        // APIエンドポイントのURL作成
        const url = `${this.baseURL}${perform}`;

        // fetchを利用した通信処理
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ param }), // パラメータを送信
            mode: "cors", // CORSモードを有効化
        });

        return response;
    }
}
