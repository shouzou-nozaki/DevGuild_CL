import React, { createContext, useContext, useState, ReactNode } from "react";

// ユーザー情報の型定義
interface User {
    name: string;
    email: string;
}

// Contextの型定義
interface UserContextType {
    user: User | null; // ログインしていない場合は null
    setUser: (user: User | null) => void; // ユーザー情報をセットする関数
}

// Contextの初期値（未定義のため型にnullを許容）
const UserContext = createContext<UserContextType | undefined>(undefined);

// プロバイダーの型定義
interface UserProviderProps {
    children: ReactNode; // 子コンポーネントを受け取る
}

// プロバイダーの実装
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null); // ユーザー情報の状態

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Contextを利用するためのカスタムフック
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};