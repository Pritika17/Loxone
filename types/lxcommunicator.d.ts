// File: src/types/lxcommunicator.d.ts

declare module 'lxcommunicator' {
  interface LxCommunicatorOptions {
    host: string;
    username: string;
    password: string;
  }

  class LxCommunicator {
    constructor(options: LxCommunicatorOptions);
    connect(): Promise<void>;
    close(): Promise<void>;
    send(command: string): Promise<any>;
  }

  const LxCommunicatorMock: {
    new (options: LxCommunicatorOptions): LxCommunicator;
  };

  export default LxCommunicatorMock;
}