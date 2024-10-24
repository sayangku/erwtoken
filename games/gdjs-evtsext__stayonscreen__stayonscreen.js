
gdjs.evtsExt__StayOnScreen__StayOnScreen = gdjs.evtsExt__StayOnScreen__StayOnScreen || {};

/**
 * Behavior generated from Stay on Screen
 */
gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen = class StayOnScreen extends gdjs.RuntimeBehavior {
  constructor(instanceContainer, behaviorData, owner) {
    super(instanceContainer, behaviorData, owner);
    this._runtimeScene = instanceContainer;

    this._onceTriggers = new gdjs.OnceTriggers();
    this._behaviorData = {};
    this._sharedData = gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.getSharedData(
      instanceContainer,
      behaviorData.name
    );
    
    this._behaviorData.MarginTop = behaviorData.MarginTop !== undefined ? behaviorData.MarginTop : Number("0") || 0;
    this._behaviorData.MarginBottom = behaviorData.MarginBottom !== undefined ? behaviorData.MarginBottom : Number("0") || 0;
    this._behaviorData.MarginLeft = behaviorData.MarginLeft !== undefined ? behaviorData.MarginLeft : Number("0") || 0;
    this._behaviorData.MarginRight = behaviorData.MarginRight !== undefined ? behaviorData.MarginRight : Number("0") || 0;
  }

  // Hot-reload:
  updateFromBehaviorData(oldBehaviorData, newBehaviorData) {
    
    if (oldBehaviorData.MarginTop !== newBehaviorData.MarginTop)
      this._behaviorData.MarginTop = newBehaviorData.MarginTop;
    if (oldBehaviorData.MarginBottom !== newBehaviorData.MarginBottom)
      this._behaviorData.MarginBottom = newBehaviorData.MarginBottom;
    if (oldBehaviorData.MarginLeft !== newBehaviorData.MarginLeft)
      this._behaviorData.MarginLeft = newBehaviorData.MarginLeft;
    if (oldBehaviorData.MarginRight !== newBehaviorData.MarginRight)
      this._behaviorData.MarginRight = newBehaviorData.MarginRight;

    return true;
  }

  // Network sync:
  getNetworkSyncData() {
    return {
      ...super.getNetworkSyncData(),
      props: {
        
    MarginTop: this._behaviorData.MarginTop,
    MarginBottom: this._behaviorData.MarginBottom,
    MarginLeft: this._behaviorData.MarginLeft,
    MarginRight: this._behaviorData.MarginRight,
      }
    };
  }
  updateFromNetworkSyncData(networkSyncData) {
    super.updateFromNetworkSyncData(networkSyncData);
    
    if (networkSyncData.props.MarginTop !== undefined)
      this._behaviorData.MarginTop = networkSyncData.props.MarginTop;
    if (networkSyncData.props.MarginBottom !== undefined)
      this._behaviorData.MarginBottom = networkSyncData.props.MarginBottom;
    if (networkSyncData.props.MarginLeft !== undefined)
      this._behaviorData.MarginLeft = networkSyncData.props.MarginLeft;
    if (networkSyncData.props.MarginRight !== undefined)
      this._behaviorData.MarginRight = networkSyncData.props.MarginRight;
  }

  // Properties:
  
  _getMarginTop() {
    return this._behaviorData.MarginTop !== undefined ? this._behaviorData.MarginTop : Number("0") || 0;
  }
  _setMarginTop(newValue) {
    this._behaviorData.MarginTop = newValue;
  }
  _getMarginBottom() {
    return this._behaviorData.MarginBottom !== undefined ? this._behaviorData.MarginBottom : Number("0") || 0;
  }
  _setMarginBottom(newValue) {
    this._behaviorData.MarginBottom = newValue;
  }
  _getMarginLeft() {
    return this._behaviorData.MarginLeft !== undefined ? this._behaviorData.MarginLeft : Number("0") || 0;
  }
  _setMarginLeft(newValue) {
    this._behaviorData.MarginLeft = newValue;
  }
  _getMarginRight() {
    return this._behaviorData.MarginRight !== undefined ? this._behaviorData.MarginRight : Number("0") || 0;
  }
  _setMarginRight(newValue) {
    this._behaviorData.MarginRight = newValue;
  }
}

/**
 * Shared data generated from Stay on Screen
 */
gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.SharedData = class StayOnScreenSharedData {
  constructor(sharedData) {
    
  }
  
  // Shared properties:
  
}

gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.getSharedData = function(instanceContainer, behaviorName) {
  if (!instanceContainer._StayOnScreen_StayOnScreenSharedData) {
    const initialData = instanceContainer.getInitialSharedDataForBehavior(
      behaviorName
    );
    instanceContainer._StayOnScreen_StayOnScreenSharedData = new gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.SharedData(
      initialData
    );
  }
  return instanceContainer._StayOnScreen_StayOnScreenSharedData;
}

// Methods:
gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEventsContext = {};
gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEventsContext.GDObjectObjects1= [];
gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEventsContext.GDObjectObjects2= [];


gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEventsContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEventsContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEventsContext.GDObjectObjects1[i].setX(Math.min(Math.max((gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEventsContext.GDObjectObjects1[i].getX()), gdjs.evtTools.camera.getCameraX(runtimeScene, (gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEventsContext.GDObjectObjects1[i].getLayer()), 0) - gdjs.evtTools.camera.getCameraWidth(runtimeScene, (gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEventsContext.GDObjectObjects1[i].getLayer()), 0) / 2 + (gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getMarginLeft())), gdjs.evtTools.camera.getCameraX(runtimeScene, (gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEventsContext.GDObjectObjects1[i].getLayer()), 0) + gdjs.evtTools.camera.getCameraWidth(runtimeScene, (gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEventsContext.GDObjectObjects1[i].getLayer()), 0) / 2 - (gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEventsContext.GDObjectObjects1[i].getWidth()) - (gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getMarginRight())));
}
}{for(var i = 0, len = gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEventsContext.GDObjectObjects1[i].setY(Math.min(Math.max((gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEventsContext.GDObjectObjects1[i].getY()), gdjs.evtTools.camera.getCameraY(runtimeScene, (gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEventsContext.GDObjectObjects1[i].getLayer()), 0) - gdjs.evtTools.camera.getCameraHeight(runtimeScene, (gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEventsContext.GDObjectObjects1[i].getLayer()), 0) / 2 + (gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getMarginTop())), gdjs.evtTools.camera.getCameraY(runtimeScene, (gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEventsContext.GDObjectObjects1[i].getLayer()), 0) + gdjs.evtTools.camera.getCameraHeight(runtimeScene, (gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEventsContext.GDObjectObjects1[i].getLayer()), 0) / 2 - (gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEventsContext.GDObjectObjects1[i].getHeight()) - (gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getMarginBottom())));
}
}}

}


};

gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEvents = function(parentEventsFunctionContext) {

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
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("StayOnScreen"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("StayOnScreen"),
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

gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEventsContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEventsContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPostEventsContext.GDObjectObjects2.length = 0;


return;
}

gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen.prototype.doStepPreEvents = function() {
  this._onceTriggers.startNewFrame();
};


gdjs.registerBehavior("StayOnScreen::StayOnScreen", gdjs.evtsExt__StayOnScreen__StayOnScreen.StayOnScreen);
