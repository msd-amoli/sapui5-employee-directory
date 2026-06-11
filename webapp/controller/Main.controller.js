sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, JSONModel, Filter, FilterOperator) => {
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
            const itm = evt.getParameter("listItem").getBindingContext("emp");//get the selected item and its binding context
            const empobj = itm.getObject(); //get the object of the selected item
           
            const md = this.getView().getModel("emp");
            md.setProperty("/selectedEmployee",empobj);
            
        },
        onSearch:function(evt){
            const sQuery = evt.getParameter("newValue"); //get the search query
            const lst = this.byId("emplist");
            const binding = lst.getBinding("items");
            if(!sQuery){
                binding.filter([]); //if search query is empty, remove all filters
                return;
            }
            const oFilter = new Filter("name", FilterOperator.Contains, sQuery); //create a filter for the name property
                // const oFilter = new sap.ui.model.Filter
                // ("name",
                //     sap.ui.model.FilterOperator.Contains,sQuery); //create a filter for the name property

                
            binding.filter([oFilter]);
            console.log(oFilter);
        },
        onSearch2:function(evt){
            const qry = evt.getParameter("newValue");
            const lst = this.byId("emplist");
            const binding = lst.getBinding("items");
            if(!qry){
                binding.filter([]);
                return;
            }
            const ofilter = new Filter("department", FilterOperator.Contains,qry);
            binding.filter([ofilter]);
        }
    });
});