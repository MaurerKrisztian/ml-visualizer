import React, { useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import { LinearRegression } from "../lib/models/linear-regression.ts";
import { sleep } from "../lib/utils/utils.ts";

const LinearRegressionComponent = () => {
    // Sample Data
    const [x, setX] = useState([2, 2, 2, 2, 1, 2, 3, 4, 5]);
    const [y, setY] = useState([4, 3, 2, 1, 2, 4, 5, 4, 5]);

    const [errorRate, setErrorRate] = useState<number | null>(null);

    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    const updateChart = (x: number[], y: number[], lr: LinearRegression) => {
        if (chartRef.current) {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            const regressionLineX = [Math.min(...x), Math.max(...x)];
            const regressionLineY = regressionLineX.map(lr.predict.bind(lr));

            const newChart = new Chart(chartRef.current, {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: 'Original Data',
                        data: x.map((val, index) => ({ x: val, y: y[index] })),
                        backgroundColor: 'rgba(255, 99, 132, 1)',
                    }, {
                        label: 'Regression Line',
                        data: regressionLineX.map((val, index) => ({ x: val, y: regressionLineY[index] })),
                        type: 'line',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 2,
                        fill: false
                    }]
                },
                options: {
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom'
                        },
                        y: {
                            type: 'linear'
                        }
                    }
                }
            });

            chartInstanceRef.current = newChart;
        }
    };

    const handleTrainModel = async () => {
        const lr = new LinearRegression();
        const xMean = lr.mean(x);
        const yMean = lr.mean(y);
        for (let i = 0; i < x.length; i++) {
            lr.trainStep(x, y, xMean, yMean, i);
            updateChart(x, y, lr);

            setErrorRate(lr.calculateError(x, y));
            await sleep(555)
        }
    };

    return (
        <div>
            <canvas ref={chartRef} width="900" height="700"></canvas>
            <button onClick={handleTrainModel}>Train Model</button>
            {errorRate !== null && <div>Error Rate: {errorRate.toFixed(2)}</div>}
        </div>
    );
};

export default LinearRegressionComponent;
