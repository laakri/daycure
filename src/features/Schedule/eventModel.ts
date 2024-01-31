interface Event {
    _id: string;
    user: string;
    date: Date;
    description: string;
    isImportant: boolean;
    position: any;
    type: EventType;
    
  }
  
  export enum EventType {
    birthday = "birthday",
    wedding = "wedding",
    event = "event",
   
  }
  
  export default Event;
  