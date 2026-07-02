'use client'; // Это нужно для использования хуков (useState, useEffect)

import { useState, useEffect } from 'react';

// Тип для одного сохранённого расчёта
type Calculation = {
  id: string;
  date: string;
  length: number;
  width: number;
  result: number;
};

export default function Home() {
  // Состояния для формы
  const [length, setLength] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);

  // Состояние для истории (массив расчётов)
  const [history, setHistory] = useState<Calculation[]>([]);

  // При загрузке страницы читаем историю из localStorage
  useEffect(() => {
    const saved = localStorage.getItem('calcHistory');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  // Функция, которая сохраняет историю в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem('calcHistory', JSON.stringify(history));
  }, [history]);

  // Логика расчёта (здесь пример: площадь = длина * ширина)
  // Вы можете заменить формулу на свою
  const calculate = () => {
    if (length <= 0 || width <= 0) {
      alert('Введите положительные числа');
      return;
    }
    const res = length * width; // <-- ЗДЕСЬ ВАША ФОРМУЛА
    setResult(res);

    // Сохраняем расчёт в историю
    const newCalc: Calculation = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      length,
      width,
      result: res,
    };
    setHistory((prev) => [...prev, newCalc]);
  };

  // Удалить один расчёт по id
  const deleteCalc = (id: string) => {
    setHistory(history.filter((item) => item.id !== id));
  };

  // Очистить всю историю
  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">Калькулятор стоимости работ</h1>

      {/* Блок ввода */}
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Длина (м)</label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              step="0.01"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ширина (м)</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              step="0.01"
              min="0"
            />
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Рассчитать
        </button>

        {result !== null && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-lg font-semibold text-green-800">
              Результат: {result} м²
            </p>
          </div>
        )}
      </div>

      {/* История */}
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">История расчётов</h2>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Очистить всё
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Пока нет сохранённых расчётов</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {history.map((item) => (
              <li key={item.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">{item.date}</p>
                  <p>
                    {item.length} × {item.width} = {item.result} м²
                  </p>
                </div>
                <button
                  onClick={() => deleteCalc(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}