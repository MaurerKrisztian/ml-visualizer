export class LinearRegression {
    slope: number;
    intercept: number;

    constructor() {
        this.slope = 0;
        this.intercept = 0;
    }

    trainStep(x: number[], y: number[], xMean: number, yMean: number, step: number) {
        let numerator = 0;
        let denominator = 0;

        for (let i = 0; i <= step; i++) {
            numerator += (x[i] - xMean) * (y[i] - yMean);
            denominator += (x[i] - xMean) ** 2;
        }

        this.slope = numerator / denominator;
        this.intercept = yMean - this.slope * xMean;
    }

    predict(x: number) {
        return this.slope * x + this.intercept;
    }

    mean(values: number[]) {
        return values.reduce((sum, value) => sum + value, 0) / values.length;
    }


    calculateError(x: number[], y: number[]): number {
        let error = 0;
        for (let i = 0; i < x.length; i++) {
            const prediction = this.predict(x[i]);
            error += (y[i] - prediction) ** 2;
        }
        return error / x.length;
    }
}