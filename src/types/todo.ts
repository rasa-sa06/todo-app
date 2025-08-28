// TODOのステータスタイプ
export type TodoStatus = '未着手' | '進行中' | '完了';

// TODOアイテムの型定義
export interface Todo {
  id: number;           // ID（連番）
  title: string;        // タイトル
  status: TodoStatus;   // ステータス
  detail: string;       // 詳細
}

// TODO追加時の型定義（IDは自動生成するので不要）
export interface CreateTodo {
  title: string;
  detail: string;
  status?: TodoStatus;  // オプショナル（デフォルトは「未着手」）
}

// フィルタリング用の型定義
export interface TodoFilter {
  status?: TodoStatus;
  id?: number;
}