import { Component, PropsWithChildren, ReactElement } from "react";

type FallbackRender = (props: { error: Error | null }) => ReactElement;

/**
 * 错误边界
 */
// https://github.com/bvaughn/react-error-boundary
export default class ErrorBoundary extends Component<
  PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = {
    error: null,
  };

  // 当子组件抛出异常，这里会接受并跳用
  static getDerivedStateFromError(error: Error) {
    return {
      error,
    };
  }

  render() {
    const { error } = this.state;
    const { children, fallbackRender } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
