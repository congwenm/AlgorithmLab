# Source
https://reactjs.org/docs/implementation-notes.html

# Internal Instances vs Public Instances
* public instances 
    is what you see as `this` in `render()` method.
* internal instances 
    would be an instance of `CompositeComponent` and `DOMComponent`. 
    They exist so we can associate some long-lived data with them.
    Only the renderer and the reconciler are aware that they exist.

To help visualize this, if a functional `<App>` component renders a `<Button>`
class component, and `Button` class renders a `<div>`, the internal instance
tree would look like:

```
[object CompositeComponent] {
  currentElement: <App />,
  publicInstance: null,
  renderedComponent: [object CompositeComponent] {
    currentElement: <Button />,
    publicInstance: [object Button],
    renderedComponent: [object DOMComponent] {
      currentElement: <div />,
      node: [object HTMLDivElement],
      renderedChildren: []
    }
  }
}
```

# Speculation: `host` means native, <div /> is host, vs `composite`, which is
custom

After rendering you would only see `<div>`, however the `internal instance` tree
contains both `composite` and `host` internal instances.

The `composite internal instances` need to store:
- current element
- `public instance` if element type is class
- single rendered `internal instance`. It can be either a `DOMComponent` or
    a `CompositeComponent`

The `host internal instances` need to store:
- The current element
- The DOM node.
- All the child `internal instances`. Each of them can be either
    a `DOMComponent` or a `CompositeComponent`.
