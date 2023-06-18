sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("opdracht2.opdracht2.controller.StudentList", {
            onInit: function () {
                this.oOwnerComponent = this.getOwnerComponent();
                this.oRouter = this.oOwnerComponent.getRouter();
                this.oRouter.attachRouteMatched(this._onRouteMatched, this);
            },
            HandleAddStudent: function () {
                console.log('in handleadd' )
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                console.log('na router aanmaken' )
                oRouter.navTo("addStudent",{});
                console.log('na nav' )

            },
            _onroutematched: function (oEvent) {
            }
        });


    });
