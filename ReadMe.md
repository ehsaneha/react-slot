# useThrottle Hook

A lightweight and reusable React hook for throttling function calls in React apps. It ensures a function is invoked at most once in a specified delay period — perfect for optimizing performance in scroll, resize, or rapid input events.

---

## 🚀 Installation

```bash
npm install @ehsaneha/react-throttle
```

or

```bash
yarn add @ehsaneha/react-throttle
```

---

## 🔧 Usage

```tsx
import React, { useState } from "react";
import { useThrottle } from "@ehsaneha/react-throttle";

const ScrollLogger = () => {
  const throttledLog = useThrottle((val: string) => {
    console.log("Throttled value:", val);
  }, 1000); // Run once every 1000ms

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    throttledLog(e.currentTarget.scrollTop.toString());
  };

  return (
    <div onScroll={handleScroll} style={{ overflowY: "scroll", height: 200 }}>
      ...
    </div>
  );
};
```

---

## 🧠 Hook Signature

```ts
function useThrottle<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T;
```

### Parameters:

- `callback`: The function you want to throttle.
- `delay`: The minimum time interval (in ms) between function calls.

### Returns:

- A throttled version of your function.

---

## ✅ Features

- Type-safe and framework-agnostic
- Debounce alternative for scroll/input/resize
- Cleans up timers on unmount
- Compatible with React 18 and 19

---

## 🧪 Testing

Tested with `@testing-library/react` and `jest`. Includes:

- Immediate call on first trigger
- Throttled execution for rapid triggers
- Proper cleanup on component unmount

---

## ✨ Author

Made with ❤️ by [ehsaneha](https://github.com/ehsaneha)

---

## License

This package is licensed under the MIT License. See LICENSE for more information.

---

Feel free to modify or contribute to this package!
