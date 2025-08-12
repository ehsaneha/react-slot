import {
  cloneElement,
  isValidElement,
  ReactElement,
  forwardRef,
  CSSProperties,
  HTMLAttributes,
  Fragment,
  Ref,
  RefObject,
} from "react";

type MergeProps<T> = {
  [K in keyof T]?: T[K];
} & {
  className?: string;
  style?: CSSProperties;
};

export interface SlotProps extends HTMLAttributes<HTMLElement> {}

function mergeProps<P>(
  slotProps: MergeProps<P>,
  childProps: MergeProps<P>
): MergeProps<P> {
  const merged: MergeProps<P> = { ...slotProps, ...childProps };

  for (const key in slotProps) {
    const isEvent =
      key.startsWith("on") && typeof (slotProps as any)[key] === "function";
    if (isEvent && typeof (childProps as any)[key] === "function") {
      (merged as any)[key] = (...args: any[]) => {
        (slotProps as any)[key]?.(...args);
        (childProps as any)[key]?.(...args);
      };
    }
  }

  merged.className = [slotProps.className, childProps.className]
    .filter(Boolean)
    .join(" ");

  merged.style = {
    ...slotProps.style,
    ...childProps.style,
  };

  return merged;
}

// Helper to merge two refs (function or object refs)
function mergeRefs<T>(
  ref1: Ref<T> | undefined,
  ref2: Ref<T> | undefined
): Ref<T> {
  return (value: T | null) => {
    if (typeof ref1 === "function") ref1(value);
    else if (ref1 && typeof ref1 === "object")
      (ref1 as RefObject<T | null>).current = value;

    if (typeof ref2 === "function") ref2(value);
    else if (ref2 && typeof ref2 === "object")
      (ref2 as RefObject<T | null>).current = value;
  };
}

const Slot = forwardRef<HTMLElement, SlotProps>(
  ({ children, ...slotProps }, forwardedRef) => {
    if (
      !isValidElement(children) ||
      children.type === Fragment ||
      Array.isArray(children)
    ) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "<Slot> expects exactly one valid React element as its child, and does not accept React.Fragment or multiple children."
        );
      }
      return null;
    }

    const child = children as ReactElement<any> & { ref?: Ref<HTMLElement> };
    const mergedProps = mergeProps(slotProps, child.props);

    // Merge the forwarded ref and child's original ref
    const combinedRef = forwardedRef; // mergeRefs(forwardedRef, child.ref);

    return cloneElement(child, {
      ...mergedProps,
      ref: combinedRef,
    });
  }
);

export default Slot;
