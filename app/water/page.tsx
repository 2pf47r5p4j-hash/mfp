'use client';

import { useState, useEffect } from 'react';

type WaterCalculation = {
  id: string;
  date: string;
  load: number;
  length: number;
  rateLoad: number;
  rateLength: number;
  total: number;
};

export default function WaterPage() {
  const [load, setLoad] = useState<number>(0);
  const [length, setLength] = useState<number>(0);
  const [rateLoad, setRateLoad] = useState<number>(0);
  const [rateLength, setRateLength] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);
  const [history, setHistory] = useState<WaterCalculation[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('waterHistory');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('waterHistory', JSON.stringify(history));
  }, [history]);

  const calculate = () => {
    if (load <= 0 || length <= 0 || rateLoad < 0 || rateLength < 0) {
      alert('Все значения должны быть положительными (тарифы могут быть нулевыми)');
      return;
    }
    const total = rateLoad * load + rateLength * length;
    setResult(total);

    const newCalc: WaterCalculation = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      load,
      length,
      rateLoad,
      rateLength,
      total,
    };
    setHistory((prev) => [...prev, newCalc]);
  };

  const deleteCalc = (id: string) => {
    setHistory(history.filter((item) => item.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">Расчёт подключения воды</h1>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Нагрузка (м³/сутки)</label>
            <input
              type="number"
              value={load}
              onChange={(e) => setLoad(Number(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              step="0.01"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Протяжённость (м)</label>
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
            <label className="block text-sm font-medium text-gray-700">Тариф за мощность (руб/м³/сут)</label>
            <input
              type="number"
              value={rateLoad}
              onChange={(e) => setRateLoad(Number(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              step="0.01"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Тариф за протяжённость (руб/м)</label>
            <input
              type="number"
              value={rateLength}
              onChange={(e) => setRateLength(Number(e.target.value))}
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
          Рассчитать стоимость
        </button>

        {result !== null && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-lg font-semibold text-green-800">
              Итоговая стоимость: {result.toFixed(2)} руб.
            </p>
            <p className="text-sm text-gray-600">
              ({rateLoad} × {load} + {rateLength} × {length} = {result.toFixed(2)})
            </p>
          </div>
        )}
      </div>

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
          <p className="text-gray-500 text-center py-4">Пока нет расчётов по воде</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {history.map((item) => (
              <li key={item.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">{item.date}</p>
                  <p className="text-sm">
                    Нагрузка: {item.load} м³/сут, Протяжённость: {item.length} м
                  </p>
                  <p className="text-sm">
                    Тарифы: {item.rateLoad} руб/м³/сут + {item.rateLength} руб/м
                  </p>
                  <p className="font-semibold">Итого: {item.total.toFixed(2)} руб.</p>
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