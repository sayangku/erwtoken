
gdjs.evtsExt__MultitouchJoystick__MultitouchButton = gdjs.evtsExt__MultitouchJoystick__MultitouchButton || {};

/**
 * Behavior generated from Multitouch button
 */
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton = class MultitouchButton extends gdjs.RuntimeBehavior {
  constructor(instanceContainer, behaviorData, owner) {
    super(instanceContainer, behaviorData, owner);
    this._runtimeScene = instanceContainer;

    this._onceTriggers = new gdjs.OnceTriggers();
    this._behaviorData = {};
    this._sharedData = gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.getSharedData(
      instanceContainer,
      behaviorData.name
    );
    
    this._behaviorData.ControllerIdentifier = behaviorData.ControllerIdentifier !== undefined ? behaviorData.ControllerIdentifier : Number("1") || 0;
    this._behaviorData.ButtonIdentifier = behaviorData.ButtonIdentifier !== undefined ? behaviorData.ButtonIdentifier : "A";
    this._behaviorData.IsPressed = false;
    this._behaviorData.TouchID = Number("0") || 0;
    this._behaviorData.TouchDistance = Number("0") || 0;
    this._behaviorData.TouchCounter = Number("") || 0;
    this._behaviorData.IsReleased = false;
  }

  // Hot-reload:
  updateFromBehaviorData(oldBehaviorData, newBehaviorData) {
    
    if (oldBehaviorData.ControllerIdentifier !== newBehaviorData.ControllerIdentifier)
      this._behaviorData.ControllerIdentifier = newBehaviorData.ControllerIdentifier;
    if (oldBehaviorData.ButtonIdentifier !== newBehaviorData.ButtonIdentifier)
      this._behaviorData.ButtonIdentifier = newBehaviorData.ButtonIdentifier;
    if (oldBehaviorData.IsPressed !== newBehaviorData.IsPressed)
      this._behaviorData.IsPressed = newBehaviorData.IsPressed;
    if (oldBehaviorData.TouchID !== newBehaviorData.TouchID)
      this._behaviorData.TouchID = newBehaviorData.TouchID;
    if (oldBehaviorData.TouchDistance !== newBehaviorData.TouchDistance)
      this._behaviorData.TouchDistance = newBehaviorData.TouchDistance;
    if (oldBehaviorData.TouchCounter !== newBehaviorData.TouchCounter)
      this._behaviorData.TouchCounter = newBehaviorData.TouchCounter;
    if (oldBehaviorData.IsReleased !== newBehaviorData.IsReleased)
      this._behaviorData.IsReleased = newBehaviorData.IsReleased;

    return true;
  }

  // Network sync:
  getNetworkSyncData() {
    return {
      ...super.getNetworkSyncData(),
      props: {
        
    ControllerIdentifier: this._behaviorData.ControllerIdentifier,
    ButtonIdentifier: this._behaviorData.ButtonIdentifier,
    IsPressed: this._behaviorData.IsPressed,
    TouchID: this._behaviorData.TouchID,
    TouchDistance: this._behaviorData.TouchDistance,
    TouchCounter: this._behaviorData.TouchCounter,
    IsReleased: this._behaviorData.IsReleased,
      }
    };
  }
  updateFromNetworkSyncData(networkSyncData) {
    super.updateFromNetworkSyncData(networkSyncData);
    
    if (networkSyncData.props.ControllerIdentifier !== undefined)
      this._behaviorData.ControllerIdentifier = networkSyncData.props.ControllerIdentifier;
    if (networkSyncData.props.ButtonIdentifier !== undefined)
      this._behaviorData.ButtonIdentifier = networkSyncData.props.ButtonIdentifier;
    if (networkSyncData.props.IsPressed !== undefined)
      this._behaviorData.IsPressed = networkSyncData.props.IsPressed;
    if (networkSyncData.props.TouchID !== undefined)
      this._behaviorData.TouchID = networkSyncData.props.TouchID;
    if (networkSyncData.props.TouchDistance !== undefined)
      this._behaviorData.TouchDistance = networkSyncData.props.TouchDistance;
    if (networkSyncData.props.TouchCounter !== undefined)
      this._behaviorData.TouchCounter = networkSyncData.props.TouchCounter;
    if (networkSyncData.props.IsReleased !== undefined)
      this._behaviorData.IsReleased = networkSyncData.props.IsReleased;
  }

  // Properties:
  
  _getControllerIdentifier() {
    return this._behaviorData.ControllerIdentifier !== undefined ? this._behaviorData.ControllerIdentifier : Number("1") || 0;
  }
  _setControllerIdentifier(newValue) {
    this._behaviorData.ControllerIdentifier = newValue;
  }
  _getButtonIdentifier() {
    return this._behaviorData.ButtonIdentifier !== undefined ? this._behaviorData.ButtonIdentifier : "A";
  }
  _setButtonIdentifier(newValue) {
    this._behaviorData.ButtonIdentifier = newValue;
  }
  _getIsPressed() {
    return this._behaviorData.IsPressed !== undefined ? this._behaviorData.IsPressed : false;
  }
  _setIsPressed(newValue) {
    this._behaviorData.IsPressed = newValue;
  }
  _toggleIsPressed() {
    this._setIsPressed(!this._getIsPressed());
  }
  _getTouchID() {
    return this._behaviorData.TouchID !== undefined ? this._behaviorData.TouchID : Number("0") || 0;
  }
  _setTouchID(newValue) {
    this._behaviorData.TouchID = newValue;
  }
  _getTouchDistance() {
    return this._behaviorData.TouchDistance !== undefined ? this._behaviorData.TouchDistance : Number("0") || 0;
  }
  _setTouchDistance(newValue) {
    this._behaviorData.TouchDistance = newValue;
  }
  _getTouchCounter() {
    return this._behaviorData.TouchCounter !== undefined ? this._behaviorData.TouchCounter : Number("") || 0;
  }
  _setTouchCounter(newValue) {
    this._behaviorData.TouchCounter = newValue;
  }
  _getIsReleased() {
    return this._behaviorData.IsReleased !== undefined ? this._behaviorData.IsReleased : false;
  }
  _setIsReleased(newValue) {
    this._behaviorData.IsReleased = newValue;
  }
  _toggleIsReleased() {
    this._setIsReleased(!this._getIsReleased());
  }
}

