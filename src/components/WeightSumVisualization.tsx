import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card.tsx';
import { Slider } from '@/components/ui/slider.tsx';
import {ArrowRight, ChevronDown, ChevronUp} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import CalculateSlopes from "@/components/SlopeCalculation.tsx";
import MatrixMultiplication from "@/components/MatrixRepresentation.tsx";
import { Button } from './ui/button.tsx';
import IntroSection from "@/components/IntroSection.tsx";

const ActivationFunctions = {
    'ReLU': x => Math.max(0, x),
    'Sigmoid': x => 1 / (1 + Math.exp(-x)),
    'Tanh': x => Math.tanh(x),
    'Linear': x => x,
    'LeakyReLU': x => x > 0 ? x : 0.01 * x,
};

export default function WeightSumVisualization() {
    const [weights, setWeights] = useState([0.5, -0.3, 0.8]);
    const [inputs, setInputs] = useState([0.2, 0.6, -0.3]);
    const [selectedActivation, setSelectedActivation] = useState('ReLU');
    const [showComponents, setShowComponents] = useState(true);
    const [showSlopes, setShowSlopes] = useState(false);

    const weightedSum = weights.reduce((sum, weight, i) => sum + weight * inputs[i], 0);
    const activatedOutput = ActivationFunctions[selectedActivation](weightedSum);

    const sumGraphData = useMemo(() => {
        const data = [];
        let minDistance = Infinity;
        let closestPointIndex = 0;

        // First pass: Generate all points and find the closest one
        for (let x = -6; x <= 6; x += 0.05) {
            const xFixed = Number(x.toFixed(2));
            const point = {
                x: xFixed,
                sum: 0,
                isCurrentPoint: false
            };

            // Calculate weighted sum for this point
            weights.forEach((w, i) => {
                point[`w${i + 1}x`] = w * x;
                point.sum += w * x;
            });

            // Check if this point is closer to weightedSum than previous closest
            const distance = Math.abs(point.sum - weightedSum);
            if (distance < minDistance) {
                minDistance = distance;
                closestPointIndex = data.length;
            }

            data.push(point);
        }

        // Mark only the closest point
        data[closestPointIndex].isCurrentPoint = true;

        return data;
    }, [weights, weightedSum]);

    const activationGraphData = useMemo(() => {
        const data = [];
        for (let x = -6; x <= 6; x += 0.1) {
            const xFixed = Number(x.toFixed(2));
            data.push({
                x: xFixed,
                output: ActivationFunctions[selectedActivation](x),
                isCurrentPoint: Math.abs(x - weightedSum) < 0.05
            });
        }
        return data;
    }, [selectedActivation, weightedSum]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const dataPoint = payload[0].payload;
            if (dataPoint.isCurrentPoint) {
                return (
                    <div className="bg-white p-2 border rounded shadow">
                        <p className="text-red-500 font-bold">Current Point!</p>
                        <p>x: {label}</p>
                        {payload.map((entry, index) => (
                            <p key={index}>{entry.name}: {entry.value.toFixed(3)}</p>
                        ))}
                    </div>
                );
            }
            return (
                <div className="bg-white p-2 border rounded shadow">
                    {payload.map((entry, index) => (
                        <p key={index}>{entry.name}: {entry.value.toFixed(3)}</p>
                    ))}
                </div>
            );
        }
        return null;
    };

    const inputToSlider = value => (value + 1) * 50;
    const sliderToInput = value => (value / 50) - 1;
    const weightToSlider = value => (value + 2) * 25;
    const sliderToWeight = value => (value / 25) - 2;

    return (
        <Card className="p-4 max-w-6xl">
            <IntroSection></IntroSection>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-3">
                        </div>
                        <div className="text-sm text-gray-700">
                            <strong>How it works:</strong>
                            <ul className="list-disc list-inside mt-1">
                                <li>Adjust inputs (-1 to 1) to simulate different feature values</li>
                                <li>Modify weights (-2 to 2) to change input importance</li>
                                <li>Watch how the weighted sum and activation change</li>
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {weights.map((weight, i) => (
                            <div key={i} className="bg-white rounded-lg p-2 border">
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <div className="text-xs text-gray-500">Input x{i + 1} (-1 to 1)</div>
                                        <Slider
                                            value={[inputToSlider(inputs[i])]}
                                            onValueChange={(value) => {
                                                const newInputs = [...inputs];
                                                newInputs[i] = sliderToInput(value[0]);
                                                setInputs(newInputs);
                                            }}
                                            min={0}
                                            max={100}
                                            step={1}
                                            className="py-2"
                                        />
                                        <div className="text-xs">{inputs[i].toFixed(2)}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500">Weight w{i + 1} (-2 to 2)</div>
                                        <Slider
                                            value={[weightToSlider(weights[i])]}
                                            onValueChange={(value) => {
                                                const newWeights = [...weights];
                                                newWeights[i] = sliderToWeight(value[0]);
                                                setWeights(newWeights);
                                            }}
                                            min={0}
                                            max={100}
                                            step={1}
                                            className="py-2"
                                        />
                                        <div className="text-xs">{weights[i].toFixed(2)}</div>
                                    </div>
                                </div>
                                <div className="text-xs text-right text-gray-600">
                                    Product: {(weight * inputs[i]).toFixed(3)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <MatrixMultiplication weights={weights} inputs={inputs}/>


                </div>

                <div className="space-y-4">
                    <div className="bg-white rounded-lg border p-3">
                        <div className="mb-3">
                            <h3 className="text-sm font-semibold">Weight Sum Calculation</h3>
                            <div className="font-mono text-sm bg-gray-50 p-2 rounded mt-1">
                                <div>z = w₁x₁ + w₂x₂ + w₃x₃</div>
                                <div>
                                    z = {weights.map((w, i) => {
                                    if (i === 0) return `(${w.toFixed(2)}×${inputs[i].toFixed(2)})`;
                                    return ` + (${w.toFixed(2)}×${inputs[i].toFixed(2)})`;
                                }).join('')} = {weightedSum.toFixed(3)}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Button
                                    onClick={() => setShowSlopes(!showSlopes)}
                                    variant="outline"
                                    className="w-full flex items-center justify-between"
                                >
                                    <span>Slope Analysis</span>
                                    {showSlopes ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                                </Button>

                                {showSlopes && <CalculateSlopes weights={weights} inputs={inputs}/>}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                checked={showComponents}
                                onCheckedChange={setShowComponents}
                                id="show-components"
                            />
                            <label htmlFor="show-components">Show Individual Contributions</label>
                        </div>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={sumGraphData}>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="x" label={{value: 'Input', position: 'bottom'}}/>
                                    <YAxis label={{value: 'Weighted Sum', angle: -90, position: 'left'}}/>
                                    <Tooltip content={<CustomTooltip/>}/>
                                    {showComponents && (
                                        <>
                                            <Line type="monotone" dataKey="w1x" stroke="#8884d8" dot={false}
                                                  name="Weight 1"/>
                                            <Line type="monotone" dataKey="w2x" stroke="#82ca9d" dot={false}
                                                  name="Weight 2"/>
                                            <Line type="monotone" dataKey="w3x" stroke="#ffc658" dot={false}
                                                  name="Weight 3"/>
                                        </>
                                    )}
                                    <Line
                                        type="monotone"
                                        dataKey="sum"
                                        stroke="#ff7300"
                                        dot={(props) => {
                                            const {payload, cx, cy} = props;
                                            return payload.isCurrentPoint ? (
                                                <circle
                                                    key={`dot-${cx}-${cy}`}
                                                    r={5}
                                                    fill="red"
                                                    stroke="none"
                                                    cx={cx}
                                                    cy={cy}
                                                />
                                            ) : null;
                                        }}
                                        strokeWidth={3}
                                        name="Total Sum"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border p-3">
                        <div className="mb-3">
                            <h3 className="text-sm font-semibold">Activation Function Output</h3>
                            <select
                                className="p-2 rounded border"
                                value={selectedActivation}
                                onChange={(e) => setSelectedActivation(e.target.value)}
                            >
                                {Object.keys(ActivationFunctions).map(func => (
                                    <option key={func} value={func}>{func}</option>
                                ))}
                            </select>
                            <div className="font-mono text-sm bg-gray-50 p-2 rounded mt-1">
                                <div>output = {selectedActivation}(z)</div>
                                <div>output = {selectedActivation}({weightedSum.toFixed(3)})
                                    = {activatedOutput.toFixed(3)}</div>
                            </div>
                        </div>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={activationGraphData}>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="x" label={{value: 'Weighted Sum', position: 'bottom'}}/>
                                    <YAxis label={{value: 'Activated Output', angle: -90, position: 'left'}}/>
                                    <Tooltip content={<CustomTooltip/>}/>
                                    <Line
                                        type="monotone"
                                        dataKey="output"
                                        stroke="#ff7300"
                                        dot={(props) => {
                                            const {payload, cx, cy} = props;
                                            return payload.isCurrentPoint ? (
                                                <circle
                                                    key={`dot-${cx}-${cy}`}
                                                    r={4}
                                                    fill="red"
                                                    stroke="none"
                                                    cx={cx}
                                                    cy={cy}
                                                />
                                            ) : null;
                                        }}
                                        strokeWidth={2}
                                        name="Output"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                        <h3 className="font-semibold mb-2">Why Activation Functions?</h3>
                        <p className="text-sm text-gray-700 mb-2">
                            Activation functions are crucial for introducing non-linearity into neural networks,
                            enabling them to learn and represent complex patterns. Here are some common activation
                            functions and their equations:
                        </p>
                        <ul className="list-disc pl-5 text-sm text-gray-700">
                            <li className="mb-2">
                                <strong>ReLU (Rectified Linear Unit):</strong>
                                <code> f(x) = max(0, x)</code>
                                <p className="ml-4">Most common, helps the network learn non-linear patterns by zeroing
                                    out negative values.</p>
                            </li>
                            <li className="mb-2">
                                <strong>Sigmoid:</strong>
                                <code> f(x) = 1 / (1 + e<sup>-x</sup>)</code>
                                <p className="ml-4">Squishes output to the range (0, 1), often used for
                                    probabilities.</p>
                            </li>
                            <li className="mb-2">
                                <strong>Tanh (Hyperbolic Tangent):</strong>
                                <code> f(x) = (e<sup>x</sup> - e<sup>-x</sup>) / (e<sup>x</sup> + e<sup>-x</sup>)</code>
                                <p className="ml-4">Similar to Sigmoid but ranges from (-1, 1), centering the outputs
                                    around zero.</p>
                            </li>
                            <li className="mb-2">
                                <strong>Linear:</strong>
                                <code> f(x) = x</code>
                                <p className="ml-4">No transformation, typically used in the output layer for regression
                                    problems.</p>
                            </li>
                        </ul>
                    </div>


                </div>
            </div>
        </Card>
    );
}