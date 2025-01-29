import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, resolve as confirmpath } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

class DevServer {
  constructor() {
    this.serverProcess = null;
    this.viteProcess = null;
  }

  async startServer() {
    return new Promise((resolve, reject) => {
      console.log("Starting mock server...");

      const serverPath = confirmpath(__dirname, "../server/index.js");
      console.log(serverPath);
      this.serverProcess = spawn("node", [serverPath], {
        stdio: "inherit",
      });

      this.serverProcess.on("error", (err) => {
        console.error("Failed to start mock server:", err);
        reject(err);
      });

      // 等待服务器启动
      setTimeout(() => {
        console.log("Mock server started");
        resolve();
      }, 1500); // 给予足够的启动时间
    });
  }

  async startVite() {
    return new Promise((resolve, reject) => {
      console.log("Starting Vite dev server...");

      this.viteProcess = spawn("vite", [], {
        stdio: "inherit",
        shell: true,
      });

      this.viteProcess.on("error", (err) => {
        console.error("Failed to start Vite:", err);
        reject(err);
      });

      // Vite 启动通常比较快
      setTimeout(resolve, 500);
    });
  }

  async stopAll() {
    console.log("\nStopping all servers...");

    const cleanup = () => {
      // 使用 SIGTERM 信号来终止进程
      if (this.serverProcess) {
        this.serverProcess.kill("SIGTERM");
        console.log("Mock server stopped");
      }

      if (this.viteProcess) {
        this.viteProcess.kill("SIGTERM");
        console.log("Vite server stopped");
      }

      // 确保完全退出
      setTimeout(() => {
        process.exit(0);
      }, 500);
    };

    // 尝试优雅地清理
    try {
      cleanup();
    } catch (error) {
      console.error("Error during cleanup:", error);
      process.exit(1);
    }
  }

  setupSignalHandlers() {
    // 处理各种终止信号
    const signals = ["SIGINT", "SIGTERM", "SIGQUIT"];
    signals.forEach((signal) => {
      process.on(signal, async () => {
        console.log(`\nReceived ${signal} signal`);
        await this.stopAll();
      });
    });

    // 处理未捕获的异常
    process.on("uncaughtException", async (error) => {
      console.error("Uncaught Exception:", error);
      await this.stopAll();
    });

    process.on("unhandledRejection", async (reason, promise) => {
      console.error("Unhandled Rejection at:", promise, "reason:", reason);
      await this.stopAll();
    });
  }

  async start() {
    try {
      // 设置信号处理器
      this.setupSignalHandlers();

      // 启动服务器
      await this.startServer();

      // 启动 Vite
      await this.startVite();

      console.log("\nDevelopment environment is ready!");
      console.log("• Mock Server: http://localhost:3000");
      console.log("• Vite Dev Server: http://localhost:5173\n");
    } catch (error) {
      console.error("Error during startup:", error);
      await this.stopAll();
    }
  }
}

// 运行开发服务器
const devServer = new DevServer();
devServer.start().catch(console.error);
