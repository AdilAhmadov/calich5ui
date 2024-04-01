const mainpageModule = (() => {
    'use strict';

    

    function onInit() {
       serviceModule.addEmulatorScenarioNoControlSystem("./app/project/components/pages/mainpage/mainpage-emulator.json");
       // Uncomment the below line and comment the above to load the emulator all the time.
       // serviceModule.addEmulatorScenario("./app/project/components/pages/mainpage/mainpage-emulator.json");       
    }

    /**
     * private method for page class initialization
     */
    let loadedSubId = CrComLib.subscribeState('o', 'ch5-import-htmlsnippet:mainpage-import-page', (value) => {
        if (value['loaded']) {
            onInit();
            setTimeout(() => {
                CrComLib.unsubscribeState('o', 'ch5-import-htmlsnippet:mainpage-import-page', loadedSubId);
                loadedSubId = '';
            });
        }
    }); 

    /**
     * All public method and properties are exported here
     */
    return {
        
    };

    // END::CHANGEAREA

})();