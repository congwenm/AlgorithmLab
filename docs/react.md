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

