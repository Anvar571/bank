import { Worker } from 'worker_threads';
import path from 'path';
import { LogContext } from './logging.strategy';

export class BaseLogWorker {
  private worker: Worker;
  private isReady: boolean = false;

  constructor(workerPath: string) {
    this.worker = new Worker(path.resolve(__dirname, workerPath));

    this.worker.on('message', (message) => {
      if (message === 'ready') {
        this.isReady = true;
      }
    });

    this.worker.on('error', (error) => {
      console.error(`Worker error: ${error.message}`);
    });
  }

  public async log(context: LogContext): Promise<void> {
    if (!this.isReady) {
      await this.waitForReady();
    }
    this.worker.postMessage(context);
  }

  private waitForReady(): Promise<void> {
    return new Promise((resolve) => {
      const check = () => {
        if (this.isReady) {
          resolve();
        } else {
          setTimeout(check, 100);
        }
      };
      check();
    });
  }

  public async terminate(): Promise<void> {
    await this.worker.terminate();
  }
}
