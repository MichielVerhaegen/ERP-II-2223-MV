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

    return Controller.extend("opdracht2.opdracht2.controller.addStudent", {
      onInit: function () {
        console.log('in init');
        this.oOwnerComponent = this.getOwnerComponent();
        console.log('naowner');
        this.oRouter = this.oOwnerComponent.getRouter();
        console.log('narouter');
        this.oRouter.attachRouteMatched(this._onRouteMatched, this);
        console.log('naroutematched');

      },
      HandleSave: function () {
        var oForm = this.getView().getModel("form").getData();
        console.log("oForm", oForm);
        var oView = this.getView();
        var oDataModel = oView.getModel();
        console.log(oDataModel);
        oDataModel.create("/studentSet", oForm, {
          success: function (data, response) {
            MessageBox.success("Data was created successfully");
          },
          error: function (error) {
            MessageBox.error("Error while creating the data");
          },
        });
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("StudentList");


      },
      _onRouteMatched: function (oEvent) {
        var oView = this.getView();
        var oDataModel = oView.getModel();
      
        console.log('inonroutmatched');

        var oStudent = {
          FORENAME: "",
          LASTNAME: "",
          CLASS: ""
        };
        console.log('vooromodel');
        var oModel = new JSONModel(oStudent);
        console.log('voorsetmodel');
        this.getView().setModel(oModel, "form");
        console.log('modelset');
        
      },
    
    });


  });