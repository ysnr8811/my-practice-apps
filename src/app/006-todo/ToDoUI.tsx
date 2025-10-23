'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';

// Todoアイテムの型を定義します
type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

// ToDoリストのUIコンポーネント
export default function ToDoUI() {
  // URLからラベルを取得します
  const searchParams = useSearchParams();
  const label = searchParams.get("label") || "006-TODOリストアプリ";

  // --- Stateの定義 ---
  // Todoのリストを管理するstate
  const [todos, setTodos] = useState<Todo[]>([]);
  // 入力フィールドのテキストを管理するstate
  const [inputText, setInputText] = useState('');

  // --- イベントハンドラの定義 ---

  /**
   * 新しいTodoを追加する関数
   */
  const handleAddTodo = () => {
    // 入力が空、または空白のみの場合は何もしない
    if (inputText.trim() === '') return;

    // 新しいTodoオブジェクトを作成
    const newTodo: Todo = {
      id: Date.now(), // ユニークなIDとして現在時刻のタイムスタンプを使用
      text: inputText,
      completed: false,
    };

    // Todoリストの末尾に新しいTodoを追加してstateを更新
    setTodos([...todos, newTodo]);
    // 入力フィールドをクリア
    setInputText('');
  };

  /**
   * Todoの完了状態を切り替える関数
   * @param id 対象のTodoのID
   */
  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  /**
   * Todoを削除する関数
   * @param id 対象のTodoのID
   */
  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">{label}</h1>

      {/* Todo追加用の入力フォーム */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()} // Enterキーでも追加可能に
          className="flex-grow p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="新しいタスクを入力..."
        />
        <button
          onClick={handleAddTodo}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold"
        >
          追加
        </button>
      </div>

      {/* Todoリスト */}
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-3 mb-2 bg-gray-700 rounded transition-colors duration-300"
          >
            <span
              onClick={() => handleToggleTodo(todo.id)}
              className={`flex-grow cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="ml-4 px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm font-semibold"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
