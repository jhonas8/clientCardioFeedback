declare namespace ScoreTypes {

    export interface avarage {
        bad: number,
        regular: number,
        good: number,
        great: number,
    }
    
    export interface numberOfServices extends avarage {
        total: number,
    }

    export interface points {
        suggestedPoints: number //Actually, any multiple of 287.5

        actualPoints: number

        classification: |'bad'
                        |'suggested'
                        |'great'
                        |'exceptional'
    }

    export interface monthResult {
        avarage: avarage
        points: points
        numberOfServices: numberOfServices
    }

    export interface score {
        previousMonth: monthResult | null
        currentMonth: monthResult
    }
}

export default ScoreTypes