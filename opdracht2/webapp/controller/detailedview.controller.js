sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
        let ID;
        return Controller.extend("opdracht2.opdracht2.controller.detailedview", {
            onInit: function () {
                this.oOwnerComponent = this.getOwnerComponent();
                this.oRouter = this.oOwnerComponent.getRouter();
                this.oRouter.attachRouteMatched(this._onRouteMatched, this);
            },
            _onroutematched: function (oEvent) {
                var oArgs;
                oArgs = oEvent.getParameter("arguments");
                var oView = this.getView();
                var oDataModel = oView.getModel("v2model");
                ID = oArgs.ID;
                var urlPath = "/studentSet(ID=" + oArgs.ID + ")";

                oView.bindElement({
                    path: urlPath,
                    model: "v2model"
                });

                this.readElement(urlPath, oDataModel).done(
                    function (oData) {
                        oDataModel.refresh(true);
                    }.bind(this)
                );
            },
            readElement: function (path, odatamodel, filter) {
                var oDeferred = jQuery.Deferred();
                odatamodel.read(path, {
                  filters: [filter],
                  success: function (oData) {
                    return oDeferred.resolve(oData);
                  }.bind(this),
                  error: function (oError) {
                    return oDeferred.reject(oError);
                  }.bind(this),
                });
                return oDeferred.promise();
              },
        });


    });
