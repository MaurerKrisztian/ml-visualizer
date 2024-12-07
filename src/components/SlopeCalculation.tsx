import React from 'react';
import { Card } from '@/components/ui/card.tsx';

const CalculateSlopes = ({ weights, inputs }) => {

    const slopes = weights.map((w, i) => ({
        dimension: i + 1,
        weight: w,
        input: inputs[i],
        partialDerivative: w
    }));

    const totalEffect = weights.reduce((sum, w) => sum + w, 0);

    return (
        <Card className="p-4 space-y-4">
            <div className="font-mono text-sm bg-gray-50 p-2 rounded">
                <div>z = w₁x₁ + w₂x₂ + w₃x₃</div>
                <div className="mt-2">Partial Derivatives (Slopes):</div>
                <div className="pl-4">
                    {slopes.map(({ dimension, weight, partialDerivative }) => (
                        <div key={dimension} className="mt-1">
                            ∂z/∂x{dimension} = w{dimension} = {weight.toFixed(3)}
                            <span className="text-gray-600 ml-2">
                                ({partialDerivative > 0 ? 'increases' : 'decreases'} by {Math.abs(partialDerivative).toFixed(3)} per unit)
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-4 border-t pt-2">

                </div>

                <div className="mt-4 text-sm text-gray-600">
                    Total sensitivity: {totalEffect.toFixed(3)}
                    <br />
                    <span className="text-xs">
                        (Sum of weights - indicates overall sensitivity to uniform input changes)
                    </span>
                </div>
            </div>
        </Card>
    );
};

export default CalculateSlopes;