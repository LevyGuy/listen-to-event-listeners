'use strict'

const event_listener_label = 'eventlisteneradded'
const native_event_listener =  EventTarget.prototype.addEventListener

let dispatch_event_listener_added = (type, target) =>
{
    let evt = new Event(event_listener_label)
    evt.base = {
        type: type,
        target: target
    }
    window.dispatchEvent(evt)
}

EventTarget.prototype.addEventListener = (function()
{
    return function(type)
    {
        dispatch_event_listener_added(type, this)
        native_event_listener.apply(this, arguments)
        return true
    }
}())
