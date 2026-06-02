import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Fazza Charity Website - Global Render Crash Caught:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-white border border-slate-150 rounded-[32px] p-8 md:p-10 shadow-2xl space-y-6 text-center animate-fade-in">
            {/* Design Motif: Error Icon */}
            <div className="h-16 w-16 bg-[#F4511E]/10 rounded-full flex items-center justify-center mx-auto text-[#F4511E]">
              <AlertTriangle className="h-8 w-8" />
            </div>

            <div className="space-y-3">
              <span className="text-[#F4511E] bg-[#F4511E]/15 border border-[#F4511E]/25 text-[10px] px-3.5 py-1 uppercase font-mono rounded-full font-black tracking-widest">
                System Safeguard Active
              </span>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-tight uppercase">
                A Graceful Recovery
              </h1>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                The Prince Fazza Charity portal encountered an unexpected loading problem. Our self-healing systems isolated the state to protect your session integrity.
              </p>
            </div>

            {/* Error Message Drawer */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left">
              <span className="block text-[9px] font-mono text-slate-400 uppercase font-black tracking-wider">
                Diagnostics Code
              </span>
              <code className="block text-[11px] font-mono text-slate-600 mt-1 font-semibold leading-normal break-all">
                {this.state.error?.message || "Render exception isolated."}
              </code>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 bg-[#F4511E] hover:bg-[#D84315] text-white py-3 px-4 rounded-full text-xs font-black uppercase tracking-widest transition flex items-center justify-center space-x-2 shadow-md cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5 text-white animate-spin-slow" />
                <span>Reload Portal</span>
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-4 rounded-full text-xs font-black uppercase tracking-widest transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Home className="h-3.5 w-3.5" />
                <span>Go to Home</span>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[10px] text-zinc-400 font-mono font-bold tracking-wide uppercase">
              Prince Fazza Charity Foundation
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
