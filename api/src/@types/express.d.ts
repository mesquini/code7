declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }

  export interface Application {
    io: any;
  }
}
