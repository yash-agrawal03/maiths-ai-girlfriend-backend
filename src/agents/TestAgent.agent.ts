import { Agent } from '@smythos/sdk';
import path from 'path';

const agentPath = path.resolve(process.cwd(), '/home/yash/Documents/maiths-ai-gf/src/utils/maiths-ai-tech-girlfriend.smyth');

const agent = Agent.import(agentPath);

export default agent;