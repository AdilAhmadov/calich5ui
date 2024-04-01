const videoStreamInstanceModule = (id, elementIds) => {
    'use strict';    

    // BEGIN::CHANGEAREA - your initialization code for each instance of widget goes here  
    // console.log(`videoStream-widget videoStreamInstanceModule("${id}", [${elementIds}])`);

    // choose one of the below 
    // -- id is container element added around template content
    // -- elementIds[0] is the first element found in the template content
    // -- in shell template, elementIds[0] is usually the right choice
    // const instance = document.getElementById(id);
    const instance = document.getElementById(elementIds[0]);

    // Your code for when widget instance removed from DOM here
    const cleanup = () => {
        // console.log(`videoStream-widget videoStreamInstanceModule cleanup("${id}")`);
    };

    // Your code changing public interface to instance module here 
    return {
        id,
        elementIds,
        instance,
        cleanup
    };

    // END::CHANGEAREA  
} 

const videoStreamModule = (() => {
    'use strict';

    // BEGIN::CHANGEAREA - your initialization code for each instance of widget goes here  
   
    const widgetInstances = {};

    /**
     * Initialize Method
     */
    function onInit() {
       serviceModule.addEmulatorScenarioNoControlSystem("./app/project/components/widgets/video-stream/video-stream-emulator.json");
       // Uncomment the below line and comment the above to load the emulator all the time.
       // serviceModule.addEmulatorScenario("./app/project/components/widgets/video-stream/video-stream-emulator.json");
    }

    /**
     * private method for widget class creation
     */
    let loadedSubId = CrComLib.subscribeState('o', 'ch5-import-htmlsnippet:videoStream-import-widget', (value) => {
        if (value['loaded']) {
            onInit();
            setTimeout(() => {
                CrComLib.unsubscribeState('o', 'ch5-import-htmlsnippet:videoStream-import-page', loadedSubId);
                loadedSubId = '';
            });
        }
    });

    /**
     * private method for widget instance addition and removal
     */
    CrComLib.subscribeState('o', 'ch5-template:video-stream-widget', (value) => {
        if (value['loaded'] !== undefined && value['id'] !== undefined) {
            if (value.loaded) {
                widgetInstances[value.id] = videoStreamInstanceModule(value.id, value['elementIds']);
            }
            else {
                const removedInstance = widgetInstances[value.id];
                if (removedInstance) {
                    removedInstance.cleanup();
                    delete widgetInstances[value.id];
                }
            }
        }
    });
    /**
     * All public method and properties are exported here
     */
    return {
        widgetInstances
    };

    // END::CHANGEAREA   

})();