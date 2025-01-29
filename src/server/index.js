import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import pkg from 'fs-extra';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const { readJSON, writeJSON, existsSync } = pkg;

// 获取当前文件的目录
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 数据文件路径
const DATA_FILE = join(__dirname, 'mockData.json');

// 确保数据文件存在
if (!existsSync(DATA_FILE)) {
    await writeJSON(DATA_FILE, { routes: [] });
}

// 读取mock数据
async function readMockData() {
    try {
        return await readJSON(DATA_FILE);
    } catch (error) {
        console.error('Error reading mock data:', error);
        return { routes: [] };
    }
}

// 写入mock数据
async function writeMockData(data) {
    try {
        await writeJSON(DATA_FILE, data);
        return true;
    } catch (error) {
        console.error('Error writing mock data:', error);
        return false;
    }
}

// 添加mock路由
app.post('/admin/mock', async (req, res) => {
    const { path, method, response, description } = req.body;
    const data = await readMockData();
    const id = Date.now().toString();

    data.routes.push({
        id,
        path,
        method,
        response,
        description,
        createdAt: new Date().toISOString()
    });

    if (await writeMockData(data)) {
        res.json({ success: true, id });
    } else {
        res.status(500).json({ error: 'Failed to save mock route' });
    }
});

// 获取所有mock路由
app.get('/admin/mock', async (req, res) => {
    const data = await readMockData();
    res.json(data.routes);
});

// 删除mock路由
app.delete('/admin/mock/:id', async (req, res) => {
    const { id } = req.params;
    const data = await readMockData();
    data.routes = data.routes.filter(route => route.id !== id);

    if (await writeMockData(data)) {
        res.json({ success: true });
    } else {
        res.status(500).json({ error: 'Failed to delete mock route' });
    }
});

// 更新mock路由
app.put('/admin/mock/:id', async (req, res) => {
    const { id } = req.params;
    const { path, method, response, description } = req.body;
    const data = await readMockData();
    
    const index = data.routes.findIndex(route => route.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Route not found' });
    }

    data.routes[index] = {
        ...data.routes[index],
        path,
        method,
        response,
        description,
        updatedAt: new Date().toISOString()
    };

    if (await writeMockData(data)) {
        res.json({ success: true });
    } else {
        res.status(500).json({ error: 'Failed to update mock route' });
    }
});

// 动态处理mock请求
app.use('*', async (req, res) => {
    const data = await readMockData();
    const route = data.routes.find(
        r => r.path === req.baseUrl && r.method === req.method
    );
    
    if (route) {
        setTimeout(() => {
            res.json(route.response);
        }, 100);
    } else {
        res.status(404).json({ error: 'Mock API not found' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Mock server running on http://localhost:${PORT}`);
});