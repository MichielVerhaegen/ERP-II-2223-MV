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
                console.log('in init');
                this.oOwnerComponent = this.getOwnerComponent();
                console.log('router');
                this.oRouter = this.oOwnerComponent.getRouter();
                console.log('routematched');
                this.oRouter.attachRouteMatched(this._onRouteMatched, this);
                console.log('na rout matched');
              },
              
              _onRouteMatched: function (oEvent) {
                console.log('in route matched');
                var oArgs;
                console.log('arg');
                oArgs = oEvent.getParameter("arguments");
                console.log('view');
                var oView = this.getView();
                console.log('getmodel');
                var oDataModel = oView.getModel();
                ID = oArgs.id;
                console.log('urlpath');
                var urlPath = "/studentsSet(Id=guid'" + ID + "')";
                console.log(urlPath);
                console.log('bind')
               oView.bindElement({
                path: urlPath
               });
               this.byId("idgamestable").bindElement("/favogameSet");
                console.log('nabind')

                this.readElement(urlPath, oDataModel).done(
                    function (oData) {
                        console.log('odata');
                        console.log(oData);
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
