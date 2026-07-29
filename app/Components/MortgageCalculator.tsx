"use client";

import { useState } from "react";

export default function MortgageCalculator() {
  const [price, setPrice] = useState(2000000);
  const [downPayment, setDownPayment] = useState(20);
  const [interestRate, setInterestRate] = useState(4);
  const [years, setYears] = useState(25);

  const loanAmount = price * (1 - downPayment / 100);
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = years * 12;

  const monthlyPayment =
    monthlyRate === 0
      ? loanAmount / numberOfPayments
      : (loanAmount *
          monthlyRate *
          Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  return (
    <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900">
        Mortgage Calculator
      </h2>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="space-y-4">

          <div>
            <label className="mb-2 block font-medium">
              Property Price (AED)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Down Payment (%)
            </label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Loan Term (Years)
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full rounded-lg border p-3"
            />
          </div>

        </div>

        <div className="rounded-xl bg-blue-50 p-6">
          <h3 className="text-xl font-semibold text-blue-700">
            Estimated Monthly Payment
          </h3>

          <p className="mt-4 text-4xl font-bold">
            AED {monthlyPayment.toFixed(0)}
          </p>

          <div className="mt-6 space-y-2 text-gray-700">
            <p>Loan Amount: AED {loanAmount.toLocaleString()}</p>
            <p>Interest Rate: {interestRate}%</p>
            <p>Loan Term: {years} years</p>
          </div>
        </div>

      </div>
    </section>
  );
}