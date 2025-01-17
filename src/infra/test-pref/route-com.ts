import express from 'express';
import { Worker } from 'worker_threads';
import { LoggerService } from '../logging/logger.service';

export class RouteComparison {
    private logger = LoggerService.getInstance();

    // Sync route handler
    public syncHandler = (req: express.Request, res: express.Response) => {
        const startTime = Date.now();
        
        // Simulate heavy computation
        let result = 0;
        for(let i = 0; i < 1000000; i++) {
            result += i;
        }
        
        const endTime = Date.now();
        this.logger.info('Sync operation completed', {
            duration: endTime - startTime,
            type: 'sync'
        });
        
        res.json({ result, duration: endTime - startTime });
    };

    // Async route handler
    public asyncHandler = async (req: express.Request, res: express.Response) => {
        const startTime = Date.now();
    
        const worker = new Worker(`
            parentPort.on('message', () => {
                let sum = 0;
                for(let i = 0; i < 1000000; i++) {
                    sum += i;
                }
                parentPort.postMessage(sum);
            });
        `);
        
        try {
            const result = await new Promise((resolve, reject) => {
                worker.on('message', (data) => {
                    resolve(data);
                    worker.terminate(); // Worker ni to'g'ri yopish
                });
                
                worker.on('error', reject);
                worker.postMessage('start');
            });
            
            const endTime = Date.now();
            this.logger.info('Async operation completed', {
                duration: endTime - startTime,
                type: 'async'
            });
            
            res.json({ result, duration: endTime - startTime });
        } catch (error) {
            this.logger.error('Async operation failed', { error });
            res.status(500).json({ error: 'Internal server error' });
        } finally {
            worker.terminate(); // Xato yuz berganda ham worker ni yopish
        }
    };
}