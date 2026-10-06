"use client";

import { Component, type ReactNode } from "react";

/** Kalau efek WebGL gagal (browser lama / GPU dimatikan), sembunyikan saja tanpa merusak halaman. */
export default class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
