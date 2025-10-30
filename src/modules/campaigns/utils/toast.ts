interface ToastOptions {
  duration?: number;
  position?: "top" | "bottom" | "center";
}

class ToastManager {
  private container: HTMLElement | null = null;

  private createContainer() {
    if (!this.container) {
      this.container = document.createElement("div");
      this.container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        gap: 8px;
        pointer-events: none;
      `;
      document.body.appendChild(this.container);
    }
    return this.container;
  }

  private showToast(
    message: string,
    type: "success" | "error" | "info",
    options: ToastOptions = {}
  ) {
    const container = this.createContainer();
    const toast = document.createElement("div");

    const backgroundColor = {
      success: "#4caf50",
      error: "#f44336",
      info: "#2196f3",
    }[type];

    toast.style.cssText = `
      background: ${backgroundColor};
      color: white;
      padding: 12px 16px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      font-weight: 500;
      max-width: 300px;
      pointer-events: auto;
      animation: slideIn 0.3s ease-out;
    `;

    toast.textContent = message;
    container.appendChild(toast);

    if (!document.querySelector("#toast-styles")) {
      const style = document.createElement("style");
      style.id = "toast-styles";
      style.textContent = `
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    const duration = options.duration || 3000;
    setTimeout(() => {
      toast.style.animation = "slideOut 0.3s ease-out forwards";
      setTimeout(() => {
        if (container.contains(toast)) {
          container.removeChild(toast);
        }
      }, 300);
    }, duration);
  }

  success(message: string, options?: ToastOptions) {
    this.showToast(message, "success", options);
  }

  error(message: string, options?: ToastOptions) {
    this.showToast(message, "error", options);
  }

  info(message: string, options?: ToastOptions) {
    this.showToast(message, "info", options);
  }
}

export const toast = new ToastManager();
