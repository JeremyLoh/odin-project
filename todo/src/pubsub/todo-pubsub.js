export const TodoPubsub = (function() {
  // stores the key value mapping: event name => list of subscribers' callback functions
  const events = {}
  function publish(event, data) {
    // to loop through available callback functions for the subscribers for the event
    if (!events.hasOwnProperty(event) || !Array.isArray(events[event])) {
      return
    }
    events[event].forEach((callback) => callback(data))
  }
  function subscribe(event, fn) {
    // subscribe to an event, with a callback function that should be executed when event happens
    if (event.length === 0 || fn == undefined) {
      return
    }
    events[event] = events[event] || []
    events[event].push(fn)
  }
  return { publish, subscribe }
})()

export const TodoEvent = Object.freeze({
  ADD:    Symbol("add"),
  UPDATE: Symbol("update"),
  DELETE: Symbol("delete")
})