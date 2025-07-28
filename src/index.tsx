import {
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  forwardRef,
  Ref,
  CSSProperties,
  HTMLAttributes,
  Fragment,
  RefObject,
} from "react";

type MergeProps<T> = {
  [K in keyof T]?: T[K];
} & {
  className?: string;
  style?: CSSProperties;
};

export interface SlotProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

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

const Slot = forwardRef<HTMLElement, SlotProps>(
  ({ children, ...slotProps }, ref) => {
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

    // Grab the child's existing ref to merge if any
    const child = children as ReactElement & { ref?: Ref<any> };
    const mergedProps = mergeProps(slotProps, child.props!);

    // Combine refs (child's ref + forwarded ref)
    function setRefs(node: any) {
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as RefObject<any>).current = node;

      const childRef = child.ref;
      if (typeof childRef === "function") childRef(node);
      else if (childRef && typeof childRef === "object")
        (childRef as RefObject<any>).current = node;
    }

    return cloneElement(child as ReactElement<any>, {
      ...mergedProps,
      ref: setRefs,
    });
  }
);

export default Slot;
