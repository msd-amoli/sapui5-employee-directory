sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("student.com.sap.training.advancedsapui5.employeedirectory.controller.Main", {
        onInit() {

            const oModel = new JSONModel();
            oModel.loadData("model/employees.json");
            this.getView().setModel(oModel,"emp");
            console.log("hello")


        },
        onEmployeeSelect:function(evt){
            console.log("event fired");
            const itm = evt.getParameter("listItem").getBindingContext("emp");
            const empobj = itm.getObject();
           
            const md = this.getView().getModel("emp");
            md.setProperty("/selectedEmployee",empobj);
            
        }
    });
});