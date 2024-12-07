import React from 'react';

const IntroSection = () => {
    return (
        <section className="bg-blue-50 p-6 rounded-lg shadow-lg text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Understanding a Neural Network Neuron</h1>
            <p className="text-gray-700 mb-4">
                Neural networks are powerful tools in machine learning, and at their core are neurons, the basic
                computational units.
                A single neuron performs these key steps:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 inline-block text-left">
                <li>
                    <strong>Takes multiple inputs:</strong> These inputs represent features from your data, such as
                    pixel values in an image.
                </li>
                <li>
                    <strong>Applies weights:</strong> Each input is multiplied by a weight, which determines its
                    importance.
                </li>
                <li>
                    <strong>Combines inputs:</strong> The weighted inputs are summed up to produce a single value.
                </li>
                <li>
                    <strong>Transforms with an activation function:</strong> This step introduces non-linearity,
                    enabling the neuron to learn complex patterns.
                </li>
            </ul>
            <p className="text-gray-700 mb-4">
                In this tool, you can adjust the inputs and weights using sliders to see how the weighted sum and
                activation function output change in real time. Experiment to see how neurons process information!
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">How Neurons Connect</h2>
            <p className="text-gray-700 mb-4">
                Neurons in a network are connected in layers, and the output of one neuron serves as the input to
                neurons in the next layer. Here’s how it works:
            </p>
            <ul className="list-disc list-inside text-gray-700 inline-block text-left">
                <li>
                    <strong>Output as Input:</strong> The activation function output of a neuron is passed as input to
                    one or more neurons in the next layer.
                </li>
                <li>
                    <strong>Weighted Connections:</strong> Each connection between neurons has a weight, determining how
                    much influence the output of one neuron has on the next.
                </li>
                <li>
                    <strong>Layer-by-Layer Transformation:</strong> As data flows through the network, neurons
                    collectively transform it into increasingly abstract representations, enabling the network to learn
                    complex patterns.
                </li>
                <li>
                    <strong>Final Prediction:</strong> The last layer processes all the learned transformations to
                    produce the final output, such as a classification or regression result.
                </li>
            </ul>


            <div className="text-center bg-blue-50 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Weighted Sum Equation</h2>

                <p className="text-gray-700">
                    The weighted sum is calculated as:
                </p>
                <p className="text-gray-900 text-lg font-bold mt-4">
                    <code>Z = w<sub>1</sub>x<sub>1</sub> + w<sub>2</sub>x<sub>2</sub> + ... + w<sub>n</sub>x<sub>n</sub></code>
                </p>

                <p className="text-gray-700 mt-6">
                    Alternatively, in summation notation:
                </p>
                <p className="text-gray-900 text-lg font-bold mt-4">
                    <code>Z = &#8721;<sub>i=1</sub><sup>n</sup> w<sub>i</sub>x<sub>i</sub></code>
                </p>

                <p className="text-gray-700 mt-6">
                    In matrix form:
                </p>
                <div className="mt-4">
                    <p className="text-gray-900 text-lg font-bold">
                        <code>Z = W<sup>T</sup>X</code>
                    </p>
                    <p className="text-gray-700 mt-2">
                        Where:
                    </p>
                    <div className="inline-block text-left text-gray-700">
                        <p><strong>W</strong> = [w<sub>1</sub>, w<sub>2</sub>, ..., w<sub>n</sub>] (weights vector)</p>
                        <p><strong>X</strong> = [x<sub>1</sub>, x<sub>2</sub>, ..., x<sub>n</sub>] (input vector)</p>
                        <p><strong>Z</strong> = Weighted sum output (scalar)</p>
                    </div>
                </div>

                <p className="text-gray-700 mt-6">
                    These forms represent how neurons process inputs using weights to compute their output.
                </p>
            </div>


        </section>
    );
};

export default IntroSection;
