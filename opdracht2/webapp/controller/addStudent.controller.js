sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageBox) {
        "use strict";

        return Controller.extend("opdracht2.opdracht2.controller.addStudent", {
            onInit: function () {
                                        
        this.oOwnerComponent = this.getOwnerComponent();
        this.oRouter = this.oOwnerComponent.getRouter();
        this.oRouter.attachRouteMatched(this._onRouteMatched, this);

            },
            HandleSave: function(){
                var oForm = this.getView().getModel("form").getData();
                console.log("oForm", oForm);
                var odatamodel = this.getView().getModel("v2model");
        
                odatamodel.create("/studentSet", oForm, {
                  success: function (data, response) {
                    MessageBox.success("Data was created successfully");
                  },
                  error: function (error) {
                    MessageBox.error("Error while creating the data");
                  },
                });
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("StudentList", {
              });


            },
            _onroutematched: function (oEvent) {
                var oArgs;
        
                oArgs = oEvent.getParameter("arguments");
                console.log(oArgs)
                ID = oArgs.ID;
                console.log(ID);
                var oStudent = {
                  Forename: "",
                  Lastname: "",
                  Class: ""
                };
                var oModel = new JSONModel(oStudent);
                this.getView().setModel(oModel, "form");
              }
        });

        
    });