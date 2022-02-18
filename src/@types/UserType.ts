import ScoreTypes from "./ScoreTypes"

declare namespace userType {
    export interface user {
        id: string
        name: string
        segment?: string
        employeeName?: string
        _id?:string
    }

    export interface requestUser {
        user: user,
        avaliations: avaliation[],
        history: history[]
    }
    
    export interface responseUser extends requestUser {
        score: ScoreTypes.score
    }
      
    export type avaliation = {
        feedbackRate: string,
        total: number,
        userId: string,
        __v: number,
        _id: string,
    }
    
    export type history = {
        date: string,
        feedbackRate: string,
        hour: string,
        userId: string,
        fromMonth: number,
        __v: number,
        _id: string,
    }
}

export default userType