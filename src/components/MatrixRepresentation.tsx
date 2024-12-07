import React from 'react';
import { Card } from '@/components/ui/card.tsx';

const MatrixMultiplication = ({ weights, inputs }) => {
    const validWeights = Array.isArray(weights) ? weights : [];
    const validInputs = Array.isArray(inputs) ? inputs : [];

    const result = validWeights.length === validInputs.length
        ? validWeights.reduce((sum, w, i) => sum + w * validInputs[i], 0)
        : 0;

    return (
        <Card className="p-4 space-y-4">
            <div className="space-y-6">
                {/* Original equation */}
                <div className="font-mono">
                    <div className="text-lg mb-2">Original Equation:</div>
                    <div>z = w₁x₁ + w₂x₂ + w₃x₃</div>
                </div>

                {/* Matrix form */}
                <div className="font-mono">
                    <div className="text-lg mb-2">Matrix Form:</div>
                    <div className="flex items-center gap-2">
                        {/* Weight matrix */}
                        <div className="border-2 border-gray-400 px-2 py-1">
                            [{validWeights.map(w => w.toFixed(2)).join(' ')}]
                        </div>

                        {/* Input matrix */}
                        <div className="border-2 border-gray-400 px-2">
                            {validInputs.map((x, i) => (
                                <div key={i}>[{x.toFixed(2)}]</div>
                            ))}
                        </div>

                        {/* Result */}
                        <div>= [{result.toFixed(3)}]</div>
                    </div>
                </div>

                {/* Calculation breakdown */}
                <div className="text-sm text-gray-600 space-y-1">
                    <div className="font-bold">Calculation:</div>
                    {validWeights.map((w, i) => (
                        <div key={i}>
                            ({w.toFixed(2)} × {validInputs[i].toFixed(2)})
                            {i < validWeights.length - 1 ? ' + ' : ' = '}
                            {(w * validInputs[i]).toFixed(3)}
                            {i === validWeights.length - 1 && ` = ${result.toFixed(3)}`}
                        </div>
                    ))}
                </div>

                {/* Additional explanation */}
                <div className="text-sm bg-gray-50 p-2 rounded">
                    <p>This matrix multiplication represents:</p>
                    <ul className="list-disc list-inside mt-1">
                        <li>A 1×3 weight matrix (row vector)</li>
                        <li>A 3×1 input matrix (column vector)</li>
                        <li>Resulting in a 1×1 matrix (scalar)</li>
                    </ul>
                </div>
            </div>
        </Card>
    );
};

export default MatrixMultiplication;