/**
 * Shared data generated from Multitouch button
 */
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.SharedData = class MultitouchButtonSharedData {
  constructor(sharedData) {
    
  }
  
  // Shared properties:
  
}

gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.getSharedData = function(instanceContainer, behaviorName) {
  if (!instanceContainer._MultitouchJoystick_MultitouchButtonSharedData) {
    const initialData = instanceContainer.getInitialSharedDataForBehavior(
      behaviorName
    );
    instanceContainer._MultitouchJoystick_MultitouchButtonSharedData = new gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.SharedData(
      initialData
    );
  }
  return instanceContainer._MultitouchJoystick_MultitouchButtonSharedData;
}

// Methods:
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext = {};
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects1= [];
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects2= [];
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects3= [];
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects4= [];
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects5= [];


gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{



}


{

gdjs.copyArray(gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects2, gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects4);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects4.length;i<l;++i) {
    if ( !(gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects4[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getIsPressed()) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects4[k] = gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects4[i];
        ++k;
    }
}
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects4.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects4.length;i<l;++i) {
    if ( gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects4[i].isCollidingWithPoint(gdjs.evtTools.input.getTouchX(runtimeScene, gdjs.evtTools.input.getStartedTouchIdentifier(runtimeScene, (gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects4[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getTouchCounter())), (gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects4[i].getLayer()), 0), gdjs.evtTools.input.getTouchY(runtimeScene, gdjs.evtTools.input.getStartedTouchIdentifier(runtimeScene, (gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects4[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getTouchCounter())), (gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects4[i].getLayer()), 0)) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects4[k] = gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects4[i];
        ++k;
    }
}
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects4.length = k;
}
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects4 */
{for(var i = 0, len = gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects4.length ;i < len;++i) {
    gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects4[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setTouchID(gdjs.evtTools.input.getStartedTouchIdentifier(runtimeScene, (gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects4[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getTouchCounter())));
}
}{for(var i = 0, len = gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects4.length ;i < len;++i) {
    gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects4[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setIsPressed(true);
}
}{for(var i = 0, len = gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects4.length ;i < len;++i) {
    gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects4[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).SetButtonState("Pressed", (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects2, gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects4);

{for(var i = 0, len = gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects4.length ;i < len;++i) {
    gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects4[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setTouchCounter(gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects4[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getTouchCounter() + (1));
}
}}

}


};gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{


const repeatCount3 = gdjs.evtTools.input.getStartedTouchCount(runtimeScene);
for (let repeatIndex3 = 0;repeatIndex3 < repeatCount3;++repeatIndex3) {

let isConditionTrue_0 = false;
if (true)
{

{ //Subevents: 
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.eventsList0(runtimeScene, eventsFunctionContext);} //Subevents end.
}
}

}


};gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.eventsList2 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.hasAnyTouchStarted(runtimeScene);
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects2);
{for(var i = 0, len = gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects2.length ;i < len;++i) {
    gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setTouchCounter(0);
}
}
{ //Subevents
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.eventsList1(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.eventsList3 = function(runtimeScene, eventsFunctionContext) {

{



}


{


let isConditionTrue_0 = false;
{
/* Reuse gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).SetButtonState("Released", (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setIsPressed(false);
}
}{for(var i = 0, len = gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setIsReleased(true);
}
}{for(var i = 0, len = gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setTouchID(0);
}
}}

}


};gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.eventsList4 = function(runtimeScene, eventsFunctionContext) {

{



}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects2.length;i<l;++i) {
    if ( gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).IsReleased((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects2[k] = gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects2[i];
        ++k;
    }
}
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects2.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects2 */
{for(var i = 0, len = gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects2.length ;i < len;++i) {
    gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setIsReleased(false);
}
}{for(var i = 0, len = gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects2.length ;i < len;++i) {
    gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).SetButtonState("Idle", (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.hasTouchEnded(runtimeScene, (( gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getTouchID()));
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getIsPressed() ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects1[k] = gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects1.length = k;
}
if (isConditionTrue_0) {

{ //Subevents
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.eventsList3(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.eventsList5 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.eventsList2(runtimeScene, eventsFunctionContext);
}


{


gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.eventsList4(runtimeScene, eventsFunctionContext);
}


};gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.eventsList6 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.eventsList5(runtimeScene, eventsFunctionContext);
}


};

gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEvents = function(parentEventsFunctionContext) {
this._onceTriggers.startNewFrame();
var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("MultitouchJoystick"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("MultitouchJoystick"),
  localVariables: [],
  getObjects: function(objectName) {
    return eventsFunctionContext._objectArraysMap[objectName] || [];
  },
  getObjectsLists: function(objectName) {
    return eventsFunctionContext._objectsMap[objectName] || null;
  },
  getBehaviorName: function(behaviorName) {
    return eventsFunctionContext._behaviorNamesMap[behaviorName] || behaviorName;
  },
  createObject: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    if (objectsList) {
      const object = parentEventsFunctionContext ?
        parentEventsFunctionContext.createObject(objectsList.firstKey()) :
        runtimeScene.createObject(objectsList.firstKey());
      if (object) {
        objectsList.get(objectsList.firstKey()).push(object);
        eventsFunctionContext._objectArraysMap[objectName].push(object);
      }
      return object;    }
    return null;
  },
  getInstancesCountOnScene: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    let count = 0;
    if (objectsList) {
      for(const objectName in objectsList.items)
        count += parentEventsFunctionContext ?
parentEventsFunctionContext.getInstancesCountOnScene(objectName) :
        runtimeScene.getInstancesCountOnScene(objectName);
    }
    return count;
  },
  getLayer: function(layerName) {
    return runtimeScene.getLayer(layerName);
  },
  getArgument: function(argName) {
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects3.length = 0;
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects4.length = 0;
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects5.length = 0;

gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.eventsList6(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects3.length = 0;
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects4.length = 0;
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.doStepPreEventsContext.GDObjectObjects5.length = 0;


return;
}
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsReleasedContext = {};
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsReleasedContext.GDObjectObjects1= [];
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsReleasedContext.GDObjectObjects2= [];


gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsReleasedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsReleasedContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsReleasedContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsReleasedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getIsReleased() ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsReleasedContext.GDObjectObjects1[k] = gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsReleasedContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsReleasedContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = true; }}}

}


};

gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsReleased = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("MultitouchJoystick"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("MultitouchJoystick"),
  localVariables: [],
  getObjects: function(objectName) {
    return eventsFunctionContext._objectArraysMap[objectName] || [];
  },
  getObjectsLists: function(objectName) {
    return eventsFunctionContext._objectsMap[objectName] || null;
  },
  getBehaviorName: function(behaviorName) {
    return eventsFunctionContext._behaviorNamesMap[behaviorName] || behaviorName;
  },
  createObject: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    if (objectsList) {
      const object = parentEventsFunctionContext ?
        parentEventsFunctionContext.createObject(objectsList.firstKey()) :
        runtimeScene.createObject(objectsList.firstKey());
      if (object) {
        objectsList.get(objectsList.firstKey()).push(object);
        eventsFunctionContext._objectArraysMap[objectName].push(object);
      }
      return object;    }
    return null;
  },
  getInstancesCountOnScene: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    let count = 0;
    if (objectsList) {
      for(const objectName in objectsList.items)
        count += parentEventsFunctionContext ?
parentEventsFunctionContext.getInstancesCountOnScene(objectName) :
        runtimeScene.getInstancesCountOnScene(objectName);
    }
    return count;
  },
  getLayer: function(layerName) {
    return runtimeScene.getLayer(layerName);
  },
  getArgument: function(argName) {
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsReleasedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsReleasedContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsReleasedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsReleasedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsReleasedContext.GDObjectObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsPressedContext = {};
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsPressedContext.GDObjectObjects1= [];
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsPressedContext.GDObjectObjects2= [];


gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsPressedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsPressedContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsPressedContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsPressedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getIsPressed() ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsPressedContext.GDObjectObjects1[k] = gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsPressedContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsPressedContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = true; }}}

}


};

gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsPressed = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("MultitouchJoystick"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("MultitouchJoystick"),
  localVariables: [],
  getObjects: function(objectName) {
    return eventsFunctionContext._objectArraysMap[objectName] || [];
  },
  getObjectsLists: function(objectName) {
    return eventsFunctionContext._objectsMap[objectName] || null;
  },
  getBehaviorName: function(behaviorName) {
    return eventsFunctionContext._behaviorNamesMap[behaviorName] || behaviorName;
  },
  createObject: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    if (objectsList) {
      const object = parentEventsFunctionContext ?
        parentEventsFunctionContext.createObject(objectsList.firstKey()) :
        runtimeScene.createObject(objectsList.firstKey());
      if (object) {
        objectsList.get(objectsList.firstKey()).push(object);
        eventsFunctionContext._objectArraysMap[objectName].push(object);
      }
      return object;    }
    return null;
  },
  getInstancesCountOnScene: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    let count = 0;
    if (objectsList) {
      for(const objectName in objectsList.items)
        count += parentEventsFunctionContext ?
parentEventsFunctionContext.getInstancesCountOnScene(objectName) :
        runtimeScene.getInstancesCountOnScene(objectName);
    }
    return count;
  },
  getLayer: function(layerName) {
    return runtimeScene.getLayer(layerName);
  },
  getArgument: function(argName) {
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsPressedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsPressedContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsPressedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsPressedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.IsPressedContext.GDObjectObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetPressedContext = {};
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetPressedContext.GDObjectObjects1= [];
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetPressedContext.GDObjectObjects2= [];


gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetPressedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{



}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (typeof eventsFunctionContext !== 'undefined' ? !!eventsFunctionContext.getArgument("Value") : false);
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetPressedContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetPressedContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetPressedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setIsPressed(true);
}
}}

}


