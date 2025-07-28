# @ehsaneha/react-slot

A lightweight and flexible React `<Slot>` component that merges props and forwards refs to a single child element — inspired by [Radix UI’s Slot](https://www.radix-ui.com/docs/primitives/utilities/slot).

---

## 📦 Installation

```bash
npm install @ehsaneha/react-slot
```

Or

```bash
yarn add @ehsaneha/react-slot
```

---

## 🚀 Usage

```tsx
import Slot from "@ehsaneha/react-slot";

<Slot className="bg-blue-500 p-2" onClick={() => console.log("Parent click")}>
  <button onClick={() => console.log("Child click")}>Click me</button>
</Slot>;
```

✅ What happens:

- Both `onClick` handlers are triggered
- `className` and `style` props are merged
- The `ref` is forwarded to the child element

---

## ✨ Features

- 🔁 Merges `className`, `style`, and event handlers
- 🎯 Forwards `ref` to child DOM or `forwardRef` component
- 🚫 Rejects `React.Fragment` and multiple children (with dev warning)
- 🪶 Tiny, dependency-free, and tree-shakable

---

## 🧪 Running Tests

```bash
npm run test
```

Covers:

- Prop and style merging
- Ref forwarding
- Invalid child handling
- Event handler composition

---

## 🛑 Limitations

- Only accepts one valid React element as a child.
- Ignores and warns about fragments or multiple children.

---

## License

This package is licensed under the MIT License. See LICENSE for more information.

---

Feel free to modify or contribute to this package!
