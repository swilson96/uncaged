'use strict';

var GulpConfig = (function () {
    function GulpConfig() {
        this.webappSrc = './webapp';
        this.adminappSrc = './adminapp';
        this.serverSrc = './service';

        this.serverStartScript = '/app.js';

        this.webappTypescript = this.webappSrc + '/app/*.ts';
        this.adminTypescript = this.adminappSrc+ '/app/*.ts';
        this.typescript = [
            this.webappTypescript,
            this.adminTypescript,
        ];
        this.webappRequiredModules = [
            'node_modules/es6-shim/**/*',
            'node_modules/angular2/**/*',
            'node_modules/systemjs/**/*',
            'node_modules/ng2-bootstrap/**/*',
            'node_modules/ng2-bs3-modal/**/*',
            'node_modules/rxjs/**/*'
        ];
    }

    return GulpConfig;
})();


module.exports = GulpConfig;