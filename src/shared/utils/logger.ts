type LogLevel = "error" | "warn" | "info" | "debug";

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: string;
  error?: Error | unknown;
  timestamp: string;
}

class Logger {
  private isDevelopment = import.meta.env.MODE === "development";

  private formatTimestamp(): string {
    return new Date().toISOString();
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    context?: string,
    error?: Error | unknown
  ): LogEntry {
    return {
      level,
      message,
      context,
      error,
      timestamp: this.formatTimestamp(),
    };
  }

  private logToConsole(entry: LogEntry): void {
    if (!this.isDevelopment) return;

    const prefix = `[${entry.timestamp}] ${entry.level.toUpperCase()}`;
    const contextStr = entry.context ? ` [${entry.context}]` : "";
    const fullMessage = `${prefix}${contextStr}: ${entry.message}`;

    switch (entry.level) {
      case "error":
        console.error(fullMessage, entry.error || "");
        break;
      case "warn":
        console.warn(fullMessage, entry.error || "");
        break;
      case "info":
        console.info(fullMessage);
        break;
      case "debug":
        console.debug(fullMessage);
        break;
    }
  }

  error(message: string, error?: Error | unknown, context?: string): void {
    const entry = this.createLogEntry("error", message, context, error);
    this.logToConsole(entry);
  }

  warn(message: string, context?: string): void {
    const entry = this.createLogEntry("warn", message, context);
    this.logToConsole(entry);
  }

  info(message: string, context?: string): void {
    const entry = this.createLogEntry("info", message, context);
    this.logToConsole(entry);
  }

  debug(message: string, context?: string): void {
    const entry = this.createLogEntry("debug", message, context);
    this.logToConsole(entry);
  }
}

export const logger = new Logger();
