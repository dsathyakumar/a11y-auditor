/* globals window */
'use strict';

//> double invoke this file to hook it to the window.Node.prototype so that its available across Node elements
//> This function basically is used to detect events being attached to Node Type elements
//> There is no way to actually detect if any event is hooked onto any element if window.getEventListeners dont work
//> This is a fall back mechanism to detect events registered via addEventListener
//> It also removes the events when removeEventListener is called
//> This util has to be backed by native event binder checks like elem.click (or) elem.onclick
//> Further, this function is most likely to pick up events wired via jquery also
//> But for sake of safety, you may want to also use $._data(elem[0], 'events') to check for presence of events wired via jquery
module.exports = function() {
    //> is an active instance of this already running.
    var isActive = false;
    //> listener tracking datas - list of elements and list of listeners
    var _elements_  = [];
    var _listeners_ = [];

    //> register individual element an returns its corresponding listeners
    var registerElement = function(element) {
      //> prevent repeatedly re-registering the same element. Register only if element is not there previously
      if (_elements_.indexOf(element) === -1) {
          // NB : split by useCapture to make listener easier to find when removing
          //> so one [0]:{all events with useCapture=false}, [1]:{all events with useCapture=true}
          //> for every element that is being registered, build this array of eventListeners
          //> seggregated as [0]:{all events with useCapture=false}, [1]:{all events with useCapture=true}
          var eventListeners = [{/*useCapture=false*/}, {/*useCapture=true*/}];
          //> push the element into the _elements_ []
          _elements_.push(element);
          //> push the array of eventListeners corresponding to the element into _listeners_ []
          _listeners_.push(eventListeners);
      }
      //> else return the list of listeners belonging to it
      return _listeners_[_elements_.indexOf(element)];
  };

    //> this util will intercept the default event handlling mechanism of the browser
    var interceptEventListeners = function() {

        //> original methods exposed by the browser. All HTMLElement is an instanceof Node
        var _super_ = {
          addEventListener: window.HTMLElement.prototype.addEventListener,
          removeEventListener: window.HTMLElement.prototype.removeEventListener
      };

        //> this hooked function to Node type element will be called when elem.addEventListener is invoked
        //> this basically acts as a sub to the existing addEventListener of the browser which is marked super
        //> takes in the same args as the addEventListener - eventType, listener, useCapture
        window.Node.prototype.addEventListener = function(type, listener, useCapture) {
          //> first register the element so that our util can hold a reference to it
          var listeners = registerElement(this);
          //> add event before to avoid registering if an error is thrown
          _super_.addEventListener.apply(this, arguments);
          // adapt to 'eventListeners' index
          useCapture = useCapture ? 1 : 0;
          //> check if the listener is already captured for the eventType, else create a []
          if (!listeners[useCapture][type]) {
              //> create an array cos there can always be more than one listener for any eventType
              listeners[useCapture][type] = [];
          }
          //> push the listener into the array of listeners
          //> while pushing ensure the associativity of [useCapture][eventType]
          listeners[useCapture][type].push(listener);
      };

        //> this hooked function to Node type element will be called when elem.removeEventListener is invoked
        //> this basically acts as a sub to the existing removeEventListener of the browser which is marked super
        //> takes in the same args as the addEventListener - eventType, listener, useCapture
        window.Node.prototype.removeEventListener = function(type, listener, useCapture) {
          //> first register the element so that our util can hold a reference to it
          var listeners = registerElement(this);
          //> add event before to avoid registering if an error is thrown
          _super_.removeEventListener.apply(this, arguments);
          // adapt to 'eventListeners' index
          useCapture = useCapture ? 1 : 0;
          //> check if the listener is there for the given eventType
          if (!listeners[useCapture][type]) {
              return; //> if its not there, there isn't anything there to remove.
          }
          //> get the indexOf the listener for this eventType to be removed from the array of listeners for the same eventType
          var lid = listeners[useCapture][type].indexOf(listener);
          //> remove the listener from the array of array of listeners
          if (lid > -1) {
              //> only one event listener is being removed at a time - so, only 1 listener gets unsubscribed at a time
              listeners[useCapture][type].splice(lid, 1);
          }
      };

        //> as the browser doesnt expose a mechanism to collect all the event data for an element
        //> by having the above setup, it helps to manually track event related information of a given elements
        //> this exposes an elem.getEventListener('eventType') (not to be confused with FF & Chrome's getEventListeners())
        //> this returns a collection of {event: []} list of handlers
        window.Node.prototype.getEventListener = function(type) {
          //> What if getEventListener is called on this element before even adding / removing any events
          //> The element will have to be registered
          //> Register new element (or) get the listener of existing elements
          //> this is the current element as this method is hooked to Node.prototype
          var listeners = registerElement(this);
          //> convert to listener datas list
          var result = [];
          //> the for loop will execute twice (0,1) for useCapture=true, useCapture=false
          //> each iteration will have one value for useCapture - so loops twice
          /*jshint boss:true */
          for (var useCapture = 0, list; list = listeners[useCapture]; useCapture++) {
              //> type can be a string eventType or an event object
              if (typeof (type) === 'string') {// filtered by type
                  //> at any time the list holds the list of event listeners of the current elements
                  //> either with useCapture = true or useCapture=false
                  //> check if the current eventType exists, if not leave it free
                  if (list[type]) {
                      //> iterate over the list of eventListeners for the given eventType
                      for (var listElem in list[type]) {
                          //> hasOwnProperty check is to satisfy jshint
                          if (list[type].hasOwnProperty(listElem)) {
                              //> push all the listeners into the result []
                              result.push({
                                  type: type,
                                  listener: list[type][listElem],
                                  useCapture: !!useCapture
                              });
                          }
                      }
                  }
              }else {// all
                  //> for the all other types of 'type'
                  //> in a particular useCapture list, loop around the eventType in it
                  for (var _type in list) {
                      //> hasOwnProperty check is to satisfy jshint
                      if (list.hasOwnProperty(_type)) {
                          //> for each eventListeners in the current eventType
                          for (var id in list[_type]) {
                              //> hasOwnProperty check is to satisfy jshint
                              if (list[_type].hasOwnProperty(id)) {
                                  //> push all the listener into the result []
                                  result.push({
                                      type: _type,
                                      listener: list[_type][id],
                                      useCapture: !!useCapture
                                  });
                              }
                          }
                      }
                  }
              }
          }
          return result; //> return the result []
      };
    };

    //> bootstraps this module by exposing a function in return and trapping logic in a closure
    return function() {
        if (!isActive) {//> avoid duplicate call
            interceptEventListeners();
        }
        isActive = true;
    };
};
