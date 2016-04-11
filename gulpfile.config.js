'use strict';

var GulpConfig = (function () {
    function GulpConfig() {
        this.webappSrc = './webapp';
        this.serverSrc = './service';

        this.serverStartScript = '/app.js';

        this.typescript = this.webappSrc + '/app/*.ts';
        this.staticContent = this.webappSrc +'/content/**';
        this.webappHtml = this.webappSrc + '/index.html';
        this.webappRootFiles = [
            this.webappSrc + '/config*.json'
        ];
        this.webappRequiredModules = [
            'node_modules/es6-shim/**/*',
            'node_modules/angular2/**/*',
            'node_modules/systemjs/**/*',
            'node_modules/ng2-bootstrap/**/*',
            'node_modules/ng2-bs3-modal/**/*',
            'node_modules/rxjs/**/*'
        ];


        this.dest = './build';
        this.webappDest = this.dest;
    }

    return GulpConfig;
})();


module.exports = GulpConfig;