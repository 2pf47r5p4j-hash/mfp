'use client';

import { useState } from 'react';

export default function Home() {
  const [length, setLength] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    if (length <= 0 || width <= 0) {
      alert('Введите положительные числа');
      return;
    }
    const res = length * width;
    setResult(res);
  };

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">Калькулятор площади</h1>

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
    </main>
  );
}