{



}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetPressedContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = !(typeof eventsFunctionContext !== 'undefined' ? !!eventsFunctionContext.getArgument("Value") : false);
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetPressedContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetPressedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getIsPressed() ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetPressedContext.GDObjectObjects1[k] = gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetPressedContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetPressedContext.GDObjectObjects1.length = k;
}
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetPressedContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetPressedContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetPressedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setIsPressed(false);
}
}{for(var i = 0, len = gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetPressedContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetPressedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setIsReleased(true);
}
}}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetPressedContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetPressedContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetPressedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).SetButtonState("Pressed", (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}}

}


};

gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetPressed = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("MultitouchJoystick"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("MultitouchJoystick"),
  localVariables: [],
  getObjects: function(objectName) {
    return eventsFunctionContext._objectArraysMap[objectName] || [];
  },
  getObjectsLists: function(objectName) {
    return eventsFunctionContext._objectsMap[objectName] || null;
  },
  getBehaviorName: function(behaviorName) {
    return eventsFunctionContext._behaviorNamesMap[behaviorName] || behaviorName;
  },
  createObject: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    if (objectsList) {
      const object = parentEventsFunctionContext ?
        parentEventsFunctionContext.createObject(objectsList.firstKey()) :
        runtimeScene.createObject(objectsList.firstKey());
      if (object) {
        objectsList.get(objectsList.firstKey()).push(object);
        eventsFunctionContext._objectArraysMap[objectName].push(object);
      }
      return object;    }
    return null;
  },
  getInstancesCountOnScene: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    let count = 0;
    if (objectsList) {
      for(const objectName in objectsList.items)
        count += parentEventsFunctionContext ?
parentEventsFunctionContext.getInstancesCountOnScene(objectName) :
        runtimeScene.getInstancesCountOnScene(objectName);
    }
    return count;
  },
  getLayer: function(layerName) {
    return runtimeScene.getLayer(layerName);
  },
  getArgument: function(argName) {
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetPressedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetPressedContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetPressedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetPressedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetPressedContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetButtonStateContext = {};
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetButtonStateContext.GDObjectObjects1= [];
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetButtonStateContext.GDObjectObjects2= [];


gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetButtonStateContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetButtonStateContext.GDObjectObjects1);
{gdjs.evtsExt__MultitouchJoystick__SetButtonState.func(runtimeScene, (( gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetButtonStateContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetButtonStateContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getControllerIdentifier()), (( gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetButtonStateContext.GDObjectObjects1.length === 0 ) ? "" :gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetButtonStateContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getButtonIdentifier()), (typeof eventsFunctionContext !== 'undefined' ? "" + eventsFunctionContext.getArgument("ButtonState") : ""), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}}

}


};

gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetButtonState = function(ButtonState, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("MultitouchJoystick"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("MultitouchJoystick"),
  localVariables: [],
  getObjects: function(objectName) {
    return eventsFunctionContext._objectArraysMap[objectName] || [];
  },
  getObjectsLists: function(objectName) {
    return eventsFunctionContext._objectsMap[objectName] || null;
  },
  getBehaviorName: function(behaviorName) {
    return eventsFunctionContext._behaviorNamesMap[behaviorName] || behaviorName;
  },
  createObject: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    if (objectsList) {
      const object = parentEventsFunctionContext ?
        parentEventsFunctionContext.createObject(objectsList.firstKey()) :
        runtimeScene.createObject(objectsList.firstKey());
      if (object) {
        objectsList.get(objectsList.firstKey()).push(object);
        eventsFunctionContext._objectArraysMap[objectName].push(object);
      }
      return object;    }
    return null;
  },
  getInstancesCountOnScene: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    let count = 0;
    if (objectsList) {
      for(const objectName in objectsList.items)
        count += parentEventsFunctionContext ?
parentEventsFunctionContext.getInstancesCountOnScene(objectName) :
        runtimeScene.getInstancesCountOnScene(objectName);
    }
    return count;
  },
  getLayer: function(layerName) {
    return runtimeScene.getLayer(layerName);
  },
  getArgument: function(argName) {
if (argName === "ButtonState") return ButtonState;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetButtonStateContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetButtonStateContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetButtonStateContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetButtonStateContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton.prototype.SetButtonStateContext.GDObjectObjects2.length = 0;


return;
}


gdjs.registerBehavior("MultitouchJoystick::MultitouchButton", gdjs.evtsExt__MultitouchJoystick__MultitouchButton.MultitouchButton);
