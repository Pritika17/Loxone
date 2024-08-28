class LxCommunicatorMock {
  private lightStatus: boolean = false;

  constructor(options: { host: string; username: string; password: string }) {
    console.log('LxCommunicator mock initialized');
  }

  async connect(): Promise<void> {
    console.log('Mock connection established');
  }

  async close(): Promise<void> {
    console.log('Mock connection closed');
  }

  async send(command: string): Promise<any> {
    console.log('Received command:', command);

    if (command === 'jdev/sps/io/Light/on') {
      this.lightStatus = true;
    } else if (command === 'jdev/sps/io/Light/off') {
      this.lightStatus = false;
    }

    return {
      LL: {
        value: this.lightStatus ? '1' : '0'
      }
    };
  }
}

export default LxCommunicatorMock;