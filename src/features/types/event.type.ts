export interface Event {
    id:string
  title:string
  content:string
  dateStart:Date
  dateEnd:Date
  type:EventType
  creatorId:string
  createdAt:Date
  updatedAt:Date
}

export type EventType = "RDV" | "REUNION"
  
