export const ProjectPubSub = (function() {
  const events = {}
  function publish(event, data) {
    // find available callback functions for event, and pass data
    if (!events.hasOwnProperty(event) || !Array.isArray(events[event])) {
      return
    }
    events[event].forEach((callback) => callback(data))
  }
  function subscribe(event, fn) {
    // subscribe to event, store the callback function given
    if (event == undefined || fn == undefined) {
      return
    }
    events[event] = events[event] || []
    events[event].push(fn)
  }
  return { publish, subscribe }
})()

export const ProjectEvent = Object.freeze({
  ADD: Symbol("add"),
  DELETE: Symbol("delete"),
})