sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, JSONModel) {
        "use strict";
        let ID;
        return Controller.extend("opdracht2.opdracht2.controller.addgameview", {
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
                var oArgs;
                console.log('arg');
                oArgs = oEvent.getParameter("arguments");
                ID = oArgs.id;
               
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
              addgame: function(oEvent){
                var oView = this.getView();
                var oDataModel = oView.getModel();
                var oSource = oEvent.getSource();
                let gameID = oSource.getBindingContext().getProperty("Id")
        
                var oFavogame = {
                  Studentid: ID,
                  Gameid: gameID,
                };
                console.log(oFavogame);
                oDataModel.create("/favogameSet", oFavogame, {
                  success: function (data, response) {
                    MessageBox.success("Game is added to the favorites");
                  },
                  error: function (error) {
                    MessageBox.error("failed to add");
                  },
                });        
                
              }
        });


    });
