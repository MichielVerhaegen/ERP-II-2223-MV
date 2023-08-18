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
            _onRouteMatched: function (oEvent) {
                console.log('in route matched');
                console.log('view');
                var oView = this.getView();
                console.log('getmodel');
                var oDataModel = oView.getModel();
                console.log('urlpath');
                var urlPath = "/studentsSet";
                console.log(urlPath);
                console.log('bind')
                oView.bindElement({
                    path: urlPath,
                    model:'v2model'
                });
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
            handlepresslistitem: function(oEvent){
                var oSource = oEvent.getSource();
                console.log(oSource)
                let ID = oSource.getBindingContext().getProperty("Id")
                console.log(ID)
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

                console.log('na router aanmaken' );                
                console.log(ID);
                
                oRouter.navTo("detailedview",{id:ID});
            }
        });


    });
